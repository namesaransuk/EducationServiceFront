import axios from 'axios';
import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import { storage } from "../../firebase/index";
import { Formik, useFormik, yupToFormErrors } from "formik";
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' //fornt
import { faEdit, faTrash, faSearch } from "@fortawesome/free-solid-svg-icons";
import { Progress, Button, Form, FormGroup, Label, Input, Container, Row, Alert } from 'reactstrap';

const ViewEditNew = ({ id }) => {
    const initNew = {
        new_name: "",
        new_date_open: "",
        new_date_close: "",
        file: "",
        new_sub_detail: "",
        new_detail: "",
        new_url: "",
    };

    const [news,setNews] = useState(initNew)
    useEffect(() => {
        axios.get("https://educationservice.herokuapp.com/EducationNew/getDataNewId/" + id)
        .then((response) => {
            setNews(response.data)
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
  

    const handleInputChange = (event) => {
        let { name, value } = event.target;
        if (name === "tags") {  //
            value = value.split(","); //
        }
        setNews({ ...news, [name]: value });
    };
 
    const saveProduct = () => {
        var data = {
            new_name: news.new_name,
            new_date_open: news.new_date_open,
            new_detail: news.new_detail,
            new_url: news.new_url,
            new_image: news.new_image,
            new_date_close: news.new_date_close,
            new_sub_detail: news.new_sub_detail,

        };
        if (data['new_name'] === "" || data['new_date_open'] === ""
        || data['new_date_open'] === ""|| data['new_date_close'] === "" 
          ||data['new_url'] === "" ||data['new_sub_detail'] === "" || data['new_image'] === "" ) {
            Swal.fire(

                'ผิดพลาด',
                'กรุณารอกรอกข้อมูลให้ครบ',
                'error'
            )

        } else {
            axios.put("https://educationservice.herokuapp.com/EducationNew/updateDataNew/" + id, data)
                .then((res) => {
                    console.log(res.data.message);
                    if (res.data.message == "success") {
                        ////ต่อตรงนี้
                        Swal.fire(

                            'เเก้ไขข่าวเรียบร้อย',
                            '',
                            'success'
                        )
                            .then(() => window.location.assign("/Admin/newAll"))

                    } else {

                        Swal.fire(
                            'เเก้ไขข่าวผิดพลาด',
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
            <h3 className="text-center">แก้ไขเว็ปไซต์</h3>
            <Form onSubmit={formik.handleSubmit}>
                <center> <img width="20%" alt="ยังไม่ได้อัพเดตตราประจำมหาลัย" src={news.new_image || 'https://via.placeholder.com/300'} />
                    <input type="hidden" name="file" value={news.new_image} />
                    <FormGroup>
                        <Input type="hidden"
                            name="new_image"
                            value={news.new_image}
                            onChange={handleInputChange} />
                    </FormGroup>
                    <FormGroup>
                        <Button href={"/Admin/EditImageNew/" + news.id_new} >
                            <FontAwesomeIcon icon={faEdit} />เเก้ไขโลโกเว็ปไซต์
                        </Button>
                    </FormGroup></center>
                <FormGroup>
                    <Label for="new_name">ชื่อข่าว</Label>
                    <Input
                        type="text"
                        name="new_name"
                        id="new_name"
                        value={news.new_name}
                        onChange={handleInputChange}//เมื่อมีการพิมพ์ข้อความ
                        placeholder={news.new_name}
                    />
                    {formik.errors.name && formik.touched.new_name(
                        <p>{formik.errors.new_name}</p>
                    )}
                </FormGroup>
                <FormGroup>
                    <Label for="new_date_open">วันเริ่มกิจกรรม</Label>
                    <Input
                        type="date"
                        name="new_date_open"
                        id="new_date_open"
                        value={news.new_date_open}
                        onChange={handleInputChange}//เมื่อมีการพิมพ์ข้อความ
                        placeholder={news.new_date_open}
                    />
                    {formik.errors.name && formik.touched.new_date_open(
                        <p>{formik.errors.new_date_open}</p>
                    )}
                </FormGroup>
                <FormGroup>
                    <Label for="new_date_close">วันจบกิจกรรม</Label>
                    <Input
                        type="date"
                        name="new_date_close"
                        id="new_date_close"
                        value={news.new_date_close}
                        onChange={handleInputChange}//เมื่อมีการพิมพ์ข้อความ
                        placeholder={news.new_date_close}
                    />
                    {formik.errors.name && formik.touched.new_date_close(
                        <p>{formik.errors.new_date_close}</p>
                    )}
                </FormGroup>
                
                <FormGroup>
                    <Label for="new_sub_detail">รายละเอียดย่อย</Label>
                    <Input
                        type="select"
                        name="new_sub_detail"
                        id="new_sub_detail"
                        value={news.new_sub_detail}
                        onChange={handleInputChange}
                        >
                        placeholder={news.new_sub_detail}
                        <option disabled value={news.new_sub_detail}>{news.new_sub_detail}</option>
                        <option value="ข่าวประชาสัมพันธ์ทั่วไป">ข่าวประชาสัมพันธ์ทั่วไป</option>
                        <option value="ข่าวประชาสัมพันธ์กิจกรรม">ข่าวประชาสัมพันธ์กิจกรรม</option>
                    

                    {formik.errors.name && formik.touched.new_sub_detail(
                        <p>{formik.errors.new_sub_detail}</p> //เช็ค error
                    )}</Input>
                </FormGroup>
                <FormGroup>
                    <Label for="new_detail">รายละเอียด</Label>
                    <Input
                        type="textarea"
                        style={{ height: 150 }} 
                        name="new_detail"
                        id="new_detail"
                        value={news.new_detail}
                        onChange={handleInputChange}
                        placeholder={news.new_detail}
                    />

                    {formik.errors.name && formik.touched.new_detail(
                        <p>{formik.errors.new_detail}</p> //เช็ค error
                    )}
                </FormGroup>
                <FormGroup>
                    <Label for="new_url">URL</Label>
                    <Input
                        type="text"
                        name="new_url"
                        id="new_url"
                        value={news.new_url}
                        onChange={handleInputChange}
                        placeholder={news.new_url}
                    />
                    {formik.errors.name && formik.touched.new_url(
                        <p>{formik.errors.new_url}</p>
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

export default ViewEditNew;

