import React, { useState } from 'react'; 
import { Container, Row, Col, Button, Form, FormGroup, Label, Input, FormText,  Card, CardText, CardBody, CardLink,
    CardTitle, CardSubtitle ,Badge} from 'reactstrap';

const ViewInsertStudent = (props) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(prevState => !prevState);
    return (
        <div>
     <div class="container">
         <center><h3>  AddStudent </h3></center>
<br />
<Form>
    
      
      <FormGroup>
        <Label for="ยังไม่รุ้">File</Label>
        <Input type="file" name="ยังไม่รุ้" id="ยังไม่รุ้" />
        <FormText color="muted">
          ใส่ไฟล์
        </FormText>
      </FormGroup>
      <Button>Submit</Button>
    </Form>
</div>    
<br />





</div>
);
  }
  
  export default ViewInsertStudent;