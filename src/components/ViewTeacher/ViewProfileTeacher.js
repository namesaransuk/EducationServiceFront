import axios from "axios";
import React, { useState, useEffect } from "react"
import { Row, Col, Form, FormGroup, Label, NavLink, Navbar, Container, } from 'reactstrap';

const ViewProfileTeacher = ({ id }) => {

  const [teacher, setTeacher] = useState([]);

  useEffect(() => {
    axios.get("https://educationservice.herokuapp.com/Teacher/getStaff/" + id)
      .then((response) => {
        setTeacher(response.data);
      });
  }, [id]);//เมื่อidมีการเปลี่ยนเเปรง ก็จะรีหน้าทำการเปลี่ยนที่เราเปลี่ยน


  return (
    <div>

      <div class="flex flex-col max-w-7xl mx-auto mt-32 px-3">
        <center><h3> ข้อมูลการส่วนตัว </h3></center>

        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="p-3 text-center rounded-t-lg md:rounded-md px-4 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600">
              {/* <img
                className="mx-auto mt-3 h-20 w-20 rounded-full ring-2 ring-white"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />  */}
              <h3 className="mt-4 text-lg text-white font-medium leading-6 text-gray-900">Teacher</h3>
              <p className="mt-1 text-sm text-white">
                รหัสประจำตัว : {teacher.id_staff}
              </p>
            </div>
          </div>
          <div className="md:mt-0 md:col-span-2">
            <div className="shadow md:rounded-md md:overflow-hidden">
              <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                <div className="grid grid-cols-3 gap-6">
                  <div className="col-span-3 sm:col-span-2">
                    <label htmlFor="company_website" className="block text-sm font-medium text-gray-700">
                      รหัสประจำตัว
                    </label>
                    <p className="mt-2 text-sm text-gray-500">
                      {teacher.id_staff}
                    </p>
                  </div>

                  <div className="col-span-3 sm:col-span-2">
                    <label htmlFor="company_website" className="block text-sm font-medium text-gray-700">
                      ชื่อ-นามสกุล
                    </label>
                    <p className="mt-2 text-sm text-gray-500">
                      {teacher.name_title} {teacher.fname_staff} {teacher.lname_staff}
                    </p>
                  </div>

                  <div className="col-span-3 sm:col-span-2">
                    <label htmlFor="company_website" className="block text-sm font-medium text-gray-700">
                      เบอร์โทรศัพท์
                    </label>
                    <p className="mt-2 text-sm text-gray-500">
                      {teacher.phone_staff}
                    </p>
                  </div>

                  <div className="col-span-3 sm:col-span-2">
                    <label htmlFor="company_website" className="block text-sm font-medium text-gray-700">
                      ตำเเหน่ง
                    </label>
                    <p className="mt-2 text-sm text-gray-500">
                      {teacher.name_position}
                    </p>
                  </div>

                </div>
                <div className="mx-auto text-center">
                  <a
                    type="button"
                    href="/dashboardteacher"
                    className="hover:no-underline inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    กลับหน้าหลัก
                  </a>
                  <a
                    type="button"
                    href={"/Teacher/EditProfileTeacher/" + teacher.id_staff}
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

export default ViewProfileTeacher;