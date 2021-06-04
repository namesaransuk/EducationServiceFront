import React, { useState, useEffect } from 'react';
import axios from 'axios'
import {
    Container, Row, Col, Button, Form, FormGroup, Label, Input, Alert
} from 'reactstrap';



const ViewEditEdudetail = ({id}) => {
    const initEdudetail = {
        id_edu_detail: "",
        number_of_edu: "",
        GPA: "",
        curriculum_edu: "",
        note_condi: "",
        id_course: "",
        id_faculty: "",
        id_education: "",
    };
    const [edudetail, setEdudetail] = useState(initEdudetail);
    const [submited, setSumited] = useState(false)
    const [course, setCourse] = useState([])
    const [faculty, setFaculty] = useState([])

    useEffect(() => {
        axios.get("http://localhost:8080/eduDetail/" + id)
          .then((response) => {
            setEdudetail(response.data);
          });
      }, [id]);

    const updateFaculty = () => {
        axios.get("http://localhost:8080/faculty").then((response) => {
            console.log(response);
            setFaculty(response.data.faculty);
            console.log("Updating .....");
        });
    };
    useEffect(() => {
        updateFaculty();
    }, []);


    const updateCourse = () => {
        axios.get("http://localhost:8080/course").then((response) => {
            console.log(response);
            setCourse(response.data.course);
            console.log("Updating .....");
        });
    };
    useEffect(() => {
        updateCourse();
    }, []);


    const handleInputChange = (event) => {
        let { name, value } = event.target;
        // if (name === "tags") {
        //     value = value.split(",");
        // }
        setEdudetail({ ...edudetail, [name]: value });
    };


    const saveEdudetail = (fileURL) => {
        var data = {
            number_of_edu: edudetail.number_of_edu,
            GPA: edudetail.GPA,
            curriculum_edu: edudetail.curriculum_edu,
            note_condi: edudetail.note_condi,
            id_course: edudetail.id_course,
            id_faculty: edudetail.id_faculty,
            id_education: edudetail.id_education,
        }
        axios.post("http://localhost:8080/eduDetail/updateEduDetail/"+ edudetail.id_edu_detail, data)
            .then((response) => {
                console.log(response.data);
                setEdudetail({ ...edudetail, data });
                setSumited(true);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const newEdudetail = () => {
        setSumited(false);
    };



    return (
        <Container>
            <Form>

                {submited ? (<Alert color="success"><br /><br /><br /><br />
                    <center>อัพเดทรายละเอียดข้อมูลการศึกษาต่อสำเร็จ!<br /><br /><br /><br /><br />
                        <Button color="btn btn-success" href="/educationall">OK</Button></center>
                </Alert>
                ) : (
                    <Form >
                        <center><h3> รายละเอียดข้อมูลการศึกษาต่อ </h3></center>
                        
                        <Row>
                            <Col xs="6">
                                <FormGroup>
                                    <Label for="id_faculty">คณะที่เปิดรับ</Label>
                                    <Input type="select" name="id_faculty" id="id_faculty"
                                        onChange={handleInputChange} value={edudetail.id_faculty || ""} >
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
                                        {course.map((course) => {
                                            return (
                                                <option key={course.id_course} value={course.id_course}>
                                                    {course.name_course}</option>
                                            )
                                        })}
                                    </Input>
                                </FormGroup></Col>
                                <Col xs="6">
                                <FormGroup>
                                    <Label for="">กลุ่มสาขาวิชา</Label>
                                    <Input type="text" name="" id="" 
                                        onChange={handleInputChange}>
                                    </Input>
                                </FormGroup></Col>
                            <Col xs="6">
                                <FormGroup>
                                    <Label for="number_of_edu">จำนวนที่เปิดรับสมัคร</Label>
                                    <Input type="text" name="number_of_edu" id="number_of_edu" value={edudetail.number_of_edu || ""}
                                        onChange={handleInputChange}>
                                    </Input>
                                </FormGroup></Col>
                            <Col xs="6">
                                <FormGroup>
                                    <Label for="GPA">เกรดขั้นต่ำ</Label>
                                    <Input type="text" name="GPA" id="GPA" value={edudetail.GPA || ""}
                                        onChange={handleInputChange}>
                                    </Input>
                                </FormGroup></Col>
                            <Col xs="6">
                                <FormGroup>
                                    <Label for="curriculum_edu">แผนการเรียน</Label>
                                    <Input type="text" name="curriculum_edu" id="curriculum_edu" value={edudetail.curriculum_edu || ""}
                                        onChange={handleInputChange}>
                                    </Input>
                                </FormGroup></Col>
                            <Col xs="6">
                                <FormGroup>
                                    <Label for="id_education">Education</Label>
                                    <Input type="text" name="id_education" id="id_education"
                                        onChange={handleInputChange} value={edudetail.id_education || ""}>
                                    </Input>

                                </FormGroup></Col>
                            <Col xs="12">
                                <FormGroup>
                                    <Label for="note_condi">เงื่อนไขการรับสมัคร</Label>
                                    <Input type="textarea" name="note_condi" id="note_condi" value={edudetail.note_condi || ""}
                                        onChange={handleInputChange}>
                                    </Input>
                                </FormGroup></Col>
                        </Row>
                        <Button className="btn btn-success" onClick={saveEdudetail}>ยืนยัน</Button>
                    </Form>
                )}
            </Form>
        </Container >
    );
}

export default ViewEditEdudetail;