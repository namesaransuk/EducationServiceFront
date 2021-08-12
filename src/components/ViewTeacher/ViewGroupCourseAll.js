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

  const selectmajor = () => {
    axios.get("http://localhost:8080/groupmajor").then((response) => {
      console.log(response);
      setMajor(response.data.major);
      console.log("Updating products.....");
    });
  };
  useEffect(() => {
    selectmajor();
  }, []);

  return (
    <div className="pt-32">
      <div class="container">
        <br />
        <Row>
          <Col xs="6">
            <FormGroup>
              <Label for="year_edu">ค้นหา</Label>
              <Input type="text" name="year_edu" id="year_edu"  >
                <FontAwesomeIcon icon={faSearch} /></Input>
            </FormGroup></Col>
        </Row>
      </div>
      <br />

      <Row className="px-12 pt-5">
        <Col>
          <h3 className="block text-left">รายชื่อกลุ่มสาขา</h3>
        </Col>
        <Col>
          <a className="block text-right" href="./insertgroupcourse">เพิ่มกลุ่มสาขา</a>
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
                      รหัส
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      ชื่อกลุ่มสาขา
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {major.map((major) => {
                    return (
                      <tr key={major.id_major}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            {/* <div className="flex-shrink-0 h-10 w-10">
                              <img className="h-10 w-10 rounded-full" src={person.image} alt="" />
                            </div> */}
                            <div className="ml-4">
                              <div className="text-sm text-gray-500">{major.id_major}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="text-sm text-gray-500">{major.name_major}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <a href={"/editgroupcourse/" + major.id_major} className="text-white bg-indigo-600 hover:bg-indigo-900 rounded-md px-4 py-2.5 hover:no-underline">
                            Edit
                          </a>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}

export default ViewGroupCourse;