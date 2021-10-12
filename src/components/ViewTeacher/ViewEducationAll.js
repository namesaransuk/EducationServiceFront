import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' //fornt
import { faEdit, faPen } from "@fortawesome/free-solid-svg-icons";
import {
  Row, Col, Button, FormGroup, Label, Input,
  NavLink, Table
} from 'reactstrap';


const ViewEducationAll = () => {
  const [education, setEducation] = useState([])

  const [filteredData, setFilteredData] = useState(education);

  const handleSearch = (event) => {
    let value = event.target.value.toLowerCase();
    let result = [];
    console.log(value);
    result = education.filter((data) => {
      if (education === "") {
        return data
      } else if (data.name_uni.search(value) != -1) {
        return data
      } else if (data.name_round.search(value) != -1) {
        return data
      } else if (data.year_edu.search(value) != -1) {
        return data
      }

    });
    setFilteredData(result);
  }



  useEffect(() => {
    axios('https://educationservice.herokuapp.com/education/searchEducation?keyword=')
      .then(response => {
        console.log(response.data)
        setEducation(response.data);
        setFilteredData(response.data);
      })
      .catch(error => {
        console.log('Error getting fake data: ' + error);
      })
  }, []);



  return (
    <div className="pt-32">

      <div className="flex flex-col max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mx-auto">
          <Col>
            <FormGroup>
              <Label for="year_edu">ค้นหา</Label>
              <Input className="text-center" type="text" name="name_uni" id="name_uni" placeholder="กรุณาใส่ข้อมูลที่จะค้นหา" onChange={(event) => handleSearch(event)} >

              </Input>
            </FormGroup>
          </Col>
        </div>
        <Row className="pt-5">
          <Col>
            <h3 className="block text-left">รายชื่อการรับเข้าศึกษาต่อ</h3>
          </Col>
          <Col>
            <a className="block text-right" href="/Teacher/InsertEducation">เพิ่มข้อมูล</a>
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
                      ปี
                    </th>
                    <th
                      scope="col"
                      className="break-all px-6 py-3 text-left text-md font-medium text-white uppercase tracking-wider"
                    >
                      รอบ
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-md font-medium text-white uppercase tracking-wider"
                    >
                      ชื่อมหาวิทยาลัย
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-md font-medium text-white uppercase tracking-wider"
                    >
                      วันที่เปิดรับสมัคร
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-md font-medium text-white uppercase tracking-wider"
                    >
                      วันที่ปิดรับสมัคร
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Insert</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredData.map((value) => {
                    return (
                      <tr key={value.id_education}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            {/* <div className="flex-shrink-0 h-10 w-10">
                              <img className="h-10 w-10 rounded-full" src={person.image} alt="" />
                            </div> */}
                            <div className="ml-4">
                              <div className="text-md text-gray-900">{value.year_edu}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-wrap">
                          <div className="text-md text-gray-900">{value.name_round}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-md text-gray-500">{value.name_uni}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-wrap">
                          <div className="text-md text-gray-900">{value.open_date}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-wrap">
                          <div className="text-md text-gray-900">{value.close_date}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-md font-medium">
                          <a type="button" href={"/Teacher/editeducation/" + value.id_education} className="text-white bg-indigo-600 hover:bg-indigo-900 rounded-md px-4 py-2.5 hover:no-underline">
                            <b>แก้ไขข้อมูล</b>
                          </a>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-left text-md font-medium">
                          <a type="button" href={"/Teacher/edudetailall/" + value.id_education} className="text-white bg-blue-600 hover:bg-blue-900 rounded-md px-4 py-2.5 hover:no-underline">
                            <b>เพิ่มรายละเอียด</b>
                          </a>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>        <center> {filteredData.length === 0 && <span>ไม่พบข้อมูลที่ค้นหา</span>} </center>

        </div>
      </div>
    </div>
  );
}

export default ViewEducationAll;