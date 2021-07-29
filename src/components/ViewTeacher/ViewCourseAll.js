import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' //fornt
import { faEdit, faTrash, faSearch } from "@fortawesome/free-solid-svg-icons";
import {
  Container, Row, Col, Button, Form, FormGroup, Label, Input, FormText, Card, CardText, CardBody, CardLink,
  CardTitle, CardSubtitle, NavLink, Table
} from 'reactstrap';

const ViewCourseAll = (props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen(prevState => !prevState);

  const [course, setCourse] = useState([]);

  const selectCourse = () => {
    axios.get("http://localhost:8080/course")
      .then((response) => {
        console.log(response);
        setCourse(response.data);
        console.log("select Course.....");
      });
  };

  useEffect(() => {
    selectCourse();
  });

  return (
    <div>
      <div class="container">
        <br />
        <Row>
          <Col xs="6">
            <FormGroup>
              <Label for="id_course">ค้นหาชื่อสาขา</Label>
              <Input type="select" name="id_course" id="id_course">
                {course.map((course) => {
                  return (
                    <option key={course.id_course}>{course.name_course}</option>
                  );
                })}
              </Input>
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
          <Col><NavLink href="./insertcourse">เพิ่มสาขา</NavLink>
          </Col>
        <br/>
        </Row>
        <Table>
          <thead>
            <tr>
              <th>รหัสสาขา</th>
              <th>ชื่อสาขา</th>
              <th>เเก้ไข</th>
            </tr>
          </thead>
          <tbody>
            {course.map((course) => {
              return (
                <tr key={course.id_course}>
                  <td>{course.id_course}</td>
                  <td>{course.name_course}</td>
                  <td>
                    <Button href={"./editCourse/" + course.id_course}>
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

export default ViewCourseAll;