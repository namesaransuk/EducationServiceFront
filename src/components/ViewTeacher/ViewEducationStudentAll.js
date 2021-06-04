import React, { useState } from 'react'; 
import { Container, Row, Col, Button, Form, FormGroup, Label, Input, FormText,  Card, CardText, CardBody, CardLink,
    CardTitle, CardSubtitle,NavLink ,Table} from 'reactstrap';

const ViewEducationStudentAll = (props) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(prevState => !prevState);
    return (
        <div>
     <div class="container">
<br />
        <Row>
<Col xs="6"> 
  <FormGroup>
        <Label for="exampleSelect">ชื่อกลุ่มสาขา</Label>
        <Input type="select" name="select" id="exampleSelect">
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </Input>
      </FormGroup>
      
</Col>
<Col xs="6"> 
  <FormGroup>
        <Label for="exampleSelect">ชื่อกลุ่มสาขา</Label>
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
</div>    
<br />
<div class="container">
<Table>
      <thead>
        <tr>
          <th>รหัส</th>
          <th>ชื่อ-นามสกุล</th>
          <th>มหาลัย</th>
          <th>รายละเอียด</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">1</th>
          <td>นายประยุทธ์ จันโอชา</td>
          <td>รัฐสภา</td>
          <td><Button href="./detailstudenteducation">รายละเอียด</Button></td>
        </tr>
        <tr>
          <th scope="row">2</th>
          <td>ยังไม่ได้เชื่อม</td>
          <td>ยังไม่ได้เชื่อม</td>
          <td><Button href="./detailstudenteducation">รายละเอียด</Button></td>
        </tr>
        <tr>
          <th scope="row">3</th>
          <td>ยังไม่ได้เชื่อม</td>
          <td>ยังไม่ได้เชื่อม</td>
          <td><Button href="./detailstudenteducation">รายละเอียด</Button></td>
        </tr>
        
      </tbody>
    </Table>
    <Row>
        <Col></Col>
        <Col></Col>
        <Col></Col>
        <Col><NavLink href="./inserteducationcondition">พิมพ์</NavLink>
</Col>

      </Row>
</div>    




</div>
);
  }
  
  export default ViewEducationStudentAll;