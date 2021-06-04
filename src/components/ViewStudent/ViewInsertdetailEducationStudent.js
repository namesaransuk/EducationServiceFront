import axios from "axios";
import React, { useState, useEffect } from "react"
import {  Row, Col, Button, Form, FormGroup, Label, Input} from 'reactstrap';
  import Swal from 'sweetalert2';

    const ViewInsertdetailEducationStudent = ({id}) => {
        const initStudent = {
          id_edu_stu: "",
          id_stu: "",
          id_university: "",
          id_faculty: "",
          id_course: "",
          id_major: "",
      };
      const [student, setStudent] = useState([initStudent]);
      const [submited, setSumited] = useState(false)
      const [educationdata, setEducationdata] = useState([]);


      const handleInputChange = (event) => {
        let { name, value } = event.target;
       // if (name === "tags") {
         //   value = value.split(",");
        //}
        setStudent({ ...student, [name]: value });
    };

      useEffect(() => {
          axios.get("http://localhost:8080/students/"+id)
          .then((response)=>{
            setStudent(response.data);
          });
      }, [id]);//เมื่อidมีการเปลี่ยนเเปรง ก็จะรีหน้าทำการเปลี่ยนที่เราเปลี่ยน

      //ไปดึง api ของอันเก่ามาใช้จาก url
          const updateEducationdata = () =>{
              axios.get("http://localhost:8080/EducationData/getAllEducationData").then((response) => {
                  console.log(response);
                  setEducationdata(response.data);
              });
          };
      
          useEffect(() => {
            updateEducationdata();
          }, []);


          const [groupmajor, setGroupMajor] = useState([]);
          //ไปดึง api ของอันเก่ามาใช้จาก url
              const updateGroupMajor = () =>{
                  axios.get("http://localhost:8080/GroupMajor/getGroupMajor").then((response) => {
                      console.log(response);
                      setGroupMajor(response.data.groupmajor);
                      console.log("Updating products.....");
                  });
              };
              useEffect(() => {
                updateGroupMajor();
              }, []);

              const [university, setUniversity] = useState([]);
              //ไปดึง api ของอันเก่ามาใช้จาก url
                  const updateUniversity = () =>{
                      axios.get("http://localhost:8080/University/getUniversityAll").then((response) => {
                          console.log(response);
                          setUniversity(response.data);
                          console.log("Updating products.....");
                      });
                  };
                  useEffect(() => {
                    updateUniversity();
                  }, []);
          
                  const [faculty, setFaculty] = useState([]);
                  //ไปดึง api ของอันเก่ามาใช้จาก url
                      const updateFaculty = () =>{
                          axios.get("http://localhost:8080/Faculty/getFaculty").then((response) => {
                              console.log(response);
                              setFaculty(response.data.faculty);
                              console.log("Updating products.....");
                          });
                      };
                      useEffect(() => {
                        updateFaculty();
                      }, []);
      
                      const [course, setCourse] = useState([]);
                      //ไปดึง api ของอันเก่ามาใช้จาก url
                          const updateCourse = () =>{
                              axios.get("http://localhost:8080/Course/getCourse").then((response) => {
                                  console.log(response);
                                  setCourse(response.data.course);
                                  console.log("Updating products.....");
                              });
                          };
                          useEffect(() => {
                            updateCourse();
                          }, []);
      


      const saveStudent = () => {
        var data = {
          id_edu_stu: student.id_edu_stu,
          id_stu: student.id_stu,
          id_university: student.id_university,
          id_faculty: student.id_faculty,
          id_course: student.id_course,
          id_major: student.id_major,

        }
        axios.post("http://localhost:8080/EducationStudent/", data)
            .then((response) => {
                console.log(response.data);
                setSumited(true);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const newStudent = () => {
      // setEducationdata(initStudent);
        setSumited(false);
    };
    return (
<div class="container">
<Form>

{submited ? (
   Swal.fire(

    'เพิ่มข้อมูลการศึกษาต่อสำเร็จ',
    ' ',
     'success',
 )
 (window.location.assign("/detaileducationstudent/"+ student.id_stu))
                ) : (
<Form>

    <center><h3> เพิ่มข้อมูลการศึกษาต่อ </h3></center>
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
      </Row>
      <Row form>
        <Col >
        <FormGroup>
            <Label for="id_university">มหาวิทยาลัย</Label>
            <Input type="select" name="id_university" id="id_university" onChange={handleInputChange} placeholder="ระบุชื่อ" >
            <option value="">กรุณาใส่ข้อมูล</option>  
            {university.map((university) => {
 return(
            <option value={university.id_university}>{university.name_uni}</option>         
             );
        })}
          </Input></FormGroup>
        </Col>
        <Col >
        <FormGroup>
            <Label for="id_faculty">คณะ</Label>
            <Input type="select" name="id_faculty" id="id_faculty" onChange={handleInputChange} placeholder="ระบุชื่อ" >
            <option value="">กรุณาใส่ข้อมูล</option>  
            {faculty.map((faculty) => {
 return(
            <option value={faculty.id_faculty}>{faculty.name_faculty}</option>         
             );
        })}
          </Input></FormGroup>
        </Col>
     
      </Row>
      <Row form>
        <Col >
        <FormGroup>
            <Label for="id_course">สาขา</Label>
            <Input type="select" name="id_course" id="id_course" onChange={handleInputChange} placeholder="ระบุชื่อ" >
            <option value="">กรุณาใส่ข้อมูล</option>  
            {course.map((course) => {
 return(
            <option value={course.id_course}>{course.name_course}</option>         
             );
        })}
          </Input></FormGroup>
        </Col>
        <Col >
        <FormGroup>
            <Label for="id_major">กลุ่มสาขา</Label>
            <Input type="select" name="id_major" id="id_major" onChange={handleInputChange} placeholder="ระบุชื่อ" >
            <option value="">กรุณาใส่ข้อมูล</option>  
            {groupmajor.map((groupmajor) => {
 return(
            <option value={groupmajor.id_major}>{groupmajor.name_major}</option>         
             );
        })}
          </Input></FormGroup>
        </Col>
      </Row>
      <Row>
      <Col> </Col><Col> </Col><Col> </Col><Col> </Col><Col> </Col><Col> </Col><Col> </Col><Col> </Col><Col> </Col><Col> </Col>
      <Col>
      <Button className="btn btn-success" onClick={saveStudent}>ตกลง</Button>
      </Col>
      </Row>
  
    


</Form>
)}

    </Form>

</div>    
    );
};
  
  export default ViewInsertdetailEducationStudent;