import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' //fornt
import { faEdit, faTrash, faSearch } from "@fortawesome/free-solid-svg-icons";
import {
  Container, Row, Col, Button, Form, FormGroup, Label, Input, FormText, Card, CardText, CardBody, CardLink,
  CardTitle, CardSubtitle, NavLink, Table
} from 'reactstrap';

  const ViewFacultyAll = () => {
    const [faculty, setFaculty] = useState([]);
    const [filteredData, setFilteredData] = useState(faculty);
  
    const handleSearch = (event) => {
      let value = event.target.value.toLowerCase();
      let result = [];
      console.log(value);
      result = faculty.filter((data) => {
      return  data.name_faculty.search(value) != -1;
  
      });
      setFilteredData(result);
      }
      
     
  
    useEffect(() => {
      axios('http://localhost:8080/Faculty/searchFaculty?keyword=')
      .then(response => {
      console.log(response.data)
      setFaculty(response.data);
      setFilteredData(response.data);
      })
      .catch(error => {
      console.log('Error getting fake data: ' + error);
      })
      }, []);


  return (
    <div className="pt-32">
      <div class="container">
        <br />
        <Row>
          <Col xs="6">
            <FormGroup>
              <Label for="id_faculty">ชื่อคณะ</Label>
              <Input type="text" name="id_faculty" id="id_faculty" placeholder="กรุณาใส่ชื่อคณะที่จะค้นหา" onChange={(event) =>handleSearch(event)}>
              </Input>
            </FormGroup>
          </Col>
        </Row>
        <br />
      </div>
      <br />

      <Row className="px-12 pt-5">
        <Col>
          <h3 className="block text-left">รายชื่อคณะ</h3>
        </Col>
        <Col>
          <a className="block text-right" href="./insertfaculty">เพิ่มคณะ</a>
        </Col>
      </Row>
      <div className="flex flex-col max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="table-striped min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-500">
                  <tr>
                    <th
                      scope="col"
                      className="px-12 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      ชื่อคณะ
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredData.map((value) => {
                    return (
                    <tr key={value.id_faculty}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {/* <div className="flex-shrink-0 h-10 w-10">
                              <img className="h-10 w-10 rounded-full" src={person.image} alt="" />
                            </div> */}
                          <div className="ml-4">
                            <div className="text-sm text-gray-500">{value.name_faculty}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <a href={"./editFaculty/" + value.id_faculty} className="text-white bg-indigo-600 hover:bg-indigo-900 rounded-md px-4 py-2.5 hover:no-underline">
                          Edit
                        </a>
                      </td>
                    </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div><center> {filteredData.length === 0 && <span>ไม่พบข้อมูลที่ค้นหา</span>} </center>
        </div>
      </div>
    </div>
  );
}

export default ViewFacultyAll;