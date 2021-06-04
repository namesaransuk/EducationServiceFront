import React, { useState } from 'react'; 
import { Container, Row, Col, Button, Form, FormGroup, Label, Input, FormText,  Card, CardText, CardBody, CardLink,
    CardTitle, CardSubtitle,Badge  } from 'reactstrap';

const ViewDashBoardAdmin = (props) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(prevState => !prevState);
    return (
        <div>
            <center><h2> DashBoard </h2></center>
     <div class="container">
     <Row>
        <Col><Button href="./insertstudent">AddStudent</Button></Col>
      </Row>
</div>    



</div>
);
  }
  
  export default ViewDashBoardAdmin;