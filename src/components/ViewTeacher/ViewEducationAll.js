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

  useEffect(() => {
    axios.get("http://localhost:8080/Education/getEducation")
      .then((response) => {
        setEducation(response.data);
      });

  }, []);

  {/*const searchEducation = () =>{
    const[error, setError]= useState(null);
    const[isLoaded,setIsloaded] = useState(false);
    const[edu,setEdu]=useState([])

    useEffect(()=>{
      fetch("http://localhost:8080/Education")
      .then(res =>res.json())
    })
  }*/}


  return (
    <div className="pt-32">
      <div className="container">
        <br />
        <Row>
          <Col xs="6">
            <FormGroup>
              <Label for="year_edu">ค้นหา</Label>
              <Input type="text" value="" >

              </Input>
            </FormGroup></Col>
        </Row>
      </div>
      <br />

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
                      ปี
                    </th>
                    <th
                      scope="col"
                      className="break-all px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      รอบ
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      ชื่อมหาวิทยาลัย
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      วันที่เปิดรับสมัคร
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
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
                  {education.map((education) => {
                    return (
                    <tr key={education.id_education}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {/* <div className="flex-shrink-0 h-10 w-10">
                              <img className="h-10 w-10 rounded-full" src={person.image} alt="" />
                            </div> */}
                          <div className="ml-4">
                            <div className="text-sm text-gray-900">{education.year_edu}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-wrap">
                        <div className="text-sm text-gray-900">{education.name_round}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{education.name_uni}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-wrap">
                        <div className="text-sm text-gray-900">{education.open_date}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-wrap">
                        <div className="text-sm text-gray-900">{education.close_date}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <a type="button" href={"/editeducation/" + education.id_education} className="text-white bg-indigo-600 hover:bg-indigo-900 rounded-md px-4 py-2.5 hover:no-underline">
                          <b>แก้ไขข้อมูล</b>
                        </a>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                        <a type="button" href={"/edudetailall/" + education.id_education} className="text-white bg-blue-600 hover:bg-blue-900 rounded-md px-4 py-2.5 hover:no-underline">
                          <b>เพิ่มรายละเอียด</b>
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

export default ViewEducationAll;