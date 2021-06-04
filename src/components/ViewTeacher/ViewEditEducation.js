import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Container, Row, Col, Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';

const ViewEditEducation = ({ id }) => {
  const initEducation = {
    id_education: "",
    year_edu: "",
    id_round: "",
    id_university: "",
    tcas: "",
    open_date: "",
    close_date: "",
    list_day: "",
    general: "",
    doculment_edu: "",
    note_edu: "",
    url_doculment: "",

  };

  const [education, setEducation] = useState(initEducation);
  const [submited, setSumited] = useState(false)
  const [university, setUniversity] = useState([])
  const [round, setRound] = useState([])


  useEffect(() => {
    axios.get("http://localhost:8080/Education/getEducationById/" + id)
      .then((response) => {
        setEducation(response.data);
      });
  }, [id]);


  const handleInputChange = (event) => {
    let { name, value } = event.target;
    //if (name === "tags") {
    //  value = value.split(",");
    // }
    setEducation({ ...education, [name]: value });
  };


  const saveEducation = () => {
    var data = {
      year_edu: education.year_edu,
      id_round: education.id_round,
      id_university: education.id_university,
      tcas: education.tcas,
      open_date: education.open_date,
      close_date: education.close_date,
      list_day: education.list_day,
      general: education.general,
      doculment_edu: education.doculment_edu,
      note_edu: education.note_edu,
      url_doculment: education.url_doculment,

    }
    axios.put("http://localhost:8080/Education/updateEducation/" + education.id_education, data)
      .then((response) => {
        console.log(response.data);
        setEducation({ ...education, data });
        setSumited(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const newEducation = () => {
    setSumited(false);
  };
  const updateUniversity = () => {
    axios.get("http://localhost:8080/University/index").then((response) => {
      console.log(response);
      setUniversity(response.data.university);
      console.log("Updating .....");
    });
  };
  useEffect(() => {
    updateUniversity();
  }, []);
  const updateRound = () => {
    axios.get("http://localhost:8080/Round").then((response) => {
      console.log(response);
      setRound(response.data.round);
      console.log("Updating .....");
    });
  };
  useEffect(() => {
    updateRound();
  }, []);

  return (
    <Container>
      <Form>

        {submited ? (<Alert color="success"><br /><br /><br /><br />
          <center>อัพเดตเสร็จสิ้น!!<br /><br /><br /><br /><br />
            <Button color="btn btn-success" href="/educationall">ยืนยัน</Button></center>
        </Alert>
        ) : (
          <Form >
            <center><h3> เพิ่มการรับสมัครการเข้าศึกษาต่อ </h3></center>

            <Row>

              <Col xs="6">
                <FormGroup>
                  <Label for="year_edu">ปีที่รับ</Label>
                  <Input type="select" name="year_edu" id="year_edu"
                    onChange={handleInputChange}>
                    <option value="" selected>{education.year_edu} </option>
                    <option value="2564">2564</option>
                    <option value="2565">2565</option>
                    <option value="2566">2566</option>
                    <option value="2567">2567</option>
                    <option value="2568">2568</option>
                  </Input>
                </FormGroup></Col>

              <Col xs="6">
                <FormGroup>
                  <Label for="id_round">รอบ</Label>
                  <Input type="text" name="id_round" id="id_round" value={education.id_round || ""}
                    onChange={handleInputChange}>
                      <option value={education.id_education} selected>{education.name_round} </option>
                    {round.map((round) => {
                      return (
                        <option key={round.id_round} value={round.id_round}>{round.name_round}</option>
                      )
                    })}
                  </Input>
                </FormGroup></Col>
            </Row>
            <Row>
              <Col xs="6">       
              <FormGroup>
                <Label for="id_university">มหาวิทยาลัย</Label>
                <Input type="select" name="id_university" id="id_university"
                  onChange={handleInputChange} value={education.id_university || ""}>
                  <option value={education.id_education} selected>{education.name_uni} </option>
                  {university.map((university) => {
                    return (
                      <option key={university.id_university} value={university.id_university}>{university.name_uni}</option>
                    )
                  })}
                </Input>
              </FormGroup></Col>
              <Col xs="6">       
              <FormGroup>
                <Label for="tcas">Tcas</Label>
                <Input type="text" name="tcas" id="tcas"
                  onChange={handleInputChange} value={education.tcas || ""} >
                </Input>
              </FormGroup></Col>
            </Row>
            <Row>
              <Col xs="6">
                <FormGroup>
                  <Label for="open_ date">วันเปิดรับสมัคร</Label>
                  <Input type="date" name="open_date" id="open_date"
                    onChange={handleInputChange} value={education.open_date || ""} >
                  </Input>

                </FormGroup></Col>
              <Col xs="6">
                <FormGroup>
                  <Label for="close_ date">วันปิดรับสมัคร</Label>
                  <Input type="date" name="close_date" id="close_date"
                    onChange={handleInputChange} value={education.close_date || ""}>
                  </Input>
                </FormGroup></Col>
            </Row>
            <Row>
              <Col xs="6">       
              <FormGroup>
                <Label for="list_day">วันรายงานตัว</Label>
                <Input type="date" name="list_day" id="list_day"
                  onChange={handleInputChange} value={education.list_day || ""}>
                </Input>
              </FormGroup></Col>
              <Col xs="6"></Col>
            </Row>
            <FormGroup>
              <Label for="general">คุณสมบัติ</Label>
              <Input type="textarea" name="general" id="general"
                onChange={handleInputChange} value={education.general || ""} />
            </FormGroup>
            <FormGroup>
              <Label for="doculment_edu">เงื่อนไขเอกสาร</Label>
              <Input type="textarea" name="doculment_edu" id="doculment_edu"
                onChange={handleInputChange} value={education.doculment_edu || ""} />

            </FormGroup>
            <FormGroup>
              <Label for="note_edu">เงื่อนไขอื่นๆ</Label>
              <Input type="textarea" name="note_edu" id="note_edu"
                onChange={handleInputChange} value={education.note_edu || ""} />
            </FormGroup>
            <Row>
              <Col xs="6">
                <FormGroup>
                  <Label for="url_doculment">URL</Label>
                  <Input type="text" name="url_doculment" id="url_doculment"
                    onChange={handleInputChange} placeholder="กรุณาใส่ URL" value={education.url_doculment || ""} />
                </FormGroup>
              </Col>
            </Row>

            <Button className="btn btn-success" onClick={saveEducation}>ยืนยัน</Button>
          </Form>
        )}
      </Form>
    </Container >
  );
}
export default ViewEditEducation;