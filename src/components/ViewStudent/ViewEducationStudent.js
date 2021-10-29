import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container, Row, Col, Button, Form, FormGroup, Label, Input, FormText, Card, CardText, CardBody, CardLink,
  CardTitle, CardSubtitle
} from 'reactstrap';
import "./vieweducationstudent.css"

const ViewEducationStudent = (props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen(prevState => !prevState);
  const [university, setUniversity] = useState([]);
  const [filteredData, setFilteredData] = useState(university);

  const handleSearch = (event) => {
    let value = event.target.value.toLowerCase();
    let result = [];
    console.log(value);
    result = university.filter((data) => {
      return data.name_uni.search(value) != -1;

    });
    setFilteredData(result);
  }

  useEffect(() => {
    axios.get("https://educationservice.herokuapp.com/University/getUniversityAll").then((response) => {
      console.log(response);
      setFilteredData(response.data);
      setUniversity(response.data);
    });
  }, []);
  return (
    <div class="mt-32">
      <div className="flex flex-col max-w-7xl mx-auto">
        <div className="text-center mx-auto">
          <h3>ค้นหามหาวิทยาลัย</h3>
          <br />
          <Row>
            <Col>
              <FormGroup>
                <Label for="id_university">ชื่อมหาวิทยาลัย</Label>
                <Input type="select"  name="name_uni" id="name_uni" placeholder="กรุณาใส่ชื่อมหาลัยที่จะค้นหา" onChange={(event) => handleSearch(event)}>
                  <option value="">เลือกมหาลัยที่ค้นหา</option>
                  {university.map((university) => {
                    return (
                      <option value={university.name_uni}>{university.name_uni}</option>
                    );
                  })}
                </Input>
              </FormGroup>
            </Col>
          </Row>
        </div>
    
      </div>
      <br />
      
      <div class="flex flex-col max-w-7xl mx-auto px-4">
        <div className="row row-cols-1 row-cols-md-2">
          {filteredData.map((value) => {
            return (
              <div class="col mb-4">
                <Card >
                  <CardBody >
                    <center><CardTitle tag="h5"><b>{value.name_uni}</b></CardTitle>   </center>
                  </CardBody>
                  <CardBody >
                    <div className="">
                      <img className="mx-auto py-auto" src={value.logo_uni || 'https://via.placeholder.com/150'} alt="ยังไม่ได้อัพเดตตราประจำหมหาลัย" style={{ width: '8rem',height:'9rem' }}/>
                    </div>
                  </CardBody>
                  <CardBody >
                    <CardTitle className="description">{value.detail_uni}</CardTitle>
                  </CardBody>
                  <CardBody >
                  <FormGroup className="mx-auto" >
                    <center><Button href={value.url_uni} target="_blank">ดูรายละเอียด</Button>   </center>
                  </FormGroup></CardBody>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
      </div>
 
  );
}

export default ViewEducationStudent;