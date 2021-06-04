import React, { useState } from 'react'; 
import { Container, Row, Col, Button, Form, FormGroup, Label, Input, FormText,  Card, CardText, CardBody, CardLink,
    CardTitle, CardSubtitle , Jumbotron ,Table ,Badge} from 'reactstrap';

const ViewCourse = (props) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(prevState => !prevState);
    return (
        <Form>
        <div>
        <div class="container">
        <center><h2>เเก้ไขสาขา</h2></center>

<Jumbotron>
      <h1 className="display-3"><Input type="text" name="email" id="id_course" placeholder="ยังไม่ได้เชื่อม" /></h1>
      <Label for="examplePassword">ชื่อสาขา</Label>
      <h1 className="display-3"><Input type="text" name="email" id="name_course" placeholder="ยังไม่ได้เชื่อม" /></h1>
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

      <Button>ตกลง</Button>
      &nbsp;&nbsp;&nbsp;
    <Button href="./courseall">กลับ</Button>
</div>    
<br />




</div></Form>
  );
};

  
  export default ViewCourse;