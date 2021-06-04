import React, { useState } from 'react'; 
import { Container, Row, Col, Button,  } from 'reactstrap';

const ViewDashboardTeacher = (props) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(prevState => !prevState);
    return (
        <div>
            <center><h2> DashBoard </h2></center>
     <div class="container">
     <Row>
        <Col><Button href="./universityall">มหาวิทยาลัย</Button></Col>
        <Col ><Button href="./fucultyall">คณะ</Button></Col>
        <Col ><Button href="./courseall">สาขา</Button></Col>
        <Col ><Button href="./groupcourseall">กลุ่มสาขา</Button></Col>
      </Row>
</div>    
<br />
<div class="container">
     <Row>
     <Col><Button href="./educationall">ข้อมูลการศึกษาต่อ</Button></Col>
        <Col><Button href="./educationconditionall">ข้อมูลเงื่อนไข</Button></Col>
        
      </Row>
</div>    
<br />
<div class="container">
     <Row>
        <Col><Button href="./educationstudentall">ข้อมูลการศึกษาต่อของนักเรียน</Button></Col>
     
      </Row>
</div>    



</div>
);
  }
  
  export default ViewDashboardTeacher;