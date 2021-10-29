import axios from 'axios';
import React, { useState } from 'react';
import { Container, Form, FormGroup, Label, CustomInput, Table, Button } from 'reactstrap';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';
import { data } from 'autoprefixer';



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
  

    /*students.forEach(data => {
      //console.log(data);
     /* const json = JSON.stringify({
        id_stu: data.id_stu,
        title: data.title,
        fname_stu: data.fname,
        lname_stu: data.lname,
        id_curriculum: data.id_curriculum,
        GPA_stu: data.GPA_stu,
        year_class: data.year_class,
        class_room: data.class,
        year_stu: data.year_stu,
        password_stu: data.password,
        
        });*/
      /*var dataStudent = {
                id_stu: data.id_stu,
                title: data.title,
                fname_stu: data.fname,
                lname_stu: data.lname,
                id_curriculum: data.id_curriculum,
                GPA_stu: data.GPA_stu,
                year_class: data.year_class,
                class_room: data.class,
                year_stu: data.year_stu,
                password_stu: data.password,

      }*/
      
      for(let i = 0 ; i<students.length ; i++){
        
        axios.post("https://educationservice.herokuapp.com/Staff/AddOneStudent", {
                  "id_stu": students[i].id_stu ,
                  "title": students[i].title,
                  "fname_stu": students[i].fname,
                  "lname_stu": students[i].lname,
                  "id_curriculum":students[i].id_curriculum,
                  "gpa_stu": students[i].gpa_stu,
                  "year_class": students[i].year_class,
                  "room": students[i].room,
                  "year_stu": students[i].year_stu,
                  "password_stu": students[i].password
  })
      .then((res) => {
        console.log(res.data);
        if(res.data.message == "success"){
          Swal.fire(
            'เพิ่มรายชื่อนักเรียนสำเร็จ',
            '',
            'success'
          )
          .then(() => window.location.assign("/Admin/dashboardadmin"))
        }else{
          Swal.fire(
            'เพิ่มรายชื่อนักเรียนผิดพลาด',
            'รายชื่อนักเรียนนี้มีอยู่แล้ว',
            'error'
          )
        }
      })
      .catch((error) => {
        console.log(error);
      });

      }
     
      
      /*});*/

  };

  return (
    <div>
      <br />
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
                          เกรด
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
                                  <div className="text-md font-medium text-gray-900">{students.id_stu}</div>
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
                              <div className="text-md text-gray-900">{students.room}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-md text-gray-900">{students.year_stu}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-md text-gray-900">{students.gpa_stu}</div>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                 
<br /><br />
<br />

                </div>
              </div>
            </div>
          </div>
          <div></div>
          <div></div>
          <div className="text-center">
          <Button className="btn btn-success w-25"  onClick={addStudents}>บันทึก</Button>
          </div>
        </div>
     
    </div>





  );
}

export default ViewInsertStudent;
