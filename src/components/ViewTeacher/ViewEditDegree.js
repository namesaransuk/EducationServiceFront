import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  Container, Row, Col, Button, Form, FormGroup, Label, Input, FormText, Card, CardText, CardBody, CardLink,
  CardTitle, CardSubtitle, Jumbotron, Table, Alert} from 'reactstrap';
  import Swal from 'sweetalert2';

const ViewEditDegree = ({id}) => {
  const initDegree = {
    name_degree: "",
    initials_degree: "",
  };

  const [degree, setDegree] = useState([initDegree]);
  const [submited, setSumited] = useState(false);
  
  useEffect(() =>{
      axios.get("http://localhost:8080/degree/getDegree/" + id)
      .then((response) =>{
          setDegree(response.data);
      });
  },[id]);

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
    if (data['name_degree'] === "" ){
        Swal.fire(

            'ผิดพลาด',
            'กรุณารอกรอกข้อมูลให้ครบ',
            'error'
        )
    } else {
      axios.put("http://localhost:8080/degree/" + id , data)
      .then((res) => {
                console.log(res.data.message);
                if (res.data.message == "success") {
                    ////ต่อตรงนี้
                    Swal.fire(

                        'อัพเดตข้อมูลวุฒิการศึกษาเรียบร้อย',
                        '',
                        'success'
                    )
                        .then(() => window.location.assign("/degreeall"))

                } else {

                    Swal.fire(
                        'อัพเดตข้อมูลวุฒิการศึกษาผิดพลาด',
                        'ชื่อวุฒิการศึกษานี้มีอยู่แล้วกรุณาเปลี่ยนชื่อ',
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

    <div class="container">
  
<Form>

          <center><h2>เเก้ไขคณะ</h2></center>
  
          <Jumbotron>
            <Label for="name_faculty">ชื่อคณะ</Label>
            <Input
                type="text"
                name="name_degree"
                id="name_degree"
                value={degree.name_degree}
                onChange={handleInputChange}
                placeholder={degree.name_degree}
              required/>
              <FormGroup>
 <Label for="degree">ชื่อย่อหลักสูตร</Label>
              <Input
                type="text"
                name="initials_degree"
                id="initials_degree"
                value={degree.initials_degree}
                onChange={handleInputChange}
                placeholder={degree.initials_degree}
              required/>
</FormGroup>
          </Jumbotron>
          <div>
            <Button className="btn btn-success" onClick={saveDegree}>บันทึก</Button>
          </div>
        </Form>
     

    </div>

  );
};


export default ViewEditDegree;