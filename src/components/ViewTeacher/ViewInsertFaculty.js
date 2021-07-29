import axios from 'axios';
import React, { useState } from 'react';
import {
  Container, Row, Col, Button, Form, FormGroup, Label, Input, FormText, Card, CardText, CardBody, CardLink,
  CardTitle, CardSubtitle, Jumbotron, Table, Alert} from 'reactstrap';
import Swal from 'sweetalert2';

const ViewInsertFaculty = () => {
  const initFaculty = {
    name_faculty: "",
  };

  const [faculty, setFaculty] = useState([initFaculty]);
  const [submited, setSumited] = useState(false);

  const handleInputChange = (event) => {
    let { name, value } = event.target;
    // if (name === "tags") {
    //     value = value.split(",");
    // }
    setFaculty({ ...faculty, [name]: value });
  };

  const saveFaculty = () => {
    var data = {
      name_faculty: faculty.name_faculty
    }
    axios.post("http://localhost:8080/faculty" , data)
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

    'เพิ่มข้อมูลคณะเรียบร้อย',
    ' ',
     'success',
 )
 (window.location.assign("/fucultyall"))
                ) : (
<Form>
            <center><h3> เพิ่มคณะ </h3></center>
            <Row>
            <br/>
            <Row>
              <Label for="faculty">ชื่อคณะ</Label>
              <Input
                type="text"
                name="name_faculty"
                id="name_faculty"
                value={faculty.name_faculty || ""}
                onChange={handleInputChange}
                placeholder="ระบุชื่อคณะ"
              />
            </Row>
            </Row>
            <Button className="btn btn-success" onClick={saveFaculty}>บันทึก</Button>
          </Form>

        )}

      </Form>

    </div>

  );
};


export default ViewInsertFaculty;