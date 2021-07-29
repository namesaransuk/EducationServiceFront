import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Form, FormGroup, Label, Input, FormText,  Card, CardText, CardBody, CardLink,
    CardTitle, CardSubtitle , Jumbotron ,Table , Alert } from 'reactstrap';
    import Swal from 'sweetalert2';

const ViewInsertCourse = (props) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(prevState => !prevState);

    const initCourse = {
      name_course: "",
      id_major: "",
      id_degree: "",
    }

    const [Course, setCourse] = useState([initCourse]);
    const [major, setMajor] = useState([]);
    const [degree, setDegree] = useState([]);
    const [submited, setSumited] = useState(false);

    const selectMajor = () => {
      axios.get("http://localhost:8080/groupmajor")
      .then((response) =>{
        console.log(response);
        setMajor(response.data.major);
        console.log("select Major.......");
      });
    }

    const selectDegree = () => {
      axios.get("http://localhost:8080/degree")
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
    const saveCourse = () => {
        var data = {
          name_course: Course.name_course,
          id_major: Course.id_major,
          id_degree: Course.id_degree,
        }
        axios.post("http://localhost:8080/Course/createCourse",data)
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

    'เพิ่มข้อมูลสาขาเรียบร้อย',
    ' ',
     'success',
 )
 (window.location.assign("/courseall"))
                ) : (
<Form>
        <center><h2>เพิ่มสาขา</h2></center>
        <Jumbotron>
      <Label for="examplePassword">ชื่อสาขา</Label>
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
        <Label for="id_major">หลักสูตร</Label>
        <Input 
          type="select" 
          name="id_degree" 
          id="id_degree"
          value={Course.id_degree || ""}
          onChange={handleInputChange}
        >
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
          {major.map((major) =>{
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
</Jumbotron>
<div>

<Button className="btn btn-success" onClick={saveCourse}>บันทึก</Button>

</div>   
        </Form>
        )}

        </Form>

</div>      

  );
};

  
  export default ViewInsertCourse;