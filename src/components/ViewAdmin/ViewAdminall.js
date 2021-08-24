import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' //fornt
import { faEdit,faTrash } from "@fortawesome/free-solid-svg-icons";
import {
  Row, Col, Button, FormGroup, Label, Input,
  NavLink, Table
} from 'reactstrap';
import Swal from 'sweetalert2';

import confirm from "reactstrap-confirm";

const ViewAdminall = () => {
  const [Admin, setAdmin] = useState([])
  const [filteredData, setFilteredData] = useState(Admin);

  const handleSearch = (event) => {
    let value = event.target.value.toLowerCase();
    let result = [];
    console.log(value);
    result = Admin.filter((data) => {
    return  data.fname_staff.search(value) != -1;

    });
    setFilteredData(result);
    }
  
  useEffect(() => {
    axios.get("http://localhost:8080/Staff/getAllStaff")
      .then((response) => {
        setAdmin(response.data);
        setFilteredData(response.data);
      })
      .catch(error => {
      console.log('Error getting fake data: ' + error);
      })
      }, []);

  const deleteProduct = async(StaffName,StaffId) => {
    let result = await confirm(
        {
            title :<>คำเตือน!! </>,
            message : 'คุณต้องการลบผู้ดูเเล" '+StaffName+' "ใช่ไหม?',
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
    <div><br /><br /><br /><br /><br /><br />
      <div className="container">
        <br />
        <Row>
          <Col xs="6"><h3 className="block text-left">รายชื่อผู้ดูเเล</h3>

            <FormGroup>
              <Label for="year_edu">ค้นหา</Label>
              <Input type="text" name="fname_staff" id="fname_staff" placeholder="กรุณาใส่ชื่อที่จะค้นหา" onChange={(event) =>handleSearch(event)}>

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
          {filteredData.map((value) => {
              return (
                <tr key={value.id_staff}>
                  <td>{value.id_staff}</td>
                  <td>{value.name_title} {value.fname_staff} {value.lname_staff}</td>
                  <td>{value.phone_staff}</td>
                  <td>{value.name_position}</td>
         
                  <td>   <Button color="danger" 
                        onClick={() => deleteProduct(Admin.fname_staff,Admin.id_staff)}>
                        <FontAwesomeIcon icon={faTrash}/>Delete</Button></td>
               
                </tr>
              )
            })}
          </tbody>
        </Table> <center> {filteredData.length === 0 && <span>ไม่พบข้อมูลที่ค้นหา</span>} </center>
      </div>
    </div>
  );
}

export default ViewAdminall;