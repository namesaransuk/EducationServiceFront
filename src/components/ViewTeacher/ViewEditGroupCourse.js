import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container, Row, Col, Button, Form, FormGroup, Label, Input, FormText, Card, CardText, CardBody, CardLink,
  CardTitle, CardSubtitle, Jumbotron, Table, Alert
} from 'reactstrap';
import Swal from 'sweetalert2';

const ViewEditGroupCourse = ({ id }) => {
  const initGroupMajor = {
    name_major: "",
  };

  const [GroupCourse, setGroupCourse] = useState(initGroupMajor);
  const [submited, setSumited] = useState(false);

  
  useEffect(() => {
    axios.get("http://localhost:8080/groupmajor/" + id)
      .then((response) => {
        setGroupCourse(response.data)
      });
  }, [id]);

  const handleInputChange = (event) => {
    let { name, value } = event.target;
    //if (name === "tags") {
    //  value = value.split(",");
    // }
    setGroupCourse({ ...GroupCourse, [name]: value });
  };

  const saveGroupCourse = () => {
    var data = {
      name_major: GroupCourse.name_major,
    }
    axios.put("http://localhost:8080/groupmajor/" + id, data)
      .then((response) => {
        console.log(response.data);
        setGroupCourse({ ...GroupCourse, data });
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

    'เเก้ไขข้อมูลกลุ่มสาขาเรียบร้อย',
    ' ',
     'success',
 )
 (window.location.assign("/groupcourseall"))
                ) : (
<Form>
          <center><h2>เเก้ไขกลุ่มสาขา</h2></center>
  
          <Jumbotron>
            <Label for="name_faculty">ชื่อกลุ่มสาขา</Label>
            <Input 
            type="text" 
            name="name_major" 
            id="name_major" 
            value={GroupCourse.name_major}
            onChange={handleInputChange}
            placeholder={GroupCourse.name_major}
            />
          </Jumbotron>
          <div>
            <Button className="btn btn-success" onClick={saveGroupCourse}>บันทึก</Button>
          </div>
        </Form>
        )}
      </Form>
      

    </div>

  );
};


export default ViewEditGroupCourse;