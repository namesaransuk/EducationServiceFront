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
    axios.get("https://educationservice.herokuapp.com/student/getStudent/" + id)
      .then((response) => {
        setStudent(response.data);
      });
  }, [id]);//เมื่อidมีการเปลี่ยนเเปรง ก็จะรีหน้าทำการเปลี่ยนที่เราเปลี่ยน

  const [education, setEducation] = useState(session);
  useEffect(() => {
    axios.get("https://educationservice.herokuapp.com/EducationStudent/" + id)
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
                        {student.title} {student.fname_stu} {student.lname_stu}
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