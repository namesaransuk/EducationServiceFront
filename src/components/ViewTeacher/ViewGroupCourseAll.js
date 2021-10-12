import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Row, Col, Button, FormGroup, Label, Input,
  NavLink, Table
} from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' //fornt
import { faEdit, faPen, faSearch, faTrash } from "@fortawesome/free-solid-svg-icons";

const ViewGroupCourse = (props) => {

  const [major, setMajor] = useState([]);
  const [filteredData, setFilteredData] = useState(major);

  const handleSearch = (event) => {
    let value = event.target.value.toLowerCase();
    let result = [];
    console.log(value);
    result = major.filter((data) => {
      return data.name_major.search(value) != -1;

    });
    setFilteredData(result);
  }



  useEffect(() => {
    axios('https://educationservice.herokuapp.com/groupmajor/searchgroupmajor?keyword=')
      .then(response => {
        console.log(response.data)
        setMajor(response.data);
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
            <FormGroup>
              <Label for="year_edu">ค้นหา</Label>
              <Input type="text" className="text-center" name="name_major" id="name_major" placeholder="กรุณาใส่ชื่อกลุ่มสาขาที่จะค้นหา" onChange={(event) => handleSearch(event)}>
                <FontAwesomeIcon icon={faSearch} /></Input>
            </FormGroup>
          </Col>
        </div>
      </div>

      <div className="flex flex-col max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Row className="pt-5">
        <Col>
          <h3 className="block text-left">รายชื่อกลุ่มสาขา</h3>
        </Col>
        <Col>
          <a className="block text-right" href="/Teacher/insertgroupcourse">เพิ่มกลุ่มสาขา</a>
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
                      รหัส
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-md font-medium text-white uppercase tracking-wider"
                    >
                      ชื่อกลุ่มสาขา
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredData.map((value) => {
                    return (
                      <tr key={value.id_major}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            {/* <div className="flex-shrink-0 h-10 w-10">
                              <img className="h-10 w-10 rounded-full" src={person.image} alt="" />
                            </div> */}
                            <div className="ml-4">
                              <div className="text-md text-gray-500">{value.id_major}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-md font-medium">
                          <div className="text-md text-gray-500">{value.name_major}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-md font-medium">
                          <a href={"/Teacher/editgroupcourse/" + value.id_major} className="text-white bg-indigo-600 hover:bg-indigo-900 rounded-md px-4 py-2.5 hover:no-underline">
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

export default ViewGroupCourse;