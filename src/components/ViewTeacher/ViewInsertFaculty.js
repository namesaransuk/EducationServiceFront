import axios from 'axios';
import React, { useState } from 'react';
import {
  Container, Row, Col, Button, Form, FormGroup, Label, Input, FormText, Card, CardText, CardBody, CardLink,
  CardTitle, CardSubtitle, Jumbotron, Table, Alert
} from 'reactstrap';
import Swal from 'sweetalert2';

const ViewInsertFaculty = () => {
  const initFaculty = {
    name_faculty: "",
  };

  const [faculty, setFaculty] = useState([initFaculty]);
  const [submited, setSumited] = useState(false);

  const handleInputChange = (event) => {
    let { name, value } = event.target;
    // if (name === "tags") {
    //     value = value.split(",");
    // }
    setFaculty({ ...faculty, [name]: value });
  };

  const saveFaculty = (e) => {
    e.preventDefault()
    var data = {
      name_faculty: faculty.name_faculty
    }
    if (data['name_faculty'] === "") {
      Swal.fire(

        'ผิดพลาด',
        'กรุณารอกรอกข้อมูลให้ครบ',
        'error'
      )
    } else {
      axios.post("http://localhost:8080/faculty/createFaculty", data)
        .then((res) => {
          console.log(res.data.satatus);
          if (res.data.satatus == "201") {
            ////ต่อตรงนี้
            Swal.fire(

              'เพิ่มข้อมูลคณะเรียบร้อย',
              '',
              'success'
            )
              .then(() => window.location.assign("/facultyall"))

          } else {

            Swal.fire(
              'เพิ่มข้อมูลคณะผิดพลาด',
              'ชื่อคณะนี้มีอยู่แล้วกรุณาเปลี่ยนชื่อ',
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
    <div class="container"><br /><br /><br /><br />
      <Form onSubmit={saveFaculty}>
        <Row>
          <Label for="faculty">ชื่อคณะ</Label>
          <Input
            type="text"
            name="name_faculty"
            id="name_faculty"
            value={faculty.name_faculty || ""}
            onChange={handleInputChange}
            placeholder="ระบุชื่อคณะ"
            required />
        </Row>

        <Button className="btn btn-success" >บันทึก</Button>


      </Form></div>
  )
}


export default ViewInsertFaculty;