import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  Container, Row, Col, Button, Form, FormGroup, Label, Input, FormText, Card, CardText, CardBody, CardLink,
  CardTitle, CardSubtitle, Jumbotron, Table, Alert
} from 'reactstrap';
import Swal from 'sweetalert2';

const ViewEditCourse = ({ id }) => {

  const initCourse = {
    name_course: "",
    id_major: "",
    id_degree: "",
  }

  const [course, setCourse] = useState([initCourse]);
  const [major, setMajor] = useState([]);
  const [degree, setDegree] = useState([]);
  const [submited, setSumited] = useState(false);

  const selectCouse = () => {
    axios.get("https://educationservice.herokuapp.com/Course/getCourse/" + id)
      .then((response) => {
        setCourse(response.data)
      });
  }

  const selectMajor = () => {
    axios.get("https://educationservice.herokuapp.com/groupmajor")
      .then((response) => {
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
    selectCouse();
    selectMajor();
    selectDegree();
  }, [id]);

  const handleInputChange = (event) => {
    let { name, value } = event.target;
    // if (name === "tags") {
    //     value = value.split(",");
    // }
    setCourse({ ...course, [name]: value });
  };

  const saveCourse = (e) => {
    e.preventDefault()

    var data = {
      name_course: course.name_course,
      id_major: course.id_major,
      id_degree: course.id_degree,
    }
    if (data['name_course'] === "" || data['id_major'] === "" || data['id_degree'] === "") {
      Swal.fire(

        'ผิดพลาด',
        'กรุณากรอกข้อมูลให้ครบ',
        'error'
      )

    } else {
      axios.put("https://educationservice.herokuapp.com/Course/" + id, data)
        .then((res) => {
          console.log(res.data.message);
          if (res.data.message == "success") {
            ////ต่อตรงนี้
            Swal.fire(

              'เเก้ไขข้อมูลสาขาเรียบร้อย',
              '',
              'success'
            )
              .then(() => window.location.assign("/Teacher/courseall"))

          } else {

            Swal.fire(
              'เเก้ไขข้อมูลสาขาผิดพลาด',
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
      <h3 className="text-center">เเก้ไขสาขา</h3>
      <Form>
        <Label for="name_course">ชื่อสาขา</Label>
        <Input
          type="text"
          name="name_course"
          id="name_course"
          value={course.name_course}
          onChange={handleInputChange}
          placeholder={course.name_course}
          required />
        <FormGroup>
          <Label for="id_degree">หลักสูตร</Label>
          <Input
            type="select"
            name="id_degree"
            id="id_degree"
            value={course.id_degree || ""}
            onChange={handleInputChange}
            required>
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
            value={course.id_major}
            onChange={handleInputChange}
            required>
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
        <div>
          <Button className="btn btn-success" onClick={saveCourse}>บันทึก</Button>
        </div>
      </Form>


    </div>

  );
};


export default ViewEditCourse;