import axios from 'axios';
import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import { storage } from "../../firebase/index";
import { Formik, useFormik, yupToFormErrors } from "formik";
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' //fornt
import { faEdit, faTrash, faSearch } from "@fortawesome/free-solid-svg-icons";
import { Progress, Button, Form, FormGroup, Label, Input, Container, Row, Alert } from 'reactstrap';

const ViewEditUniversity = ({ id }) => {
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
        axios.get("http://localhost:8080/university/" + id)
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
            name_uni: formik.values.name_uni,
            url_uni: formik.values.url_uni,
            detail_uni: formik.values.detail_uni,
            logo_uni: imagesURL,
            logo_uni: university.logo_uni,
            name_uni: university.name_uni,
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
            axios.put("http://localhost:8080/university/" + id, data)
                .then((res) => {
                    console.log(res.data.message);
                    if (res.data.message == "success") {
                        ////ต่อตรงนี้
                        Swal.fire(

                            'เเก้ไขข้อมูลมหาลัยเรียบร้อย',
                            '',
                            'success'
                        )
                            .then(() => window.location.assign("/universityall"))

                    } else {

                        Swal.fire(
                            'เเก้ไขข้อมูลมหาลัยผิดพลาด',
                            'ชื่อมหาลัยนี้มีอยู่แล้วกรุณาเปลี่ยนชื่อ',
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
            <h3 className="text-center">แก้ไขมหาวิทยาลัย</h3>
            <Form onSubmit={formik.handleSubmit}>
                <center> <img width="20%" alt="ยังไม่ได้อัพเดตตราประจำมหาลัย" src={university.logo_uni || 'https://via.placeholder.com/300'} />
                    <input type="hidden" name="file" value={university.logo_uni} />
                    <FormGroup>
                        <Input type="hidden"
                            name="logo_uni"
                            value={university.logo_uni}
                            onChange={handlleInputChange} />
                    </FormGroup>
                    <FormGroup>
                        <Button href={"../editImageUniversity/" + university.id_university} >
                            <FontAwesomeIcon icon={faEdit} />เเก้ไขตราประจำมหาลัย
                        </Button>
                    </FormGroup></center>
                <FormGroup>
                    <Label for="productName">ชื่อมหาลัย</Label>
                    <Input
                        type="text"
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
                    <Label for="productCategory">URL</Label>
                    <Input
                        type="text"
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
                    <Label for="productTags">รายละเอียด</Label>
                    <Input
                        type="textarea"
                        name="detail_uni"
                        style={{ height: 200 }}
                        id="productTags"
                        value={university.detail_uni}
                        onChange={handlleInputChange}
                        placeholder={university.detail_uni}
                    />
                    {formik.errors.name && formik.touched.detail_uni(
                        <p>{formik.errors.detail_uni}</p>
                    )}
                </FormGroup>

                {/* <FormGroup>
                                <Label for="productImage"> โลโกมหาลัย (รองรับเฉพาะรูปภาพที่มีขนาดไม่เกิน 2 Mb)</Label>
                                <Input type="file"
                                    name="file"
                                    onChange={(event) => { formik.setFieldValue("file", event.currentTarget.files[0]) }}
                                    />
                                {progress !== 0 && <Progress value={progress}>{progress}%</Progress>}

                                {formik.errors.file && formik.touched.file && (
                                    <p>{formik.errors.file}</p>
                                )}
                            </FormGroup> */}
                <div className="text-center">
                    <Button type="submit" className="w-25 btn btn-success" >ตกลง</Button>
                </div>
            </Form>
        </div>
    )
};

export default ViewEditUniversity;

