import React, { useState } from 'react'; 
import { Container, Row, Col, Button, Form, FormGroup, Label, Input, FormText,  Card, CardText, CardBody, CardLink,
    CardTitle, CardSubtitle,NavLink  } from 'reactstrap';

const ViewDetailStudentEducation = (props) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(prevState => !prevState);
    return (
        <div>
<div class="container">
<Form>
    <center><h3> ข้อมูลส่วนตัว </h3></center>
      <Row>
      <Col>
            <Label for="examplePassword">รหัสนักศึกษา</Label> : 55
        </Col>
      
      </Row>
      <Row>
      <Col>
            <Label for="examplePassword">คำนำหน้า</Label> : 55
        </Col>
        <Col>
            <Label for="exampleEmail">ชื่อ</Label> : 55
        </Col>
        <Col>
            <Label for="examplePassword">นามสกุล</Label> : 55
           
        </Col>
        </Row>
        <Row>
      <Col>
            <Label for="examplePassword">ระดับชั้น</Label> : 55
        </Col>
        <Col>
            <Label for="exampleEmail">ห้อง</Label> : 55
        </Col>
        </Row>


    </Form>
    
</div>    
<br />
<div class="container">
<Form>
    <center><h3> ข้อมูลการศึกษาต่อ </h3></center>
      <Row form>
        <Col md={6}>
        <FormGroup>
        <Label for="exampleSelect">มหาวิทยาลัย</Label>
        <Input type="select" name="select" id="exampleSelect">
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </Input>
      </FormGroup>
        </Col>
        <Col md={6}>
        <FormGroup>
        <Label for="exampleSelect">คณะ</Label>
        <Input type="select" name="select" id="exampleSelect">
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </Input>
      </FormGroup>
        </Col>
      </Row>
      <Row form>
        <Col md={6}>
        <FormGroup>
        <Label for="exampleSelect">สาขา</Label>
        <Input type="select" name="select" id="exampleSelect">
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </Input>
      </FormGroup>
        </Col>
        <Col md={6}>
        <FormGroup>
        <Label for="exampleSelect">หลักสูตร</Label>
        <Input type="select" name="select" id="exampleSelect">
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </Input>
      </FormGroup>
        </Col>
      </Row>
      <Button href="./educationstudentall">กลับ</Button>


      <Row>
        <Col></Col>
        <Col></Col>
        <Col></Col>


      </Row>
    </Form>
</div>    
<br />



</div>
);
  }
  
  export default ViewDetailStudentEducation;