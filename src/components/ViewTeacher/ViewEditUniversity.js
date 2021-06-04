import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  Container, Row, Col, Button, Form, FormGroup, Label, Input, FormText, Card, CardText, CardBody, CardLink,
  CardTitle, CardSubtitle, From, Table, Alert
} from 'reactstrap';

const ViewEditUniversity = ({ id }) => {
  const initUniversity = {
    name_uni: "",
    url_uni: "",
    logo_uni: "",
    detail_uni: "",

  };

  const [university, setUniversity] = useState(initUniversity);
  const [submited, setSumited] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:8080/university/" + id)
      .then((response) => {
        setUniversity(response.data)
      });
  }, [id]);

  const handleInputChange = (event) => {
    let { name, value } = event.target;
    //if (name === "tags") {
    //  value = value.split(",");
    // }
    setUniversity({ ...university, [name]: value });
  };
  
  const saveUniversity = () => {
    var data = {
      name_uni: university.name_uni,
      url_uni: university.url_uni,
      logo_uni: university.logo_uni,
      detail_uni: university.detail_uni,
    }
    axios.put("http://localhost:8080/university/" + id , data)
      .then((response) => {
        console.log(response.data);
        setUniversity({ ...university, data });
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
            <Button color="btn btn-success" href="/universityAll">ยืนยัน</Button></center>
        </Alert>
        ) : (
          <Form>
            <center><h2>เเก้ไขมหาวิทยาลัย</h2></center>
            <Row>
              <Label for="logo_uni">โลโก้มหาลัย</Label>
              <Input
                type="file"
                name="logo_uni"
                id="logo_uni"
                value={university.logo_uni || ""}
                onChange={handleInputChange}
                placeholder={university.logo_uni}
              />
            </Row>
            <br/>
            <Row>
              <Label for="id_university">ชื่อมหาลัย</Label>
              <Input
                type="text"
                name="name_uni"
                id="name_uni"
                value={university.name_uni}
                onChange={handleInputChange}
                placeholder={university.name_uni}
              />
            </Row>
            <Row>
              <Label for="detail_uni">รายละเอียด</Label>
              <Input
                type="textarea"
                name="detail_uni"
                id="detail_uni"
                value={university.detail_uni}
                onChange={handleInputChange}
                placeholder={university.detail_uni}
              />
            </Row>
            <Row>
              <Label for="url_uni">URL</Label>
              <Input
                type="text"
                name="url_uni"
                id="url_uni"
                value={university.url_uni}
                onChange={handleInputChange}
                placeholder={university.url_uni}
              />
            </Row>
            <br></br>
            <Button className="btn btn-success" onClick={saveUniversity}>เพิ่ม</Button>
          </Form>

        )}
      </Form>

    </div>

  );
};


export default ViewEditUniversity;