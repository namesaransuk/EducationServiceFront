import axios from 'axios';
import React, { useState } from 'react';
import * as yup from 'yup';
import { storage } from "../../firebase/index";
import { Formik, useFormik, yupToFormErrors } from "formik";
import Swal from 'sweetalert2';

import { Progress, Button, Form, FormGroup, Label, Input, Container, Row, Alert } from 'reactstrap';

const ViewInsertCarousel = () => {
    const initProduct = {
        file: "",
    };

    const [progress, setProgress] = useState(0); //เซต progress
    const uploadFileToFirebase = (file) => {
        const useId = "u001"; //ตั้งชื่อไฟล์
        const timestamp = Math.floor(Date.now() / 1000);
        const newName = useId + "_" + timestamp;
        const uploadTask = storage.ref(`images/${newName}`).put(file); //เปลี่ยนชื่อไฟล์ใน ref
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
        initialValues: (initProduct), //
        validationSchema: yup.object().shape({ //เงื่อนไข
            file: yup
                .mixed()
                .test("fileSize", "ไฟล์ใหญ่เกินไป", (file) => {
                    if (file) {
                        return file.size <= FILE_SIZE;
                    } else {
                        return true;
                    }
                })
                .test("fileType", "รองรับเฉพสะรูปภาพ", (file) => {
                    if (file) {
                        return SUPPORTED_TYPE.includes(file.type);
                    } else {
                        return true;
                    }
                }),
        }),
        onSubmit: (values) => {
            console.log(values);
            if (values.file) {
                uploadFileToFirebase(values.file);
            } else {
                saveProduct("");
            }
        },
    })
    const [product, setProduct] = useState(initProduct);
    const [submitted, setSubmitted] = useState(false);

    const handlleInputChange = (event) => {
        let { name, value } = event.target;
        if (name === "tags") {  //
            value = value.split(","); //
        }
        setProduct({ ...product, [name]: value });
    };

    const saveProduct = (imagesURL) => {
        var data = {
            image_carousel: imagesURL,
        };
        if (data['image_carousel'] === "") {
            Swal.fire(

                'ผิดพลาด',
                'กรุณาเพิ่มข้อมูลให้ครบ',
                'error'
            )
        } else {
            axios.post("https://educationservice.herokuapp.com/Carousel/createCarousel", data)
                .then((res) => {
                    console.log(res.data.message);
                    if (res.data.message == "success") {
                        ////ต่อตรงนี้
                        Swal.fire(

                            'เพิ่มข้อมูลรูปสไลด์เรียบร้อย',
                            '',
                            'success'
                        )
                            .then(() => window.location.assign("/Admin/CarouselAll"))

                    } else {

                        Swal.fire(
                            'เพิ่มข้อมูลรูปสไลด์ผิดพลาด',
                            'ข้อมูลรูปสไลด์นี้มีอยู่แล้วกรุณาเปลี่ยนไฟล์',
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
            <h3 className="text-center">เพิ่มรูปสไลด์</h3>
            <Form onSubmit={formik.handleSubmit}>
                <FormGroup>
                    <Label for="productCategory"></Label>
                </FormGroup>
                <FormGroup>
                    <Label for="productCategory"></Label>
                </FormGroup>
                <FormGroup>
                    <Label for="productImage"> รูปสไลด์ (รองรับเฉพาะรูปภาพที่มีขนาดไม่เกิน 2 Mb)</Label>
                    <Input type="file"
                        name="file"
                        onChange={(event) => { formik.setFieldValue("file", event.currentTarget.files[0]) }} />
                    {progress !== 0 && <Progress value={progress}>{progress}%</Progress>}

                    {formik.errors.file && formik.touched.file && (
                        <p>{formik.errors.file}</p>
                    )}
                </FormGroup>
                <div className="col text-center">
                    <Button type="submit" className="w-25 btn btn-success" >ตกลง</Button>
                </div>
            </Form>
        </div>

    )
};

export default ViewInsertCarousel;

