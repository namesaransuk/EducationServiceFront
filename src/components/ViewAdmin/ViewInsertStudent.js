import axios from 'axios';
import React, { useState } from 'react';
import { Container, Form, FormGroup, Label, CustomInput, Table, Button } from 'reactstrap';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';



const ViewInsertStudent = () => {


  const [students, setStudents] = useState([]);
  const [submited, setSubmitted] = useState(false);

  const readeExcel = (file) => {

    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file)

      fileReader.onload = (e) => {
        const bufferArray = e.target.result;

        const wb = XLSX.read(bufferArray, { type: "buffer" });

        const wsname = wb.SheetNames[0];

        const ws = wb.Sheets[wsname];

        const data = XLSX.utils.sheet_to_json(ws);

        resolve(data);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };

    });

    promise.then((data) => {
      console.log(data);
      setStudents(data);
    });
  };

  const addStudents = () => {
    axios.post("http://localhost:8080/Staff/AddStudentAll", students)
      .then((response) => {
        console.log(response);
        setSubmitted(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      {submited ? (
        Swal.file(
          'เพิ่มข้อมูลนักเรียนเรียบร้อย',
          ' ',
          'success',

        )
          (window.location.assign("/Admin/insertstudent"))
      ) : (
        <div className="mt-32">
          <div className="px-4 flex flex-col max-w-3xl mx-auto">
            <div className="text-center mx-auto">
              <h3 className="text-center">เพิ่มนักเรียน</h3>
            </div>
            <FormGroup>
              <Label for="exampleCustomFileBrowser"></Label>
              <CustomInput
                type="file"
                id="exampleCustomFileBrowser"
                name="customFile"
                onChange={(e) => {
                  const file = e.target.files[0];
                  readeExcel(file);
                }}
              />
            </FormGroup>

          </div>
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
                          รหัสประจำตัวนักเรียน
                        </th>
                        <th
                          scope="col"
                          className="break-all px-6 py-3 text-left text-md font-medium text-white uppercase tracking-wider"
                        >
                          คำนำหน้า
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-md font-medium text-white uppercase tracking-wider"
                        >
                          ชื่อ
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-md font-medium text-white uppercase tracking-wider"
                        >
                          นามสุกล
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-md font-medium text-white uppercase tracking-wider"
                        >
                          ระดับชั้น
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
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-md font-medium text-white uppercase tracking-wider"
                        >
                          รหัสผ่าน
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {students.map((students) => {
                        return (
                          <tr key={students.id_stu}>
                            <td className="px-6 py-4 whitespace-wrap">
                              <div className="flex items-center">
                                {/* <div className="flex-shrink-0 h-10 w-10">
                              <img className="h-10 w-10 rounded-full" src={person.image} alt="" />
                            </div> */}
                                <div className="ml-4">
                                  <div className="text-md font-medium text-gray-900">key={students.id_stu}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap ">
                              <div className="text-md text-gray-900">{students.title}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-md text-gray-900">{students.lname}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-md text-gray-900">{students.fname}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-md text-gray-900">{students.year_class}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-md text-gray-900">{students.class}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-md text-gray-900">{students.year_stu}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-md text-gray-900">{students.password}</div>
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
      )}
    </div>





  );
}

export default ViewInsertStudent;
