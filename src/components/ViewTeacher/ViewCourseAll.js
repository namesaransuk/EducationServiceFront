import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' //fornt
import { faEdit, faTrash, faSearch } from "@fortawesome/free-solid-svg-icons";
import {
  Container, Row, Col, Button, Form, FormGroup, Label, Input, FormText, Card, CardText, CardBody, CardLink,
  CardTitle, CardSubtitle, NavLink, Table
} from 'reactstrap';

const ViewCourseAll = (props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen(prevState => !prevState);

  const [course, setCourse] = useState([]);
  const [filteredData, setFilteredData] = useState(course);

  const handleSearch = (event) => {
    let value = event.target.value.toLowerCase();
    let result = [];
    console.log(value);
    result = course.filter((data) => {
      return data.name_course.search(value) != -1;

    });
    setFilteredData(result);
  }



  useEffect(() => {
    axios('https://educationservice.herokuapp.com/course/searchCourse?keyword=')
      .then(response => {
        console.log(response.data)
        setCourse(response.data);
        setFilteredData(response.data);
      })
      .catch(error => {
        console.log('Error getting fake data: ' + error);
      })
  }, []);


  return (
    <div className="pt-32">
      <div className="flex flex-col max-w-7xl mx-auto">
        <div className="text-center mx-auto">
          <Col>

            <Label for="id_course">ค้นหาชื่อสาขา</Label>
            <Input type="text" className="text-center" name="id_course" id="id_course" placeholder="กรุณาใส่ชื่อสาขาที่จะค้นหา" onChange={(event) => handleSearch(event)}>
            </Input>

          </Col>

        </div>
        </div>

        <div className="flex flex-col max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Row className="pt-5">

          <Col>
            <h3 className="block text-left">รายชื่อสาขา</h3>
          </Col>
          <Col>
            <a className="block text-right" href="/Teacher/insertcourse">เพิ่มสาขา</a>
          </Col>
        </Row>
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
                        รหัสสาขา
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-md font-medium text-white uppercase tracking-wider"
                      >
                        ชื่อสาขา
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredData.map((value) => {
                      return (
                        <tr key={value.id_course}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              {/* <div className="flex-shrink-0 h-10 w-10">
                              <img className="h-10 w-10 rounded-full" src={person.image} alt="" />
                            </div> */}
                              <div className="ml-4">
                                <div className="text-md text-gray-500">{value.id_course}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-md font-medium">
                            <div className="text-md text-gray-500">{value.name_course}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-md font-medium">
                            <a href={"/Teacher/editCourse/" + value.id_course} className="text-white bg-indigo-600 hover:bg-indigo-900 rounded-md px-4 py-2.5 hover:no-underline">
                              Edit
                            </a>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>      <center> {filteredData.length === 0 && <span>ไม่พบข้อมูลที่ค้นหา</span>} </center>

          </div>
        </div>
      </div>
      );
}

      export default ViewCourseAll;