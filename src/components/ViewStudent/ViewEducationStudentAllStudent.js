import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container, Row, Col, Button, Form, FormGroup, Label, Input, FormText, Card, CardText, CardBody, CardLink,
  CardTitle, CardSubtitle, Badge
} from 'reactstrap';

const ViewEducationStudentAllStudent = (props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen(prevState => !prevState);
  const [educationdata, setEducationdata] = useState([]);
  //ไปดึง api ของอันเก่ามาใช้จาก url
  useEffect(() => {
    axios.get("http://localhost:8080/EducationData/getAllEducationData").then((response) => {
      console.log(response);
      setEducationdata(response.data);
    });
  }, []);

  return (
    <div>
      <div class="container mt-32">
        <center><h3>   ค้นหาข้อมูลการรับสมัครเข้าศึกษาต่อ </h3></center>
        <br />
        <Row>
          <Col xs="6">
            <FormGroup>
              <Label for="id_university">ชื่อมหาวิทยาลัย</Label>
              <Input type="select" name="id_university" id="id_university">
                <option value="">ใส่คำค้นหา</option>
                {educationdata.map((educationdata) => {
                  return (
                    <option value={educationdata.id_university}>{educationdata.name_uni}</option>
                  );
                })}
              </Input>
            </FormGroup>
          </Col>
          <Col xs="6">
            <FormGroup>
              <Label for="id_faculty">คณะ</Label>
              <Input type="select" name="id_faculty" id="id_faculty">
                <option value="">ใส่คำค้นหา</option>
                {educationdata.map((educationdata) => {
                  return (
                    <option value={educationdata.id_faculty}>{educationdata.name_faculty}</option>
                  );
                })}
              </Input>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col xs="6">
            <FormGroup>
              <Label for="id_course">สาขา</Label>
              <Input type="select" name="id_course" id="id_course">
                <option value="">ใส่คำค้นหา</option>
                {educationdata.map((educationdata) => {
                  return (
                    <option value={educationdata.id_course}>{educationdata.name_course}</option>
                  );
                })}
              </Input>
            </FormGroup>
          </Col>
          <Col xs="6">
            <FormGroup>
              <Label for="id_major">กลุ่มสาขา</Label>
              <Input type="select" name="id_major" id="id_major">
                <option value="">ใส่คำค้นหา</option>
                {educationdata.map((educationdata) => {
                  return (
                    <option value={educationdata.id_major}>{educationdata.name_major}</option>
                  );
                })}
              </Input>
            </FormGroup>
          </Col>
        </Row>
      </div>
      <br />
      <div class="container">
        {educationdata.map((educationdata) => {
          return (
            <Row >

              <Col>
                <Card>
                  <CardBody>
                    <Badge color="primary">{educationdata.name_major}</Badge>
                    <Row >
                      <Col md={6}>
                        <Label for="exampleEmail">มหาวิทยาลัย</Label>: {educationdata.name_uni}
                      </Col>
                    </Row>
                    <Row >
                      <Col md={6}>
                        <Label for="examplePassword">คณะ  </Label>: {educationdata.name_faculty}
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <Label for="exampleEmail">สาขา</Label>: {educationdata.name_course}
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <Label for="exampleEmail">รอบ</Label>: {educationdata.name_round}
                      </Col>
                    </Row>
                  </CardBody>

                  <Button href={"/educationstudentdetail/" + educationdata.id_education}>ดูรายละเอียด</Button>

                </Card><br /><br />
              </Col>
            </Row>
          );
        })}

        {/* <Row>
        <Col>          
        <Card>
        <CardBody>
          <CardTitle tag="h5">Test</CardTitle>
        </CardBody>
        <img width="100%" src="/assets/318x180.svg" alt="Card image cap" />
        <CardBody>
          <CardText>คราวๆ</CardText>
          <Button href="./universitydetail">รายละเอียด</Button>
        </CardBody>
      </Card>
</Col>
        </Row> */}

      </div>


    </div>

  );
}

export default ViewEducationStudentAllStudent;