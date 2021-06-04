import axios from "axios";
import React, { useState, useEffect } from "react"
import {
  Container, Row, Col, Button, Form, FormGroup, Label, Input, FormText, Card, CardText, CardBody, CardLink,
  CardTitle, CardSubtitle, NavLink, Alert
} from 'reactstrap';

const ViewDetailEducationStudent = ({ id }) => {

  const session = {
    id_edu_stu: localStorage.getItem('id_edu_stu'),

  }
  const [student, setStudent] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/students/" + id)
      .then((response) => {
        setStudent(response.data);
      });
  }, [id]);//เมื่อidมีการเปลี่ยนเเปรง ก็จะรีหน้าทำการเปลี่ยนที่เราเปลี่ยน

  const [education, setEducation] = useState(session);
  useEffect(() => {
    axios.get("http://localhost:8080/EducationStudent/" + id)
      .then((response) => {
        setEducation(response.data);
      });
  }, [id]);

  if (education.id_edu_stu === null) {
    return (
      <div>
        <center><Button href={"/insertdetaileducationstudent/" + student.id_stu}>เพิ่มข้อมูลการศึกษาต่อ</Button></center>
      </div>
    );
  } else {
    return (
      <div class="container mt-32">
        <center><h3> ข้อมูลการศึกษาต่อ </h3></center>
        <Form>
          <Row>
            <Col>
              <Label for="examplePassword">มหาวิทยาลัย</Label> : {education.name_uni}
            </Col>

          </Row>
          <Row>
            <Col>
              <Label for="exampleEmail">คณะ</Label> : {education.name_faculty}
            </Col>
          </Row>
          <Row>
            <Col>
              <Label for="examplePassword">สาขา</Label> : {education.name_course}
            </Col>

          </Row>
          <Row>
            <Col>
              <Label for="exampleEmail">ปี</Label> : {education.year_stu}
            </Col>
          </Row>

          <Label for="id_curriculum">กลุ่มสาขา :</Label> {education.name_major}

          <Row>
            <Col></Col>
            <Col></Col>
            <Col></Col>
            <Col><NavLink href={"/updatedetaileducationstudent/" + student.id_stu}>เเก้ไขข้อมูลการศึกษาต่อ</NavLink>
            </Col>

          </Row>
        </Form>

      </div>

    );
  }
}


export default ViewDetailEducationStudent;