import React, { useState, useEffect } from "react";
import axios from "axios";
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
const ViewEducationStudentAllStudent = (props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen(prevState => !prevState);
  const [educationdata, setEducationdata] = useState([]);
  const [filteredData, setFilteredData] = useState(educationdata);

  const handleSearch = (event) => {
    let value = event.target.value.toLowerCase();
    let result = [];
    console.log(value);
    result = educationdata.filter((data) => {
      if (educationdata === "") {
        return data
      } else if (data.name_uni.search(value) >= 0) {
        return data
      } else if (data.name_course.search(value) >= 0) {
        return data
      }
      else if (data.name_faculty.search(value) >= 0) {
        return data
      } else if (data.name_major.search(value) >= 0) {
        return data
      } else if (data.GPA.search(value) >= 0) {
        return data
      } else if (data.name_round.search(value) >= 0) {
        return data
      }


    });
    setFilteredData(result);
  }


  useEffect(() => {
    axios.get("http://localhost:8080/EducationData/getAllEducationData").then((response) => {
      console.log(response);
      setEducationdata(response.data);
      setFilteredData(response.data);

    });
  }, []);

  return (
    <div class="mt-32">
      <div className="flex flex-col max-w-7xl mx-auto">
        <div className="text-center mx-auto">
          <h3 className="pb-4">ค้นหาข้อมูลการรับสมัครเข้าศึกษาต่อ</h3>
          <hr style={{width:500}} />
          <Row>
            <Col>
              <FormGroup>
                <Label for="id_major">ค้นหาข้อมูล</Label>
                <Input type="text" className="text-center" name="GPA" id="GPA" placeholder="กรุณาใส่ข้อมูลเพื่อค้นหา" onChange={(event) => handleSearch(event)} />
              </FormGroup>
            </Col>
          </Row>
        </div>
      </div>
      <div class="flex flex-col max-w-7xl px-4 mx-auto pt-2">
        <div class="row row-cols-1 row-cols-md-2">
          {filteredData.map((value) => {
            return (
              <div class="col mb-4">
                <Card>
                  <CardImg top width="" src="https://tcaster.net/wp-content/uploads/2020/10/631010.01.png" alt="Card image cap" />
                  <CardBody>
                    <div className="lg:items-center lg:justify-between">
                      <div className="flex-1 min-w-0">
                        <h2 className="text-lg flex-warp font-bold leading-7 text-gray-900 sm:text-xl pb-3 border-b">{value.name_uni}</h2>
                        <div className="">
                          <div className="mt-2 flex items-center text-sm text-gray-500">
                            <BriefcaseIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                            คณะ :  {value.name_faculty}
                          </div>
                          <div className="mt-2 flex items-center text-sm text-gray-500">
                            <BriefcaseIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                            สาขา : {value.name_course}
                          </div>
                          <div className="mt-2 flex items-center text-sm text-gray-500">
                            <LocationMarkerIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                            รอบ : {value.name_round}
                          </div>
                          <div className="mt-2 flex items-center text-sm text-gray-500">
                            <LocationMarkerIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                            GPA : {value.GPA}
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 lg:mt-0">
                        <span className="">
                          <a
                            type="button"
                            href={"/educationstudentdetail/" + value.id_education}
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
        <center> {filteredData.length === 0 && <span>ไม่พบข้อมูลที่ค้นหา</span>} </center>
      </div>
    </div>

  );
}

export default ViewEducationStudentAllStudent;