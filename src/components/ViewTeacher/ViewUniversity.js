import React, { useState, useEffect } from 'react';
import axios from "axios";
import './viewuniversity.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' //fornt
import { faEdit, faTrash, faSearch } from "@fortawesome/free-solid-svg-icons";
import {
  Container, Row, Col, Button, Form, FormGroup, Label, Input, FormText, Card, CardText, CardBody, CardLink,
  CardTitle, CardSubtitle, NavLink, Table
} from 'reactstrap';

const ViewUniversity = () => {


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
  const [university, setUniversity] = useState([]);
  const [filteredData, setFilteredData] = useState(university);

  const handleSearch = (event) => {
    let value = event.target.value.toLowerCase();
    let result = [];
    console.log(value);
    result = university.filter((data) => {
      return data.name_uni.search(value) != -1;

    });
    setFilteredData(result);
  }



  useEffect(() => {
    axios('https://educationservice.herokuapp.com/university/searchUniversity?keyword=')
      .then(response => {
        console.log(response.data)
        setUniversity(response.data);
        setFilteredData(response.data);
      })
      .catch(error => {
        console.log('Error getting fake data: ' + error);
      })
  }, []);


  return (
    <div className="pt-32">
      <div className="flex flex-col max-w-7xl mx-auto px-3">
      <div className="text-center mx-auto">
          <Col>
            <FormGroup>
              <Label for="id_university">ค้นหาชื่อมหาวิทยาลัย</Label>
              <Input className="text-center" type="text" name="id_university" id="id_university" placeholder="กรุณาใส่ชื่อมหาลัยที่จะค้นหา" onChange={(event) => handleSearch(event)} >
                <FontAwesomeIcon icon={faSearch} />
              </Input>
            </FormGroup>
          </Col>
      </div>
        <Row className="pt-5">
          <Col>
            <h3 className="block text-left">รายชื่อมหาลัยมหาวิทยาลัย</h3>
          </Col>
          <Col>
            <a className="block text-right" href="/Teacher/insertuniversity">เพิ่มมหาวิทยาลัย</a>
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
                      ชื่อมหาวิทยาลัย
                    </th>
                    <th
                      scope="col"
                      className="break-all px-6 py-3 text-left text-md font-medium text-white uppercase tracking-wider"
                    >
                      รายละเอียด
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-md font-medium text-white uppercase tracking-wider"
                    >
                      ลิ้งค์
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredData.map((value) => (
                    <tr key={value.id_university}>
                      <td className="px-6 py-4 whitespace-wrap">
                        <div className="flex items-center">
                          {/* <div className="flex-shrink-0 h-10 w-10">
                              <img className="h-10 w-10 rounded-full" src={person.image} alt="" />
                            </div> */}
                          <div className="">
                            <div className="text-md font-medium text-gray-900"><img width="80" className="mx-auto" src={value.logo_uni || 'https://via.placeholder.com/150'} /></div>
                            <div className="text-md text-gray-500 text-center">{value.name_uni}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-wrap">
                        <div className="description text-md text-gray-900">{value.detail_uni}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <a className="text-md text-gray-500" target="_blank" href={value.url_uni}>{value.url_uni}</a>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-lg font-medium">
                        <a href={"/Teacher/editUniversity/" + value.id_university} className="text-white bg-indigo-600 hover:bg-indigo-900 rounded-md px-4 py-2.5 hover:no-underline">
                          Edit
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

            </div>
          </div>               <center> {filteredData.length === 0 && <span>ไม่พบข้อมูลที่ค้นหา</span>} </center>

        </div>
      </div>
    </div >
  );
}

export default ViewUniversity;