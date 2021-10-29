import axios from 'axios';
import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import { storage } from "../../firebase/index";
import { Formik, useFormik, yupToFormErrors } from "formik";
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' //fornt
import { faEdit, faTrash, faSearch } from "@fortawesome/free-solid-svg-icons";
import { Progress, Button, Form, FormGroup, Label, Input, Container, Row, Alert, } from 'reactstrap';

const ViewEditImageNew = ({ id }) => {
    const initNew = {
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
        initialValues: initNew, //
        onSubmit: (values) => {
            console.log(values);
            if (values.file) {
                uploadFileToFirebase(values.file);
            } else {
                saveProduct("");
            }
        },
    })
    const [news, setNews] = useState(initNew)
    useEffect(() => {
        axios.get("https://educationservice.herokuapp.com/EducationNew/getDataNewId/" + id)
        .then((response) => {
            setNews(response.data)
        });
}, [id]);

    const handleInputChange = (event) => {
        let { name, value } = event.target;
        if (name === "tags") {  //
            value = value.split(","); //
        }
        setNews({ ...news, [name]: value });
    };

    const saveProduct = (imagesURL) => {
        var data = {
            new_image: imagesURL,
        };
        if (data['new_image'] === "") {
            Swal.fire(

                'ผิดพลาด',
                'กรุณารอกรอกข้อมูลให้ครบ',
                'error'
            )

        } else {
            axios.put("https://educationservice.herokuapp.com/EducationNew/updateDataNewImage/" + id, data)
                .then((res) => {
                    console.log(res.data.message);
                    if (res.data.message == "success") {
                        ////ต่อตรงนี้
                        Swal.fire(

                            'เเก้ไขรูปเรียบร้อย',
                            '',
                            'success'
                        )
                            .then(() => window.location.assign("/Admin/editNew/" + news.id_new))

                    } else {

                        Swal.fire(
                            'เเก้ไขรูปผิดพลาด',
                            'ชื่อรูปนี้มีอยู่แล้วกรุณาเปลี่ยนชื่อ',
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
             <Form onSubmit={formik.handleSubmit}>
                            
                            <br /><br /><br /><br />
                             <h3 className="text-center">แก้ไขรูปข่าว</h3>
                               
                             <FormGroup>
                                 <Label for="productImage"> รูปเกี่ยวกับข่าว (รองรับเฉพาะรูปภาพที่มีขนาดไม่เกิน 2 Mb)</Label>
                                 <Input type="file"
                                     name="file"
                                     onChange={(event) => { formik.setFieldValue("file", event.currentTarget.files[0]) }}
                                     />
                                 {progress !== 0 && <Progress value={progress}>{progress}%</Progress>}
 
                                 {formik.errors.file && formik.touched.file && (
                                     <p>{formik.errors.file}</p>
                                 )}
                             </FormGroup>
                             <Button type="submit" className="btn btn-success" >ตกลง</Button>
                         </Form><br /><br />
            
        </div>
    )
};

export default ViewEditImageNew;

