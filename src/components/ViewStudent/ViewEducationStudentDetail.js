import React, { useState, useEffect } from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import {
  Container, Row, Col, Button, Form, FormGroup, Label, Input, FormText, Card, CardText, CardBody, CardLink,
  CardTitle, CardSubtitle, Badge
} from 'reactstrap';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ckeditor, { CKEditor } from '@ckeditor/ckeditor5-react'


const ViewEducationStudentDetail = ({ id }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen(prevState => !prevState);
  const [educationdataia, setEducationdataia] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/EducationData/getEducationdataid/" + id)
      .then((response) => {
        setEducationdataia(response.data);
      });
  }, [id]);//เมื่อidมีการเปลี่ยนเเปรง ก็จะรีหน้าทำการเปลี่ยนที่เราเปลี่ยน
  return (
    <div>
      <div class="container mt-32">

        <Row>
          <Col>
            <Label for="examplePassword">มหาวิทยาลัย</Label> : {educationdataia.name_uni}
          </Col>

        </Row>
        <Row>
          <Col>
            <Label for="exampleEmail">คณะ</Label> : {educationdataia.name_faculty}
          </Col>
        </Row>
        <Row>
          <Col>
            <Label for="exampleEmail">สาขา</Label> : {educationdataia.name_course}
          </Col>
        </Row>

        <Row>
          <Col>
            <Label for="exampleEmail">กลุ่มสาขา</Label> : {educationdataia.name_major}
          </Col>
        </Row>
        <Row>
          <Col>
            <Label for="exampleEmail">รอบ</Label> : {educationdataia.name_round}
          </Col>
        </Row>
        <Row>
          <Col>
            <Label for="exampleEmail">จำนวนรับสมัคร</Label> : {educationdataia.number_of_edu}
          </Col>
        </Row>
        <Row>
          <Col>
            <Label for="exampleEmail">วันเปิดรับสมัคร</Label> : {educationdataia.open_date}
          </Col>
        </Row>
        <Row>
          <Col>
            <Label for="exampleEmail">วันปิดรับสมัคร</Label> : {educationdataia.close_date}
          </Col>
        </Row>
        <Row>
          <Col>
            <Label for="exampleEmail">วันประกาศผล</Label> : {educationdataia.list_day}
          </Col>
        </Row>
      </div>
      <br />
      <div class="container">
        <p> </p>

        <FormGroup >
          <h4> <Label for="exampleText">คุณสมบัติ</Label></h4>
          <Input type="textarea" name="text" id="exampleText" value={educationdataia.general} style={{ width: '100%', height: '200px' }} />
        </FormGroup>
        <FormGroup>
          <h4> <Label for="exampleText">เอกสาร</Label></h4>
          <Input type="textarea" name="text" id="exampleText" value={educationdataia.doculment_edu} style={{ width: '100%', height: '250px' }} />
        </FormGroup>
      </div>
      <br />
      <div class="container">
        <p> </p>
        <h4><b>โหลดเอกสารเพิ่มเติม</b></h4><br />
        <a href={educationdataia.url_doculment}>{educationdataia.url_doculment}</a>
      </div>

      <br />


    </div>
  );
}

export default ViewEducationStudentDetail;