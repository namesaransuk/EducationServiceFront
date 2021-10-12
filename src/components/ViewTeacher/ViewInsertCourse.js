import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  Container, Row, Col, Button, Form, FormGroup, Label, Input, FormText, Card, CardText, CardBody, CardLink,
  CardTitle, CardSubtitle, Jumbotron, Table, Alert
} from 'reactstrap';
import Swal from 'sweetalert2';
const ViewInsertCourse = () => {
  const initCourse = {
      name_course: "",
      id_major: "",
      id_degree: "",
    }
  const [Course, setCourse] = useState(initCourse);
  const [major, setMajor] = useState([]);
  const [degree, setDegree] = useState([]);


  const selectMajor = () => {
      axios.get("https://educationservice.herokuapp.com/groupmajor")
      .then((response) =>{
        console.log(response);
        setMajor(response.data.major);
        console.log("select Major.......");
      });
    }

    const selectDegree = () => {
      axios.get("https://educationservice.herokuapp.com/degree")
      .then((response) => {
        console.log(response);
        setDegree(response.data.degree);
        console.log("select Degree.......");
      });
    }

    useEffect(() => {
      selectMajor();
      selectDegree();
    }, []);

    const handleInputChange = (event) => {
      let { name, value } = event.target;
      setCourse({ ...Course, [name]: value });
    };

  const saveCourse = (e) => {
      e.preventDefault()

      var data = {
          name_course: Course.name_course,
          id_major: Course.id_major,
          id_degree: Course.id_degree,
        }

      if (data['name_course'] == "" || data['id_major'] == "" || data['id_degree'] == "") {
          Swal.fire(

              'ผิดพลาด',
              'กรุณากรอกข้อมูลให้ครบ',
              'error'
          )

      } else {
          axios.post("https://educationservice.herokuapp.com/Course/createCourse",data)
          .then((res) => {
                  console.log(res.data.message);
                  if (res.data.message == "success") {
                      ////ต่อตรงนี้
                      Swal.fire(

                          'เพิ่มข้อมูลสาขาเรียบร้อย',
                          '',
                          'success'
                      )
                          .then(() => window.location.assign("/Teacher/courseall"))

                  } else {

                      Swal.fire(
                          'เพิ่มข้อมูลสาขาผิดพลาด',
                          'ชื่อสาขานี้มีอยู่แล้วกรุณาเปลี่ยนชื่อ',
                          'error'
                      )

                  }

              })
              .catch((error) => {
                  console.log("error");
              });//ใช้ ดัก Error

      };
  }
  return (
    <div className="px-4 flex flex-col max-w-3xl mx-auto mt-32">
      <h3 className="text-center">เพิ่มสาขา</h3>
      <Form onSubmit={saveCourse}>
        <Label for="name_course">ชื่อสาขา</Label>
        <h1 className="display-3">
          <Input
            type="text"
            name="name_course"
            id="name_course"
            value={Course.name_course || ""}
            onChange={handleInputChange}
            placeholder="ระบุชื่อสาขา"
             />
        </h1>
        <FormGroup>
          <Label for="id_degree">หลักสูตร</Label>
          <Input
            type="select"
            name="id_degree"
            id="id_degree"
            value={Course.id_degree || ""}
            onChange={handleInputChange}
             >
            <option value="">กรุณาเลือก</option>
            {degree.map((degree) => {
              return (
                <option
                  key={degree.id_degree}
                  value={degree.id_degree}
                >
                  {degree.name_degree}
                </option>
              );
            })}
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="id_major">กลุ่มสาขา</Label>
          <Input
            type="select"
            name="id_major"
            id="id_major"
            value={Course.id_major}
            onChange={handleInputChange}
            >
            <option value="">กรุณาเลือก</option>
            {major.map((major) => {
              return (
                <option
                  key={major.id_major}
                  value={major.id_major}
                >
                  {major.name_major}
                </option>
              );
            })}
          </Input>
        </FormGroup>
        <div className="text-center">

          <Button className="btn btn-success w-25" >บันทึก</Button>

        </div>
      </Form></div>
  )
}
export default ViewInsertCourse;