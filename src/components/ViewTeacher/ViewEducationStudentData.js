import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' //fornt
import { faEdit, faTrash, faSearch } from "@fortawesome/free-solid-svg-icons";
import {
  Container, Row, Col, Button, Form, FormGroup, Label, Input, FormText, Card, CardText, CardBody, CardLink,
  CardTitle, CardSubtitle, NavLink, Table
} from 'reactstrap';

const ViewEducationStudentData = ({ id }) => {
  const [classS, setClassS] = useState([]);
  const [filteredData, setFilteredData] = useState(classS);

  //ไปดึง api ของอันเก่ามาใช้จาก url
  useEffect(() => {
    axios.get("https://educationservice.herokuapp.com/Teacher/getStudentClass/" + id).then((response) => {
      console.log(response);
      setFilteredData(response.data);
      setClassS(response.data);
    });
  }, []);
  const handleSearch = (event) => {
    let value = event.target.value.toLowerCase();
    let result = [];
    console.log(value);
    result = classS.filter((data) => {
      if (classS === "") {
        return data
      } else if (data.year_stu.search(value) != -1) {
        return data
      } else if (data.fname_stu.search(value) != -1) {
        return data
      } else if (data.class.search(value) != -1) {
        return data
      } else if (data.year_class.search(value) != -1) {
        return data
      } else if (data.id_stu.search(value) != -1) {
        return data
      }


    });
    setFilteredData(result);
  }

  return (
    <div className="pt-32">
      <div className="flex flex-col max-w-7xl mx-auto">
        <div className="text-center mx-auto">
          <Col>
            <FormGroup>
              <Label for="degree">ค้นหาข้อมูลนักเรียน</Label>
              <Input type="text" className="text-center" name="degree" id="degree" placeholder="กรุณาใส่ข้อมูลจะค้นหา" onChange={(event) => handleSearch(event)}>
              </Input>
            </FormGroup>
          </Col>
          {/* <FormGroup>
              <Label for="degree">ค้นหาชื่อหลักสูตร</Label>
              <Input type="select" name="degree" id="degree"placeholder="กรุณาใส่ชื่อกลุ่มสาขาที่จะค้นหา" onChange={(event) =>handleSearch(event)}>
                {degree.map((degree) => {
                  return (
                    <option key={degree.id_degree}>{degree.name_degree}</option>
                  );
                })}
              </Input>
            </FormGroup> */}
          <br />
        </div>

        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="table-striped min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-500">
                  <tr>
                    <th
                      scope="col"
                      className="px-12 py-3 text-left text-md font-medium text-white uppercase tracking-wider"
                    >
                      ปีการศีกษา
                    </th>
                    <th
                      scope="col"
                      className="break-all px-6 py-3 text-left text-md font-medium text-white uppercase tracking-wider"
                    >
                      รหัสนักเรียน
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-md font-medium text-white uppercase tracking-wider"
                    >
                      ชื่อ-นามสกุล
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-md font-medium text-white uppercase tracking-wider"
                    >
                      ห้องเรียน
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredData.map((value) => (
                    <tr key={value.id_stu}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="ml-4">
                            <div className="text-md text-gray-500">{value.year_stu}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-md text-gray-500">{value.id_stu}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-md text-gray-500">{value.fname_stu}  {value.lname_stu}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-md text-gray-500">{value.year_class}/{value.class}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-lg font-medium">
                        <a href={"./../EducationStudentProfile/" + value.id_stu} className="text-white bg-indigo-600 hover:bg-indigo-900 rounded-md px-4 py-2.5 hover:no-underline">
                          ดูข้อมูลนักเรียน
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <br /><br /><br /><br /><br />
            </div>
          </div>               <center> {filteredData.length === 0 && <span>ไม่พบข้อมูลที่ค้นหา</span>} </center>
        </div>
      </div>
    </div>
  );
}



export default ViewEducationStudentData;