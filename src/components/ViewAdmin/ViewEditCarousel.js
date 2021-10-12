import axios from 'axios';
import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import { storage } from "../../firebase/index";
import { Formik, useFormik, yupToFormErrors } from "formik";
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' //fornt
import { faEdit, faTrash, faSearch } from "@fortawesome/free-solid-svg-icons";
import { Progress, Button, Form, FormGroup, Label, Input, Container, Row, Alert } from 'reactstrap';

const ViewEditCarousel = ({ id }) => {
    const initCarousel = {
        file: "",
    };

    const [progress, setProgress] = useState(0); //เซต progress
    const uploadFileToFirebase = (file) => {
        const useId = "universitylogo"; //ตั้งชื่อไฟล์
        const timestamp = Math.floor(Date.now() / 1000);
        const newName = useId + "_" + timestamp;
        const uploadTask = storage.ref(`images/${newName}`).put(file);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const uploadProgress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(uploadProgress);
            },
            (error) => {
                console.log(error);
            },
            () => {
                storage
                    .ref("images")
                    .child(newName)
                    .getDownloadURL()
                    .then((imagesURL) => {
                        console.log(imagesURL);
                        saveProduct(imagesURL);
                    })
            }
        );
    }
    const FILE_SIZE = 2000 * 1224;
    const SUPPORTED_TYPE = [
        "image/jpg",
        "image/jpeg",
        "image/png",
        "image/gif",
        "applivation/pdf",

    ]
    const formik = useFormik({
        initialValues: initCarousel, //
        onSubmit: (values) => {
            console.log(values);
            if (values.file) {
                uploadFileToFirebase(values.file);
            } else {
                saveProduct("");
            }
        },
    })
    const [carousel, setCarousel] = useState(initCarousel);

    useEffect(() => {
        axios.get("https://educationservice.herokuapp.com/Carousel/getCarouselId/" + id)
            .then((response) => {
                setCarousel(response.data)
            });
    }, [id]);

    const handlleInputChange = (event) => {
        let { name, value } = event.target;
        if (name === "tags") {  //
            value = value.split(","); //
        }
        setCarousel({ ...carousel, [name]: value });
    };

    const saveProduct = (imagesURL) => {
        var data = {
            image_carousel: imagesURL,
            image_carousel: carousel.image_carousel,
        };
        if (data['image_carousel'] === "") {
            Swal.fire(

                'ผิดพลาด',
                'กรุณารอกรอกข้อมูลให้ครบ',
                'error'
            )

        } else {
            axios.put("https://educationservice.herokuapp.com/Carousel/updateCarousel/" + id, data)
                .then((res) => {
                    console.log(res.data.message);
                    if (res.data.message == "success") {
                        ////ต่อตรงนี้
                        Swal.fire(

                            'เเก้ไขข้อมูลรูปสไลด์เรียบร้อย',
                            '',
                            'success'
                        )
                            .then(() => window.location.assign("/Admin/carouselall"))

                    } else {

                        Swal.fire(
                            'เเก้ไขข้อมูลรูปสไลด์ผิดพลาด',
                            'ชื่อรูปสไลด์นี้มีอยู่แล้วกรุณาเปลี่ยนชื่อ',
                            'error'
                        )

                    }

                })
                .catch((error) => {
                    console.log("error");
                });//ใช้ ดัก Error

        };
    }
    return (

        <div className="px-4 flex flex-col max-w-3xl mx-auto mt-32">
            <h3 className="text-center">แก้ไขรูปสไลด์</h3>
            <Form onSubmit={formik.handleSubmit}>
                <center> <img width="70%" alt="รูปสไลด์" src={carousel.image_carousel || 'https://flevix.com/wp-content/uploads/2019/07/Curve-Loading.gif'} />
                    <input type="hidden" name="file" value={carousel.image_carousel} />
                    <FormGroup>
                        <Input type="hidden"
                            name="image_carousel"
                            value={carousel.image_carousel}
                            onChange={handlleInputChange} />
                    </FormGroup>
                    <FormGroup>
                        <Button href={"/Admin/editImageCarousel/" + carousel.id_carousel} >
                            <FontAwesomeIcon icon={faEdit} />เเก้ไขรูปรูปสไลด์
                        </Button>
                    </FormGroup></center>
                <div className="text-center">
                    <Button type="submit" className="w-25 btn btn-success" >ตกลง</Button>
                </div>
            </Form>
        </div>
    )
};

export default ViewEditCarousel;

