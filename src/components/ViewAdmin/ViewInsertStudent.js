import axios from 'axios';
import React, { useState } from 'react'; 
import { Container, Form, FormGroup, Label, CustomInput , Table, Button} from 'reactstrap';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';



const ViewInsertStudent = () => {
  

  const [students , setStudents] = useState([]);
  const [submited , setSubmitted] = useState(false);

  const readeExcel = (file) => {

    const promise = new Promise((resolve,reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file)

      fileReader.onload = (e) => {
        const bufferArray = e.target.result;

        const wb = XLSX.read(bufferArray, {type:"buffer"});

        const wsname = wb.SheetNames[0];

        const ws = wb.Sheets[wsname];

        const data = XLSX.utils.sheet_to_json(ws);

        resolve(data);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };

    });

    promise.then((data) => {
      console.log(data);
      setStudents(data);
    });
  };

  const addStudents = () => {
      axios.post("http://localhost:8080/Staff/AddStudentAll" , students)
    .then((response) => {
      console.log(response);
      setSubmitted(true);
    })
    .catch((error) => {
      console.log(error);
    });
  };
    
    return (
      <Form>
         <Container>
           <Form>
           {submited ? (
             Swal.file(
              'เพิ่มข้อมูลนักเรียนเรียบร้อย',
              ' ',
               'success',

             )
             (window.location.assign("/insertstudent"))
           ):(
            <Form>
   <br /><br /><br /><br /><br /><br /> <Label> เพิ่มนักเรียน </Label>
          <FormGroup>
         <Label for="exampleCustomFileBrowser"></Label>
         <CustomInput 
               type="file" 
               id="exampleCustomFileBrowser" 
               name="customFile" 
               onChange={(e) => {
                 const file = e.target.files[0];
                 readeExcel(file);
               }}
               
         />
       </FormGroup>
 
       <FormGroup>
       <Table bordered>
       <thead>
         <tr>
           <th>รหัสประจำตัวนักเรียน</th>
           <th>คำนำหน้า</th>
           <th>ชื่อ</th>
           <th>นามสุกล</th>
           <th>ระดับชั้น</th>
           <th>ห้อง</th>
           <th>ปีการศึกษา</th>
           <th>รหัสผ่าน</th>
         </tr>
       </thead>
       <tbody>
         {students.map((students) =>{
           return(
             <tr key={students.id_stu}>
               <td>{students.id_stu}</td>
               <td>{students.title}</td>
               <td>{students.lname}</td>
               <td>{students.fname}</td>
               <td>{students.year_class}</td>
               <td>{students.class}</td>
               <td>{students.year_stu}</td>
               <td>{students.password}</td>
 
             </tr>
           )
         })}
       </tbody>
     </Table>
 
     <center><Button color="success" onClick={addStudents}>เพิ่ม</Button></center>
 
       </FormGroup>
        
       </Form>

           
           )}

           </Form>
           
      </Container>

      </Form>
     
       



);
  }
  
  export default ViewInsertStudent;
