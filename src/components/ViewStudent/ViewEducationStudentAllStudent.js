import React, { useState, useEffect, useRef, useReducer } from "react";
import axios from "axios";
import Select from 'react-select';

import { getAllCountries } from "../calls/countries";
import {
  Container, Row, Col, Button, Form, FormGroup, Label, Input, FormText, Card, CardText, CardBody, CardLink,
  CardTitle, CardSubtitle, Badge, CardImg
  
} from 'reactstrap';
import {
  BriefcaseIcon,
  CalendarIcon,
  CheckIcon,
  ChevronDownIcon,
  CurrencyDollarIcon,
  LinkIcon,
  LocationMarkerIcon,
  PencilIcon,
} from '@heroicons/react/solid'
const ViewEducationStudentAllStudent = () => {
  const [countries, setCountries] = useState([]);
  const componentIsMounted = useRef(true);
  const [filterInput, setFilterInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      name_uni: "",
      name_faculty: "",
      name_course: "",
      name_major: "",
      GPA: ""
    }
  );
  
  useEffect(() => {
    getAllCountries()
      .then(response => {
        if (componentIsMounted.current) {
          setCountries(response);
        }
      })
      .catch(err => {
        console.log(err);
      });
    return () => {
      componentIsMounted.current = false;
    };
  }, []);


  
  const [university, setUniversity] = useState([]);
  //ไปดึง api ของอันเก่ามาใช้จาก url
  const updateUniversity = () => {
    axios.get("http://localhost:8080/EducationData/getAllEducationUniversity").then((response) => {
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
    axios.get("http://localhost:8080/EducationData/getAllEducationFaculty").then((response) => {
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
    axios.get("http://localhost:8080/EducationData/getAllEducationCourse").then((response) => {
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
    axios.get("http://localhost:8080/EducationData/getAllEducationMajor").then((response) => {
      console.log(response);
      setGroupMajor(response.data.major);
    });
  };
  useEffect(() => {
    updateGroupMajor();
  }, []);

  const handleFilterCountries = event => {
    const { name, value } = event.target;
    setFilterInput({ [name]: value });
  };

  const filterCountries = list => {
    return list.filter(item => {
      return (
        item.name_major.toLowerCase().includes(filterInput.name_major.toLowerCase()) &&
        item.name_uni.toLowerCase().includes(filterInput.name_uni.toLowerCase()) &&
        item.name_faculty.toLowerCase().includes(filterInput.name_faculty.toLowerCase()) &&
        item.name_course.toLowerCase().includes(filterInput.name_course.toLowerCase()) &&
        item.GPA >= filterInput.GPA 
        // &&item.name_course >= filterInput.name_course
        
      );
    });
  };

  const countriesList = filterCountries(countries);


  return (
    <div class="mt-32">
      <div className="flex flex-col max-w-7xl mx-auto">
        <div className="text-center mx-auto">
          <h3 className="pb-4">ค้นหาข้อมูลการรับสมัครเข้าศึกษาต่อ</h3>
          <hr style={{width:500}} />
          <Row>
          <Col xs="6">
            <FormGroup>
              <Label for="id_university">ชื่อมหาวิทยาลัย</Label>
              <Input type="select" name="name_uni" id="name_uni" placeholder="กรุณาใส่ชื่อมหาลัยที่จะค้นหา" value={filterInput.name_uni}onChange={e => handleFilterCountries(e)}>
                <option value="">ใส่คำค้นหา</option>
                {university.map((university) => {
                  return (
                    <option value={university.name_uni}>{university.name_uni}</option>
                  );
                })}
              </Input>
            </FormGroup>
          </Col>
          <Col xs="6">
            <FormGroup>
              <Label for="id_faculty">คณะ</Label>
              <Input type="select" name="name_faculty" id="name_faculty" placeholder="กรุณาใส่ชื่อคณะที่จะค้นหา"  value={filterInput.name_faculty}onChange={e => handleFilterCountries(e)}>
                <option value="">ใส่คำค้นหา</option>
                {faculty.map((faculty) => {
                  return (
                    <option value={faculty.name_faculty}>{faculty.name_faculty}</option>
                  );
                })}
              </Input>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col xs="6">
            <FormGroup>
              <Label for="id_course">สาขา</Label>
              <Input type="select" name="name_course" id="name_course" placeholder="กรุณาใส่ชื่อสาขาที่จะค้นหา"  value={filterInput.name_course}onChange={e => handleFilterCountries(e)}>
                <option value="">ใส่คำค้นหา</option>
                {course.map((course) => {
                  return (
                    <option value={course.name_course}>{course.name_course}</option>
                  );
                })}
              </Input>
            </FormGroup>
          </Col>
          <Col xs="6">
            <FormGroup>
              <Label for="id_major">กลุ่มสาขา</Label>
              <Input type="select" name="name_major" id="name_major" placeholder="กรุณาใส่ชื่อกลุ่มสาขาที่จะค้นหา"value={filterInput.name_major}onChange={e => handleFilterCountries(e)} >
                <option value="">ใส่คำค้นหา</option>
                {groupmajor.map((groupmajor) => {
                  return (
                    <option value={groupmajor.name_major}>{groupmajor.name_major}</option>
                  );
                })}
              </Input>
            </FormGroup>
          </Col>
          <Col xs="12">
            <FormGroup>
              <center><Label for="id_major">GPA</Label> </center>
             <Input type="text" name="GPA" id="GPA" placeholder="กรุณาใส่ข้อมูลเพื่อค้นหา"value={filterInput.GPA}onChange={e => handleFilterCountries(e)}> 
            
              </Input>
            </FormGroup>
          </Col>
        </Row>
        <Row>
        <Col xs="4">
            <FormGroup>
              <Label for="id_university">ชื่อมหาวิทยาลัย</Label>
              <Input type="text" name="name_uni" id="name_uni" placeholder="กรุณาใส่ชื่อมหาลัยที่จะค้นหา" value={filterInput.name_uni}onChange={e => handleFilterCountries(e)}>
              </Input>
            </FormGroup>
          </Col>
          <Col xs="4">
            <FormGroup>
              <Label for="id_faculty">คณะ</Label>
              <Input type="text" name="name_faculty" id="name_faculty" placeholder="กรุณาใส่ชื่อคณะที่จะค้นหา"  value={filterInput.name_faculty}onChange={e => handleFilterCountries(e)}>
              </Input>
            </FormGroup>
          </Col>
          <Col xs="4">
            <FormGroup>
              <Label for="id_course">สาขา</Label>
              <Input type="text" name="name_course" id="name_course" placeholder="กรุณาใส่ชื่อสาขาที่จะค้นหา"  value={filterInput.name_course}onChange={e => handleFilterCountries(e)}>
              </Input>
            </FormGroup>
          </Col>
          </Row>
          {/* <Select
      name="name_course"
      id="name_course" placeholder="กรุณาใส่ชื่อสาขาที่จะค้นหา"  value={filterInput.name_course}onChange={e => handleFilterCountries(e)}
      options = {university}

          /> */}

        </div>
      </div>
      <div class="flex flex-col max-w-7xl px-4 mx-auto pt-2">
        <div class="row row-cols-1 row-cols-md-2">
          {countriesList.map((country) => {
            return (
              <div class="col mb-4">
                <Card>
                  <CardImg width="10" className="mx-auto" src={country.image || 'https://via.placeholder.com/604x317'} />

                  <CardBody>
                    <div className="lg:items-center lg:justify-between">
                      <div className="flex-1 min-w-0">
                        <h2 className="text-lg flex-warp font-bold leading-7 text-gray-900 sm:text-xl pb-3 border-b">{country.name_uni}</h2>
                        <div className="">
                          <div className="mt-2 flex items-center text-sm text-gray-500">
                            <BriefcaseIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                            คณะ :  {country.name_faculty}
                          </div>
                          <div className="mt-2 flex items-center text-sm text-gray-500">
                            <BriefcaseIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                            สาขา : {country.name_course}
                          </div>
                          <div className="mt-2 flex items-center text-sm text-gray-500">
                            <LocationMarkerIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                            รอบ : {country.name_round}
                          </div>
                          <div className="mt-2 flex items-center text-sm text-gray-500">
                            <LocationMarkerIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                            GPA : {country.GPA}
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 lg:mt-0">
                        <span className="">
                          <a
                            type="button"
                            href={"/Student/educationstudentdetail/" + country.id_education}
                            className="hover:no-underline inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            ดูรายละเอียด
                          </a>
                        </span>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </div>
            );
          })}

          {/* <Row>
        <Col>          
        <Card>
        <CardBody>
          <CardTitle tag="h5">Test</CardTitle>
        </CardBody>
        <img width="100%" src="/assets/318x180.svg" alt="Card image cap" />
        <CardBody>
          <CardText>คราวๆ</CardText>
          <Button href="./universitydetail">รายละเอียด</Button>
        </CardBody>
      </Card>
</Col>
        </Row> */}


        </div>
        <center> {countriesList.length === 0 && <span>ไม่พบข้อมูลที่ค้นหา</span>} </center>
      </div>
    </div>

  );
}

export default ViewEducationStudentAllStudent;