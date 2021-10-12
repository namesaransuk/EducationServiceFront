import React, { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col, Button, Form, FormGroup, Label, Input, NavLink, Alert } from 'reactstrap';
import Swal from 'sweetalert2';

const ViewEditProfile = ({ id }) => {
  const initStudent = {
    id_stu: "",
    title: "",
    fname_stu: "",
    lname_stu: "",
    id_curriculum: "",
    GPA_stu: "",
    class: "",
    year_class: "",
    password_stu: "",

  };
  const [student, setStudent] = useState(initStudent);
  const [submited, setSumited] = useState(false)
  const [title, setTitle] = useState([]);
  useEffect(() => {
    axios.get("https://educationservice.herokuapp.com/title/getTitle")
      .then((response) => {
        setTitle(response.data.title);
      });
  }, [id]);//เมื่อidมีการเปลี่ยนเเปรง ก็จะรีหน้าทำการเปลี่ยนที่เราเปลี่ย

  useEffect(() => {
    axios.get("https://educationservice.herokuapp.com/student/getStudent/" + id)
      .then((response) => {
        setStudent(response.data);
      });
  }, [id]);//เมื่อidมีการเปลี่ยนเเปรง ก็จะรีหน้าทำการเปลี่ยนที่เราเปลี่ยน


  const handleInputChange = (event) => {
    let { name, value } = event.target;
    //if (name === "tags") {
    //  value = value.split(",");
    // }
    setStudent({ ...student, [name]: value });
  };


  const saveStudent = (e) => {
    e.preventDefault()

    var data = {
      title: student.title,
      fname_stu: student.fname_stu,
      lname_stu: student.lname_stu,
      GPA_stu: student.GPA_stu,
      year_class: student.year_class,
      class: student.class,
      year_stu: student.year_stu,
      id_curriculum: student.id_curriculum,
      password_stu: student.password_stu,
    }
    if (data['title'] === "" || data['fname_stu'] === "" || data['lname_stu'] === ""
      || data['GPA_stu'] === "" || data['year_class'] === "" || data['class'] === ""
      || data['year_stu'] === "" || data['id_curriculum'] === "" || data['password_stu'] === "") {
      Swal.fire(

        'ผิดพลาด',
        'กรุณารอกรอกข้อมูลให้ครบ',
        'error'
      )

    } else {
      axios.put("https://educationservice.herokuapp.com/student/updateProfileStudent/" + student.id_stu, data)
        .then((res) => {
          console.log(res.data.message);
          if (res.data.message == "success") {

            Swal.fire(

              'เเก้ไขข้อมูลข้อมูลส่วนตัวเรียบร้อย',
              '',
              'success'
            )
              .then(() => window.location.assign("/Student/profile/" + student.id_stu))

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
  return (
    <div class="mt-32">
      <div className="flex flex-col max-w-3xl mx-auto px-4">
        <Form>


     
            <Form>
              <div className="text-center mx-auto pb-4">
                <h3> เเก้ไขข้อมูลส่วนตัว </h3>
              </div>
              <Row form>
                <Col sm={3}>
                  <FormGroup>
                    <Label for="id_stu">รหัสประจำตัว</Label>
                    <Input type="text"
                      name="id_stu"
                      id="productName"
                      value={student.id_stu || ""}
                      onChange={handleInputChange}
                      placeholder="" disabled />
                  </FormGroup>
                </Col>
                <Col sm={3}>
                  <FormGroup>
                    <Label for="id_stu">คำนำหน้า</Label>
                    <Input
                      type="select"
                      name="title"
                      id="title"
                      value={student.title || ""}
                      onChange={handleInputChange}
                    >
                      <option value={student.title} selected>{student.title} </option>
                      <option disabled>--------</option>
                      <option value="นาย">นาย</option>
                      <option value="นางสาว">นางสาว</option>
                      <option value="นาง">นาง</option>
                      <option value="อื่นๆ">อื่นๆ</option>

                    </Input>
                  </FormGroup>
                </Col>
                <Col sm={3}>
                  <FormGroup>
                    <Label for="fname_stu">ชื่อ</Label>
                    <Input type="text"
                      name="fname_stu"
                      id="productcategory"
                      value={student.fname_stu || ""}
                      onChange={handleInputChange}
                      placeholder="ระบุชื่อ" required />
                  </FormGroup>
                </Col>
                <Col sm={3}>
                  <FormGroup>
                    <Label for="lname_stu">นามสกุล</Label>
                    <Input type="text"
                      name="lname_stu"
                      id="productprice"
                      value={student.lname_stu || ""}
                      onChange={handleInputChange}
                      placeholder="ระบุราคา" />
                  </FormGroup>
                </Col>
              </Row>
              <Row form>
                <Col sm={4}>
                  <FormGroup>
                    <Label for="id_curriculum  ">สายการเรียน</Label>
                    <Input type="select" name="id_curriculum" id="id_curriculum" onChange={handleInputChange} placeholder="ระบุชื่อ" >
                      <option value="" selected>{student.name_curriculum} </option>
                      <option value="1">ศิลป์ภาษา</option>
                      <option value="2">คณิต-วิทย์</option>
                      <option value="3">ศิลป์คำนวณ</option>
                    </Input></FormGroup>
                </Col>
                <Col sm={4}>
                  <FormGroup>
                    <Label for="GPA_stu">GPA รวม</Label>
                    <Input type="text"
                      name="GPA_stu"
                      id="producttags"
                      value={student.GPA_stu || ""}
                      onChange={handleInputChange}
                      placeholder="ระบุแท็ก" />
                  </FormGroup>
                </Col>
                <Col sm={4}>
                  <FormGroup>
                    <Label for="year_stu">ปีการศึกษา</Label>
                    <Input type="select" type="number" min="2500" max="2600" step="1" name="year_stu" value={student.year_stu || ""} id="year_stu" onChange={handleInputChange} placeholder="ระบุชื่อ" >
                      <option value="" selected>{student.year_stu}</option>

                    </Input></FormGroup>
                </Col>
              </Row>
              <Row form>
                <Col sm={6}>
                  <FormGroup>
                    <Label for="year_class">มัธยมปีที่</Label>
                    <Input type="select" name="year_class" id="year_class" onChange={handleInputChange} placeholder="ระบุชื่อ" >
                      <option value="" selected>{student.year_class} </option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                    </Input></FormGroup>
                </Col>
                <Col sm={6}>
                  <FormGroup>
                    <Label for="class">ห้อง</Label>
                    <Input type="select" name="class" id="class" onChange={handleInputChange} placeholder="ระบุชื่อ" >
                      <option value="" selected>{student.class} </option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>

                    </Input></FormGroup>
                </Col>
                <Col >
                </Col >
              </Row>
              <Row form>
                <Col>
                  <FormGroup>
                    <Label for="password_stu">รหัสผ่าน</Label>
                    <Input type="password"
                      name="password_stu"
                      id="producttags"
                      value={student.password_stu || ""}
                      onChange={handleInputChange}
                      placeholder="ระบุแท็ก" />
                  </FormGroup>
                </Col>
              </Row>
              <div className="mx-auto text-center mb-3">
                <Button className="btn btn-success" onClick={saveStudent}>Update</Button>
              </div>
              <div className="mx-auto text-center">
                <a
                  type="button"
                  href="/Student/home"
                  className="hover:no-underline inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  กลับหน้าหลัก
                </a>
                <a
                  type="button"
                  href={"/Student/profile/" + student.id_stu}
                  className="hover:no-underline inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  กลับไปข้อมูลส่วนตัว
                </a>
              </div>


            </Form>
    

        </Form>

      </div>

      <br />


    </div>
  );
}

export default ViewEditProfile;