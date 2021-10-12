import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  Container, Row, Col, Button, Form, FormGroup, Label, Input, FormText, Card, CardText, CardBody, CardLink,
  CardTitle, CardSubtitle, Jumbotron, Table, Alert
} from 'reactstrap';
import Swal from 'sweetalert2';

const ViewInsertStaff = (props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen(prevState => !prevState);

  const initStaff = {
    id_staff: "",
    id_title: "",
    fname_staff: "",
    lname_staff: "",
    phone_staff: "",
    id_position: "",
    password_staff: "",
  };

  const [staff, setStaff] = useState(initStaff);
  const [title, setTitle] = useState([]);
  const [position, setPosition] = useState([]);
  const [submited, setSumited] = useState(false);

  const selectTiltle = () => {
    axios.get("https://educationservice.herokuapp.com/Title/getTitle")
      .then((response) => {
        console.log(response);
        setTitle(response.data.title);
        console.log("select setTitle.......");
      });
  }

  const selectPosition = () => {
    axios.get("https://educationservice.herokuapp.com/position")
      .then((response) => {
        console.log(response);
        setPosition(response.data.position);
        console.log("select setTitle.......");
      });
  }

  useEffect(() => {
    selectPosition();
    selectTiltle();
  }, []);

  const handleInputChange = (event) => {
    let { name, value } = event.target;
    setStaff({ ...staff, [name]: value });
  };
  const saveStaff = (e) => {
    e.preventDefault()
    var data = {
      id_staff: staff.id_staff,
      id_title: staff.id_title,
      fname_staff: staff.fname_staff,
      lname_staff: staff.lname_staff,
      phone_staff: staff.phone_staff,
      id_position: staff.id_position,
      password_staff: staff.password_staff,
    }
    if (data['id_staff'] == "" || data['id_title'] == "" || data['fname_staff'] == ""
      || data['fname_staff'] == "" || data['phone_staff'] == "" || data['id_position'] == ""
      || data['password_staff'] == "") {
      Swal.fire(

        'ผิดพลาด',
        'กรุณากรอกข้อมูลให้ครบ',
        'error'
      )

    } else {
      axios.post("https://educationservice.herokuapp.com/staff/AddTeacher", data)
        .then((res) => {
          console.log(res.data.message);
          if (res.data.message == "success") {
            ////ต่อตรงนี้
            Swal.fire(

              'เพิ่มข้อมูลผู้ดูเเลเรียบร้อย',
              '',
              'success'
            )
              .then(() => window.location.assign("/Admin/Adminall"))

          } else {

            Swal.fire(
              'เพิ่มข้อมูลผู้ดูเเลผิดพลาด',
              'ชื่อผู้ดูเเลนี้มีอยู่แล้วกรุณาเปลี่ยนชื่อ',
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

      <Form>
        <center><h2>เพิ่มผู้ดูเเล</h2></center>
        <FormGroup>

          <Label for="examplePassword">รหัสผู้ดูเเล</Label>
          <h1 className="display-3">
            <Input
              type="text"
              name="id_staff"
              id="id_staff"
              value={staff.id_staff || ""}
              onChange={handleInputChange}
              placeholder="ระบุรหัสผู้ดูเเล"
            />
          </h1>      </FormGroup>

        <FormGroup>
          <Label for="id_title">คำนำหน้า</Label>
          <Input
            type="select"
            name="id_title"
            id="id_title"
            value={staff.id_title || ""}
            onChange={handleInputChange}
          >   <option>ระบุคำนำหน้า</option>
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
        <FormGroup>

          <Label for="examplePassword">ชื่อ</Label>
          <h1 className="display-3">
            <Input
              type="text"
              name="fname_staff"
              id="fname_staff"
              value={staff.fname_staff || ""}
              onChange={handleInputChange}
              placeholder="ระบุชื่อ"
            />
          </h1>      </FormGroup>
        <FormGroup>

          <Label for="examplePassword">นามสกุล</Label>
          <h1 className="display-3">
            <Input
              type="text"
              name="lname_staff"
              id="lname_staff"
              value={staff.lname_staff || ""}
              onChange={handleInputChange}
              placeholder="ระบุนามสกุล"
            />
          </h1>      </FormGroup>

        <FormGroup>

          <Label for="examplePassword">เบอร์โทรศัพท์</Label>
          <h1 className="display-3">
            <Input
              type="text"
              name="phone_staff"
              id="phone_staff"
              value={staff.phone_staff || ""}
              onChange={handleInputChange}
              placeholder="ระบุเบอร์โทรศัพท์"
            />
          </h1>      </FormGroup>

        <FormGroup>
          <Label for="id_position">ตำเเหน่ง</Label>
          <Input
            type="select"
            name="id_position"
            id="id_position"
            value={staff.id_position || ""}
            onChange={handleInputChange}
          >   <option>ระบุตำเเหน่ง</option>
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
          </Input>
        </FormGroup>
        <FormGroup>

          <Label for="examplePassword">รหัสผ่าน</Label>
          <h1 className="display-3">
            <Input
              type="password"
              name="password_staff"
              id="password_staff"
              value={staff.password_staff || ""}
              onChange={handleInputChange}
              placeholder="ระบุรหัสผ่าน"
            />
          </h1>      </FormGroup>

        <div className="text-center">
          <Button className="btn btn-success w-25" onClick={saveStaff}>บันทึก</Button>
        </div>
      </Form>

    </div>

  );
};


export default ViewInsertStaff;