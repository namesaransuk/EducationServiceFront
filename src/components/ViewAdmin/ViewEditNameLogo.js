import axios from 'axios';
import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import { storage } from "../../firebase/index";
import { Formik, useFormik, yupToFormErrors } from "formik";
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' //fornt
import { faEdit, faTrash, faSearch } from "@fortawesome/free-solid-svg-icons";
import { Progress, Button, Form, FormGroup, Label, Input, Container, Row, Alert } from 'reactstrap';

const ViewEditNameLogo = ({ id }) => {
    const initNameLogo = {
        NameHeaderWeb: "",
        file: "",
        NameWeb: "",
        EngNameWeb: "",
        DetailWeb: "",

    };

    const [namelogo, setNamelogo] = useState(initNameLogo)
    useEffect(() => {
        axios.get("https://educationservice.herokuapp.com/NameLogo/getDataNameLogoId/" + id)
        .then((response) => {
            setNamelogo(response.data)
        });
}, [id]);

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
        initialValues: initNameLogo, //
        onSubmit: (values) => {
            console.log(values);
            if (values.file) {
                uploadFileToFirebase(values.file);
            } else {
                saveProduct("");
            }
        },
    })
  

    const handlleInputChange = (event) => {
        let { name, value } = event.target;
        if (name === "tags") {  //
            value = value.split(","); //
        }
        setNamelogo({ ...namelogo, [name]: value });
    };
 
    const saveProduct = (imagesURL) => {
        var data = {
            NameHeaderWeb: formik.values.NameHeaderWeb,
            NameWeb: formik.values.NameWeb,
            EngNameWeb: formik.values.EngNameWeb,
            DetailWeb: formik.values.DetailWeb,
            LogoWeb: imagesURL,
            LogoWeb: namelogo.LogoWeb,
            NameHeaderWeb: namelogo.NameHeaderWeb,
            NameWeb: namelogo.NameWeb,
            EngNameWeb: namelogo.EngNameWeb,
            DetailWeb: namelogo.DetailWeb,
        };
        if (data['NameHeaderWeb'] === "" || data['NameWeb'] === "" ) {
            Swal.fire(

                'ผิดพลาด',
                'กรุณารอกรอกข้อมูลให้ครบ',
                'error'
            )

        } else {
            axios.put("https://educationservice.herokuapp.com/NameLogo/updateDataNameLogo/" + id, data)
                .then((res) => {
                    console.log(res.data.message);
                    if (res.data.message == "success") {
                        ////ต่อตรงนี้
                        Swal.fire(

                            'เเก้ไขข้อมูลเว็ปไซต์เรียบร้อย',
                            '',
                            'success'
                        )
                            .then(() => window.location.assign("/Admin/dashboardAdmin"))

                    } else {

                        Swal.fire(
                            'เเก้ไขข้อมูลเว็ปไซต์ผิดพลาด',
                            'ชื่อเว็ปไซต์นี้มีอยู่แล้วกรุณาเปลี่ยนชื่อ',
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
            <h3 className="text-center">แก้ไขเว็ปไซต์</h3>
            <Form onSubmit={formik.handleSubmit}>
                <center> <img width="150px" alt="ยังไม่ได้อัพเดตตราประจำมหาลัย" src={namelogo.LogoWeb || 'https://mir-s3-cdn-cf.behance.net/project_modules/max_632/04de2e31234507.564a1d23645bf.gif'} />
                    <input type="hidden" name="file" value={namelogo.LogoWeb} />
                    <FormGroup>
                        <Input type="hidden"
                            name="LogoWeb"
                            value={namelogo.LogoWeb}
                            onChange={handlleInputChange} />
                    </FormGroup>
                    <FormGroup>
                        <Button href={"/Admin/EditImageNameLogo/" + namelogo.id} >
                            <FontAwesomeIcon icon={faEdit} />เเก้ไขโลโกเว็ปไซต์
                        </Button>
                    </FormGroup></center>
                <FormGroup>
                    <Label for="productName">ชื่อระบบ</Label>
                    <Input
                        type="text"
                        name="NameHeaderWeb"
                        id="productName"
                        value={namelogo.NameHeaderWeb}
                        onChange={handlleInputChange}//เมื่อมีการพิมพ์ข้อความ
                        placeholder={namelogo.NameHeaderWeb}
                    />
                    {formik.errors.name && formik.touched.NameHeaderWeb(
                        <p>{formik.errors.NameHeaderWeb}</p>
                    )}
                </FormGroup>
                <FormGroup>
                    <Label for="productName">ชื่อเว็ปไซต์</Label>
                    <Input
                        type="text"
                        name="NameWeb"
                        id="productName"
                        value={namelogo.NameWeb}
                        onChange={handlleInputChange}//เมื่อมีการพิมพ์ข้อความ
                        placeholder={namelogo.NameWeb}
                    />
                    {formik.errors.name && formik.touched.NameWeb(
                        <p>{formik.errors.NameWeb}</p>
                    )}
                </FormGroup>
                <FormGroup>
                    <Label for="productCategory">ชื่อเว็ปไซต์ภาษาอังกฤษ</Label>
                    <Input
                        type="text"
                        name="EngNameWeb"
                        id="productCatgory"
                        value={namelogo.EngNameWeb}
                        onChange={handlleInputChange}
                        placeholder={namelogo.EngNameWeb}
                    />

                    {formik.errors.name && formik.touched.EngNameWeb(
                        <p>{formik.errors.EngNameWeb}</p> //เช็ค error
                    )}
                </FormGroup>
                <FormGroup>
                    <Label for="productTags">รายละเอียด</Label>
                    <Input
                        type="textarea"
                        name="DetailWeb"
                        style={{ height: 200 }}
                        id="productTags"
                        value={namelogo.DetailWeb}
                        onChange={handlleInputChange}
                        placeholder={namelogo.DetailWeb}
                    />
                    {formik.errors.name && formik.touched.DetailWeb(
                        <p>{formik.errors.DetailWeb}</p>
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

export default ViewEditNameLogo;

