import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' //fornt
import { faEdit, faTrash, faSearch } from "@fortawesome/free-solid-svg-icons";
import {
  Container, Row, Col, Button, Form, FormGroup, Label, Input, FormText, Card, CardText, CardBody, CardLink,
  CardTitle, CardSubtitle, NavLink, Table
} from 'reactstrap';

const ViewFacultyAll = () => {
  const [faculty, setFaculty] = useState([]);

  const selectFaclty = () => {
    axios.get("http://localhost:8080/faculty")
      .then((response) => {
        console.log(response);
        setFaculty(response.data.faculty);
        console.log("select Faclty.......");
      });
  };

  useEffect(() => {
    selectFaclty();
  }, []);

  return (
    <div>
      <div class="container">
        <br />
        <Row>
          <Col xs="6">
            <FormGroup>
              <Label for="id_faculty">ชื่อคณะ</Label>
              <Input type="select" name="id_faculty" id="id_faculty">
                {faculty.map((faculty) => {
                  return (
                    <option key={faculty.id_faculty}>{faculty.name_faculty}</option>
                  );
                })}
              </Input>
            </FormGroup>
          </Col>
        </Row>
        <br/>
      </div>
      <br />
      <div class="container">
        <Row>
          <Col></Col>
          <Col></Col>
          <Col></Col>
          <Col><NavLink href="./insertfaculty">เพิ่มคณะ</NavLink>
          </Col>

        </Row>
        <Table>
          <thead>
            <tr>
              <th>ชื่อคณะ</th>
              <th>เเก้ไข</th>
            </tr>
          </thead>
          <tbody>
            {faculty.map((faculty) => {
              return (
                <tr key={faculty.id_faculty}>
                <td>{faculty.name_faculty}</td>
                <td>
                  <Button href={"./editFaculty/" + faculty.id_faculty}>
                    <FontAwesomeIcon icon={faEdit} />เเก้ไข
                </Button>
                </td>
              </tr>
              );  
            })}

          </tbody>
        </Table>
      </div>




    </div>
  );
}

export default ViewFacultyAll;