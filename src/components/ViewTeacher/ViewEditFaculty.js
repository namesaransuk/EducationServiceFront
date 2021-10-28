import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container, Row, Col, Button, Form, FormGroup, Label, Input, FormText, Card, CardText, CardBody, CardLink,
  CardTitle, CardSubtitle, Jumbotron, Table, Alert
} from 'reactstrap';
import Swal from 'sweetalert2';

const ViewEditFaculty = ({ id }) => {
  const initFaculty = {
    name_faculty: "",
  };

  const [faculty, setFaculty] = useState(initFaculty);
  const [submited, setSumited] = useState(false);

  useEffect(() => {
    axios.get("https://educationservice.herokuapp.com/faculty/getFaculty/" + id)
      .then((response) => {
        setFaculty(response.data)
      });
  }, [id]);

  const handleInputChange = (event) => {
    let { name, value } = event.target;
    //if (name === "tags") {
    //  value = value.split(",");
    // }
    setFaculty({ ...faculty, [name]: value });
  };

  const saveFaculty = (e) => {
    e.preventDefault()
    var data = {
      name_faculty: faculty.name_faculty,
    }
    if (data['name_faculty'] === "") {
      Swal.fire(

        'ผิดพลาด',
        'กรุณากรอกข้อมูลให้ครบ',
        'error'
      )
    } else {
      axios.put("https://educationservice.herokuapp.com/faculty/" + id, data)
        .then((res) => {
          console.log(res.data.message);
          if (res.data.message == "success") {
            ////ต่อตรงนี้
            Swal.fire(

              'เเก้ไขข้อมูลคณะเรียบร้อย',
              '',
              'success'
            )
              .then(() => window.location.assign("/Teacher/facultyall"))

          } else {

            Swal.fire(
              'เเก้ไขข้อมูลคณะผิดพลาด',
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

    <div className="px-4 flex flex-col max-w-3xl mx-auto mt-32"><br /> <br /> 
      <h3 className="text-center">แก้ไขคณะ</h3>
      <Form>
        <Label for="name_faculty">ชื่อคณะ</Label>
        <Input
          type="text"
          name="name_faculty"
          id="name_faculty"
          value={faculty.name_faculty}
          onChange={handleInputChange}
          placeholder={faculty.name_faculty}
        />
        <br />
        <div className="text-center">
          <Button className="w-25 btn btn-success" onClick={saveFaculty}>บันทึก</Button>
        </div>
      </Form><br /><br /><br />



    </div>

  );
};


export default ViewEditFaculty;