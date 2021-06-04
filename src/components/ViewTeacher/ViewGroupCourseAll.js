import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Row, Col, Button, FormGroup, Label, Input,
  NavLink, Table
} from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' //fornt
import { faEdit, faPen, faSearch, faTrash } from "@fortawesome/free-solid-svg-icons";

const ViewGroupCourse = (props) => {


  const [major, setMajor] = useState([]);

  const selectmajor = () => {
    axios.get("http://localhost:8080/groupmajor").then((response) => {
      console.log(response);
      setMajor(response.data.major);
      console.log("Updating products.....");
    });
  };
  useEffect(() => {
    selectmajor();
  }, []);

  return (
    <div>
      <div class="container">
        <br />
        <Row>
          <Col xs="6">
            <FormGroup>
              <Label for="year_edu">ค้นหา</Label>
              <Input type="text" name="year_edu" id="year_edu"  >
                <FontAwesomeIcon icon={faSearch} /></Input>
            </FormGroup></Col>
        </Row>
      </div>
      <br />
      <div class="container">
        <Row>
          <Col></Col>
          <Col></Col>
          <Col><NavLink href="./inserteducation">เพิ่มกลุ่มสาขา</NavLink>
          </Col>
        </Row>
        <Table>
          <thead>
            <tr>
              <th>รหัส</th>
              <th>ชื่อกลุ่มสาขา</th>
              <th>เเก้ไขข้อมูล</th>
            </tr>
          </thead>
          <tbody>
            {major.map((major) => {
              return (
                <tr key={major.id_major}>
                  <td>{major.id_major}</td>
                  <td>{major.name_major}</td>
                  <td>  <Button color="info" href={"/editeducation/" + major.id_major}>
                    <FontAwesomeIcon icon={faEdit} />แก้ไขข้อมูล
                        </Button>{" "}</td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </div>
    </div>

  );
}

export default ViewGroupCourse;