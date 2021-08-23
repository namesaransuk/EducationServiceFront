import axios from "axios";
import React, { useState, useEffect } from "react"
import { Row, Col, Form, FormGroup, Label, NavLink ,Navbar,Container,} from 'reactstrap';

const ViewProfileTeacher = ({ id }) => {

  const [teacher, setTeacher] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/Teacher/getStaff/" + id)
      .then((response) => {
        setTeacher(response.data);
      });
  }, [id]);//เมื่อidมีการเปลี่ยนเเปรง ก็จะรีหน้าทำการเปลี่ยนที่เราเปลี่ยน


  return (
    <div>
  
      <div class="container-fluid mt-32">
          <center><h3> ข้อมูลการส่วนตัว </h3></center>

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
                    href={"/EditProfileTeacher/" + teacher.id_staff}
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


  );
}

export default ViewProfileTeacher;