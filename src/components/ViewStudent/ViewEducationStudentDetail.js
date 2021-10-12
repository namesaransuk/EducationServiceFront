import React, { useState, useEffect } from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import {
  Container, Row, Col, Button, Form, FormGroup, Label, Input, FormText, Card, CardText, CardBody, CardLink,
  CardTitle, CardSubtitle, Badge
} from 'reactstrap';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ckeditor, { CKEditor } from '@ckeditor/ckeditor5-react'
import { PaperClipIcon } from '@heroicons/react/solid'


const ViewEducationStudentDetail = ({ id }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen(prevState => !prevState);
  const [educationdataia, setEducationdataia] = useState([]);

  useEffect(() => {
    axios.get("https://educationservice.herokuapp.com/EducationData/getEducationdataid/" + id)
      .then((response) => {
        setEducationdataia(response.data);
      });
  }, [id]);//เมื่อidมีการเปลี่ยนเเปรง ก็จะรีหน้าทำการเปลี่ยนที่เราเปลี่ยน
  return (
    <div>
      <div className="mt-32 mb-5 container-fluid sm:container">
        <div className="bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 shadow overflow-hidden rounded-lg">
          <div className="p-5 -mb-5 flex items-center justify-center md:grid md:grid-cols-3">
            <div className="col-span-2">
              <h2 className="text-lg leading-6 font-medium text-gray-900">ข้อมูลมหาวิทยาลัย</h2>
              <p className="mt-1 max-w-2xl text-md text-gray-500">{educationdataia.name_uni}</p>
            </div>
            <div className="col-span-1 ml-auto hidden sm:block">
              <img
                className="h-20 w-auto -mt-5"
                src="https://www.npru.ac.th/2019/img/Npru-logo.png"
                alt="Workflow"
              />
            </div>
          </div>
          <div className="border-t border-gray-200">
            <div className="bg-gray-50 p-4 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="mt-1 text-md font-medium text-gray-500">คณะ</dt>
              <dd className="mt-1 text-md text-gray-900 sm:mt-0 sm:col-span-2">{educationdataia.name_faculty}</dd>
            </div>
            <div className="bg-white p-4 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="mt-1 text-md font-medium text-gray-500">สาขา</dt>
              <dd className="mt-1 text-md text-gray-900 sm:mt-0 sm:col-span-2">{educationdataia.name_course}</dd>
            </div>
            <div className="bg-gray-50 p-4 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="mt-1 text-md font-medium text-gray-500">กลุ่มสาขา</dt>
              <dd className="mt-1 text-md text-gray-900 sm:mt-0 sm:col-span-2">{educationdataia.name_major}</dd>
            </div>
            <div className="bg-white p-4 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="mt-1 text-md font-medium text-gray-500">รอบ</dt>
              <dd className="mt-1 text-md text-gray-900 sm:mt-0 sm:col-span-2">{educationdataia.name_round}</dd>
            </div>
            <div className="bg-gray-50 p-4 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="mt-1 text-md font-medium text-gray-500">จำนวนรับสมัคร</dt>
              <dd className="mt-1 text-md text-gray-900 sm:mt-0 sm:col-span-2">{educationdataia.number_of_edu}</dd>
            </div>
            <div className="bg-white p-4 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="mt-1 text-md font-medium text-gray-500">วันเปิดรับสมัคร</dt>
              <dd className="mt-1 text-md text-gray-900 sm:mt-0 sm:col-span-2">{educationdataia.open_date}</dd>
            </div>
            <div className="bg-gray-50 p-4 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="mt-1 text-md font-medium text-gray-500">วันปิดรับสมัคร</dt>
              <dd className="mt-1 text-md text-gray-900 sm:mt-0 sm:col-span-2">{educationdataia.close_date}</dd>
            </div>
            <div className="bg-white p-4 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="mt-1 text-md font-medium text-gray-500">วันประกาศผล</dt>
              <dd className="mt-1 text-md text-gray-900 sm:mt-0 sm:col-span-2">{educationdataia.list_day}</dd>
            </div>
            <div className="bg-gray-50 p-4 -mb-4 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="mt-1 text-md font-medium text-gray-500">เอกสารเพิ่มเติม</dt>
              <dd className="mt-1 text-md text-gray-900 sm:mt-0 sm:col-span-2">
                <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
                  <li className="pl-3 pr-4 py-3 flex items-center justify-between text-md">
                    <div className="w-0 flex-1 flex items-center">
                      <PaperClipIcon className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
                      <span className="ml-2 flex-1 w-0 truncate">ประกาศรับรับสมัคร ภาคปกติ v1.pdf</span>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      <a href={educationdataia.url_doculment} className="font-medium text-indigo-600 hover:text-indigo-500">
                        Download
                    </a>
                    </div>
                  </li>
                </ul>
              </dd>
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
              <h3 className="text-lg font-medium leading-6 text-gray-900">คุณสมบัติ</h3>
              <p className="mt-0 text-md text-gray-600">
                Property
              </p>
            </div>
          </div>
          <div className="md:mt-0 md:col-span-2">
            <div className="shadow sm:rounded-md sm:overflow-hidden">
              <div className="px-4 py-4 bg-white space-y-6">
                <p className="-mb-2" style={{ whiteSpace: 'pre-wrap' }}>{educationdataia.general}</p>
              </div>
              <div className="px-4 py-3 bg-gray-50 text-center sm:px-6">
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-md font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  ดูรายละเอียดเพิ่มเติม
                  </button>
              </div>
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
              <h3 className="text-lg font-medium leading-6 text-gray-900">เอกสาร</h3>
              <p className="mt-0 text-md text-gray-600">Document</p>
            </div>
          </div>
          <div className="md:mt-0 md:col-span-2">
            <form action="#" method="POST">
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-4 bg-white sm:p-6">
                  <p className="-mb-2" style={{ whiteSpace: 'pre-wrap' }}>{educationdataia.doculment_edu}</p>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-center sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-md font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    ดูรายละเอียดเพิ่มเติม
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}

export default ViewEducationStudentDetail;