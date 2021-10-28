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

   
 useEffect(() => {
    axios.get("https://educationservice.herokuapp.com/student/getStudent/" + id)
      .then((response) => {
        setStudent(response.data);
      });
  }, [id]);//เมื่อidมีการเปลี่ยนเเปรง ก็จะรีหน้าทำการเปลี่ยนที่เราเปลี่ยน

  const [education, setEducation] = useState([]);
  useEffect(() => {
    axios.get("https://educationservice.herokuapp.com/EducationStudent/getEducation/" + id)
      .then((response) => {
        setEducation(response.data);
      });
  }, [id]);

  const [university, setUniversity] = useState([initStudent]);
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

  //ไปดึง api ของอันเก่ามาใช้จาก url
  const updateEducationdata = () => {
    axios.get("https://educationservice.herokuapp.com/EducationData/getAllEducationDataStudent").then((response) => {
      console.log(response);
      setEducationdata(response.data.educationdata);
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
                             id_edu_stu: education.id_edu_stu,
      id_stu: education.id_stu,
      id_university: education.id_university,
      id_faculty: education.id_faculty,
      id_course: education.id_course,
      id_major: education.id_major,
                  
                          }
                
                        if (data['id_edu_stu'] == "" || data['id_stu'] == "" || data['id_university'] == ""
                        || data['id_faculty'] == ""|| data['id_course'] == ""|| data['id_major'] == "") {
                            Swal.fire(
                
                                'ผิดพลาด',
                                'กรุณารอกรอกข้อมูลให้ครบ',
                                'error'
                            )
                
                        } else {
    axios.put("https://educationservice.herokuapp.com/EducationStudent/updateEducationStudent/" + education.id_edu_stu, data)
                            .then((res) => {
                                    console.log(res.data.message);
                                    if (res.data.message == "success") {
                                        ////ต่อตรงนี้
                                        Swal.fire(
                
                                            'เเก้ไขข้อมูลการศึกษาต่อเรียบร้อย',
                                            '',
                                            'success'
                                        )
                                            .then(() => window.location.assign("/Student/detaileducationstudent/"+ student.id_stu))
                
                                    } else {
                
                                        Swal.fire(
                                            'เเก้ไขข้อมูลการศึกษาผิดพลาด',
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
      </Row>
      <Row form>
        <Col >     
                                <FormGroup>
                                    <Label for="id_university">สาขาที่เปิดรับ</Label>
                                 <Input type="select" name="id_university" id="id_university" onChange={handleInputChange} placeholder="ระบุชื่อ" >
                      <option value={education.id_university}>{education.name_uni}</option>
                      {university.map((university) => {
                        return (
                          <option value={university.id_university}>{university.name_uni}</option>
                        );
                      })}
                    </Input>
                                </FormGroup>
                                </Col>
                                <Col> 
                                <FormGroup>
                                    <Label for="id_faculty">คณะ</Label>
                                   <Input type="select" name="id_faculty" id="id_faculty" onChange={handleInputChange} placeholder="ระบุชื่อ" >
                      <option value={education.id_faculty}>{education.name_faculty}</option>
                      {faculty.map((faculty) => {
                        return (
                          <option value={faculty.id_faculty}>{faculty.name_faculty}</option>
                        );
                      })}
                    </Input>
                                </FormGroup>
                                </Col>
     
     </Row>
     <Row form>
        <Col >     
                                <FormGroup>
                                    <Label for="course">สาขา</Label>
                                   <Input type="select" name="id_course" id="id_course" onChange={handleInputChange} placeholder="ระบุชื่อ" >
                      <option value={education.id_course}>{education.name_course}</option>
                      {course.map((course) => {
                        return (
                          <option value={course.id_course}>{course.name_course}</option>
                        );
                      })}
                    </Input>
                                </FormGroup>
                                </Col>
                                <Col> 
                                <FormGroup>
                                    <Label for="id_major">กลุ่มสาขา</Label>
                                     <Input type="select" name="id_major" id="id_major" onChange={handleInputChange} placeholder="ระบุชื่อ" >
                      <option value={education.id_major}>{education.name_major}</option>
                      {groupmajor.map((groupmajor) => {
                        return (
                          <option value={groupmajor.id_major}>{groupmajor.name_major}</option>
                        );
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

// import axios from "axios";
// import React, { useState, useEffect } from "react"
// import {
//   Container, Row, Col, Button, Form, FormGroup, Label, Input, FormText, Card, CardText, CardBody, CardLink,
//   CardTitle, CardSubtitle, NavLink, Alert
// } from 'reactstrap';
// import Swal from 'sweetalert2';

// const ViewUpdateDetailEducationStudent = ({ id }) => {
//   const initStudent = {
//     id_edu_stu: "",
//     id_stu: "",
//     id_university: "",
//     id_faculty: "",
//     id_course: "",
//   };


//   const [student, setStudent] = useState([initStudent]);
//   const [submited, setSumited] = useState(false)
//   const [educationdata, setEducationdata] = useState([]);

//   useEffect(() => {
//     axios.get("https://educationservice.herokuapp.com/student/getStudent/" + id)
//       .then((response) => {
//         setStudent(response.data);
//       });
//   }, [id]);//เมื่อidมีการเปลี่ยนเเปรง ก็จะรีหน้าทำการเปลี่ยนที่เราเปลี่ยน

//   const [education, setEducation] = useState([]);
//   useEffect(() => {
//     axios.get("https://educationservice.herokuapp.com/EducationStudent/getEducation/" + id)
//       .then((response) => {
//         setEducation(response.data);
//       });
//   }, [id]);

//   const [university, setUniversity] = useState([initStudent]);
//   //ไปดึง api ของอันเก่ามาใช้จาก url
//   const updateUniversity = () => {
//     axios.get("https://educationservice.herokuapp.com/EducationData/getAllEducationUniversity").then((response) => {
//       console.log(response);
//       setUniversity(response.data.university);
//     });
//   };
//   useEffect(() => {
//     updateUniversity();
//   }, []);

//   const [faculty, setFaculty] = useState([]);
//   //ไปดึง api ของอันเก่ามาใช้จาก url
//   const updateFaculty = () => {
//     axios.get("https://educationservice.herokuapp.com/EducationData/getAllEducationFaculty").then((response) => {
//       console.log(response);
//       setFaculty(response.data.faculty);
//     });
//   };
//   useEffect(() => {
//     updateFaculty();
//   }, []);

//   const [course, setCourse] = useState([]);
//   //ไปดึง api ของอันเก่ามาใช้จาก url
//   const updateCourse = () => {
//     axios.get("https://educationservice.herokuapp.com/EducationData/getAllEducationCourse").then((response) => {
//       console.log(response);
//       setCourse(response.data.course);
//     });
//   };
//   useEffect(() => {
//     updateCourse();
//   }, []);

//   //ไปดึง api ของอันเก่ามาใช้จาก url
//   const updateEducationdata = () => {
//     axios.get("https://educationservice.herokuapp.com/EducationData/getAllEducationDataStudent").then((response) => {
//       console.log(response);
//       setEducationdata(response.data.educationdata);
//     });
//   };

//   useEffect(() => {
//     updateEducationdata();
//   }, []);



//   //เมื่อidมีการเปลี่ยนเเปรง ก็จะรีหน้าทำการเปลี่ยนที่เราเปลี่ยน

//   // const [products, setProducts] = useState([]);
//   // //ไปดึง api ของอันเก่ามาใช้จาก url
//   //     const updateProducts = () =>{
//   //         axios.get("http://localhost:8080/product").then((response) => {
//   //             console.log(response);
//   //             setProducts(response.data);
//   //             console.log("Updating products.....");
//   //         });
//   //     };

//   //     useEffect(() => {
//   //         updateProducts();
//   //     }, []);


//   const handleInputChange = (event) => {
//     let { name, value } = event.target;
//     //if (name === "tags") {
//     //  value = value.split(",");
//     // }
//     setEducation({ ...education, [name]: value });
//   };
//   const [groupmajor, setGroupMajor] = useState([]);
//   //ไปดึง api ของอันเก่ามาใช้จาก url
//   const updateGroupMajor = () => {
//     axios.get("https://educationservice.herokuapp.com/EducationData/getAllEducationMajor").then((response) => {
//       console.log(response);
//       setGroupMajor(response.data.major);
//     });
//   };
//   useEffect(() => {
//     updateGroupMajor();
//   }, []);

//   const saveStudent = () => {
//     var data = {
//       id_edu_stu: education.id_edu_stu,
//       id_stu: education.id_stu,
//       id_university: education.id_university,
//       id_faculty: education.id_faculty,
//       id_course: education.id_course,
//       id_major: education.id_major,

//     }

//     axios.put("https://educationservice.herokuapp.com/EducationStudent/updateEducationStudent/" + education.id_edu_stu, data)
//       .then((response) => {
//         console.log(response.data);
//         setStudent({ ...student, data });//ก็อป เเละ เขียน ทับ ตัวใหม่สุด
//         setSumited(true);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };
//   const newStudent = () => {
//     // setEducationdata(initStudent);
//     setSumited(false);

//   };


//   return (

//     <div>
//       <div class="px-4 flex flex-col max-w-3xl mx-auto mt-32">
//         <Form>

//           {submited ? (
//             Swal.fire(

//               'เเก้ไขข้อมูลการศึกษาต่อสำเร็จ',
//               ' ',
//               'success',
//             )
//               (window.location.assign("/Student/detaileducationstudent/" + student.id_stu))
//           ) : (
//             <Form>

//               <center><h3> เเก้ไขข้อมูลการศึกษาต่อ </h3></center>
//               <Row form>
//                 <Col sm={6}>
//                   <FormGroup>
//                     <Label for="id_university  ">มหาวิทยาลัย</Label>
//                     <Input type="select" name="id_university" id="id_university" onChange={handleInputChange} placeholder="ระบุชื่อ" >
//                       <option value={education.id_university}>{education.name_uni}</option>
//                       {university.map((university) => {
//                         return (
//                           <option value={university.id_university}>{university.name_uni}</option>
//                         );
//                       })}
//                     </Input></FormGroup>
//                 </Col>
//                 <Col sm={6}>
//                   <FormGroup>
//                     <Label for="id_faculty">คณะ</Label>
//                     <Input type="select" name="id_faculty" id="id_faculty" onChange={handleInputChange} placeholder="ระบุชื่อ" >
//                       <option value={education.id_faculty}>{education.name_faculty}</option>
//                       {faculty.map((faculty) => {
//                         return (
//                           <option value={faculty.id_faculty}>{faculty.name_faculty}</option>
//                         );
//                       })}
//                     </Input></FormGroup>
//                 </Col>

//               </Row>
//               <Row form>
//                 <Col sm={6}>
//                   <FormGroup>
//                     <Label for="id_course">สาขา</Label>
//                     <Input type="select" name="id_course" id="id_course" onChange={handleInputChange} placeholder="ระบุชื่อ" >
//                       <option value={education.id_course}>{education.name_course}</option>
//                       {course.map((course) => {
//                         return (
//                           <option value={course.id_course}>{course.name_course}</option>
//                         );
//                       })}
//                     </Input></FormGroup>
//                 </Col>
//                 <Col sm={6}>
//                   <FormGroup>
//                     <Label for="id_major">กลุ่มสาขา</Label>
//                     <Input type="select" name="id_major" id="id_major" onChange={handleInputChange} placeholder="ระบุชื่อ" >
//                       <option value={education.id_major}>{education.name_major}</option>
//                       {groupmajor.map((groupmajor) => {
//                         return (
//                           <option value={groupmajor.id_major}>{groupmajor.name_major}</option>
//                         );
//                       })}
//                     </Input></FormGroup>
//                 </Col>
//               </Row>

//               <div className="mx-auto text-center mb-3">
//                 <Button className="btn btn-success" onClick={saveStudent}>Update</Button>
//               </div>

//               <div className="mx-auto text-center">
//                 <a
//                   type="button"
//                   href="/Student/home"
//                   className="hover:no-underline inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                 >
//                   กลับหน้าหลัก
//                 </a>
//                 <a
//                   type="button"
//                   href={"/Student/detaileducationstudent/" + student.id_stu}
//                   className="hover:no-underline inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                 >
//                   กลับไปข้อมูลการศึกษาต่อ
//                 </a>
//               </div>

//             </Form>
//           )}

//         </Form>

//       </div>

//     </div>

//   );
// }

// export default ViewUpdateDetailEducationStudent;