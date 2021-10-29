import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container, Row, Col, Button, Form, FormGroup, Label, Input, FormText, Card, CardText, CardBody, CardLink,
  CardTitle, CardSubtitle, Jumbotron, Table, Alert
} from 'reactstrap';
import Swal from 'sweetalert2';

const ViewEditGroupCourse = ({ id }) => {
  const initGroupMajor = {
    name_major: "",
  };

  const [GroupCourse, setGroupCourse] = useState(initGroupMajor);
  const [submited, setSumited] = useState(false);


  useEffect(() => {
    axios.get("https://educationservice.herokuapp.com/groupmajor/" + id)
      .then((response) => {
        setGroupCourse(response.data)
      });
  }, [id]);

  const handleInputChange = (event) => {
    let { name, value } = event.target;
    //if (name === "tags") {
    //  value = value.split(",");
    // }
    setGroupCourse({ ...GroupCourse, [name]: value });
  };

  const saveGroupCourse = (e) => {
    e.preventDefault()

    var data = {
      name_major: GroupCourse.name_major,

    }
    if (data['name_major'] === "") {
      Swal.fire(

        'ผิดพลาด',
        'กรุณารอกรอกข้อมูลให้ครบ',
        'error'
      )

    } else {
      axios.put("https://educationservice.herokuapp.com/groupmajor/" + id, data)
        .then((res) => {
          console.log(res.data.message);
          if (res.data.message == "success") {
            ////ต่อตรงนี้
            Swal.fire(

              'เเก้ไขข้อมูลกลุ่มสาขาเรียบร้อย',
              '',
              'success'
            )
              .then(() => window.location.assign("/Teacher/groupcourseall"))

          } else {

            Swal.fire(
              'เเก้ไขข้อมูลกลุ่มสาขาผิดพลาด',
              'ชื่อกลุ่มสาขานี้มีอยู่แล้วกรุณาเปลี่ยนชื่อ',
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

    <div className="px-4 flex flex-col max-w-3xl mx-auto mt-32"><br /> <br /> 
      <h3 className="text-center">เเก้ไขกลุ่มสาขา</h3>
      <Form onSubmit={saveGroupCourse}>
        <Label for="name_faculty">ชื่อกลุ่มสาขา</Label>
        <Input
          type="text"
          name="name_major"
          id="name_major"
          value={GroupCourse.name_major}
          onChange={handleInputChange}
          placeholder={GroupCourse.name_major}
           />
        <br />
        <div className="text-center">
          <Button className="btn btn-success w-25" >บันทึก</Button>
        </div>
      </Form><br /><br /><br />
    </div>

  );
};


export default ViewEditGroupCourse;