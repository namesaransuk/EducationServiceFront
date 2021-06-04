import axios from "axios";
import React, { useState, useEffect } from "react"
import { Row, Col, Form, FormGroup, Label, NavLink } from 'reactstrap';

const ViewProfile = ({ id }) => {

  const [student, setStudent] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/students/" + id)
      .then((response) => {
        setStudent(response.data);
      });
  }, [id]);//เมื่อidมีการเปลี่ยนเเปรง ก็จะรีหน้าทำการเปลี่ยนที่เราเปลี่ยน


  return (
    <div>
      <div class="container-fluid mt-32">
          <center><h3> ข้อมูลการส่วนตัว </h3></center>


        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="p-3 rounded-t-lg md:rounded-md px-4 px-0 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500">
              <img
                className="mx-auto h-20 w-20 rounded-full ring-2 ring-white"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              /> 
              <h3 className="mt-4 text-lg font-medium leading-6 text-gray-900">Profile</h3>
              <p className="mt-1 text-sm text-gray-600">
                This information will be displayed publicly so be careful what you share.
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
                <div className="mx-auto text-center">
                  <a
                    type="button"
                    href="/home"
                    className="hover:no-underline inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    กลับหน้าหลัก
                </a>
                  <a
                    type="button"
                    href={"/editprofile/" + student.id_stu}
                    className="hover:no-underline inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    เเก้ไขข้อมูลส่วนตัว
                </a>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>

  );
}

export default ViewProfile;