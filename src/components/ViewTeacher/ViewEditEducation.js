import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Container, Row, Col, Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' //fornt
import { faEdit, faTrash, faSearch } from "@fortawesome/free-solid-svg-icons";
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
    image: "",
  };

  const [education, setEducation] = useState(initEducation);
  const [submited, setSumited] = useState(false)
  const [university, setUniversity] = useState([])
  const [round, setRound] = useState([])


  useEffect(() => {
    axios.get("https://educationservice.herokuapp.com/Education/" + id)
      .then((response) => {
        console.log(response);
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
      image: education.image,
    }
    if (data['year_edu'] === "" || data['id_round'] === "" || data['id_university'] === ""
      || data['tcas'] === "" || data['open_date'] === "" || data['close_date'] === ""
      || data['list_day'] === "" || data['general'] === "" || data['doculment_edu'] === ""
      || data['note_edu'] === "" || data['url_doculment'] === "") {
      Swal.fire(

        'ผิดพลาด',
        'กรุณากรอกข้อมูลให้ครบ',
        'error'
      )

    } else {
      axios.put("https://educationservice.herokuapp.com/Education/updateEducation/" + education.id_education, data)
        .then((res) => {
          console.log(res.data.message);
          if (res.data.message == "success") {
            ////ต่อตรงนี้
            Swal.fire(

              'เเก้ไขข้อมูลเรียบร้อย',
              '',
              'success'
            )
              .then(() => window.location.assign("/Teacher/educationall"))

          } else {

            Swal.fire(
              'เเก้ไขข้อมูลผิดพลาด',
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
    axios.get("https://educationservice.herokuapp.com/university").then((response) => {
      console.log(response);
      setUniversity(response.data.university);
      console.log("Updating .....");
    });
  };
  useEffect(() => {
    updateUniversity();
  }, []);
  const updateRound = () => {
    axios.get("https://educationservice.herokuapp.com/Round").then((response) => {
      console.log(response);
      setRound(response.data.round);
      console.log("Updating .....");
    });
  };
  useEffect(() => {
    updateRound();
  }, []);
  return (
    <div className="mt-32">
      <div className="px-4 flex flex-col max-w-7xl mx-auto">
        <h3 className="text-center">แก้ไขการสมัครการเข้ารับศึกษาต่อ</h3>
        <hr></hr>
        <br></br>
        <Form>
        <center> <img width="20%" alt="ยังไม่ได้อัพเดตตราประจำมหาลัย" src={education.image || 'https://via.placeholder.com/300'} />
                    <input type="hidden" name="file" value={education.image} />
                    <FormGroup>
                        <Input type="hidden"
                            name="image"
                            value={education.image}
                            onChange={handleInputChange} />
                    </FormGroup>
                    <FormGroup>
                        <Button href={"/Teacher/EditImageEducation/" + education.id_education} >
                            <FontAwesomeIcon icon={faEdit} />เเก้ไขรูปการรับสมัคร
                        </Button>
                    </FormGroup></center>
          <Row form>
            <Col md="2">
              <FormGroup>
                <Label for="year_edu">ปีที่เปิดรับสมัคร</Label>
                <Input type="select" name="year_edu" id="year_edu" value={education.year_edu || ""}
                  onChange={handleInputChange}>
                  <option></option>
                  <option value="2021" >2021</option>
                  <option value="2022" >2022</option>
                  <option value="2023">2023</option>
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                </Input>
              </FormGroup></Col>

            <Col md="2">
              <FormGroup>
                <Label for="id_round">รอบ</Label>
                <Input type="select" name="id_round" id="id_round" placeholder="เลือกรอบที่ต้องการ" value={education.id_round || ""}
                  onChange={handleInputChange}>
                  <option></option>
                  {round.map((round) => {
                    return (
                      <option key={round.id_round} value={round.id_round}>{round.name_round}</option>
                    )
                  })}
                </Input>
              </FormGroup>
            </Col>
            <Col md="5">
              <FormGroup>
                <Label for="id_university">มหาวิทยาลัย</Label>
                <Input type="select" name="id_university" id="id_university" placeholder="เลือกมหาวิทยาลัยที่ต้องการ"
                  onChange={handleInputChange} value={education.id_university || ""}>
                  {university.map((university) => {
                    return (
                      <option key={university.id_university} value={university.id_university}>
                        {university.name_uni}</option>
                    )
                  })}
                </Input>
              </FormGroup>
            </Col>
            <Col md="3">
              <FormGroup>
                <Label for="tcas">Tcas</Label>
                <Input type="select" name="tcas" id="tcas" onChange={handleInputChange} value={education.tcas || ""} >
                  <option>{education.tcas}</option>
                </Input>
              </FormGroup>
            </Col>
          </Row>
          {/* <Row form>
            <Col md="7">
              <FormGroup>
                <Label for="id_university">มหาวิทยาลัย</Label>
                <Input type="select" name="id_university" id="id_university" placeholder="เลือกมหาวิทยาลัยที่ต้องการ"
                  onChange={handleInputChange} value={education.id_university || ""}>
                  {university.map((university) => {
                    return (
                      <option key={university.id_university} value={university.id_university}>
                        {university.name_uni}</option>
                    )
                  })}
                </Input>
              </FormGroup>
            </Col>
            <Col md="3">
              <FormGroup>
                <Label for="tcas">Tcas</Label>
                <Input type="select" name="tcas" id="tcas" onChange={handleInputChange} value={education.tcas || ""} >
                  <option>{education.tcas}</option>
                </Input>
              </FormGroup>
            </Col>
          </Row> */}
          <Row form>
            <Col md="4">
              <FormGroup>
                <Label for="open_ date">วันเปิดรับสมัคร</Label>
                <Input type="date" name="open_date" id="open_date" onChange={handleInputChange}
                  value={education.open_date} >
                </Input>
              </FormGroup>
            </Col>
            <Col md="4">
              <FormGroup>
                <Label for="close_ date">วันปิดรับสมัคร</Label>
                <Input type="date" name="close_date" id="close_date" onChange={handleInputChange}
                  value={education.close_date}>
                </Input>
              </FormGroup></Col>
            <Col md="4" >
              <FormGroup>
                <Label for="list_day">ประกาศรายชื่อผู้มีสิทธ์สอบสัมภาษณ์</Label>
                <Input type="date" name="list_day" id="list_day" onChange={handleInputChange} value={education.list_day || ""}>
                </Input>
              </FormGroup>
            </Col>
          </Row>
          <FormGroup >
            <Label for="general">คุณสมบัติ</Label>
            <Input style={{ height: 150 }} type="textarea" name="general" id="general" onChange={handleInputChange} value={education.general || ""} />
          </FormGroup>
          <FormGroup>
            <Label for="doculment_edu">เอกสารที่ใช้</Label>
            <Input style={{ height: 150 }} type="textarea" name="doculment_edu" id="doculment_edu" onChange={handleInputChange} value={education.doculment_edu || ""} />

          </FormGroup>
          <FormGroup>
            <Label for="note_edu">เงื่อนไขอื่นๆ</Label>
            <Input type="textarea" name="note_edu" id="note_edu" onChange={handleInputChange} value={education.note_edu || ""} />
          </FormGroup>

          <FormGroup>
            <Label for="url_doculment">URL</Label>
            <Input type="text" name="url_doculment" id="url_doculment" onChange={handleInputChange} placeholder="กรุณาใส่ URL" value={education.url_doculment || ""} />
          </FormGroup>
          <div className="text-center">
            <Button className="btn btn-success w-25" onClick={saveEducation}>ยืนยัน</Button>
          </div>
        </Form>

      </div >
    </div >
  );
}
export default ViewEditEducation;