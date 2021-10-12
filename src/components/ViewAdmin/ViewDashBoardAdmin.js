import React, { useState, useEffect } from 'react';
import axios from 'axios'
import {
  Container, Row, Col, Button, Form, FormGroup, Label, Input, FormText, Card, CardText, CardBody, CardLink,
  CardTitle, CardSubtitle, Badge
} from 'reactstrap';

const ViewDashBoardAdmin = (props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen(prevState => !prevState);

  const [namelogo, setNamelogo] = useState([])
  useEffect(() => {
    axios.get("https://educationservice.herokuapp.com/NameLogo/getDataNameLogo")
      .then((response) => {
        setNamelogo(response.data);
      })
      .catch(error => {
        console.log('Error getting fake data: ' + error);
      })
  }, []);

  const [footer, setFooter] = useState([])
  useEffect(() => {
    axios.get("https://educationservice.herokuapp.com/Footer/getFooter")
      .then((response) => {
        setFooter(response.data);
      })
      .catch(error => {
        console.log('Error getting fake data: ' + error);
      })
  }, []);
  return (
    <div className="pt-32">
      <div className="flex flex-col max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2> จัดการข้อมูล </h2>
          <Row form>
            <Col sm={6}>
            {/* "http://localhost:8080/" */}
              <a href="/Admin/insertstudent">
                <div type="submit" className="items-center text-center justify-center py-32 border border-transparent text-lg md:text-xl lg:text-2xl font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">เพิ่มรายชื่อนักเรียน</div>
              </a>
            </Col>
            <Col sm={6}>
              <a href="/Admin/StudentAll">
              <div type="submit" className="items-center text-center justify-center py-32 border border-transparent text-lg md:text-xl lg:text-2xl font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">ข้อมูลรายชื่อนักเรียน</div>
              </a>
            </Col>
            <Col sm={6}>
              <a href="/Admin/Adminall">
              <div type="submit" className="items-center text-center justify-center py-32 border border-transparent text-lg md:text-xl lg:text-2xl font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">ข้อมูลผู้ดูเเล</div>
              </a>
            </Col>
          </Row>
          <br />
          <h2> จัดการเว็ปไซต์ </h2>
          <Row form>
            <Col sm={6}>
              <a href="/Admin/CarouselAll">
                <div type="submit" className="items-center text-center justify-center py-32 border border-transparent text-lg md:text-xl lg:text-2xl font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">จัดการรูปสไลด์เว็ปไซต์</div>
              </a>
            </Col>
            {namelogo.map((namelogo) => {
                    return (
            <Col sm={6}>
              <a href={"/Admin/EditNameLogo/" + namelogo.id}>
              <div type="submit" className="items-center text-center justify-center py-32 border border-transparent text-lg md:text-xl lg:text-2xl font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">ชื่อเเละโลโก้เว็ปไซต์</div>
              </a>
            </Col>
                )
              })}
              <Col sm={6}>
              <a href="/Admin/newAll">
              <div type="submit" className="items-center text-center justify-center py-32 border border-transparent text-lg md:text-xl lg:text-2xl font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">ข้อมูลข่าวหน้าเว็ปไซต์</div>
              </a>
            </Col>
            {footer.map((footer) => {
                    return (
            <Col sm={6}>
              <a href={"/Admin/EditFooter/" + footer.id}>
              <div type="submit" className="items-center text-center justify-center py-32 border border-transparent text-lg md:text-xl lg:text-2xl font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">ข้อมูลส่วนท้าย</div>
              </a>
            </Col>
              )
            })}
          </Row>
        </div>
      </div>
    </div>
  );
}

export default ViewDashBoardAdmin;