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

  const saveDegree = () => {
    var data = {
        name_degree: degree.name_degree,
        initials_degree: degree.initials_degree,
    }
    axios.put("http://localhost:8080/degree/" + id , data)
      .then((response) => {
        console.log(response.data);
        setDegree({ ...degree, data });
        setSumited(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (

    <div class="container">
    <Form>

{submited ? (
   Swal.fire(

    'เเก้ไขข้อมูลวุฒิเรียบร้อย',
    ' ',
     'success',
 )
 (window.location.assign("/degreeall"))
                ) : (
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
              />
              <FormGroup>
 <Label for="degree">ชื่อย่อหลักสูตร</Label>
              <Input
                type="text"
                name="initials_degree"
                id="initials_degree"
                value={degree.initials_degree}
                onChange={handleInputChange}
                placeholder={degree.initials_degree}
              />
</FormGroup>
          </Jumbotron>
          <div>
            <Button className="btn btn-success" onClick={saveDegree}>บันทึก</Button>
          </div>
        </Form>
        )}
      </Form>
      

    </div>

  );
};


export default ViewEditDegree;