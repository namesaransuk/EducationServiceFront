import axios from 'axios';
import React, { useState } from 'react';
import {Container, Row, Col, Button, Form, FormGroup, Label, Input, FormText, Card, CardText, CardBody, CardLink,
  CardTitle, CardSubtitle, Jumbotron, Table, Alert} from 'reactstrap';
  import Swal from 'sweetalert2';

const ViewInsertGroupCourse = () => {
  const initGroupMajor = {
    name_major: "",
  };

  const [groupmajor, setGroupMajor] = useState(initGroupMajor);
  const [submited, setSumited] = useState(false)

  const handleInputChange = (event) => {
    let { name, value } = event.target;
    // if (name === "tags") {
    //     value = value.split(",");
    // }
    setGroupMajor({ ...groupmajor, [name]: value });
  };

  const saveGroupMajor = () => {
    var data = {
      name_major: groupmajor.name_major
    }
    axios.post("http://localhost:8080/groupmajor", data)
      .then((response) => {
        console.log(response.data);
        setSumited(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (

    <div class="container">
      <Form>

{submited ? (
   Swal.fire(

    'เพิ่มข้อมูลกลุ่มสาขาเรียบร้อย',
    ' ',
     'success',
 )
 (window.location.assign("/groupcourseall"))
                ) : (
<Form>

            <center><h3>เพิ่มกลุ่มสาขา</h3></center>
            <br/>
            <Label for="major">ชื่อกลุ่มสาขา</Label>
            <Input 
            type="text" 
            name="name_major" 
            id="name_major" 
            onChange={handleInputChange}
            placeholder="กรุณาใส่ชื่อกลุ่มสาขา" />

            <div>
              <Button className="btn btn-success" onClick={saveGroupMajor}>บันทึก</Button>
            </div>
          </Form>
        )}
      </Form>

    </div>

  );
};


export default ViewInsertGroupCourse;