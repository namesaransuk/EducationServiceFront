import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' //fornt
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import {
  Row, Col, Button, FormGroup, Label, Input,
  NavLink, Table
} from 'reactstrap';


const ViewEducationAll = ({ id }) => {
  const [edudetail, setEdudetail] = useState([])
  const [education, setEducation] = useState([])

  const [filteredData, setFilteredData] = useState(edudetail);

  const handleSearch = (event) => {
    let value = event.target.value.toLowerCase();
    let result = [];
    console.log(value);
    result = edudetail.filter((data) => {
      if(edudetail === ""){
        return data
          }else if(data.name_course.search(value) != -1){
          return data
          }else if(data.name_faculty.search(value) != -1){
            return data
            }else if(data.GPA.search(value) != -1){
              return data
              }else if(data.number_of_edu.search(value) != -1){
                return data
                }else if(data.name_curriculum.search(value) != -1){
                  return data
                  }
            
    });
    setFilteredData(result);
    }
    
   

    useEffect(() => {
      axios.get("http://localhost:8080/EduDetail/getEduDetailByIdeducation/" + id)
        .then((response) => {
          setEdudetail(response.data);
          setFilteredData(response.data);
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
        <br /><br /><br /><br />
        <Row>
          <Col xs="12">
            <FormGroup>
              <h2>{education.name_uni}</h2>
              <h5>รอบ : {education.name_round}</h5>
            </FormGroup>
          </Col>
          <Col xs="6">
          <FormGroup>
     
              <Label for="id_university">ค้นหาข้อมูล</Label>
              <Input type="text" name="name_course" id="name_course"placeholder="กรุณาใส่ข้อมูลที่จะค้นหา" onChange={(event) =>handleSearch(event)} >    
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
          <Col><NavLink href={"/InsertEdudetail/" + education.id_education}>เพิ่มรายละเอียดข้อมูลการเข้าศึกษาต่อ</NavLink>
          </Col>
        </Row>
        <Table>
          <thead>
            <tr>
              <th>คณะ</th>
              <th>สาขา</th>
              <th>จำนวน</th>
              <th>แผนการเรียน</th>
              <th>เกรดที่กำหนด</th>
              <th>เเก้ไข</th>

            </tr>
          </thead>
          <tbody>
            {filteredData.map((value) => {
              return (
                <tr key={value.id_edu_detail}>

                  <td>{value.name_faculty}</td>
                  <td>{value.name_course}</td>
                  <td>{value.number_of_edu}</td>
                  <td>{value.name_curriculum}</td>
                  <td>{value.GPA}</td>

                  <td>
                    <Button color="info" href={"/editedudetail/" + value.id_edu_detail}>
                      <FontAwesomeIcon icon={faEdit} />  Edit
                        </Button>{" "}</td>
                </tr>
              )
            })}
          </tbody>
        </Table><center> {filteredData.length === 0 && <span>ไม่พบข้อมูลที่ค้นหา</span>} </center>
      </div>




    </div>
  );
}

export default ViewEducationAll;