import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' //fornt
import { faEdit, faTrash, faSearch } from "@fortawesome/free-solid-svg-icons";
import {
  Container, Row, Col, Button, Form, FormGroup, Label, Input, FormText, Card, CardText, CardBody, CardLink,
  CardTitle, CardSubtitle, NavLink, Table
} from 'reactstrap';

const ViewEducationStudentAll = (props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen(prevState => !prevState);
  const [year, setYear] = useState([]);
  //ไปดึง api ของอันเก่ามาใช้จาก url
  useEffect(() => {
    axios.get("https://educationservice.herokuapp.com/Teacher/getClass").then((response) => {
      console.log(response);
      setYear(response.data.class);
    });
  }, []);
  return (
    <div className="pt-32">
      <div className="px-4 flex flex-col max-w-3xl mx-auto">
      <h3 className="text-center">ดูข้อมูลนักเรียน</h3>
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
                      className="px-12 py-3 text-left text-md font-medium text-white uppercase tracking-wider"
                    >
                      ห้องเรียน
                    </th>
                    <th
                      scope="col"
                      className="break-all px-6 py-3 text-left text-md font-medium text-white uppercase tracking-wider"
                    >
                      ดูข้อมูลรายชื่อนักเรียน
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {year.map((year) => {
                    return (
                      <tr key={year.class}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            {/* <div className="flex-shrink-0 h-10 w-10">
                              <img className="h-10 w-10 rounded-full" src={person.image} alt="" />
                            </div> */}
                            <div className="ml-4">
                              <div className="text-md text-gray-900">{year.year_class} / {year.class}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-left text-md font-medium">
                          <a type="button" href={"/Teacher/EducationStudentData/" + year.class} className="px-4 py-2.5 rounded text-white bg-indigo-600 hover:text-indigo-900">
                          ดูข้อมูลรายชื่อนักเรียน
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

export default ViewEducationStudentAll;