import React, { useState, useEffect } from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import {
  Container, Row, Col, Button, Form, FormGroup, Label, Input, FormText, Card, CardText, CardBody, CardLink,
  CardTitle, CardSubtitle, Badge, Modal, ModalHeader, ModalBody, ModalFooter 
} from 'reactstrap';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ckeditor, { CKEditor } from '@ckeditor/ckeditor5-react'
import { PaperClipIcon } from '@heroicons/react/solid'


const ViewNew_detail = ({ id }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen(prevState => !prevState);
  const [educationdataia, setEducationdataia] = useState([]);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    axios.get("https://educationservice.herokuapp.com/EducationNew/" + id)
      .then((response) => {
        setPosts(response.data);
      });
  }, [id]);//เมื่อidมีการเปลี่ยนเเปรง ก็จะรีหน้าทำการเปลี่ยนที่เราเปลี่ยน

  
  return (
    <div>
      <div className="mt-32 mb-5 container-fluid sm:container">
        <div className="bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 shadow overflow-hidden rounded-lg">
          <div className="p-5 -mb-5 flex items-center justify-center md:grid md:grid-cols-3">
            <div className="col-span-2">
              <h2 className="text-lg leading-6 font-medium text-gray-900">ประชาสัมพันธ์</h2>
            </div>
            <div className="col-span-1 ml-auto hidden sm:block">
            </div>
          </div>
          <div className="border-t border-gray-200">
          <div className="bg-gray-50">
            <center> <img width="40%" alt="รูปกำลังมีปัญหา" src={posts.new_image || 'https://via.placeholder.com/300'} /></center>
            </div>
            
            <div className="bg-gray-50 p-4 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="mt-1 text-md font-medium text-gray-500">หัวข้อประชาชัมพันธ์</dt>
              <dd className="mt-1 text-md text-gray-900 sm:mt-0 sm:col-span-2">{posts.new_name}</dd>
            </div>
            <div className="bg-white p-4 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="mt-1 text-md font-medium text-gray-500">รายละเอียดย่อย</dt>
              <dd className="mt-1 text-md text-gray-900 sm:mt-0 sm:col-span-2">{posts.new_sub_detail|| "ประชาสัมพันธ์ทั่วไป"}</dd>
            </div>
            <div className="bg-gray-50 p-4 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="mt-1 text-md font-medium text-gray-500">วันเริ่มกิจกรรม</dt>
              <dd className="mt-1 text-md text-gray-900 sm:mt-0 sm:col-span-2">{posts.new_date_open || "ไม่ระบุวัน"}</dd>
            </div>
            <div className="bg-white p-4 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="mt-1 text-md font-medium text-gray-500">วันจบกิจกรรม</dt>
              <dd className="mt-1 text-md text-gray-900 sm:mt-0 sm:col-span-2">{posts.new_date_close || "ไม่ระบุวัน"}</dd>
            </div>
       
          </div>
        </div>

        <div className="hidden sm:block" aria-hidden="true">
          <div className="py-5">
            <div className="border-t border-gray-200" />
          </div>
        </div>

        <div className="mt-10 sm:hidden"></div>

        <div className="md:mt-0 md:grid md:grid-cols-3">
          <div className="md:col-span-1">
            <div className="px-4 py-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">รายละเอียด</h3>
              <p className="mt-0 text-md text-gray-600">
                Property
              </p>
            </div>
          </div>
          <div className="md:mt-0 md:col-span-2">
            <div className="shadow sm:rounded-md sm:overflow-hidden">
              <div className="px-4 py-4 bg-white space-y-6">
                <p className="-mb-2" style={{ whiteSpace: 'pre-wrap' }}>{posts.new_detail}</p>
              </div>
              <center><div className="px-4 py-3 bg-gray-50 text-center sm:px-6">

                          <span className="px-4 py-3 bg-gray-50 text-center sm:px-6">
                            <a
                              type="button"
                              href={posts.new_url}
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-md font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                              เพิ่มเติม
                            </a>
                          </span>
                        </div>  </center>
            </div>
          </div>
        </div>

        <div className="hidden sm:block" aria-hidden="true">
          <div className="py-5">
            <div className="border-t border-gray-200" />
          </div>
        </div>

        <div className="mt-10 sm:hidden"></div>

      </div>
    </div>
  );
}

export default ViewNew_detail;