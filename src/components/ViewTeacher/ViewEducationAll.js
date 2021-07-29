import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' //fornt
import { faEdit, faPen } from "@fortawesome/free-solid-svg-icons";
import {
  Row, Col, Button, FormGroup, Label, Input,
  NavLink, Table
} from 'reactstrap';


const ViewEducationAll = () => {
  const [education, setEducation] = useState([])

  useEffect(() => {
    axios.get("http://localhost:8080/Education/getEducation")
      .then((response) => {
        setEducation(response.data);
      });

  }, []);

  {/*const searchEducation = () =>{
    const[error, setError]= useState(null);
    const[isLoaded,setIsloaded] = useState(false);
    const[edu,setEdu]=useState([])

    useEffect(()=>{
      fetch("http://localhost:8080/Education")
      .then(res =>res.json())
    })
  }*/}
  

  return (
    <div>
      <div className="container">
        <br />
        <Row>
          <Col xs="6">
            <FormGroup>
              <Label for="year_edu">ค้นหา</Label>
              <Input type="text" value="" >

              </Input>
            </FormGroup></Col>
        </Row>
      </div>
      <br />
      <div className="container">
        <Row>
          <Col></Col>
          <Col></Col>
          <Col><NavLink href="./inserteducation">เพิ่มรายละเอียดข้อมูลการเข้าศึกษาต่อ</NavLink>
          </Col>
        </Row>
        <Table>
          <thead>
            <tr>
              <th>ปี</th>
              <th>รอบ</th>
              <th>ชื่อมหาลัย</th>
              <th>วันที่เปิดรับสมัคร</th>
              <th>วันที่ปิดรับสมัคร</th>
              <th>เเก้ไขข้อมูล</th>
              <th>เพิ่มรายละเอียดข้อมูลการศึกษาต่อ</th>
            </tr>
          </thead>
          <tbody>
            {education.map((education) => {
              return (
                <tr key={education.id_education}>
                  <td>{education.year_edu}</td>
                  <td>{education.name_round}</td>
                  <td>{education.name_uni}</td>
                  <td>{education.open_date}</td>
                  <td>{education.close_date}</td>
                  <td>  <Button color="info" href={"/editeducation/" + education.id_education}>
                    <FontAwesomeIcon icon={faEdit} />แก้ไขข้อมูล
                        </Button>{" "}</td>
                  <td>  <Button outline color="info" href={"/edudetailall/" + education.id_education}>
                    <FontAwesomeIcon icon={faPen} />เพิ่มรายละเอียดข้อมูลการศึกษาต่อ
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