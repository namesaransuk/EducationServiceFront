import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container, Row, Col, Button, Form, FormGroup, Label, Input, FormText, Card, CardText, CardBody, CardLink,
  CardTitle, CardSubtitle, Jumbotron, Table, Alert
} from 'reactstrap';

const ViewEditFaculty = ({ id }) => {
  const initFaculty = {
    name_faculty: "",
  };

  const [faculty, setFaculty] = useState(initFaculty);
  const [submited, setSumited] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:8080/faculty/getFaculty/" + id)
      .then((response) => {
        setFaculty(response.data)
      });
  }, [id]);

  const handleInputChange = (event) => {
    let { name, value } = event.target;
    //if (name === "tags") {
    //  value = value.split(",");
    // }
    setFaculty({ ...faculty, [name]: value });
  };

  const saveFaculty = () => {
    var data = {
      name_faculty: faculty.name_faculty,
    }
    axios.put("http://localhost:8080/faculty/" + id, data)
      .then((response) => {
        console.log(response.data);
        setFaculty({ ...faculty, data });
        setSumited(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (

    <div class="container">
      <Form>
      {submited ? (<Alert color="success"><br /><br /><br /><br />
          <center>อัพเดตเสร็จสิ้น!!<br /><br /><br /><br /><br />
            <Button color="btn btn-success" href="/fucultyall">ยืนยัน</Button></center>
        </Alert>
        ) : ( 
          <Form>
          <center><h2>เเก้ไขคณะ</h2></center>
  
          <Jumbotron>
            <Label for="name_faculty">ชื่อคณะ</Label>
            <Input 
            type="text" 
            name="name_faculty" 
            id="name_faculty" 
            value={faculty.name_faculty}
            onChange={handleInputChange}
            placeholder={faculty.name_faculty}
            />
          </Jumbotron>
          <div>
            <Button className="btn btn-success" onClick={saveFaculty}>บันทึก</Button>
          </div>
        </Form>
        )}
      </Form>
      

    </div>

  );
};


export default ViewEditFaculty;