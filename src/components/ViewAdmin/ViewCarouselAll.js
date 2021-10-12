import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' //fornt
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import {
  Row, Col, Button, FormGroup, Label, Input,
  NavLink, Table, Card, CardImg, CardBody
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
      return data.id_carousel.search(value) != -1;

    });
    setFilteredData(result);
  }

  useEffect(() => {
    axios.get("https://educationservice.herokuapp.com/Carousel/getCarousel")
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
        title: <>คำเตือน!! </>,
        message: 'คุณต้องการลบรูปสไลด์ลำดับที่" ' + Name + ' "ใช่ไหม?',
        confirmText: "ใช่",
        confirmColor: "primary",
        cancelText: "ไม่ใช่",
        cancelColor: "btn btn-danger",

      }); (window.location.assign("/Admin/CarouselAll"))

    if (result) {
      axios.delete("https://educationservice.herokuapp.com/Carousel/DeleteCarousel/" + id)//คำสั่งลบที่ดึงมาจาก url
        .then((response) => {
          setCarousel(); //อัพเดตหน้าว่าลบไปเเล้ว
        });
    }
  };


  return (
    <div>
      <div className="px-4 flex flex-col max-w-3xl mx-auto mt-32">
        <div className="mx-auto text-center">
          <Row>
            <Col><h3 className="block">ข้อมูลรูปสไลด์</h3>
              <FormGroup>
                <Label for="year_edu">ค้นหา</Label>
                <Input type="text" className="text-center" name="fname_staff" id="fname_staff" placeholder="กรุณาใส่ชื่อที่จะค้นหา" onChange={(event) => handleSearch(event)} />
              </FormGroup>
            </Col>
          </Row>
        </div>
      </div>

      <div class="container-fluid mt-5">
        <Row className="pb-3">
          <Col className="text-right">
            <a href="/Admin/InsertCarousel">เพิ่มรูปสไลด์</a>
          </Col>
        </Row>        
        <div class="row row-cols-1 row-cols-md-3">
          {filteredData.map((value) => {
            return (
              <div class="col mb-4">
                <Card>
                  <CardImg width="10" className="mx-auto" src={value.image_carousel || 'https://flevix.com/wp-content/uploads/2019/07/Curve-Loading.gif'} />
                  <CardBody>
                    <div className="lg:items-center lg:justify-between">
                      <div className="flex-1 min-w-0">
                        <h2 className="text-lg flex-warp font-bold leading-7 text-gray-900 sm:text-xl pb-0 border-t"></h2>
                      </div>
                      <div className="mt-3 lg:mt-0 text-center">
                        <span className="">
                          <a
                            type="button"
                            href={"./EditCarousel/" + value.id_carousel}
                            className="hover:no-underline inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            เเก้ไข
                          </a>
                          <a
                            type="button"
                            onClick={() => deleteProduct(value.image_carousel, value.id_carousel)}
                            className="hover:no-underline inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            ลบ
                          </a>
                        </span>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
}

export default ViewCarouselAll;