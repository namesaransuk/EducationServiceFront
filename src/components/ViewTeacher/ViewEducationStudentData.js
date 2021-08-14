import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' //fornt
import { faEdit, faTrash, faSearch } from "@fortawesome/free-solid-svg-icons";
import {
  Container, Row, Col, Button, Form, FormGroup, Label, Input, FormText, Card, CardText, CardBody, CardLink,
  CardTitle, CardSubtitle, NavLink, Table
} from 'reactstrap';

const ViewEducationStudentData = ({ id }) => {
  const [classS, setClassS] = useState([]);
  const [filteredData, setFilteredData] = useState(classS);

    //ไปดึง api ของอันเก่ามาใช้จาก url
    useEffect(() => {
      axios.get("http://localhost:8080/Teacher/getStudentClass/" + id).then((response) => {
        console.log(response);
        setFilteredData(response.data);
        setClassS(response.data);
      });
    }, []);
    const handleSearch = (event) => {
      let value = event.target.value.toLowerCase();
      let result = [];
      console.log(value);
      result = classS.filter((data) => {  
      if(classS === ""){
        return data
          }else if(data.year_stu.search(value) != -1){
          return data
          }else if(data.fname_stu.search(value) != -1){
            return data
            }else if(data.id_stu.search(value) != -1){
              return data
              }


      });
      setFilteredData(result);
      }
    
    return (
      <div>
      <div class="container">
        <br />
        <Row>
          <Col xs="6"><br /><br />
            <FormGroup>
              <Label for="degree">ค้นหาข้อมูลนักเรียน</Label>
              <Input type="text" name="degree" id="degree"placeholder="กรุณาใส่ข้อมูลจะค้นหา" onChange={(event) =>handleSearch(event)}>
              </Input>
            </FormGroup>
          </Col>
          {/* <FormGroup>
              <Label for="degree">ค้นหาชื่อหลักสูตร</Label>
              <Input type="select" name="degree" id="degree"placeholder="กรุณาใส่ชื่อกลุ่มสาขาที่จะค้นหา" onChange={(event) =>handleSearch(event)}>
                {degree.map((degree) => {
                  return (
                    <option key={degree.id_degree}>{degree.name_degree}</option>
                  );
                })}
              </Input>
            </FormGroup> */}
        </Row>
        <br/>
      </div>
      <br />
<div class="container">
       
        <Table>
          <thead>
            <tr>
            <th>ปีการศีกษา</th>
              <th>รหัสนักเรียน</th>
              <th>ชื่อ-นามสกุล</th>
              <th>ห้องเรียน</th>
              <th>ดูข้อมูลนักเรียน</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((value) => {
              return (
                <tr>
                  <td>{value.year_stu}</td>
                  <td>{value.id_stu}</td>
                  <td>{value.fname_stu}  {value.lname_stu}</td>
                  <td>{value.year_class}/{value.class}</td>
                  <td>
                  <Button href={"./../EducationStudentProfile/" + value.id_stu}>
                      <FontAwesomeIcon icon={faEdit} />ดูข้อมูลนักเรียน
                   </Button>
                  </td>
                </tr>
                 )
                })}
          </tbody>
        </Table>
        <center> {filteredData.length === 0 && <span>ไม่พบข้อมูลที่ค้นหา</span>} </center>

      </div>




    </div>
  );
}
  


export default ViewEducationStudentData;