import React, { useState, useEffect } from 'react';
import axios from 'axios'
import {
  Container, Row, Col, Button, Form, FormGroup, Label, Input, Alert
} from 'reactstrap';
import Swal from 'sweetalert2';


const ViewInsertEducation = () => {
  const initEducation = {
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
  const [educate, setEducate] = useState([])


  const handleInputChange = (event) => {
    let { name, value } = event.target;
    // if (name === "tags") {
    //     value = value.split(",");
    // }
    setEducation({ ...education, [name]: value });
  };


  const saveEducation = (e) => {
    e.preventDefault()
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
    if (data['year_edu'] === "" || data['id_round'] === "" || data['id_university'] === ""
    || data['tcas'] === "" || data['open_date'] === "" || data['close_date'] === ""
    || data['list_day'] === "" || data['general'] === "" || data['doculment_edu'] === ""
    || data['note_edu'] === "" || data['url_doculment'] === "") {
        Swal.fire(

            'ผิดพลาด',
            'กรุณารอกรอกข้อมูลให้ครบ',
            'error'
        )

    } else {
      axios.post("http://localhost:8080/Education/createEducation", data)
      .then((res) => {
        console.log(res.data.satatus);
        if (res.data.satatus == "201") {
                    ////ต่อตรงนี้
                    Swal.fire(

                        'เพิ่มข้อมูลเรียบร้อย',
                        '',
                        'success'
                    )
                        .then(() => window.location.assign("/educationall"))

                } else {

                    Swal.fire(
                        'เพิ่มข้อมูลผิดพลาด',
                        'ชื่อนี้มีอยู่แล้วกรุณาเปลี่ยนชื่อ',
                        'error'
                    )

                }

            })
            .catch((error) => {
                console.log("error");
            });//ใช้ ดัก Error

    };
}

  const updateUniversity = () => {
    axios.get("http://localhost:8080/university").then((response) => {
      console.log(response);
      setUniversity(response.data.university);
      console.log("Updating .....");
    });
  };
  useEffect(() => {
    updateUniversity();
  }, []);

  const updateEducate = () => {
    axios.get("hhttp://localhost:8080/education/getEducation").then((response) => {
      console.log(response);
      setEducate(response.data.university);
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
            <center><h3> เพิ่มการรับสมัครการเข้าศึกษาต่อ </h3></center>
            <hr></hr>
            <br></br>
            <Row>
              <Col xs="2">
                <FormGroup>
                  <Label for="year_edu">ปีที่เปิดรับสมัคร</Label>
                  <Input type="select" name="year_edu" id="year_edu" value={education.year_edu || ""}
                    onChange={handleInputChange}required>
                    <option></option>
                    <option value="2021" >2021</option>
                    <option value="2022" >2022</option>
                    <option value="2023">2023</option>
                    <option value="2024">2024</option>
                    <option value="2025">2025</option>
                  </Input>
                </FormGroup></Col>

              <Col xs="3">
                <FormGroup>
                  <Label for="id_round">รอบ</Label>
                  <Input type="select" name="id_round" id="id_round" placeholder="เลือกรอบที่ต้องการ" value={education.id_round || ""}
                    onChange={handleInputChange}required>
                    <option></option>
                    {round.map((round) => {
                      return (
                        <option key={round.id_round} value={round.id_round}>{round.name_round}</option>
                      )
                    })}
                  </Input>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs="7">
                <FormGroup>
                  <Label for="id_university">มหาวิทยาลัย</Label>

                  <Input type="select" name="id_university" id="id_university" placeholder="เลือกมหาวิทยาลัยที่ต้องการ"
                    onChange={handleInputChange} value={education.id_university || ""}required>
                    <option></option>
                    {university.map((university) => {
                      return (
                        <option key={university.id_university} value={university.id_university}>
                          {university.name_uni}</option>
                      )
                    })}
                  </Input>
                </FormGroup>
              </Col>


              <Col xs="3">
                <FormGroup>
                  <Label for="tcas">Tcas</Label>
                  <Input type="select" name="tcas" id="tcas" onChange={handleInputChange} value={education.tcas || ""} required>
                    <option></option>
                    <option>เข้าร่วม</option>
                    <option>ไม่เข้าร่วม</option>
                  </Input>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs="3">
                <FormGroup>
                  <Label for="open_ date">วันเปิดรับสมัคร</Label>
                  <Input type="date" name="open_date" id="open_date" onChange={handleInputChange} value={education.open_date || ""} required>
                  </Input>
                </FormGroup>
              </Col>
              <Col xs="3">
                <FormGroup>
                  <Label for="close_ date">วันปิดรับสมัคร</Label>
                  <Input type="date" name="close_date" id="close_date" onChange={handleInputChange} value={education.close_date || ""}required>
                  </Input>
                </FormGroup></Col>
              <Col xs="3" >
                <FormGroup>
                  <Label for="list_day">ประกาศรายชื่อผู้มีสิทธ์สอบสัมภาษณ์</Label>
                  <Input type="date" name="list_day" id="list_day" onChange={handleInputChange} value={education.list_day || ""}required>
                  </Input>
                </FormGroup></Col>
              <Col xs="6"></Col>
            </Row>
            <FormGroup >
              <Label for="general">คุณสมบัติ</Label>
              <Input style={{ height: 150 }} type="textarea" name="general" id="general" onChange={handleInputChange} value={education.general || ""}required />
            </FormGroup>
            <FormGroup>
              <Label for="doculment_edu">เอกสารที่ใช้</Label>
              <Input style={{ height: 150 }} type="textarea" name="doculment_edu" id="doculment_edu" onChange={handleInputChange} value={education.doculment_edu || ""}required />

            </FormGroup>
            <FormGroup>
              <Label for="note_edu">เงื่อนไขอื่นๆ</Label>
              <Input type="textarea" name="note_edu" id="note_edu" onChange={handleInputChange} value={education.note_edu || ""}required />
            </FormGroup>

            <Col xs="7">
              <FormGroup>
                <Label for="url_doculment">URL</Label>
                <Input type="text" name="url_doculment" id="url_doculment" onChange={handleInputChange} placeholder="กรุณาใส่ URL" value={education.url_doculment || ""}required />
              </FormGroup>
            </Col>

            <Button className="btn btn-success" onClick={saveEducation}>ยืนยัน</Button>
          </Form>
    </Container >
  );
}

export default ViewInsertEducation;