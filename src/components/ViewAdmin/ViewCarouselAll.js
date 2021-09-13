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

const ViewCarouselAll = () => {
  const [carousel, setCarousel] = useState([])
  const [filteredData, setFilteredData] = useState(carousel);

  const handleSearch = (event) => {
    let value = event.target.value.toLowerCase();
    let result = [];
    console.log(value);
    result = carousel.filter((data) => {
    return  data.id_carousel.search(value) != -1;

    });
    setFilteredData(result);
    }
  
  useEffect(() => {
    axios.get("http://localhost:8080/Carousel/getCarousel")
      .then((response) => {
        setCarousel(response.data);
        setFilteredData(response.data);
      })
      .catch(error => {
      console.log('Error getting fake data: ' + error);
      })
      }, []);

      const deleteProduct = async (Name, id) => {
        let result = await confirm(
        {
            title :<>คำเตือน!! </>,
            message : 'คุณต้องการลบCaruselลำดับที่" '+ Name +' "ใช่ไหม?',
            confirmText : "ใช่",
            confirmColor : "primary",
            cancelText : "ไม่ใช่",
            cancelColor : "btn btn-danger",
            
        }); (window.location.assign("/CarouselAll"))

        if(result){
            axios.delete("http://localhost:8080/Carousel/DeleteCarousel/" + id)//คำสั่งลบที่ดึงมาจาก url
            .then((response) =>{
              setCarousel(); //อัพเดตหน้าว่าลบไปเเล้ว
            });
        }
};


  return (
    <div><br /><br /><br /><br /><br /><br />
      <div className="container">
        <br />
        <Row>
          <Col xs="6"><h3 className="block text-left">ข้อมูลCarousel</h3>

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
          <Col><NavLink href="/Admin/InsertCarousel">เพิ่มCarousel</NavLink>
          </Col>
        </Row>
        <Table>
          <thead>
            <tr>
              <th><center>Carousel</center></th>
              <th>เเก้ไข้</th>
              <th>ลบ</th>
            </tr>
          </thead>
          <tbody>
          {filteredData.map((value) => {
              return (
                <tr key={value.id_carousel}>
                  <td><img width="100" className="mx-auto" src={value.image_carousel || 'https://via.placeholder.com/150'} /></td>
                  <td><a href={"./EditCarousel/" + value.id_carousel} className="text-white bg-green-600 hover:bg-green-800 rounded-md px-4 py-2.5 hover:no-underline">
                          เเก้ไข
                        </a></td>        
                  <td>    <a onClick={() => deleteProduct(value.image_carousel, value.id_carousel)} className="text-white bg-red-600 hover:bg-red-800 rounded-md px-4 py-2.5 hover:no-underline">
                          Delete
                        </a></td>
               
                </tr>
              )
            })}
          </tbody>
        </Table> <center> {filteredData.length === 0 && <span>ไม่พบข้อมูลที่ค้นหา</span>} </center>
      </div>
    </div>
  );
}

export default ViewCarouselAll;