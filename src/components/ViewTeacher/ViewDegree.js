import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' //fornt
import { faEdit, faTrash, faSearch } from "@fortawesome/free-solid-svg-icons";
import {
  Container, Row, Col, Button, Form, FormGroup, Label, Input, FormText, Card, CardText, CardBody, CardLink,
  CardTitle, CardSubtitle, NavLink, Table
} from 'reactstrap';

const ViewDegreeAll = (props) => {
  const [degree, setDegree] = useState([]);

  const selectDegree = () => {
    axios.get("http://localhost:8080/degree")
      .then((response) => {
        console.log(response);
        setDegree(response.data.degree);
        console.log("select Degree.....");
      });
  };

  useEffect(() => {
    selectDegree();
  });

  return (
    <div>
      <div class="container">
        <br />
        <Row>
          <Col xs="6">
            <FormGroup>
              <Label for="degree">ค้นหาชื่อหลักสูตร</Label>
              <Input type="select" name="degree" id="degree">
                {degree.map((degree) => {
                  return (
                    <option key={degree.id_degree}>{degree.name_degree}</option>
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
          <Col><NavLink href="./insertdegree">เพิ่มหลักสูตร</NavLink>
          </Col>

        </Row>
        <Table>
          <thead>
            <tr>
              <th>ชื่อหลักสูตร</th>
              <th>ชื่อย่อหลักสูตร</th>
              <th>เเก้ไข</th>
            </tr>
          </thead>
          <tbody>
            {degree.map((degree) => {
              return (
                <tr key={degree.id_degree}>
                  <td>{degree.name_degree}</td>
                  <td>{degree.initials_degree}</td>
                  <td>
                    <Button href={"./editDegree/" + degree.id_degree}>
                      <FontAwesomeIcon icon={faEdit} />เเก้ไข
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

export default ViewDegreeAll;