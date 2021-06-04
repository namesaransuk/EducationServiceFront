import React, { useState } from 'react'; 
import { Container, Row, Col, Button, Form, FormGroup, Label, Input, FormText,  Card, CardText, CardBody, CardLink,
    CardTitle, CardSubtitle , Jumbotron ,Table } from 'reactstrap';

const ViewInsertCourse = (props) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(prevState => !prevState);
    return (

        <div class="container">
        <Form>
        <center><h2>เพิ่มสาขา</h2></center>
        <Jumbotron>
      <Label for="examplePassword">ชื่อสาขา</Label>
      <h1 className="display-3"><Input type="text" name="email" id="name_course" placeholder="กรุณาใส่ชื่อสาขา" /></h1>
      <FormGroup>
        <Label for="id_major">กลุ่มสาขา</Label>
        <Input type="select" name="id_major" id="id_major">
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </Input>
      </FormGroup>
</Jumbotron>
<div>

    <Button>Submit</Button>&nbsp;&nbsp;&nbsp;
    <Button href="./courseall">กลับ</Button>

</div>        </Form>

</div>      

  );
};

  
  export default ViewInsertCourse;