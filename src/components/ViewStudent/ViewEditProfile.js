import React, { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col, Button, Form, FormGroup, Label, Input,NavLink ,Alert } from 'reactstrap';
import Swal from 'sweetalert2';

    const ViewEditProfile = ({id}) => {
      const initStudent = {
          id_stu : "",
          id_title: "",
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
     
      useEffect(() => {
          axios.get("http://localhost:8080/students/"+id)
          .then((response)=>{
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
  
  
      const saveStudent = () => {
          var data = {
              id_title: student.id_title,
              fname_stu: student.fname_stu,
              lname_stu: student.lname_stu,
              GPA_stu: student.GPA_stu,
              year_class: student.year_class,
              class: student.class,
              year_stu: student.year_stu,
              id_curriculum: student.id_curriculum,
              password_stu: student.password_stu,
  
          }
          axios.put("http://localhost:8080/students/"+student.id_stu, data)
              .then((response) => {
                  console.log(response.data);
                  setStudent({...student,data});//ก็อป เเละ เขียน ทับ ตัวใหม่สุด
                  setSumited(true);
              })
              .catch((error) => {
                  console.log(error);
              });
      };
      const newStudent = () => {
          setSumited(false);
      };
    return (
        <div>
          <br />
<div class="container">
<Form>


{submited ? (
   Swal.fire(

    'เเก้ไขข้อมูลส่วนตัวสำเร็จ',
    ' ',
     'success',
     (window.location.assign("/profile/"+ student.id_stu)
 )
 )
 (window.location.assign("/profile/"+ student.id_stu)
 )
                ) : (
<Form>

    <center><h3> เเก้ไขข้อมูลส่วนตัว </h3></center>
      <Row>
      <Col>
          <FormGroup>
            <Label for="id_stu">รหัสประจำตัว</Label>
            <Input type="text"
            name="id_stu"
            id="productName"
            value={student.id_stu || ""}
            onChange={handleInputChange}
            placeholder="" disabled/>
          </FormGroup>
        </Col>
        <Col>
        <FormGroup>
            <Label for="id_stu">คำนำหน้า</Label>
            <Input type="text"
            name="id_title"
            id="productName"
            value={student.name_title || ""}
            onChange={handleInputChange}
            placeholder="" disabled/>
          </FormGroup>
        </Col>
        <Col >
          <FormGroup>
            <Label for="fname_stu">ชื่อ</Label>
            <Input type="text"
                                    name="fname_stu"
                                    id="productcategory"
                                    value={student.fname_stu || ""}
                                    onChange={handleInputChange}
                                    placeholder="ระบุชื่อ" required/>
          </FormGroup>
        </Col>
        <Col >
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
        <Col >
          <FormGroup>
            <Label for="id_curriculum  ">สายการเรียน</Label>
            <Input type="select" name="id_curriculum" id="id_curriculum" onChange={handleInputChange} placeholder="ระบุชื่อ" >
            <option value="" selected>{student.name_curriculum} </option>
            <option value="1">ศิลป์ภาษา</option>
            <option value="2">คณิต-วิทย์</option>
            <option value="3">ศิลป์คำนวณ</option>
          </Input></FormGroup>
        </Col>
        <Col >
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
        <Col >
        <FormGroup>
            <Label for="year_stu">ปีการศึกษา</Label>
            <Input type="select" type="number" min="1900" max="2099" step="1" name="year_stu" value={student.year_stu || ""} id="year_stu" onChange={handleInputChange} placeholder="ระบุชื่อ" >
            <option value="" selected>{student.year_stu}</option>
    
          </Input></FormGroup>
        </Col>
      </Row>
      <Row form>
        <Col >
          <FormGroup>
            <Label for="year_class">มัธยมปีที่</Label>
            <Input type="select" name="year_class" id="year_class" onChange={handleInputChange} placeholder="ระบุชื่อ" >
            <option value="" selected>{student.year_class} </option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
          </Input></FormGroup>
        </Col>
        <Col >
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
        <Col >
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
        <Col >
        </Col > <Col >
        </Col > <Col >
        </Col >
      </Row>
      <Button className="btn btn-success" onClick={saveStudent}>Update</Button>

      <Row>
        <Col></Col>
        <Col></Col>
        <Col></Col>
        <Col><NavLink href="/home">กลับหน้าหลัก</NavLink></Col>
        <Col><NavLink href={"/profile/" + student.id_stu}>กลับไปข้อมูลส่วนตัว</NavLink>
</Col>

      </Row>


</Form>
)}

    </Form>

</div>    

<br />


</div>
);
  }
  
  export default ViewEditProfile;