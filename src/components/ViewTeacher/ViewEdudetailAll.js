import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' //fornt
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import {
  Row, Col, Button, FormGroup, Label, Input,
  NavLink, Table
} from 'reactstrap';


const ViewEducationAll = ({ id }) => {
  const [edudetail, setEdudetail] = useState([])
  const [education, setEducation] = useState([])

  useEffect(() => {
    axios.get("http://localhost:8080/eduDetail/ByIdeducation/" + id)
      .then((response) => {
        setEdudetail(response.data);
      });

  }, [id]);

  useEffect(() => {
    axios.get("http://localhost:8080/Education/" + id)
      .then((response) => {
        setEducation(response.data);
      });

  }, [id]);



  return (
    <div>
      <div class="container">
        <br />
        <Row>
          <Col xs="12">
            <FormGroup>
              <h2>{education.name_uni}</h2>
              <h5>รอบ : {education.name_round}</h5>
            </FormGroup>
          </Col>
          <Col xs="6">
            <FormGroup>
              <Label for="year_edu">ค้นหา</Label>
              <Input type="text" name="year_edu" id="year_edu" value="" >
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
          <Col><NavLink href="/educationdetail">เพิ่มรายละเอียดข้อมูลการเข้าศึกษาต่อ</NavLink>
          </Col>
        </Row>
        <Table>
          <thead>
            <tr>
              <th>คณะ</th>
              <th>สาขา</th>
              <th>จำนวน</th>
              <th>สายการเรียน</th>
              <th>เกรดที่กำหนด</th>
              <th>เเก้ไข</th>

            </tr>
          </thead>
          <tbody>
            {edudetail.map((edudetail) => {
              return (
                <tr key={edudetail.id_edu_detail}>

                  <td>{edudetail.name_faculty}</td>
                  <td>{edudetail.name_course}</td>
                  <td>{edudetail.number_of_edu}</td>
                  <td>{edudetail.curriculum_edu}</td>
                  <td>{edudetail.GPA}</td>

                  <td>
                    <Button color="info" href={"/editedudetail/" + edudetail.id_edu_detail}>
                      <FontAwesomeIcon icon={faEdit} />  Edit
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

export default ViewEducationAll;