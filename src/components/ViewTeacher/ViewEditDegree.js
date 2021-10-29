import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  Container, Row, Col, Button, Form, FormGroup, Label, Input, FormText, Card, CardText, CardBody, CardLink,
  CardTitle, CardSubtitle, Jumbotron, Table, Alert
} from 'reactstrap';
import Swal from 'sweetalert2';

const ViewEditDegree = ({ id }) => {
  const initDegree = {
    name_degree: "",
    initials_degree: "",
  };

  const [degree, setDegree] = useState([initDegree]);
  const [submited, setSumited] = useState(false);

  useEffect(() => {
    axios.get("https://educationservice.herokuapp.com/degree/getDegree/" + id)
      .then((response) => {
        setDegree(response.data);
      });
  }, [id]);

  const handleInputChange = (event) => {
    let { name, value } = event.target;
    // if (name === "tags") {
    //     value = value.split(",");
    // }
    setDegree({ ...degree, [name]: value });
  };

  const saveDegree = (e) => {
    e.preventDefault()
    var data = {
      name_degree: degree.name_degree,
      initials_degree: degree.initials_degree,
    }
    if (data['name_degree'] === "") {
      Swal.fire(

        'ผิดพลาด',
        'กรุณากรอกข้อมูลให้ครบ',
        'error'
      )
    } else {
      axios.put("https://educationservice.herokuapp.com/degree/" + id, data)
        .then((res) => {
          console.log(res.data.message);
          if (res.data.message == "success") {
            ////ต่อตรงนี้
            Swal.fire(

              'เเก้ไขข้อมูลหลักสูตรการศึกษาเรียบร้อย',
              '',
              'success'
            )
              .then(() => window.location.assign("/Teacher/degreeall"))

          } else {

            Swal.fire(
              'เเก้ไข้ข้อมูลหลักสูตรการศึกษาผิดพลาด',
              'ชื่อหลักสูตรการศึกษานี้มีอยู่แล้วกรุณาเปลี่ยนชื่อ',
              'error'
            )

          }

        })
        .catch((error) => {
          console.log("error");
        });//ใช้ ดัก Error

    };
  }
  return (

    <div className="px-4 flex flex-col max-w-3xl mx-auto mt-32">
      <h3 className="text-center">เเก้ไขหลักสูตร</h3>
      <Form>
        <FormGroup>
          <Label for="name_degree">ชื่อหลักสูตร</Label>
          <Input
            type="text"
            name="name_degree"
            id="name_degree"
            value={degree.name_degree}
            onChange={handleInputChange}
            placeholder={degree.name_degree}
             />
        </FormGroup>
        <FormGroup>
          <Label for="initials_degree">ชื่อย่อหลักสูตร</Label>
          <Input
            type="text"
            name="initials_degree"
            id="initials_degree"
            value={degree.initials_degree}
            onChange={handleInputChange}
            placeholder={degree.initials_degree}
             />
        </FormGroup>
        <div className="text-center">
          <Button className="btn btn-success w-25" onClick={saveDegree}>บันทึก</Button>
        </div>
      </Form>

      <br /><br />
    </div>

  );
};


export default ViewEditDegree;