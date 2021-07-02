import axios from "axios";
import React, { useState, useEffect } from "react"
import {
  Container, Row, Col, Button, Form, FormGroup, Label, Input, FormText, Card, CardText, CardBody, CardLink,
  CardTitle, CardSubtitle, NavLink, Alert
} from 'reactstrap';
import Swal from 'sweetalert2';

const ViewUpdateDetailEducationStudent = ({ id }) => {
  const initStudent = {
    id_edu_stu: "",
    id_stu: "",
    id_university: "",
    id_faculty: "",
    id_course: "",
  };


  const [student, setStudent] = useState([initStudent]);
  const [submited, setSumited] = useState(false)
  const [educationdata, setEducationdata] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/students/" + id)
      .then((response) => {
        setStudent(response.data);
      });
  }, [id]);//เมื่อidมีการเปลี่ยนเเปรง ก็จะรีหน้าทำการเปลี่ยนที่เราเปลี่ยน

  const [education, setEducation] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:8080/EducationStudent/" + id)
      .then((response) => {
        setEducation(response.data);
      });
  }, [id]);
  const [curriculum, setCurriculum] = useState([]);
  //ไปดึง api ของอันเก่ามาใช้จาก url
  const updateCurriculum = () => {
    axios.get("http://localhost:8080/Curriculum/getCurriculum").then((response) => {
      console.log(response);
      setCurriculum(response.data.curriculum);
    });
  };
  useEffect(() => {
    updateCurriculum();
  }, []);


  const [university, setUniversity] = useState([initStudent]);
  //ไปดึง api ของอันเก่ามาใช้จาก url
  const updateUniversity = () => {
    axios.get("http://localhost:8080/University/getUniversityAll").then((response) => {
      console.log(response);
      setUniversity(response.data);
    });
  };
  useEffect(() => {
    updateUniversity();
  }, []);

  const [faculty, setFaculty] = useState([]);
  //ไปดึง api ของอันเก่ามาใช้จาก url
  const updateFaculty = () => {
    axios.get("http://localhost:8080/Faculty/getFaculty").then((response) => {
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
    axios.get("http://localhost:8080/Course/getCourse").then((response) => {
      console.log(response);
      setCourse(response.data.course);
    });
  };
  useEffect(() => {
    updateCourse();
  }, []);

  //ไปดึง api ของอันเก่ามาใช้จาก url
  const updateEducationdata = () => {
    axios.get("http://localhost:8080/EducationData/getAllEducationData").then((response) => {
      console.log(response);
      setEducationdata(response.data);
    });
  };

  useEffect(() => {
    updateEducationdata();
  }, []);



  //เมื่อidมีการเปลี่ยนเเปรง ก็จะรีหน้าทำการเปลี่ยนที่เราเปลี่ยน

  // const [products, setProducts] = useState([]);
  // //ไปดึง api ของอันเก่ามาใช้จาก url
  //     const updateProducts = () =>{
  //         axios.get("http://localhost:8080/product").then((response) => {
  //             console.log(response);
  //             setProducts(response.data);
  //             console.log("Updating products.....");
  //         });
  //     };

  //     useEffect(() => {
  //         updateProducts();
  //     }, []);


  const handleInputChange = (event) => {
    let { name, value } = event.target;
    //if (name === "tags") {
    //  value = value.split(",");
    // }
    setEducation({ ...education, [name]: value });
  };
  const [groupmajor, setGroupMajor] = useState([]);
  //ไปดึง api ของอันเก่ามาใช้จาก url
  const updateGroupMajor = () => {
    axios.get("http://localhost:8080/GroupMajor/getGroupMajor").then((response) => {
      console.log(response);
      setGroupMajor(response.data.groupmajor);
    });
  };
  useEffect(() => {
    updateGroupMajor();
  }, []);

  const saveStudent = () => {
    var data = {
      id_edu_stu: education.id_edu_stu,
      id_stu: education.id_stu,
      id_university: education.id_university,
      id_faculty: education.id_faculty,
      id_course: education.id_course,
      id_major: education.id_major,

    }

    axios.put("http://localhost:8080/EducationStudent/" + education.id_edu_stu, data)
      .then((response) => {
        console.log(response.data);
        setStudent({ ...student, data });//ก็อป เเละ เขียน ทับ ตัวใหม่สุด
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

    <div>
      <div class="container mt-32">
        <Form>

          {submited ? (
            Swal.fire(

              'เเก้ไขข้อมูลการศึกษาต่อสำเร็จ',
              ' ',
              'success',
            )
              (window.location.assign("/detaileducationstudent/" + student.id_stu))
          ) : (
            <Form>

              <center><h3> เเก้ไขข้อมูลการศึกษาต่อ </h3></center>
              <Row form>
                <Col >
                  <FormGroup>
                    <Label for="id_university  ">มหาวิทยาลัย</Label>
                    <Input type="select" name="id_university" id="id_university" onChange={handleInputChange} placeholder="ระบุชื่อ" >
                      <option value={education.id_university}>{education.name_uni}</option>
                      {university.map((university) => {
                        return (
                          <option value={university.id_university}>{university.name_uni}</option>
                        );
                      })}
                    </Input></FormGroup>
                </Col>
                <Col >
                  <FormGroup>
                    <Label for="id_faculty">คณะ</Label>
                    <Input type="select" name="id_faculty" id="id_faculty" onChange={handleInputChange} placeholder="ระบุชื่อ" >
                      <option value={education.id_faculty}>{education.name_faculty}</option>
                      {faculty.map((faculty) => {
                        return (
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
                      <option value={education.id_course}>{education.name_course}</option>
                      {course.map((course) => {
                        return (
                          <option value={course.id_course}>{course.name_course}</option>
                        );
                      })}
                    </Input></FormGroup>
                </Col>
                <Col >
                  <FormGroup>
                    <Label for="id_major">กลุ่มสาขา</Label>
                    <Input type="select" name="id_major" id="id_major" onChange={handleInputChange} placeholder="ระบุชื่อ" >
                      <option value={education.id_major}>{education.name_major}</option>
                      {groupmajor.map((groupmajor) => {
                        return (
                          <option value={groupmajor.id_major}>{groupmajor.name_major}</option>
                        );
                      })}
                    </Input></FormGroup>
                </Col>
              </Row>

              <div className="mx-auto text-center mb-3">
                <Button className="btn btn-success" onClick={saveStudent}>Update</Button>
              </div>

              <div className="mx-auto text-center">
                <a
                  type="button"
                  href="/home"
                  className="hover:no-underline inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  กลับหน้าหลัก
                </a>
                <a
                  type="button"
                  href={"/detaileducationstudent/" + student.id_stu}
                  className="hover:no-underline inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  กลับไปข้อมูลการศึกษาต่อ
                </a>
              </div>

            </Form>
          )}

        </Form>

      </div>

    </div>

  );
}

export default ViewUpdateDetailEducationStudent;