import React, { useState, useEffect } from 'react';
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' //fornt
import { faEdit, faTrash, faSearch } from "@fortawesome/free-solid-svg-icons";
import {
  Container, Row, Col, Button, Form, FormGroup, Label, Input, FormText, Card, CardText, CardBody, CardLink,
  CardTitle, CardSubtitle, NavLink, Table
} from 'reactstrap';

const ViewUniversity = () => {

  const [university, setUniversity] = useState([]);

  const people = [
    {
      name: 'Jane Cooper',
      title: 'Regional Paradigm Technician',
      department: 'Optimization',
      role: 'Admin',
      email: 'jane.cooper@example.com',
      image:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
    },
    // More people...
  ]
  const selectUniversity = () => {
    axios.get("http://localhost:8080/university")
      .then((response) => {
        console.log(response);
        setUniversity(response.data.university);
        console.log("select University.....");
      });
  };

  useEffect(() => {
    selectUniversity();
  }, []);

  return (
    <div className="pt-32">
      <Container>
        <br />
        <Row>
          <Col xs="6">
            <FormGroup>
              <br />
              <Label for="id_university">ค้นหาชื่อมหาวิทยาลัย</Label>
              <Input type="select" name="id_university" id="id_university" >
                {university.map((university) => {
                  return (
                    <option key={university.id_university}>{university.name_uni}</option>
                  );
                })}
                <FontAwesomeIcon icon={faSearch} />
              </Input>
            </FormGroup>
          </Col>
        </Row>
      </Container>

      <Row className="px-12 pt-5">
        <Col>
          <h3 className="block text-left">รายชื่อมหาลัยมหาวิทยาลัย</h3>
        </Col>
        <Col>
          <a className="block text-right" href="./insertuniversity">เพิ่มมหาวิทยาลัย</a>
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
                      ชื่อมหาวิทยาลัย
                    </th>
                    <th
                      scope="col"
                      className="break-all px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      รายละเอียด
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      ลิ้งค์
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {university.map((university) => (
                    <tr key={university.id_university}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {/* <div className="flex-shrink-0 h-10 w-10">
                              <img className="h-10 w-10 rounded-full" src={person.image} alt="" />
                            </div> */}
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{university.logo_uni}</div>
                            <div className="text-sm text-gray-500">{university.name_uni}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-wrap">
                        <div className="text-sm text-gray-900">{university.detail_uni}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <a className="text-sm text-gray-500" target="_blank" href={university.url_uni}>{university.url_uni}</a>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <a href={"./editUniversity/" + university.id_university} className="text-white bg-indigo-600 hover:bg-indigo-900 rounded-md px-4 py-2.5 hover:no-underline">
                          Edit
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}

export default ViewUniversity;