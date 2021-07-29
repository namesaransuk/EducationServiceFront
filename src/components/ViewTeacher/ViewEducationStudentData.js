import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' //fornt
import { faEdit, faTrash, faSearch } from "@fortawesome/free-solid-svg-icons";
import {
  Container, Row, Col, Button, Form, FormGroup, Label, Input, FormText, Card, CardText, CardBody, CardLink,
  CardTitle, CardSubtitle, NavLink, Table
} from 'reactstrap';

const ViewEducationStudentData = ({ id }) => {
  const [classS, setClassS] = useState([]);

    //ไปดึง api ของอันเก่ามาใช้จาก url
    useEffect(() => {
      axios.get("http://localhost:8080/Teacher/getStudentClass/" + id).then((response) => {
        console.log(response);
        setClassS(response.data);
      });
    }, []);

    
    return (
        <div>
     <div class="container">

</div>    
<br />
<div class="container">
       
        <Table>
          <thead>
            <tr>
            <th>ปีการศีกษา</th>
              <th>ห้องเรียน</th>
              <th>ชื่อ-นามสกุล</th>
              <th>ห้อง</th>
              <th>ดูข้อมูลนักเรียน</th>
            </tr>
          </thead>
          <tbody>
            {classS.map((classS) => {
              return (
                <tr>
                  <td>{classS.year_stu}</td>
                  <td>{classS.id_stu}</td>
                  <td>{classS.fname_stu}  {classS.lname_stu}</td>
                  <td>{classS.year_class}/{classS.class}</td>
                  <td>
                  <Button href={"./../EducationStudentProfile/" + classS.id_stu}>
                      <FontAwesomeIcon icon={faEdit} />ดูข้อมูลนักเรียน
                   </Button>
                  </td>
                </tr>
                 )
                })}
          </tbody>
        </Table>
      </div>




    </div>
  );
}
  


export default ViewEducationStudentData;