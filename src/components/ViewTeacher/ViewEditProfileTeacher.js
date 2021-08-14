import React, { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col, Button, Form, FormGroup, Label, Input,NavLink ,Alert } from 'reactstrap';
import Swal from 'sweetalert2';

    const ViewEditProfile = ({id}) => {
      const initTeacher = {
          id_staff : "",
          id_title: "",
          fname_staff: "",
          lname_staff: "",
          phone_staff: "",
          id_position: "",
          phone_staff: "",
  
      };
      const [teacher, setTeacher] = useState(initTeacher);
      const [submited, setSumited] = useState(false)
      const [title, setTitle] = useState([]);
      const [position, setPosition] = useState([]);

      useEffect(() => {
        axios.get("http://localhost:8080/position")
        .then((response)=>{
          setPosition(response.data.position);
        });
    }, [id]);//เมื่อidมีการเปลี่ยนเเปรง ก็จะรีหน้าทำการเปลี่ยนที่เราเปลี่ยน 

    useEffect(() => {
      axios.get("http://localhost:8080/title/getTitle")
      .then((response)=>{
        setTitle(response.data.title);
      });
  }, [id]);//เมื่อidมีการเปลี่ยนเเปรง ก็จะรีหน้าทำการเปลี่ยนที่เราเปลี่ย
  
      useEffect(() => {
        axios.get("http://localhost:8080/Teacher/getStaff/"+id)
        .then((response)=>{
          setTeacher(response.data);
        });
    }, [id]);//เมื่อidมีการเปลี่ยนเเปรง ก็จะรีหน้าทำการเปลี่ยนที่เราเปลี่ยน

      const handleInputChange = (event) => {
          let { name, value } = event.target;
          //if (name === "tags") {
            //  value = value.split(",");
         // }
         setTeacher({ ...teacher, [name]: value });
      };
  
  
      const saveTeacher = () => {
          var data = {
              id_title: teacher.id_title,
              fname_staff: teacher.fname_staff,
              lname_staff: teacher.lname_staff,
              phone_staff: teacher.phone_staff,
              id_position: teacher.id_position,
              password_staff: teacher.password_staff,
  
          }
          axios.put("http://localhost:8080/Teacher/updateTeacher/"+teacher.id_staff, data)
              .then((response) => {
                  console.log(response.data);
                  setTeacher({...teacher,data});//ก็อป เเละ เขียน ทับ ตัวใหม่สุด
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
     (window.location.assign("/profileTeacher/"+ teacher.id_staff)
 )
 )
 (window.location.assign("/profileTeacher/"+ teacher.id_staff)
 )
                ) : (
<Form>

    <center><h3> เเก้ไขข้อมูลส่วนตัว </h3></center>
      <Row>
      <Col>
          <FormGroup>
            <Label for="id_stu">รหัสประจำตัว</Label>
            <Input type="text"
            name="id_staff"
            id="productName"
            value={teacher.id_staff || ""}
            onChange={handleInputChange}
            placeholder="ระบุรหัสประจำตัว" />
          </FormGroup>
        </Col>
        <Col>
        <FormGroup>
        <Label for="id_major">คำนำหน้า</Label>
        <Input 
          type="select" 
          name="id_title" 
          id="id_title"
          value={teacher.id_title || ""}
          onChange={handleInputChange}
        >
          {title.map((title) => {
            return (
              <option 
                key={title.id_title} 
                value={title.id_title}
              >
                {title.name_title}
              </option>
            );
          })}
        </Input>
      </FormGroup>
        </Col>
        <Col >
          <FormGroup>
            <Label for="fname_stu">ชื่อ</Label>
            <Input type="text"
                                    name="fname_staff"
                                    id="productcategory"
                                    value={teacher.fname_staff || ""}
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
                                    value={teacher.lname_staff || ""}
                                    onChange={handleInputChange}
                                    placeholder="ระบุนามสกุล" />
          </FormGroup>
        </Col>
      </Row>
      <Row form>
        <Col >
          <FormGroup>
            <Label for="GPA_stu">เบอร์โทรศัพท์</Label>
            <Input type="text"
                                    name="phone_staff"
                                    id="phone_staff"
                                    value={teacher.phone_staff || ""}
                                    onChange={handleInputChange}
                                    placeholder="ระบุเบอร์โทรศัพท์" />
          </FormGroup>
        </Col>
        <Col >
       
        </Col>
      </Row>
      <Row form>
        <Col >
        <FormGroup>
            <Label for="class">ตำเเหน่ง</Label>
            <Input 
          type="select" 
          name="id_position" 
          id="id_position"
          value={teacher.id_position || ""}
          onChange={handleInputChange}
        disabled>
          {position.map((position) => {
            return (
              <option 
                key={position.id_position} 
                value={position.id_position}
              >
                {position.name_position}
              </option>
            );
          })}
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
                                    name="password_staff"
                                    id="producttags"
                                    value={teacher.password_staff || ""}
                                    onChange={handleInputChange}
                                    placeholder="ระบุรหัสผ่าน" />
          </FormGroup>
        </Col>
        <Col >
        </Col > <Col >
        </Col > <Col >
        </Col >
      </Row>
      <Button className="btn btn-success" onClick={saveTeacher}>Update</Button>

      <Row>
        <Col></Col>
        <Col></Col>
        <Col></Col>
        <Col><NavLink href="/home">กลับหน้าหลัก</NavLink></Col>
        <Col><NavLink href={"/profileTeacher/" + teacher.id_staff}>กลับไปข้อมูลส่วนตัว</NavLink>
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