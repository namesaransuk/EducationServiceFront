import axios from 'axios';
import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import { storage } from "../../firebase/index";
import { Formik, useFormik, yupToFormErrors } from "formik";
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' //fornt
import { faEdit, faTrash, faSearch } from "@fortawesome/free-solid-svg-icons";
import { Progress, Button, Form, FormGroup, Label, Input, Container, Row, Alert,Col } from 'reactstrap';

const ViewEditFooter = ({ id }) => {
    const initFooter = {
        footer_contact: "",
        footer_contact_detail: "",
        footer_devloper: "",
        footer_devloper_detail: "",
        footer_license: "",

    };

    const [footer, setFooter] = useState(initFooter)
    useEffect(() => {
        axios.get("https://educationservice.herokuapp.com/Footer/getFooterId/" + id)
        .then((response) => {
            setFooter(response.data)
        });
}, [id]);

    const handlleInputChange = (event) => {
        let { name, value } = event.target;
        if (name === "tags") {  //
            value = value.split(","); //
        }
        setFooter({ ...footer, [name]: value });
    };
    const saveProduct = (e) => {
        e.preventDefault()
        var data = {
            footer_contact: footer.footer_contact,
            footer_contact_detail: footer.footer_contact_detail,
            footer_devloper: footer.footer_devloper,
            footer_devloper_detail: footer.footer_devloper_detail,
            footer_license: footer.footer_license,
        };
        if (data['footer_contact'] === "" || data['footer_contact_detail'] === ""|| data['footer_devloper'] === ""
        || data['footer_devloper_detail'] === ""|| data['footer_license'] === "" ) {
            Swal.fire(

                'ผิดพลาด',
                'กรุณารอกรอกข้อมูลให้ครบ',
                'error'
            )

        } else {
            axios.put("https://educationservice.herokuapp.com/Footer/updateFooter/" + id, data)
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
            <h3 className="text-center">แก้ไขส่วนท้ายเว็ปไซต์</h3>
            <br />
            <Form>
            <Row form>
            <Col sm={6}>
                <FormGroup>
                    <Label for="footer_devloper">ชื่อ ส่วนท้าย Column 1</Label>
                    <Input
                        type="text"
                        name="footer_devloper"
                        id="footer_devloper"
                        value={footer.footer_devloper}
                        onChange={handlleInputChange}//เมื่อมีการพิมพ์ข้อความ
                        placeholder={footer.footer_devloper}
                    />
                 
                </FormGroup>
                </Col>
                <Col sm={6}>
                <FormGroup>
                    <Label for="footer_contact">ชื่อ ส่วนท้าย Column 2</Label>
                    <Input
                        type="text"
                        name="footer_contact"
                        id="footer_contact"
                        value={footer.footer_contact}
                        onChange={handlleInputChange}//เมื่อมีการพิมพ์ข้อความ
                        placeholder={footer.footer_contact}
                    />
                  
                </FormGroup>
                </Col>
                </Row>
                <Row form>
                <Col sm={6}>
                <FormGroup>
                    <Label for="footer_devloper_detail">รายละเอียด</Label>
                    <Input
                        type="textarea"
                        name="footer_devloper_detail"
                        style={{ height: 200 }}
                        id="footer_devloper_detail"
                        value={footer.footer_devloper_detail}
                        onChange={handlleInputChange}
                        placeholder={footer.footer_devloper_detail}
                    />
            
                </FormGroup>
                </Col>
                <Col sm={6}>
                <FormGroup>
                    <Label for="footer_contact_detail">รายละเอียด</Label>
                    <Input
                        type="textarea"
                        name="footer_contact_detail"
                        style={{ height: 200 }}
                        id="footer_contact_detail"
                        value={footer.footer_contact_detail}
                        onChange={handlleInputChange}
                        placeholder={footer.footer_contact_detail}
                    />
                   
                </FormGroup>
                </Col>
                </Row>
                <FormGroup>
                    <Label for="footer_license">ลิขสิทธิ์(Copyright ©)</Label>
                    <Input
                        type="text"
                        name="footer_license"
                        id="footer_license"
                        value={footer.footer_license}
                        onChange={handlleInputChange}//เมื่อมีการพิมพ์ข้อความ
                        placeholder={footer.footer_license}
                    />
                    
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

                    <Button type="submit" className="w-25 btn btn-success" onClick={saveProduct} >ตกลง</Button>
                </div>
            </Form>
        </div>
    )
};

export default ViewEditFooter;

