import React, { useState, useEffect } from 'react';
import axios from 'axios'
import {
  Container, Row, Col, Button, Form, FormGroup, Label, Input, Alert,Progress
} from 'reactstrap';
import Swal from 'sweetalert2';
import * as yup from 'yup';
import { Formik, useFormik, yupToFormErrors } from "formik";
import { storage } from "../../firebase/index";


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
    file: "",
  };
  const [progress, setProgress] = useState(0); //เซต progress
  const uploadFileToFirebase = (file) => {
      const useId = "u001"; //ตั้งชื่อไฟล์
      const timestamp = Math.floor(Date.now() / 1000);
      const newName = useId + "_" + timestamp;
      const uploadTask = storage.ref(`images/${newName}`).put(file); //เปลี่ยนชื่อไฟล์ใน ref
      uploadTask.on(
          "state_changed",
          (snapshot) => {
              const uploadProgress = Math.round(
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              );
              setProgress(uploadProgress);
          },
          (error) => {
              console.log(error);
          },
          () => {
              storage
                  .ref("images")
                  .child(newName)
                  .getDownloadURL()
                  .then((imagesURL) => {
                      console.log(imagesURL);
                      saveEducation(imagesURL);
                  })
          }
      );
  }
  const FILE_SIZE = 2000 * 1224;
  const SUPPORTED_TYPE = [
      "image/jpg",
      "image/jpeg",
      "image/png",
      "image/gif",
      "applivation/pdf",

  ]
  const formik = useFormik({
      initialValues: (initEducation), //
      validationSchema: yup.object().shape({ //เงื่อนไข
          file: yup
              .mixed()
              .test("fileSize", "ไฟล์ใหญ่เกินไป", (file) => {
                  if (file) {
                      return file.size <= FILE_SIZE;
                  } else {
                      return true;
                  }
              })
              .test("fileType", "รองรับเฉพสะรูปภาพ", (file) => {
                  if (file) {
                      return SUPPORTED_TYPE.includes(file.type);
                  } else {
                      return true;
                  }
              }),
      }),
      onSubmit: (values) => {
          console.log(values);
          if (values.file) {
              uploadFileToFirebase(values.file);
          } else {
            saveEducation("");
          }
      },
  })

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


  const saveEducation = (imagesURL) => {
    var data = {
      year_edu: formik.values.year_edu,
      id_round: formik.values.id_round,
      id_university: formik.values.id_university,
      tcas: formik.values.tcas,
      open_date: formik.values.open_date,
      close_date: formik.values.close_date,
      list_day: formik.values.list_day,
      general: formik.values.general,
      doculment_edu: formik.values.doculment_edu,
      note_edu: formik.values.note_edu,
      url_doculment: formik.values.url_doculment,
      image: imagesURL,
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
      axios.post("https://educationservice.herokuapp.com/Education/createEducation", data)
        .then((res) => {
          console.log(res.data.message);
          if (res.data.message == "success") {
            ////ต่อตรงนี้
            Swal.fire(

              'เพิ่มข้อมูลเรียบร้อย',
              '',
              'success'
            )
              .then(() => window.location.assign("/Teacher/educationall"))

          } else {

            Swal.fire(
              'เพิ่มข้อมูลผิดพลาด',
              'ชื่อข้อมูลนี้มีอยู่แล้วกรุณาเปลี่ยนชื่อ',
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

  const updateEducate = () => {
    axios.get("https://educationservice.herokuapp.com/education/getEducation").then((response) => {
      console.log(response);
      setEducate(response.data.university);
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
      <div className="px-4 flex flex-col max-w-7xl mx-auto mt-32">
        <h3 className="text-center">เพิ่มการสมัครการเข้ารับศึกษาต่อ</h3>
        <hr></hr>
        <br></br>
        <Form>
        <Row form>
          <FormGroup>
                    <Label for="file"> รูปการรับสมัคร (รองรับเฉพาะรูปภาพที่มีขนาดไม่เกิน 2 Mb)</Label>
                    <Input type="file"
                        name="file"
                        onChange={(event) => { formik.setFieldValue("file", event.currentTarget.files[0]) }} />
                    {progress !== 0 && <Progress value={progress}>{progress}%</Progress>}

                    {formik.errors.file && formik.touched.file && (
                        <p>{formik.errors.file}</p>
                    )}
                </FormGroup>
                </Row>
          <Row form>
            <Col md="2">
              <FormGroup>
                <Label for="year_edu">ปีที่เปิดรับสมัคร</Label>
                <Input type="select" name="year_edu" id="year_edu" value={formik.values.year_edu || ""}
                  onChange={formik.handleChange} >
                  <option>กรุณาเลือกปีที่เปิดรับสมัคร</option>
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
                <Input type="select" name="id_round" id="id_round" placeholder="เลือกรอบที่ต้องการ" value={formik.values.id_round || ""}
                  onChange={formik.handleChange} >
                  <option>เลือกรอบที่ต้องการ</option>
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
                  onChange={formik.handleChange} value={formik.values.id_university || ""} >
                  <option>กรุณาเลือกมหาวิทยาลัย</option>
                  {university.map((university) => {
                    return (
                      <option key={university.id_university} value={university.id_university}>
                        {university.name_uni}</option>
                    )
                  })}
                </Input>
              </FormGroup>
            </Col>
            {/* <Row form>
            <Col sm="7">
              <FormGroup>
                <Label for="id_university">มหาวิทยาลัย</Label>

                <Input type="select" name="id_university" id="id_university" placeholder="เลือกมหาวิทยาลัยที่ต้องการ"
                  onChange={handleInputChange} value={education.id_university || ""} >
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


            <Col sm="3">
              <FormGroup>
                <Label for="tcas">Tcas</Label>
                <Input type="select" name="tcas" id="tcas" onChange={handleInputChange} value={education.tcas || ""} >
                  <option></option>
                  <option>เข้าร่วม</option>
                  <option>ไม่เข้าร่วม</option>
                </Input>
              </FormGroup>
            </Col>
          </Row> */}

            <Col md="3">
              <FormGroup>
                <Label for="tcas">Tcas</Label>
                <Input type="select" name="tcas" id="tcas" onChange={formik.handleChange} value={formik.values.tcas || ""} >
                  <option>กรุณาเลือก</option>
                  <option>เข้าร่วม</option>
                  <option>ไม่เข้าร่วม</option>
                </Input>
              </FormGroup>
            </Col>
          </Row>

          <Row form>
            <Col md="4">
              <FormGroup>
                <Label for="open_ date">วันเปิดรับสมัคร</Label>
                <Input type="date" name="open_date" id="open_date" onChange={formik.handleChange} value={formik.values.open_date || ""} >
                </Input>
              </FormGroup>
            </Col>
            <Col md="4">
              <FormGroup>
                <Label for="close_ date">วันปิดรับสมัคร</Label>
                <Input type="date" name="close_date" id="close_date" onChange={formik.handleChange} value={formik.values.close_date || ""} >
                </Input>
              </FormGroup></Col>
            <Col md="4" >
              <FormGroup>
                <Label for="list_day">ประกาศรายชื่อผู้มีสิทธ์สอบสัมภาษณ์</Label>
                <Input type="date" name="list_day" id="list_day" onChange={formik.handleChange} value={formik.values.list_day || ""} >
                </Input>
              </FormGroup>
            </Col>
          </Row>
          <FormGroup >
            <Label for="general">คุณสมบัติ</Label>
            <Input style={{ height: 150 }} type="textarea" placeholder="กรุณาเพิ่มคุณสมบัติ"
 name="general" id="general" onChange={formik.handleChange} value={formik.values.general || ""} />
          </FormGroup>
          <FormGroup>
            <Label for="doculment_edu">เอกสารที่ใช้</Label>
            <Input style={{ height: 150 }} type="textarea" placeholder="กรุณาเพิ่มเอกสาร" name="doculment_edu" id="doculment_edu" onChange={formik.handleChange} value={formik.values.doculment_edu || ""} />

          </FormGroup>
          <FormGroup>
            <Label for="note_edu">เงื่อนไขอื่นๆ</Label>
            <Input type="textarea" name="note_edu" id="note_edu" placeholder="เงื่อนไขอื่นๆ" onChange={formik.handleChange} value={formik.values.note_edu || ""} />
          </FormGroup>

          <FormGroup>
            <Label for="url_doculment">URL</Label>
            <Input type="text" name="url_doculment" id="url_doculment" placeholder="URL" onChange={formik.handleChange} placeholder="กรุณาใส่ URL" value={formik.values.url_doculment || ""} />
          </FormGroup>
          <div className="text-center">
            <Button className="w-25 btn btn-success" onClick={formik.handleSubmit}>ยืนยัน</Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default ViewInsertEducation;