import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  Container, Row, Col, Button, Form, FormGroup, Label, Input, FormText, Card, CardText, CardBody, CardLink,
  CardTitle, CardSubtitle, Jumbotron, Table, Alert} from 'reactstrap';

const ViewEditDegree = (id) => {
  const initDegree = {
    name_degree: "",
    initials_degree: "",
  };

  const [degree, setDegree] = useState([initDegree]);
  const [submited, setSumited] = useState(false);
  
  useEffect(() =>{
      axios.get("http://localhost:8080/degree/" + id)
      .then((response) =>{
          setDegree(response.data);
      });
  },[id]);

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
    axios.post("http://localhost:8080/degree/" + id , data)
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
      {submited ? (<Alert color="success"><br /><br /><br /><br />
          <center>เพิ่มข้อมูลสำเร็จ!!<br /><br /><br /><br /><br />
            <Button color="btn btn-success" href="/degreeall">OK</Button></center>
        </Alert>
        ) : (
          <Form>
            <center><h3> แก้ไขหลักสูตร </h3></center>
            <Row>
            <br/>
            <Row>
              <Label for="degree">ชื่อหลักสูตร</Label>
              <Input
                type="text"
                name="name_degree"
                id="name_degree"
                value={degree.name_degree}
                onChange={handleInputChange}
                placeholder={degree.name_degree}
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
                value={degree.initials_degree}
                onChange={handleInputChange}
                placeholder={degree.initials_degree}
              />
            </Row>
            <Button className="btn btn-success" onClick={saveDegree}>บันทึก</Button>
          </Form>

        )}

      </Form>

    </div>

  );
};


export default ViewEditDegree;