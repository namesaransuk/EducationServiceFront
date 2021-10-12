import axios from 'axios';
import React, { useState } from 'react';
import * as yup from 'yup';
import { storage } from "../../firebase/index";
import { Formik, useFormik, yupToFormErrors } from "formik";
import Swal from 'sweetalert2';

import { Progress, Button, Form, FormGroup, Label, Input, Container, Row, Alert } from 'reactstrap';

const ViewInsertNew = () => {
    const initProduct = {
        new_name: "",
        new_date_open: "",
        new_date_close: "",
        file: "",
        new_sub_detail: "",
        new_detail: "",
        new_url: "",
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
            new_name: formik.values.new_name,
            new_date_open: formik.values.new_date_open,
            new_detail: formik.values.new_detail,
            new_date_close: formik.values.new_date_close,
            new_sub_detail: formik.values.new_sub_detail,
            new_url: formik.values.new_url,
            new_image: imagesURL,
        };
        if (data['new_name'] === "" || data['new_date_open'] === "" || data['new_date_close'] === ""
        || data['new_detail'] === "" || data['new_sub_detail'] === "" || data['new_url'] === "") {
            Swal.fire(

                'ผิดพลาด',
                'กรุณากรอกข้อมูลให้ครบ',
                'error'
            )
        } else {
            axios.post("https://educationservice.herokuapp.com/EducationNew/createDataNew", data)
                .then((res) => {
                    console.log(res.data.message);
                    if (res.data.message == "success") {
                        ////ต่อตรงนี้
                        Swal.fire(

                            'เพิ่มข่าวเรียบร้อย',
                            '',
                            'success'
                        )
                            .then(() => window.location.assign("/Admin/newall"))

                    } else {

                        Swal.fire(
                            'เพิ่มข่าวผิดพลาด',
                            'ชื่อข่าวนี้มีอยู่แล้วกรุณาเปลี่ยนชื่อ',
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
            <h3 className="text-center">เพิ่มข่าว</h3>
            <Form onSubmit={formik.handleSubmit}>
                <FormGroup>
                    <Label for="productName">ชื่อข่าว</Label>
                    <Input
                        type="text"
                        name="new_name"
                        id="new_name"
                        value={formik.values.new_name}
                        onChange={formik.handleChange}//เมื่อมีการพิมพ์ข้อความ
                        placeholder="ระบุชื่อข่าว"
                         />
                    {formik.errors.name && formik.touched.new_name(
                        <p>{formik.errors.new_name}</p>
                    )}
                </FormGroup>
                <FormGroup>
                    <Label for="productCategory">วันเริ่มกิจกรรม</Label>
                    <Input
                        type="date"
                        name="new_date_open"
                        id="new_date_open"
                        value={formik.values.new_date_open}
                        onChange={formik.handleChange}
                        placeholder="ระบุวันเริ่มกิจกรรม"
                         />

                    {formik.errors.name && formik.touched.new_date_open(
                        <p>{formik.errors.new_date_open}</p> //เช็ค error
                    )}
                </FormGroup>
                
                <FormGroup>
                    <Label for="productCategory">วันจบกิจกรรม</Label>
                    <Input
                        type="date"
                        name="new_date_close"
                        id="new_date_close"
                        value={formik.values.new_date_close}
                        onChange={formik.handleChange}
                        placeholder="ระบุวันจบกิจกรรม"
                         />

                    {formik.errors.name && formik.touched.new_date_close(
                        <p>{formik.errors.new_date_close}</p> //เช็ค error
                    )}
                </FormGroup>
                <FormGroup>
                    <Label for="productTags">รายละเอียดย่อย</Label>
                    <Input 
                        type="select"
                        name="new_sub_detail"
                        id="new_sub_detail"
                        value={formik.values.new_sub_detail}
                        onChange={formik.handleChange}
                        >
                        <option disabled value="กรุณาเลือก">กรุณาเลือก</option>
                        <option value="ข่าวประชาสัมพันธ์ทั่วไป">ข่าวประชาสัมพันธ์ทั่วไป</option>
                        <option value="ข่าวประชาสัมพันธ์กิจกรรม">ข่าวประชาสัมพันธ์กิจกรรม</option>
                        
                    {formik.errors.name && formik.touched.new_sub_detail(
                        <p>{formik.errors.new_sub_detail}</p>
                        
                    )}  </Input>
                </FormGroup>
                <FormGroup>
                    <Label for="productTags">รายละเอียด</Label>
                    <Input style={{ height: 150 }} type="textarea"
                        name="new_detail"
                        id="new_detail"
                        value={formik.values.new_detail}
                        onChange={formik.handleChange}
                        placeholder="ระบุรายละเอียด"
                         />
                    {formik.errors.name && formik.touched.new_detail(
                        <p>{formik.errors.new_detail}</p>
                    )}
                </FormGroup>
                <FormGroup>
                    <Label for="productTags">ลิงค์เฟสบุ๊ค</Label>
                    <Input type="text"
                        name="new_url"
                        id="new_url"
                        value={formik.values.new_url}
                        onChange={formik.handleChange}
                        placeholder="ระบุ Url"
                         />
                    {formik.errors.name && formik.touched.new_url(
                        <p>{formik.errors.new_url}</p>
                    )}
                </FormGroup>
                <FormGroup>
                    <Label for="productImage"> รูปที่เกี่ยวกับข่าว (รองรับเฉพาะรูปภาพที่มีขนาดไม่เกิน 2 Mb)</Label>
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

export default ViewInsertNew;

