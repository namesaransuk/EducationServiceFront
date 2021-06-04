import React, { useState } from 'react';
import axios from 'axios';
// import * as yup from 'yup';
// import { storage } from "../../firebase/index";
// import { useFormik } from "formik";
import { Container, Row, Button, Form, Label, Input, Jumbotron, Alert, Progress } from 'reactstrap';

const ViewInsertUniversity = () => {
  const initUniversity = {
    name_uni: "",
    url_uni: "",
    logo_uni: "",
    detail_uni: "",
  };


  const [university, setUniversity] = useState(initUniversity);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (event) => {
    let { name, value } = event.target;
   // if (name === "tags") {
     //   value = value.split(",");
    //}
    setUniversity({ ...university, [name]: value });
};

  const saveUniversity = () => {
    var data = {
      name_uni: university.name_uni,
      url_uni: university.url_uni,
      logo_uni: university.logo_uni,
      detail_uni: university.detail_uni
    }
    axios.post("http://localhost:8080/university" , data)
    .then((response) => {
      console.log(response.data);
      setSubmitted(true);
    })
    .catch((error) => {
      console.log(error);
    });
  };

  return (
    <Container>
      <Form >
        {submitted ? (<Alert color="success"><br /><br /><br /><br />
          <center>เพิ่มข้อมูลสำเร็จ!!<br /><br /><br /><br /><br />
            <Button color="btn btn-success" href="/universityAll">OK</Button></center>
        </Alert>
        ) : (
          <Form>
            <center><h3>เพิ่มมหาวิทยาลัย</h3></center>
            <Row>
              <Label for="logo_uni">โลโก้มหาลัย</Label>
              <Input
                type="file"
                name="logo_uni"
                id="logo_uni"
                value={university.logo_uni || ""}
                onChange={handleInputChange}
                placeholder="เลือกรูป"
              />
            </Row>
            <br/>
            <Row>
              <Label for="id_university">ชื่อมหาลัย</Label>
              <Input
                type="text"
                name="name_uni"
                id="name_uni"
                value={university.name_uni || ""}
                onChange={handleInputChange}
                placeholder="ระบุชื่อมหาลัย"
              />
            </Row>
            <Row>
              <Label for="detail_uni">รายละเอียด</Label>
              <Input
                type="textarea"
                name="detail_uni"
                id="detail_uni"
                value={university.detail_uni || ""}
                onChange={handleInputChange}
                placeholder="ระบุที่รายละเอียด"
              />
            </Row>
            <Row>
              <Label for="url_uni">URL</Label>
              <Input
                type="text"
                name="url_uni"
                id="url_uni"
                value={university.url_uni || ""}
                onChange={handleInputChange}
                placeholder="ระบุลิงค์"
              />
            </Row>
            <br></br>
            <Button className="btn btn-success" onClick={saveUniversity}>เพิ่ม</Button>
          </Form>
        )}
      </Form>
    </Container>

  );
};

export default ViewInsertUniversity;