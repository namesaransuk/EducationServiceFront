import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' //fornt
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import {
  Row, Col, Button, FormGroup, Label, Input,
  NavLink, Table
} from 'reactstrap';


const ViewEducationAll = ({ id }) => {
  const [edudetail, setEdudetail] = useState([])
  const [education, setEducation] = useState([])

  const [filteredData, setFilteredData] = useState(edudetail);

  const handleSearch = (event) => {
    let value = event.target.value.toLowerCase();
    let result = [];
    console.log(value);
    result = edudetail.filter((data) => {
      if (edudetail === "") {
        return data
      } else if (data.name_course.search(value) != -1) {
        return data
      } else if (data.name_faculty.search(value) != -1) {
        return data
      } else if (data.GPA.search(value) != -1) {
        return data
      } else if (data.number_of_edu.search(value) != -1) {
        return data
      } else if (data.name_curriculum.search(value) != -1) {
        return data
      }

    });
    setFilteredData(result);
  }



  useEffect(() => {
    axios.get("https://educationservice.herokuapp.com/EduDetail/getEduDetailByIdeducation/" + id)
      .then((response) => {
        setEdudetail(response.data);
        setFilteredData(response.data);
      });

  }, [id]);

  useEffect(() => {
    axios.get("https://educationservice.herokuapp.com/Education/" + id)
      .then((response) => {
        setEducation(response.data);
      });

  }, [id]);



  return (
    <div className="pt-32">
      <div className="flex flex-col max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mx-auto">
          <Col>
            <FormGroup>
              <h2>{education.name_uni}</h2>
              <h5>รอบ : {education.name_round}</h5>
            </FormGroup>
          </Col>
          <hr style={{ width: 500 }} />
          <Col>
            <FormGroup>
              <Label for="id_university">ค้นหาข้อมูล</Label>
              <Input type="text" className="text-center" name="name_course" id="name_course" placeholder="กรุณาใส่ข้อมูลที่จะค้นหา" onChange={(event) => handleSearch(event)} >
              </Input>
            </FormGroup>
          </Col>
        </div>

        <Row className="pt-5">
          <Col>
            <h3 className="block text-left"></h3>
          </Col>
          <Col>
            <a className="block text-right" href={"/Teacher/InsertEdudetail/" + education.id_education}>เพิ่มรายละเอียดข้อมูลการเข้าศึกษาต่อ</a>
          </Col>
        </Row>
        <div className="mt-1 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="table-striped min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-500">
                  <tr>
                    <th
                      scope="col"
                      className="px-12 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      คณะ
                    </th>
                    <th
                      scope="col"
                      className="break-all px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      สาขา
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      จำนวน
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      แผนการเรียน
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      เกรดที่กำหนด
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredData.map((value) => {
                    return (
                      <tr key={value.id_edu_detail}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            {/* <div className="flex-shrink-0 h-10 w-10">
                              <img className="h-10 w-10 rounded-full" src={person.image} alt="" />
                            </div> */}
                            <div className="ml-4">
                              <div className="text-sm text-gray-900">{value.name_faculty}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-wrap">
                          <div className="text-sm text-gray-900">{value.name_course}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{value.number_of_edu}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-wrap">
                          <div className="text-sm text-gray-900">{value.name_curriculum}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-wrap">
                          <div className="text-sm text-gray-900">{value.GPA}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <a type="button" href={"/Teacher/editedudetail/" + value.id_edu_detail} className="text-white bg-indigo-600 hover:bg-indigo-900 rounded-md px-4 py-2.5 hover:no-underline">
                            <b>Edit</b>
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