import axios from "axios";
import React, { useState, useEffect } from "react"
import {
  Container, Row, Col, Button, Form, FormGroup, Label, Input, FormText, Card, CardText, CardBody, CardLink,
  CardTitle, CardSubtitle, NavLink, Alert
} from 'reactstrap';

const ViewEducationStudentProfile = ({ id }) => {
  const session = {
    id_edu_stu: localStorage.getItem('id_edu_stu'),

  }
  const [student, setStudent] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/students/" + id)
      .then((response) => {
        setStudent(response.data);
      });
  }, [id]);//เมื่อidมีการเปลี่ยนเเปรง ก็จะรีหน้าทำการเปลี่ยนที่เราเปลี่ยน

  const [education, setEducation] = useState(session);
  useEffect(() => {
    axios.get("http://localhost:8080/EducationStudent/" + id)
      .then((response) => {
        setEducation(response.data);
      });
  }, [id]);

  if (education.id_edu_stu === null) {
    return (
      <div>
        <div class="container mt-32">
          <center><Button>ไม่พบข้อมูลนักเรียน</Button></center>
        </div>
      </div>
    );
  } else {
    return (

      <div class="mt-32">
        <div className="flex flex-col max-w-7xl mx-auto px-3">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <h3 className="text-center mb-4"> ข้อมูลการส่วนตัว </h3>
              <div className="p-3 text-center rounded-t-lg md:rounded-md px-4 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600">
                <img
                  className="mx-auto mt-3 h-20 w-20 rounded-full ring-2 ring-white"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
                <h3 className="mt-4 text-lg text-white font-medium leading-6 text-gray-900">{student.fname_stu} {student.lname_stu}</h3>
                <p className="mt-1 text-sm text-white">
                  รหัสนักศึกษา : {student.id_stu}
                </p>
              </div>
            </div>
            <div className="md:mt-0 md:col-span-2">
              <div className="shadow md:rounded-md md:overflow-hidden">
                <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                  <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-3 sm:col-span-2">
                      <label htmlFor="company_website" className="block text-sm font-medium text-gray-700">
                        รหัสนักศึกษา
                      </label>
                      <p className="mt-2 text-sm text-gray-500">
                        {student.id_stu}
                      </p>
                    </div>

                    <div className="col-span-3 sm:col-span-2">
                      <label htmlFor="company_website" className="block text-sm font-medium text-gray-700">
                        ชื่อ-นามสกุล
                      </label>
                      <p className="mt-2 text-sm text-gray-500">
                        {student.name_title} {student.fname_stu} {student.lname_stu}
                      </p>
                    </div>

                    <div className="col-span-3 sm:col-span-2">
                      <label htmlFor="company_website" className="block text-sm font-medium text-gray-700">
                        สายการเรียน
                      </label>
                      <p className="mt-2 text-sm text-gray-500">
                        {student.name_curriculum}
                      </p>
                    </div>

                    <div className="col-span-3 sm:col-span-2">
                      <label htmlFor="company_website" className="block text-sm font-medium text-gray-700">
                        เกรดเฉลี่ยรวม
                      </label>
                      <p className="mt-2 text-sm text-gray-500">
                        {student.GPA_stu}
                      </p>
                    </div>

                    <div className="col-span-3 sm:col-span-2">
                      <label htmlFor="company_website" className="block text-sm font-medium text-gray-700">
                        จบการศึกษาระดับมัธยมศึกษา
                      </label>
                      <p className="mt-2 text-sm text-gray-500">
                        {student.year_class} ห้องที่ {student.class}
                      </p>
                    </div>

                    <div className="col-span-3 sm:col-span-2">
                      <label htmlFor="company_website" className="block text-sm font-medium text-gray-700">
                        ปีการศึกษา
                      </label>
                      <p className="mt-2 text-sm text-gray-500">
                        {student.year_stu}
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
          <hr className="mt-5 mb-5" />
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <h3 className="text-center mb-4"> ข้อมูลการศึกษาต่อ </h3>
            </div>
            <div className="md:mt-0 md:col-span-2">
              <div className="shadow md:rounded-md md:overflow-hidden">
                <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                  <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-3 sm:col-span-2">
                      <label htmlFor="company_website" className="block text-sm font-medium text-gray-700">
                      มหาวิทยาลัย
                      </label>
                      <p className="mt-2 text-sm text-gray-500">
                      {education.name_uni}
                      </p>
                    </div>

                    <div className="col-span-3 sm:col-span-2">
                      <label htmlFor="company_website" className="block text-sm font-medium text-gray-700">
                      คณะ
                      </label>
                      <p className="mt-2 text-sm text-gray-500">
                      {education.name_faculty}
                      </p>
                    </div>

                    <div className="col-span-3 sm:col-span-2">
                      <label htmlFor="company_website" className="block text-sm font-medium text-gray-700">
                      สาขา
                      </label>
                      <p className="mt-2 text-sm text-gray-500">
                      {education.name_course}
                      </p>
                    </div>

                    <div className="col-span-3 sm:col-span-2">
                      <label htmlFor="company_website" className="block text-sm font-medium text-gray-700">
                      ปี
                      </label>
                      <p className="mt-2 text-sm text-gray-500">
                      {education.year_stu}
                      </p>
                    </div>

                    <div className="col-span-3 sm:col-span-2">
                      <label htmlFor="company_website" className="block text-sm font-medium text-gray-700">
                      กลุ่มสาขา
                      </label>
                      <p className="mt-2 text-sm text-gray-500">
                      {education.name_major}
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

    );
  }
}

export default ViewEducationStudentProfile;