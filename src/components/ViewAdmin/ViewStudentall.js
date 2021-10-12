import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' //fornt
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import {
  Row, Col, Button, FormGroup, Label, Input,
  NavLink, Table
} from 'reactstrap';
import Swal from 'sweetalert2';

import confirm from "reactstrap-confirm";

const Studentall = () => {
  const [students, setStudents] = useState([])
  const [filteredData, setFilteredData] = useState(students);

  const handleSearch = (event) => {
    let value = event.target.value.toLowerCase();
    let result = [];
    console.log(value);
    result = students.filter((data) => {
      if (students === "") {
        return data
      } else if (data.id_stu.search(value) != -1) {
        return data
      } else if (data.year_stu.search(value) != -1) {
        return data
     
      }
    });
    setFilteredData(result);
  }

  useEffect(() => {
    axios.get("https://educationservice.herokuapp.com/Staff/getStudent")
      .then((response) => {
        setStudents(response.data);
        setFilteredData(response.data);
      })
      .catch(error => {
        console.log('Error getting fake data: ' + error);
      })
  }, []);

  // const deleteProduct = async (Name, id) => {
  //   let result = await confirm(
  //     {
  //       title: <>คำเตือน!! </>,
  //       message: 'คุณต้องการลบผู้ดูเเล" ' + Name + ' "ใช่ไหม?',
  //       confirmText: "ใช่",
  //       confirmColor: "primary",
  //       cancelText: "ไม่ใช่",
  //       cancelColor: "btn btn-danger",

  //     }); (window.location.assign("/Admin/Adminall"))

  //   if (result) {
  //     axios.delete("http://localhost:8080/staff/DeleteStaff/" + id)//คำสั่งลบที่ดึงมาจาก url
  //       .then((response) => {
  //         setAdmin(); //อัพเดตหน้าว่าลบไปเเล้ว
  //       });
  //   }
  // };


  return (
    <div>
      <div className="px-4 flex flex-col max-w-3xl mx-auto mt-32">
        <div className="text-center mx-auto">
          <h3 className="text-center">นักเรียน</h3>
          <Col>
            <FormGroup>
              <Label for="year_edu">ค้นหา</Label>
              <Input type="text" className="text-center" name="fname_staff" id="fname_staff" placeholder="กรุณาใส่ชื่อที่จะค้นหา" onChange={(event) => handleSearch(event)} />
            </FormGroup>
          </Col>
        </div>
      </div>
      <div className="flex flex-col max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Row className="pt-5">
          <Col>
            <h3 className="block text-left">รายชื่อนักเรียน</h3>
          </Col>
          <Col>
            <a className="block text-right" href="/Admin/InsertStudent">เพิ่มนักเรียน</a>
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
                      รหัสนักเรียน
                    </th>
                    <th
                      scope="col"
                      className="break-all px-6 py-3 text-left text-md font-medium text-white uppercase tracking-wider"
                    >
                      ชื่อ-นามสกุล
                  
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-md font-medium text-white uppercase tracking-wider"
                    >
                      ห้อง
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-md font-medium text-white uppercase tracking-wider"
                    >
                      ปีการศึกษา
                    </th>
             
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredData.map((value) => (
                    <tr key={value.id_stu}>
                      <td className="px-6 py-4 whitespace-wrap">
                        <div className="flex items-center">
                          {/* <div className="flex-shrink-0 h-10 w-10">
                              <img className="h-10 w-10 rounded-full" src={person.image} alt="" />
                            </div> */}
                          <div className="ml-4">
                            <div className="text-md font-medium text-gray-900">{value.id_stu}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap ">
                        <div className="text-md text-gray-900">{value.title} {value.fname_stu} {value.lname_stu}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-md text-gray-900">{value.class}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-md text-gray-900">{value.year_stu}</div>
                      </td>
                      {/* <td className="px-6 py-4 whitespace-nowrap text-right text-lg font-medium">
                        <a onClick={() => deleteProduct(value.fname_staff, value.id_staff)} className="text-white bg-red-600 hover:bg-red-800 rounded-md px-4 py-2.5 hover:no-underline">
                          Delete
                        </a>
                      </td> */}
                    </tr>
                  ))}
                </tbody>
              </table>

            </div>
          </div>               <center> {filteredData.length === 0 && <span>ไม่พบข้อมูลที่ค้นหา</span>} </center>

        </div>
      </div>
    </div>
  );
}

export default Studentall;