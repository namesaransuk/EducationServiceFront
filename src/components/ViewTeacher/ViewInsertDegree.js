import axios from 'axios';
import React, { useState } from 'react';
import {
  Container, Row, Col, Button, Form, FormGroup, Label, Input, FormText, Card, CardText, CardBody, CardLink,
  CardTitle, CardSubtitle, Jumbotron, Table, Alert} from 'reactstrap';
import Swal from 'sweetalert2';

const ViewInsertDegree = () => {
  const initDegree = {
    name_degree: "",
    initials_degree: "",
  };

  const [degree, setDegree] = useState([initDegree]);
  const [submited, setSumited] = useState(false);

  const handleInputChange = (event) => {
    let { name, value } = event.target;
    // if (name === "tags") {
    //     value = value.split(",");
    // }
    setDegree({ ...degree, [name]: value });
  };

  const saveDegree = () => {
    var data = {
        name_degree: degree.name_degree,
        initials_degree: degree.initials_degree,
    }
    axios.post("http://localhost:8080/degree" , data)
      .then((response) => {
        console.log(response.data);
        setSumited(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (

    <div class="container">
    <Form>

{submited ? (
   Swal.fire(

    'เพิ่มข้อมูลวุฒิเรียบร้อย',
    ' ',
     'success',
 )
 (window.location.assign("/degreeall"))
                ) : (
<Form>
            <center><h3> เพิ่มหลักสูตร </h3></center>
            <Row>
            <br/>
            <Row>
              <Label for="degree">ชื่อหลักสูตร</Label>
              <Input
                type="text"
                name="name_degree"
                id="name_degree"
                value={degree.name_degree || ""}
                onChange={handleInputChange}
                placeholder="ระบุชื่อหลักสูตร"
              />
            </Row>
            </Row>
            <br/>
            <Row>
              <Label for="degree">ชื่อย่อหลักสูตร</Label>
              <Input
                type="text"
                name="initials_degree"
                id="initials_degree"
                value={degree.initials_degree || ""}
                onChange={handleInputChange}
                placeholder="ตัวอย่าง นศ.บ"
              />
            </Row>
            <Button className="btn btn-success" onClick={saveDegree}>บันทึก</Button>
          </Form>

        )}

      </Form>

    </div>

  );
};


export default ViewInsertDegree;