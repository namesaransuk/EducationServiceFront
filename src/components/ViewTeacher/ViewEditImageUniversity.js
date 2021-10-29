import axios from 'axios';
import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import { storage } from "../../firebase/index";
import { Formik, useFormik, yupToFormErrors } from "formik";
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' //fornt
import { faEdit, faTrash, faSearch } from "@fortawesome/free-solid-svg-icons";
import { Progress, Button, Form, FormGroup, Label, Input, Container, Row, Alert, } from 'reactstrap';

const ViewEditImageUniversity = ({ id }) => {
    const initUniversity = {
    name_uni: "",
    url_uni: "",
    file: "",
    detail_uni: "",

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
        initialValues: initUniversity, //
        onSubmit: (values) => {
            console.log(values);
            if (values.file) {
                uploadFileToFirebase(values.file);
            } else {
                saveProduct("");
            }
        },
    })
    const [university, setUniversity] = useState(initUniversity);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        axios.get("https://educationservice.herokuapp.com/university/" + id)
          .then((response) => {
            setUniversity(response.data)
          });
      }, [id]);

    const handlleInputChange = (event) => {
        let { name, value } = event.target;
        if (name === "tags") {  //
            value = value.split(","); //
        }
        setUniversity({ ...university, [name]: value });
    };

    const saveProduct = (imagesURL) => {
        var data = {
            name_uni:formik.values.name_uni,
            url_uni: formik.values.url_uni,
            detail_uni: formik.values.detail_uni,
            logo_uni: imagesURL,
            name_uni:university.name_uni,
            url_uni: university.url_uni,
            detail_uni: university.detail_uni,
        };
        if (data['name_uni'] === "" || data['url_uni'] === "" || data['detail_uni'] === "" || data['logo_uni'] === "") {
            Swal.fire(

                'ผิดพลาด',
                'กรุณารอกรอกข้อมูลให้ครบ',
                'error'
            )

        } else {
            axios.put("https://educationservice.herokuapp.com/university/" + id , data)
            .then((res) => {
                    console.log(res.data.message);
                    if (res.data.message == "success") {
                        ////ต่อตรงนี้
                            Swal.fire(
                         
                             'เเก้ไขตราประจำเรียบร้อย',
                             ' ',
                              'success',
                          )
                          
                            .then(() => window.location.assign("/Teacher/editUniversity/" + university.id_university))

                    } else {

                        Swal.fire(
                            'เเก้ไขตราประจำมหาลัยผิดพลาด',
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


    const newProduct = () => {
        formik.resetForm();
        setProgress(0);
        setSubmitted(false);
    };
    return (
      
        <Container>
        
                  
                        <Form onSubmit={formik.handleSubmit}>
                            <FormGroup><br /><br /><br /><br />
                            <h3 className="text-center">แก้ไขรูปตรามหาลัย</h3>
                                <Input
                                    type="hidden"
                                    name="name_uni"
                                    id="productName"
                                    value={university.name_uni}
                                    onChange={handlleInputChange}//เมื่อมีการพิมพ์ข้อความ
                                    placeholder={university.name_uni}
                                    />
                                {formik.errors.name && formik.touched.name(
                                    <p>{formik.errors.name_uni}</p>
                                )}
                            </FormGroup>
                            <FormGroup>
                                <Input
                                    type="hidden"
                                    name="url_uni"
                                    id="productCatgory"
                                    value={university.url_uni}
                                    onChange={handlleInputChange}
                                    placeholder={university.url_uni}
                                    />

                                {formik.errors.name && formik.touched.url_uni(
                                    <p>{formik.errors.url_uni}</p> //เช็ค error
                                )}
                            </FormGroup>
                            <FormGroup>
                                <Input
                                    type="hidden"
                                    name="detail_uni"
                                    id="productTags"
                                    value={university.detail_uni}
                                    onChange={handlleInputChange}
                                    placeholder={university.detail_uni}
                                />
                                {formik.errors.name && formik.touched.detail_uni(
                                    <p>{formik.errors.detail_uni}</p>
                                )}
                            </FormGroup>
         
                            <FormGroup>
                                <Label for="productImage"> ตราประจำมหาลัย (รองรับเฉพาะรูปภาพที่มีขนาดไม่เกิน 2 Mb)</Label>
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
                        </Form>    <br />    <br />    <br />
                

        </Container>
    )
};

export default ViewEditImageUniversity;

