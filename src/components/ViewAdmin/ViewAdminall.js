import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' //fornt
import { faEdit,faTrash } from "@fortawesome/free-solid-svg-icons";
import {
  Row, Col, Button, FormGroup, Label, Input,
  NavLink, Table
} from 'reactstrap';

import confirm from "reactstrap-confirm";

const ViewAdminall = () => {
  const [Admin, setAdmin] = useState([])

  useEffect(() => {
    axios.get("http://localhost:8080/Staff/getAllStaff")
      .then((response) => {
        setAdmin(response.data);
      });

  }, []);

  const deleteProduct = async(StaffName,StaffId) => {
    let result = await confirm(
        {
            title :<>Comfirmation!! </>,
            message : 'คุณต้องการลบผลิตภัณฑ์ไอดี" '+StaffName+' "ใช่ไหม?',
            confirmText : "ใช่",
            confirmColor : "primary",
            cancelText : "ไม่ใช่",
            cancelColor : "btn btn-danger",
            
        }); (window.location.assign("/Adminall"))

        if(result){
            axios.delete("http://localhost:8080/staff/DeleteStaff/" + StaffId)//คำสั่งลบที่ดึงมาจาก url
            .then((response) =>{
              setAdmin(); //อัพเดตหน้าว่าลบไปเเล้ว
            });
        }
};


  return (
    <div>
      <div className="container">
        <br />
        <Row>
          <Col xs="6">
            <FormGroup>
              <Label for="year_edu">ค้นหา</Label>
              <Input type="text" value="" >

              </Input>
            </FormGroup></Col>
        </Row>
      </div>
      <br />
      <div className="container">
        <Row>
          <Col></Col>
          <Col></Col>
          <Col><NavLink href="./InsertStaff">เพิ่มผู้ดูเเล</NavLink>
          </Col>
        </Row>
        <Table>
          <thead>
            <tr>
              <th>รหัสผู้ดูเเล</th>
              <th>ชื่อ-นามสกุล</th>
              <th>เบอร์โทรศัพท์</th>
              <th>ตำเเหน่ง</th>
              <th>ลบผู้ดูเเล</th>
            </tr>
          </thead>
          <tbody>
            {Admin.map((Admin) => {
              return (
                <tr key={Admin.id_staff}>
                  <td>{Admin.id_staff}</td>
                  <td>{Admin.name_title} {Admin.fname_staff} {Admin.lname_staff}</td>
                  <td>{Admin.phone_staff}</td>
                  <td>{Admin.name_position}</td>
         
                  <td>   <Button color="danger" 
                        onClick={() => deleteProduct(Admin.fname_staff,Admin.id_staff)}>
                        <FontAwesomeIcon icon={faTrash}/>Delete</Button></td>
               
                </tr>
              )
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default ViewAdminall;