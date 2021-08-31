import React, { useState } from 'react';
import {
  Container, Row, Col, Button, Form, FormGroup, Label, Input, FormText, Card, CardText, CardBody, CardLink,
  CardTitle, CardSubtitle, Badge
} from 'reactstrap';

const ViewDashBoardAdmin = (props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen(prevState => !prevState);
  return (
    <div className="pt-32">
      <div className="flex flex-col max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2> DashBoard </h2>
          <Row form>
            <Col sm={6}>
              <a href="./insertstudent">
                <div type="submit" className="items-center text-center justify-center py-32 border border-transparent text-lg md:text-xl lg:text-2xl font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">AddStudent</div>
              </a>
            </Col>
            <Col sm={6}>
              <a href="./Adminall">
              <div type="submit" className="items-center text-center justify-center py-32 border border-transparent text-lg md:text-xl lg:text-2xl font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">ข้อมูลผู้ดูเเล</div>
              </a>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}

export default ViewDashBoardAdmin;