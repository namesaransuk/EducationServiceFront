import React, { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col, Button, Form, FormGroup, Label, Input,NavLink ,Alert } from 'reactstrap';
import Swal from 'sweetalert2';

    const ViewEditProfileAdmin = ({id}) => {
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
        axios.get("https://educationservice.herokuapp.com/position")
        .then((response)=>{
          setPosition(response.data.position);
        });
    }, [id]);//เมื่อidมีการเปลี่ยนเเปรง ก็จะรีหน้าทำการเปลี่ยนที่เราเปลี่ยน 

    useEffect(() => {
      axios.get("https://educationservice.herokuapp.com/title/getTitle")
      .then((response)=>{
        setTitle(response.data.title);
      });
  }, [id]);//เมื่อidมีการเปลี่ยนเเปรง ก็จะรีหน้าทำการเปลี่ยนที่เราเปลี่ย
  
      useEffect(() => {
        axios.get("https://educationservice.herokuapp.com/Teacher/getStaff/"+id)
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
  
  
      const saveTeacher = (e) => {
        e.preventDefault()
    
            var data = {
                id_title: teacher.id_title,
                fname_staff: teacher.fname_staff,
                lname_staff: teacher.lname_staff,
                phone_staff: teacher.phone_staff,
                id_position: teacher.id_position,
                password_staff: teacher.password_staff,
    
            }

        if (data['id_title'] == "" || data['fname_staff'] == "" || data['lname_staff'] == ""
        || data['phone_staff'] == ""|| data['id_position'] == ""|| data['password_staff'] == ""
      ) {
            Swal.fire(

                'ผิดพลาด',
                'กรุณากรอกข้อมูลให้ครบ',
                'error'
            )

        } else {
            axios.put("https://educationservice.herokuapp.com/Teacher/updateTeacher/"+teacher.id_staff, data)
            .then((res) => {
                    console.log(res.data.message);
                    if (res.data.message == "success") {
                        ////ต่อตรงนี้
                        Swal.fire(

                            'เเก้ไขข้อมูลส่วนตัวเรียบร้อย',
                            '',
                            'success'
                        )
                            .then(() => window.location.assign("/Admin/profileAdmin/"+ teacher.id_staff))

                    } else {

                        Swal.fire(
                            'เเก้ข้อมูลส่วนตัวผิดพลาด',
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
      <div class="flex flex-col max-w-7xl mx-auto mt-32 px-3">

<div class="container">

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
            placeholder="ระบุรหัสประจำตัว" disabled/>
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
          required>
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
                                    id="fname_staff"
                                    value={teacher.fname_staff || ""}
                                    onChange={handleInputChange}
                                    placeholder="ระบุชื่อ" required/>
          </FormGroup>
        </Col>
        <Col >
          <FormGroup>
            <Label for="lname_stu">นามสกุล</Label>
            <Input type="text"
                                    name="lname_staff"
                                    id="lname_staff"
                                    value={teacher.lname_staff || ""}
                                    onChange={handleInputChange}
                                    placeholder="ระบุนามสกุล" required/>
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
                                    placeholder="ระบุเบอร์โทรศัพท์" required/>
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
        disabled required>
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
      <div className="mx-auto text-center mb-3">
                <Button className="btn btn-success" onClick={saveTeacher}>Update</Button>
              </div>
              <div className="mx-auto text-center">
                <a
                  type="button"
                  href="/Admin/dashboardadmin"
                  className="hover:no-underline inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  กลับหน้าหลัก
                </a>
                <a
                  type="button"
                  href={"/Admin/profileadmin/" + teacher.id_staff}
                  className="hover:no-underline inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  กลับไปข้อมูลส่วนตัว
                </a>
              </div>

</Form>


</div>    

<br />


</div>
);
  }
  
  export default ViewEditProfileAdmin;