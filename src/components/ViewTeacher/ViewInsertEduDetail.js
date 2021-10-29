import React, { useState, useEffect } from 'react';
import axios from 'axios'
import {
    Container, Row, Col, Button, Form, FormGroup, Label, Input, Alert
} from 'reactstrap';
import Swal from 'sweetalert2';



const ViewInsertEduDetail = ({ id }) => {
    const initEdudetail = {
        id_edu_detail: "",
        number_of_edu: "",
        GPA: "",
        id_curriculum: "",
        note_condi: "",
        id_course: "",
        id_faculty: "",
        id_education: "",
        id_major: "",

    };

    const [edudetail, setEdudetail] = useState(initEdudetail);
    const [submited, setSumited] = useState(false)
    const [faculty, setFaculty] = useState([])
    const [Education, setEducation] = useState([])
    const [course, setCourse] = useState([])
    const [curriculum, setCurriculum] = useState([])
    const [major, setMajor] = useState([])

    useEffect(() => {
                axios.get("https://educationservice.herokuapp.com/Education/" + id)
                    .then((response) => {
                        setEdudetail(response.data);
                    });
            }, [id]);

    const [edu, setEdu] = useState([])
//    useEffect(() => {
//     axios.get("http://localhost:8080/EduDetail/getEduDetailByIdedu/" + id)
//         .then((response) => {
//             setEdu(response.data.edu);
//         });
// }, [id]);



    //Faculty
    const updateFaculty = () => {
        axios.get("https://educationservice.herokuapp.com/faculty").then((response) => {
            console.log(response);
            setFaculty(response.data.faculty);
            console.log("Updating .....");
        });
    };
    useEffect(() => {
        updateFaculty();
    }, []);

    //Course
    const updateCourse = () => {
        axios.get("https://educationservice.herokuapp.com/Course").then((response) => {
            console.log(response);
            setCourse(response.data.course);
            console.log("Updating .....");
        });
    };
    useEffect(() => {
        updateCourse();
    }, []);

    //Curriculum
    const updateCurriculum = () => {
        axios.get("https://educationservice.herokuapp.com/Curriculum").then((respond) => {
            console.log(respond);
            setCurriculum(respond.data.curriculum);
            console.log("Update...")
        });
    };
    useEffect(() => {
        updateCurriculum();
    }, []);

    //Major
    const updateMajor = () => {
        axios.get("https://educationservice.herokuapp.com/groupmajor").then((respond) => {
            console.log(respond);
            setMajor(respond.data.major);
            console.log("Update...")
        });
    };
    useEffect(() => {
        updateMajor();
    }, []);


    const handleInputChange = (event) => {
        let { name, value } = event.target;
        // if (name === "tags") {
        //     value = value.split(",");
        // }
        setEdudetail({ ...edudetail, [name]: value });
    };

    const saveEdudetail = (e) => {
        e.preventDefault()
        var data = {
            number_of_edu: edudetail.number_of_edu,
            GPA: edudetail.GPA,
            id_curriculum: edudetail.id_curriculum,
            note_condi: edudetail.note_condi,
            id_course: edudetail.id_course,
            id_faculty: edudetail.id_faculty,
            id_education: edudetail.id_education,
            id_major: edudetail.id_major,

        }
        if (data['number_of_edu'] === "" || data['GPA'] === "" || data['id_curriculum'] === ""
            || data['note_condi'] === "" || data['id_course'] === "" || data['id_faculty'] === ""
            || data['id_education'] === "" || data['id_major'] === "") {
            Swal.fire(

                'ผิดพลาด',
                'กรุณากรอกข้อมูลให้ครบ',
                'error'
            )
            
        } 
        else {
            axios.post("https://educationservice.herokuapp.com/eduDetail/createEduDetail", data)
                .then((res) => {
                    console.log(res.data.message);
                    if (res.data.message == "success") {
                        ////ต่อตรงนี้
                        Swal.fire(

                            'เพิ่มข้อมูลเรียบร้อย',
                            '',
                            'success'
                        )
                            .then(() => window.location.assign("/Teacher/edudetailall/" + edudetail.id_education))

                    } else {

                        Swal.fire(
                            'เพิ่มข้อมูลผิดพลาด',
                            'ชื่อสาขานี้มีอยู่แล้วกรุณาเปลี่ยนชื่อ',
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
        <div className="mt-32">
        <div className="px-4 flex flex-col max-w-7xl mx-auto mt-32">
        <h3 className="text-center">รายละเอียดข้อมูลการเข้าศึกษาต่อ</h3>
          <hr></hr>
          <br></br>
   <Form onSubmit={saveEdudetail}>

                        <Row>
                            <Col xs="6">
                                <FormGroup>
                                    <Label for="id_faculty">คณะที่เปิดรับ</Label>
                                    <Input type="select" name="id_faculty" id="id_faculty"
                                        onChange={handleInputChange} value={edudetail.id_faculty || ""} >
                                        <option>กรุณาเลือกคณะที่เปิดรับ</option>
                                        {faculty.map((faculty) => {
                                            return (
                                                <option key={faculty.id_faculty} value={faculty.id_faculty}>
                                                    {faculty.name_faculty}</option>
                                            )
                                        })}
                                    </Input>
                                </FormGroup></Col>
                            <Col xs="6">
                                <FormGroup>
                                    <Label for="id_course">สาขาที่เปิดรับ</Label>
                                    <Input type="select" name="id_course" id="id_course"
                                        value={edudetail.id_course || ""}
                                        onChange={handleInputChange}>
                                        <option>กรุณาเลือกสาขาที่เปิดรับ</option>
                                        {course.map((course) => {
                                            return (
                                                <option key={course.id_course} value={course.id_course}>
                                                    {course.name_course}
                                                </option>
                                            )
                                        })}
                                    </Input>
                                </FormGroup></Col>
                            <Col xs="6">
                                <FormGroup>
                                    <Label for="id_major">กลุ่มสาขาวิชา</Label>
                                    <Input type="select" name="id_major" id="id_major" value={edudetail.id_major}
                                        onChange={handleInputChange}>
                                        <option>กรุณาเลือกกลุ่มสาขาวิชา</option>
                                            {major.map((major) => {
                                                return (
                                                    <option key={major.id_major} value={major.id_major}>
                                                        {major.name_major}</option>
                                                )
                                            })}
                                    </Input>
                                </FormGroup></Col>
                            <Col xs="6">
                                <FormGroup>
                                    <Label for="number_of_edu">จำนวนที่เปิดรับสมัคร</Label>
                                    <Input type="text" name="number_of_edu" id="number_of_edu" placeholder="กรุณากำหนดจำนวน" value={edudetail.number_of_edu || ""}
                                        onChange={handleInputChange}>
                                    </Input>
                                </FormGroup></Col>
                            <Col xs="6">
                                <FormGroup>
                                    <Label for="GPAX">เกรดขั้นต่ำ</Label>
                                    <Input type="text" name="GPA" id="GPA" placeholder="กรุณากำหนดเกรดขั้นต่ำ" value={edudetail.GPA || ""}
                                        onChange={handleInputChange}>
                                    </Input>
                                </FormGroup></Col>
                            <Col xs="6">
                                <FormGroup>
                                    <Label for="id_curriculum">แผนการเรียน</Label>
                                    <Input type="select" name="id_curriculum" id="id_curriculum" value={edudetail.id_curriculum || ""}
                                        onChange={handleInputChange}>
                                        <option>กรุณาเลือกเเผนการเรียน</option>
                                        {curriculum.map((curri) => {
                                            return (
                                                <option key={curri.id_curriculum} value={curri.id_curriculum}>
                                                    {curri.name_curriculum}</option>
                                            )
                                        })}
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col xs="6">
                                <FormGroup>
                                    <Label for="id_education"></Label>
                                    <Input type="hidden" name="id_education" id="id_education"
                                        onChange={handleInputChange} value={edudetail.id_education || ""}>
                                    {/* <option>***กรุณาเลือก***</option>
                                      <option value={edudetail.id_education}>รับทราบ</option> */}
                                    
                                    </Input>

                                </FormGroup></Col>
                            <Col xs="12">
                                <FormGroup>
                                    <Label for="note_condi">เงื่อนไขการรับสมัคร</Label>
                                    <Input type="textarea" name="note_condi" id="note_condi" placeholder="กรุณากำหนดเงื่อนไขการรับสมัคร" value={edudetail.note_condi || ""}
                                        onChange={handleInputChange}>
                                    </Input>
                                </FormGroup></Col>
                        </Row>
                        <Button className="btn btn-success" >ยืนยัน</Button>
                    </Form>
            
                    </div>

</div>
    );
}

export default ViewInsertEduDetail;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios'
// import { Container, Row, Col, Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
// import Swal from 'sweetalert2';

// const ViewInsertEduDetail = ({ id }) => {
//     const initEdudetail = {
//         id_edu_detail: "",
//         number_of_edu: "",
//         GPA: "",
//         id_curriculum: "",
//         note_condi: "",
//         id_course: "",
//         id_faculty: "",
//         id_education: "",
//         id_major: ""
//     };

//     const [edudetail, setEdudetail] = useState(initEdudetail);
//     const [submited, setSumited] = useState(false)
//     const [faculty, setFaculty] = useState([])
//     const [course, setCourse] = useState([])
//     const [curriculum, setCurriculum] = useState([])
//     const [major, setMajor] = useState([])

//    //Faculty
// //    useEffect(() => {
// //     axios.get("http://localhost:8080/Education/getEducatioById/" + id)
// //         .then((response) => {
// //             setEdudetail(response.data);
// //         });
// // }, [id]);

//     useEffect(() => {
//         axios.get("http://localhost:8080/eduDetail/" + id)
//             .then((response) => {
//                 console.log(response);
//                 setEdudetail(response.data);
//             });
//     }, [id]);

//     const updateFaculty = () => {
//         axios.get("http://localhost:8080/faculty").then((response) => {
//             console.log(response);
//             setFaculty(response.data.faculty);
//             console.log("Updating .....");
//         });
//     };
//     useEffect(() => {
//         updateFaculty();
//     }, []);

//     //Course
//     const updateCourse = () => {
//         axios.get("http://localhost:8080/Course").then((response) => {
//             console.log(response);
//             setCourse(response.data.course);
//             console.log("Updating .....");
//         });
//     };
//     useEffect(() => {
//         updateCourse();
//     }, []);

//     //Curriculum
//     const updateCurriculum = () => {
//         axios.get("http://localhost:8080/Curriculum").then((respond) => {
//             console.log(respond);
//             setCurriculum(respond.data.curriculum);
//             console.log("Update...")
//         });
//     };
//     useEffect(() => {
//         updateCurriculum();
//     }, []);

//     //Major
//     const updateMajor = () => {
//         axios.get("http://localhost:8080/groupmajor").then((respond) => {
//             console.log(respond);
//             setMajor(respond.data.major);
//             console.log("Update...")
//         });
//     };
//     useEffect(() => {
//         updateMajor();
//     }, []);

//     const handleInputChange = (event) => {
//         let { name, value } = event.target;
//         //if (name === "tags") {
//         //  value = value.split(",");
//         // }
//         setEdudetail({ ...edudetail, [name]: value });
//     };

//     const saveEdudetail = (e) => {
//         e.preventDefault()
//         var data = {
//             number_of_edu: edudetail.number_of_edu,
//             GPA: edudetail.GPA,
//             id_curriculum: edudetail.id_curriculum,
//             note_condi: edudetail.note_condi,
//             id_course: edudetail.id_course,
//             id_faculty: edudetail.id_faculty,
//             id_education: edudetail.id_education,
//             id_major: edudetail.id_major,
//         }
//         if (data['number_of_edu'] === ""|| data['GPA'] === ""|| data['id_curriculum'] === ""
//         || data['note_condi'] === ""|| data['id_course'] === ""|| data['id_faculty'] === ""
//         || data['id_education'] === ""|| data['id_major'] === "") {
//             Swal.fire(
      
//                 'ผิดพลาด',
//                 'กรุณารอกรอกข้อมูลให้ครบ',
//                 'error'
//             )
//         } else {
//             axios.post("http://localhost:8080/eduDetail/createEduDetail", data)
//             .then((res) => {
//                     console.log(res.data.message);
//                     if (res.data.message == "success") {
//                         ////ต่อตรงนี้
//                         Swal.fire(
    
//                             'อัพเดตข้อมูลเรียบร้อย',
//                             '',
//                             'success'
//                         )
//                             .then(() => window.location.assign("/edudetailall/" + edudetail.id_education))
    
//                     } else {
    
//                         Swal.fire(
//                             'อัพเดตข้อมูลผิดพลาด',
//                             'ชื่อสาขานี้มีอยู่แล้วกรุณาเปลี่ยนชื่อ',
//                             'error'
//                         )
    
//                     }
    
//                 })
//                 .catch((error) => {
//                     console.log("error");
//                 });//ใช้ ดัก Error
    
//         };
//     }
//     return (
//         <Container>
// <br/><br/><br/><br/>
// <Form>
//                         <center><h3> รายละเอียดข้อมูลการเข้าศึกษาต่อ </h3></center>

//                         <Row>
//                             <Col xs="6">
//                                 <FormGroup>
//                                     <Label for="id_faculty">คณะที่เปิดรับ</Label>
//                                     <Input type="select" name="id_faculty" id="id_faculty"
//                                         onChange={handleInputChange} value={edudetail.id_faculty || ""} >
//                                         <option></option>
//                                         {faculty.map((faculty) => {
//                                             return (
//                                                 <option key={faculty.id_faculty} value={faculty.id_faculty}>
//                                                     {faculty.name_faculty}</option>
//                                             )
//                                         })}
//                                     </Input>
//                                 </FormGroup></Col>
//                             <Col xs="6">
//                                 <FormGroup>
//                                     <Label for="id_course">สาขาที่เปิดรับ</Label>
//                                     <Input type="select" name="id_course" id="id_course"
//                                         value={edudetail.id_course || ""}
//                                         onChange={handleInputChange}>
//                                         <option></option>
//                                         {course.map((course) => {
//                                             return (
//                                                 <option key={course.id_course} value={course.id_course}>
//                                                     {course.name_course}
//                                                 </option>
//                                             )
//                                         })}
//                                     </Input>
//                                 </FormGroup></Col>
//                             <Col xs="6">
//                                 <FormGroup>
//                                     <Label for="">กลุ่มสาขาวิชา</Label>
//                                     <Input type="select" name="id_major" id="id_major" value={edudetail.id_major || ""}
//                                         onChange={handleInputChange}>
//                                         <option></option>
//                                         {major.map((major) => {
//                                             return (
//                                                 <option key={major.id_major} value={major.id_major}>
//                                                     {major.name_major}</option>
//                                             )
//                                         })}
//                                     </Input>
//                                 </FormGroup></Col>
//                             <Col xs="6">
//                                 <FormGroup>
//                                     <Label for="number_of_edu">จำนวนที่เปิดรับสมัคร</Label>
//                                     <Input type="text" name="number_of_edu" id="number_of_edu" value={edudetail.number_of_edu || ""}
//                                         onChange={handleInputChange}>
//                                     </Input>
//                                 </FormGroup></Col>
//                             <Col xs="6">
//                                 <FormGroup>
//                                     <Label for="GPA">เกรดขั้นต่ำ</Label>
//                                     <Input type="text" name="GPA" id="GPA" value={edudetail.GPA || ""}
//                                         onChange={handleInputChange}>
//                                     </Input>
//                                 </FormGroup></Col>
//                             <Col xs="6">
//                                 <FormGroup>
//                                     <Label for="id_curriculum">แผนการเรียน</Label>
//                                     <Input type="select" name="id_curriculum" id="id_curriculum" value={edudetail.id_curriculum || ""}
//                                         onChange={handleInputChange}>
//                                         <option></option>
//                                         <option>ไม่กำหนด</option>
//                                         {curriculum.map((curri) => {
//                                             return (
//                                                 <option key={curri.id_curriculum} value={curri.id_curriculum}>
//                                                     {curri.name_curriculum}</option>
//                                             )
//                                         })}
//                                     </Input>
//                                 </FormGroup>
//                             </Col>
//                             <Col xs="6">
//                                 <FormGroup>
//                                     <Label for="id_education"></Label>
//                                     <Input type="text" name="id_education" id="id_education"
//                                         onChange={handleInputChange} value={edudetail.id_education || ""}>
//                                     </Input>

//                                 </FormGroup></Col>
//                             <Col xs="12">
//                                 <FormGroup>
//                                     <Label for="note_condi">เงื่อนไขการรับสมัคร</Label>
//                                     <Input type="textarea" name="note_condi" id="note_condi" value={edudetail.note_condi || ""}
//                                         onChange={handleInputChange}>
//                                     </Input>
//                                 </FormGroup></Col>
//                         </Row>
//                         <Button className="btn btn-success" onClick={saveEdudetail}>ยืนยัน</Button>
//                     </Form>
           
//         </Container >
//     );
// }
// export default ViewInsertEduDetail;
// import React, { useState, useEffect } from 'react';
// import axios from 'axios'
// import {
//     Container, Row, Col, Button, Form, FormGroup, Label, Input, Alert
// } from 'reactstrap';
// import Swal from 'sweetalert2';



// const ViewInsertEduDetail = ({ id }) => {
//     const initEdudetail = {
//         id_edu_detail: "",
//         number_of_edu: "",
//         GPA: "",
//         id_curriculum: "",
//         note_condi: "",
//         id_course: "",
//         id_faculty: "",
//         id_education: "",
//         id_major: "",

//     };

//     const [edudetail, setEdudetail] = useState(initEdudetail);
//     const [submited, setSumited] = useState(false)
//     const [faculty, setFaculty] = useState([])
//     const [course, setCourse] = useState([])
//     const [curriculum, setCurriculum] = useState([])
//     const [major, setMajor] = useState([])

//     useEffect(() => {
//         axios.get("http://localhost:8080/Education/" + id)
//             .then((response) => {
//                 setEdudetail(response.data);
//             });
//     }, [id]);


//     //Faculty
//     const updateFaculty = () => {
//         axios.get("http://localhost:8080/faculty").then((response) => {
//             console.log(response);
//             setFaculty(response.data.faculty);
//             console.log("Updating .....");
//         });
//     };
//     useEffect(() => {
//         updateFaculty();
//     }, []);

//     //Course
//     const updateCourse = () => {
//         axios.get("http://localhost:8080/Course").then((response) => {
//             console.log(response);
//             setCourse(response.data.course);
//             console.log("Updating .....");
//         });
//     };
//     useEffect(() => {
//         updateCourse();
//     }, []);

//     //Curriculum
//     const updateCurriculum = () => {
//         axios.get("http://localhost:8080/Curriculum").then((respond) => {
//             console.log(respond);
//             setCurriculum(respond.data.curriculum);
//             console.log("Update...")
//         });
//     };
//     useEffect(() => {
//         updateCurriculum();
//     }, []);

//     //Major
//     const updateMajor = () => {
//         axios.get("http://localhost:8080/groupmajor").then((respond) => {
//             console.log(respond);
//             setMajor(respond.data.major);
//             console.log("Update...")
//         });
//     };
//     useEffect(() => {
//         updateMajor();
//     }, []);


//     const handleInputChange = (event) => {
//         let { name, value } = event.target;
//         // if (name === "tags") {
//         //     value = value.split(",");
//         // }
//         setEdudetail({ ...edudetail, [name]: value });
//     };

//     const saveEdudetail = () => {
//         var data = {
//             number_of_edu: edudetail.number_of_edu,
//             GPA: edudetail.GPA,
//             id_curriculum: edudetail.id_curriculum,
//             note_condi: edudetail.note_condi,
//             id_course: edudetail.id_course,
//             id_faculty: edudetail.id_faculty,
//             id_education: edudetail.id_education,
//             id_major: edudetail.id_major,
//         }
//         axios.post("http://localhost:8080/eduDetail/createEduDetail", data)
//             .then((response) => {
//                 console.log(response.data);
//                 setSumited(true);
//             })
//             .catch((error) => {
//                 console.log(error);
//             });
//     };
//     const newEdudetail = () => {
//         setEdudetail(initEdudetail);
//         setSumited(false);
//     };


//     return (
//         <Container>
//             <Form>

// {submited ? (
//    Swal.fire(

//     'เพิ่มรายล่ะเอียดข้อมูลการศึกษาต่อสำเร็จ',
//     ' ',
//      'success',
//  )
//  (window.location.assign("/edudetailall/" + edudetail.id_education))
//                 ) : (
// <Form>
//                         <center><h3> รายละเอียดข้อมูลการเข้าศึกษาต่อ </h3></center>

//                         <Row>
//                             <Col xs="6">
//                                 <FormGroup>
//                                     <Label for="id_faculty">คณะที่เปิดรับ</Label>
//                                     <Input type="select" name="id_faculty" id="id_faculty"
//                                         onChange={handleInputChange} value={edudetail.id_faculty || ""} >
//                                         <option></option>
//                                         {faculty.map((faculty) => {
//                                             return (
//                                                 <option key={faculty.id_faculty} value={faculty.id_faculty}>
//                                                     {faculty.name_faculty}</option>
//                                             )
//                                         })}
//                                     </Input>
//                                 </FormGroup></Col>
//                             <Col xs="6">
//                                 <FormGroup>
//                                     <Label for="id_course">สาขาที่เปิดรับ</Label>
//                                     <Input type="select" name="id_course" id="id_course"
//                                         value={edudetail.id_course || ""}
//                                         onChange={handleInputChange}>
//                                         <option></option>
//                                         {course.map((course) => {
//                                             return (
//                                                 <option key={course.id_course} value={course.id_course}>
//                                                     {course.name_course}
//                                                 </option>
//                                             )
//                                         })}
//                                     </Input>
//                                 </FormGroup></Col>
//                             <Col xs="6">
//                                 <FormGroup>
//                                     <Label for="">กลุ่มสาขาวิชา</Label>
//                                     <Input type="select" name="id_major" id="id_major" value={edudetail.id_major}
//                                         onChange={handleInputChange}>
//                                         <option></option>
//                                             {major.map((major) => {
//                                                 return (
//                                                     <option key={major.id_major} value={major.id_major}>
//                                                         {major.name_major}</option>
//                                                 )
//                                             })}
//                                     </Input>
//                                 </FormGroup></Col>
//                             <Col xs="6">
//                                 <FormGroup>
//                                     <Label for="number_of_edu">จำนวนที่เปิดรับสมัคร</Label>
//                                     <Input type="text" name="number_of_edu" id="number_of_edu" value={edudetail.number_of_edu || ""}
//                                         onChange={handleInputChange}>
//                                     </Input>
//                                 </FormGroup></Col>
//                             <Col xs="6">
//                                 <FormGroup>
//                                     <Label for="GPA">เกรดขั้นต่ำ</Label>
//                                     <Input type="text" name="GPA" id="GPA" value={edudetail.GPA || ""}
//                                         onChange={handleInputChange}>
//                                     </Input>
//                                 </FormGroup></Col>
//                             <Col xs="6">
//                                 <FormGroup>
//                                     <Label for="id_curriculum">แผนการเรียน</Label>
//                                     <Input type="select" name="id_curriculum" id="id_curriculum" value={edudetail.id_curriculum || ""}
//                                         onChange={handleInputChange}>
//                                         <option></option>
//                                         <option>ไม่กำหนด</option>
//                                         {curriculum.map((curri) => {
//                                             return (
//                                                 <option key={curri.id_curriculum} value={curri.id_curriculum}>
//                                                     {curri.name_curriculum}</option>
//                                             )
//                                         })}
//                                     </Input>
//                                 </FormGroup>
//                             </Col>
//                             <Col xs="6">
//                                 <FormGroup>
//                                     <Label for="id_education"></Label>
//                                     <Input type="hidden" name="id_education" id="id_education"
//                                         onChange={handleInputChange} value={edudetail.id_education || ""}>
//                                     </Input>

//                                 </FormGroup></Col>
//                             <Col xs="12">
//                                 <FormGroup>
//                                     <Label for="note_condi">เงื่อนไขการรับสมัคร</Label>
//                                     <Input type="textarea" name="note_condi" id="note_condi" value={edudetail.note_condi || ""}
//                                         onChange={handleInputChange}>
//                                     </Input>
//                                 </FormGroup></Col>
//                         </Row>
//                         <Button className="btn btn-success" onClick={saveEdudetail}>ยืนยัน</Button>
//                     </Form>
//                 )}
//             </Form>
//         </Container >
//     );
// }

// export default ViewInsertEduDetail;