import React, { useState, useEffect } from 'react';
import axios from 'axios'
import {
    Container, Row, Col, Button, Form, FormGroup, Label, Input, Alert
} from 'reactstrap';
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
  const [student, setStudent] = useState(initStudent);
  const [educationdata, setEducationdata] = useState([]);

   
  const handleInputChange = (event) => {
    let { name, value } = event.target;
   // if (name === "tags") {
     //   value = value.split(",");
    //}
    setStudent({ ...student, [name]: value });
};

  useEffect(() => {
      axios.get("https://educationservice.herokuapp.com/student/getStudent/"+id)
      .then((response)=>{
        setStudent(response.data);
      });
  }, [id]);//เมื่อidมีการเปลี่ยนเเปรง ก็จะรีหน้าทำการเปลี่ยนที่เราเปลี่ยน

  //ไปดึง api ของอันเก่ามาใช้จาก url
      const updateEducationdata = () =>{
          axios.get("https://educationservice.herokuapp.com/getAllEducationData").then((response) => {
              console.log(response);
              setEducationdata(response.data);
          });
      };
  
      useEffect(() => {
        updateEducationdata();
      }, []);


      const [university, setUniversity] = useState([]);
      //ไปดึง api ของอันเก่ามาใช้จาก url
      const updateUniversity = () => {
        axios.get("https://educationservice.herokuapp.com/EducationData/getAllEducationUniversity").then((response) => {
          console.log(response);
          setUniversity(response.data.university);
        });
      };
      useEffect(() => {
        updateUniversity();
      }, []);
    
      const [faculty, setFaculty] = useState([]);
      //ไปดึง api ของอันเก่ามาใช้จาก url
      const updateFaculty = () => {
        axios.get("https://educationservice.herokuapp.com/EducationData/getAllEducationFaculty").then((response) => {
          console.log(response);
          setFaculty(response.data.faculty);
        });
      };
      useEffect(() => {
        updateFaculty();
      }, []);
    
      const [course, setCourse] = useState([]);
      //ไปดึง api ของอันเก่ามาใช้จาก url
      const updateCourse = () => {
        axios.get("https://educationservice.herokuapp.com/EducationData/getAllEducationCourse").then((response) => {
          console.log(response);
          setCourse(response.data.course);
        });
      };
      useEffect(() => {
        updateCourse();
      }, []);
      const [groupmajor, setGroupMajor] = useState([]);
      //ไปดึง api ของอันเก่ามาใช้จาก url
      const updateGroupMajor = () => {
        axios.get("https://educationservice.herokuapp.com/EducationData/getAllEducationMajor").then((response) => {
          console.log(response);
          setGroupMajor(response.data.major);
        });
      };
      useEffect(() => {
        updateGroupMajor();
      }, []);

                      const saveStudent = (e) => {
                        e.preventDefault()
                
                        var data = {
                            id_edu_stu: student.id_edu_stu,
                            id_stu: student.id_stu,
                            id_university: student.id_university,
                            id_faculty: student.id_faculty,
                            id_course: student.id_course,
                            id_major: student.id_major,
                  
                          }
                
                        if (data['id_edu_stu'] == "" || data['id_stu'] == "" || data['id_university'] == ""
                        || data['id_faculty'] == ""|| data['id_course'] == ""|| data['id_major'] == "") {
                            Swal.fire(
                
                                'ผิดพลาด',
                                'กรุณารอกรอกข้อมูลให้ครบ',
                                'error'
                            )
                
                        } else {
                            axios.post("https://educationservice.herokuapp.com/EducationStudent/addEducationStudent", data)
                            .then((res) => {
                                    console.log(res.data.message);
                                    if (res.data.message == "success") {
                                        ////ต่อตรงนี้
                                        Swal.fire(
                
                                            'เพิ่มข้อมูลการศึกษาต่อเรียบร้อย',
                                            '',
                                            'success'
                                        )
                                            .then(() => window.location.assign("/Student/detaileducationstudent/"+ student.id_stu))
                
                                    } else {
                
                                        Swal.fire(
                                            'เพิ่มข้อมูลการศึกษาผิดพลาด',
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
        <Container>
   <br />  <br />  <br />
   <Form onSubmit={saveStudent}>

                        <Row>
                        <center><h3> เพิ่มข้อมูลการศึกษาต่อ </h3></center>
        <Col>
          <FormGroup>
            <Input type="hidden"
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
                                    <Label for="id_university">สาขาที่เปิดรับ</Label>
                                    <Input type="select" name="id_university" id="id_university"
                                        value={student.id_university || ""}
                                        onChange={handleInputChange} required>
             <option value="">กรุณาเลือก</option>
                                        {university.map((university) => {
                                            return (
                                                <option key={university.id_university} value={university.id_university}>
                                                    {university.name_uni}
                                                </option>
                                            )
                                        })}
                                    </Input>
                                </FormGroup>
                                </Col>
                                <Col> 
                                <FormGroup>
                                    <Label for="id_faculty">คณะ</Label>
                                    <Input type="select" name="id_faculty" id="id_faculty"
                                        value={student.id_faculty || ""}
                                        onChange={handleInputChange} required>
             <option value="">กรุณาเลือก</option>
                                        {faculty.map((faculty) => {
                                            return (
                                                <option key={faculty.id_faculty} value={faculty.id_faculty}>
                                                    {faculty.name_faculty}
                                                </option>
                                            )
                                        })}
                                    </Input>
                                </FormGroup>
                                </Col>
     
     </Row>
     <Row form>
        <Col >     
                                <FormGroup>
                                    <Label for="course">สาขา</Label>
                                    <Input type="select" name="id_course" id="id_course"
                                        value={student.id_course || ""}
                                        onChange={handleInputChange} required>
             <option value="">กรุณาเลือก</option>
                                        {course.map((course) => {
                                            return (
                                                <option key={course.id_course} value={course.id_course}>
                                                    {course.name_course}
                                                </option>
                                            )
                                        })}
                                    </Input>
                                </FormGroup>
                                </Col>
                                <Col> 
                                <FormGroup>
                                    <Label for="id_major">กลุ่มสาขา</Label>
                                    <Input type="select" name="id_major" id="id_major"
                                        value={student.id_major || ""}
                                        onChange={handleInputChange} required>
             <option value="">กรุณาเลือก</option>
                                        {groupmajor.map((groupmajor) => {
                                            return (
                                                <option key={groupmajor.id_major} value={groupmajor.id_major}>
                                                    {groupmajor.name_major}
                                                </option>
                                            )
                                        })}
                                    </Input>
                                </FormGroup>
                                </Col>
     
     </Row>
                        <Button className="btn btn-success" >ยืนยัน</Button>
                    </Form>
                    <br />
        </Container >
    );
}

export default ViewInsertdetailEducationStudent;

