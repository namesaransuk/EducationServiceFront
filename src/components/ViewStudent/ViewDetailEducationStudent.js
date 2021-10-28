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
    axios.get("https://educationservice.herokuapp.com/student/getStudent/" + id)
      .then((response) => {
        setStudent(response.data);
      });
  }, [id]);//เมื่อidมีการเปลี่ยนเเปรง ก็จะรีหน้าทำการเปลี่ยนที่เราเปลี่ยน

  const [education, setEducation] = useState(session);
  useEffect(() => {
    axios.get("https://educationservice.herokuapp.com/EducationStudent/getEducation/" + id)
      .then((response) => {
        setEducation(response.data);
      });
  }, [id]);

  if (education.id_edu_stu === null) {
    return (
      <div>
        <div class="flex flex-col max-w-3xl mx-auto px-4 mt-32">
          <center><Button href={"/Student/insertdetaileducationstudent/" + student.id_stu}>เพิ่มข้อมูลการศึกษาต่อ</Button></center>
        </div>
        <br /><br /><br /><br /><br /><br /><br />  <br />  <br />  <br />  <br />  <br />
      </div>
    );
  } else {
    return (
      <div class="flex flex-col max-w-3xl mx-auto px-4 mt-32">
        <div className="mx-auto mb-3"><h3> ข้อมูลการศึกษาต่อ </h3></div>
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

          <div className="mx-auto text-center">
            <a
              type="button"
              href="/Student/home"
              className="hover:no-underline inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              กลับหน้าหลัก
            </a>
            <a
              type="button"
              href={"/Student/updatedetaileducationstudent/" + student.id_stu}
              className="hover:no-underline inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              เเก้ไขข้อมูลการศึกษาต่อ
            </a>
          </div>
        </Form>
        <br /><br />
      </div>

    );
  }
}


export default ViewDetailEducationStudent;