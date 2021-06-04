import React, { useState, useEffect } from 'react';
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' //fornt
import { faEdit, faTrash, faSearch } from "@fortawesome/free-solid-svg-icons";
import {
  Container, Row, Col, Button, Form, FormGroup, Label, Input, FormText, Card, CardText, CardBody, CardLink,
  CardTitle, CardSubtitle, NavLink, Table
} from 'reactstrap';

const ViewUniversity = () => {
 
  const [university, setUniversity] = useState([]);

  const selectUniversity = () => {
    axios.get("http://localhost:8080/university")
      .then((response) => {
        console.log(response);
        setUniversity(response.data.university);
        console.log("select University.....");
      });
  };

  useEffect(() => {
    selectUniversity();
  }, []);

  return (
    <div>
      <Container>
        <br />
        <Row>
          <Col xs="6">
            <FormGroup>
              <br />
              <Label for="id_university">ค้นหาชื่อมหาวิทยาลัย</Label>
              <Input type="select" name="id_university" id="id_university" >
                {university.map((university) => {
                  return (
                    <option key={university.id_university}>{university.name_uni}</option>
                  );
                })}
                <FontAwesomeIcon icon={faSearch} />
              </Input>
            </FormGroup>
          </Col>
        </Row>

      </Container>
      <br />
      <Container>
        <Row>
          <Col></Col>
          <Col></Col>
          <Col></Col>
          <Col><NavLink href="./insertuniversity">เพิ่มมหาวิทยาลัย</NavLink>
          </Col>
        </Row>
        <Row>
          <h3>รายชื่อมหาลัยมหาวิทยาลัย</h3>
          <Table>
            <thead>
              <tr>
                <th></th>
                <th>ชื่อมหาวิทยาลัย</th>
                <th>รายละเอียด</th>
                <th>ลิงค์</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {university.map((university) => {
                return (
                  <tr key={university.id_university}>
                    <td>{university.logo_uni}</td>
                    <td>{university.name_uni}</td>
                    <td>{university.detail_uni}</td>
                    <td>{university.url_uni}</td>
                    <td>
                      <Button href={"./editUniversity/" + university.id_university} >
                        <FontAwesomeIcon icon={faEdit} />เเก้ไข
                      </Button>
                    </td>
                  </tr>
                );
              })};
          </tbody>
          </Table>
        </Row>
      </Container>




    </div>
  );
}

export default ViewUniversity;