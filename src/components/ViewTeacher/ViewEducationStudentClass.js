import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' //fornt
import { faEdit, faTrash, faSearch } from "@fortawesome/free-solid-svg-icons";
import {
  Container, Row, Col, Button, Form, FormGroup, Label, Input, FormText, Card, CardText, CardBody, CardLink,
  CardTitle, CardSubtitle, NavLink, Table
} from 'reactstrap';

const ViewEducationStudentClass = ({ id }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(prevState => !prevState);
    const [classS, setClassS] = useState([]);

    //ไปดึง api ของอันเก่ามาใช้จาก url
    useEffect(() => {
      axios.get("https://educationservice.herokuapp.com/Teacher/getYearClass/"+ id).then((response) => {
        console.log(response);
        setClassS(response.data);
      });
    }, []);

    return (
        <div>
     <div class="container">
<br />
        <Row>
<Col xs="12"> 
  <FormGroup>
    <br />  <br />  <br />  <br />
       <center> <Label for="exampleSelect">เลือกห้องเรียน</Label></center>
      </FormGroup>
      
</Col>

        </Row>
</div>    
<br />
<div class="container">
        <Row>
          <Col></Col>
          <Col></Col>
          <Col></Col>
        
        <br/>
        </Row>
        <Table>
          <thead>
            <tr>
              <th>ห้องเรียน</th>
              <th>ดูรายชื่อนักเรียน</th>
            </tr>
          </thead>
          <tbody>
            {classS.map((classS) => {
              return (
                <tr>
                  <td>{classS.year_class}/{classS.class}</td>
                  <td>
                  <Button href={"./../EducationStudentData/" + classS.class}>
                      <FontAwesomeIcon icon={faEdit} />ดูรายชื่อนักเรียน
                   </Button>
                  </td>
                </tr>
                 )
                })}
          </tbody>
        </Table>
      </div>




    </div>
  );
}
  
  export default ViewEducationStudentClass;