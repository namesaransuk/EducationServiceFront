import axios from 'axios';
import React, { useState } from 'react';
import {
  Container, Row, Col, Button, Form, FormGroup, Label, Input, FormText, Card, CardText, CardBody, CardLink,
  CardTitle, CardSubtitle, Jumbotron, Table, Alert
} from 'reactstrap';
import Swal from 'sweetalert2';

const ViewInsertGroupCourse = () => {
  const initGroupMajor = {
    name_major: "",
  };

  const [groupmajor, setGroupMajor] = useState(initGroupMajor);
  const [submited, setSumited] = useState(false)

  const handleInputChange = (event) => {
    let { name, value } = event.target;
    // if (name === "tags") {
    //     value = value.split(",");
    // }
    setGroupMajor({ ...groupmajor, [name]: value });
  };

  const saveGroupMajor = (e) => {
    e.preventDefault()
    var data = {
      name_major: groupmajor.name_major
    }
    if (data['name_major'] === " ") {
      Swal.fire(
        'ผิดพลาด',
        'กรุณารอกรอกข้อมูลให้ครบ',
        'error'
      )

    } else {
      axios.post("http://localhost:8080/groupmajor", data)
        .then((res) => {
          console.log(res.data.message);
          if (res.data.message == "success") {
            ////ต่อตรงนี้
            Swal.fire(

              'เพิ่มข้อมูลสาขาเรียบร้อย',
              '',
              'success'
            )
              .then(() => window.location.assign("/groupcourseall"))

          } else {

            Swal.fire(
              'เพิ่มข้อมูลสาขาผิดพลาด',
              'ชื่อสาขานี้มีอยู่แล้วกรุณาเปลี่ยนชื่อ',
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
      <h3 className="text-center">เพิ่มกลุ่มสาขา</h3>
      <Form onSubmit={saveGroupMajor}>
        <br />
        <Label for="major">ชื่อกลุ่มสาขา</Label>
        <Input
          type="text"
          name="name_major"
          id="name_major"
          onChange={handleInputChange}
          placeholder="กรุณาใส่ชื่อกลุ่มสาขา" required />
        <br />
        <div className="text-center">
          <Button className="btn btn-success w-25">บันทึก</Button>
        </div>
      </Form></div>
  )
}

export default ViewInsertGroupCourse;