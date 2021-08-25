import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container, Row, Col, Button, Form, FormGroup, Label, Input, FormText, Card, CardText, CardBody, CardLink,
  CardTitle, CardSubtitle
} from 'reactstrap';

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
    axios.get("http://localhost:8080/University/getUniversityAll").then((response) => {
      console.log(response);
      setFilteredData(response.data);
      setUniversity(response.data);
    });
  }, []);
  return (
    <div>
      <div class="container mt-32">

        <center><h3>   ค้นหามหาวิทยาลัย  </h3></center>
        <br />
        <Row>
          <Col xs="6">
            <FormGroup>
              <Label for="id_university">ชื่อมหาวิทยาลัย</Label>
              <Input type="select" name="name_uni" id="name_uni" placeholder="กรุณาใส่ชื่อมหาลัยที่จะค้นหา" onChange={(event) => handleSearch(event)}>
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
        {/* <Row>
<Col xs="12"> 
<FormGroup>
         <Input type="email" name="email" id="exampleEmail" placeholder="ค้นหามหาวิทยาลัย" />
      </FormGroup>
      <center><Button>ค้นหา</Button> </center>
</Col>
        </Row> */}
      </div>
      <br />
      <div class="container">
        <div className="row row-cols-1 row-cols-md-2">
          {filteredData.map((value) => {
            return (
              <div class="col mb-4">
                  <Card>
                    <CardBody>
                      <center><CardTitle tag="h5">{value.name_uni}</CardTitle>   </center>
                    </CardBody>
                    <CardBody>
                      <center> <img width="10%" src={value.logo_uni|| 'https://via.placeholder.com/150'} alt="ยังไม่ได้อัพเดตตราประจำหมหาลัย" /> </center>
                    </CardBody>
                    <CardBody>
                      <CardTitle >{value.detail_uni}</CardTitle>
                    </CardBody>
                    <Button href={value.url_uni}>ดูรายละเอียด</Button>
                  </Card><br /><br />
                </div>
            );
          })}
        </div>
      </div>




    </div>
  );
}

export default ViewEducationStudent;