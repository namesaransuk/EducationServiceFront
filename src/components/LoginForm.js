import React, { useState, useEffect } from 'react';
import { Card, CardBody, Row, Col, Button, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';
import Swal from 'sweetalert2';

const LoginForm = () => {
    const log = {
        id_user: "",
        password_user: "",
    };
    const [user, setUser] = useState(log);
    const session = {
        id: localStorage.getItem('id'),
        fname: localStorage.getItem('fname'),
        lname: localStorage.getItem('lname'),
        // id_staff: localStorage.getItem('id_staff'),
        fname_staff: localStorage.getItem('fname_staff'),
        lname_staff: localStorage.getItem('lname_staff'),
        fname_admin: localStorage.getItem('fname_admin'),
        lname_admin: localStorage.getItem('lname_admin'),
        name_position: localStorage.getItem('name_position'),


    }
    // const sessionstaff = {
    //     fname_staff: localStorage.getItem('fname_staff'),
    //     lname_staff: localStorage.getItem('lname_staff'),
    // }

    const [ses, setSes] = useState(session);
    // const [ses2, setSes2] = useState(sessionstaff);

    const inputdata = (event) => {
        let { name, value } = event.target;
        setUser({ ...user, [name]: value });
    }

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
    const saveStudent = async (e) => {
        e.preventDefault();

        var data = {
            id_user: user.id_user,
            password_user: user.password_user,
        };

        await axios.post("https://educationservice.herokuapp.com/Login", data)
        .then((res) => {
            console.log(res.data.message);
            if (res.data.message == "Student") {
                localStorage.setItem('id', res.data.id);
                localStorage.setItem('fname', res.data.fname);
                localStorage.setItem('lname', res.data.lname);
                // Swal.fire({
                //     title: "<h1>Title</h1>", 
                //     html: "Testno  sporocilo za objekt: <b>test</b>",  
                //     confirmButtonText: "V <u>redu</u>", 
                //   })
    Swal.fire(
         
        '<div id="loginSucess"> เข้าสู่ระบบเสร็จสิ้น </div>',
        'คุณเป็น นักเรียน',
        'success'
        
    )
        .then(() => window.location.assign("/Student/home"))


}
            else if (res.data.message == "ครู") {
                // else if (res.data.message == "Teacher") {
                localStorage.setItem('id', res.data.id);
                localStorage.setItem('fname_staff', res.data.fname_staff);
                localStorage.setItem('lname_staff', res.data.lname_staff);
                localStorage.setItem('name_position', res.data.name_position);
                Swal.fire(

                    'เข้าสู่ระบบเสร็จสิ้น',
                    'คุณเป็น ครู ',
                    'success',
                    )
                    .then(() => window.location.assign("/Teacher/DashboardTeacher"))

            }
            else if (res.data.message == "แอดมิน") {
                // else if (res.data.message == "Admin") {
                localStorage.setItem('id', res.data.id);
                localStorage.setItem('fname_admin', res.data.fname_staff);
                localStorage.setItem('lname_admin', res.data.lname_staff);
                localStorage.setItem('name_position', res.data.name_position);
                Swal.fire(

                    'เข้าสู่ระบบเสร็จสิ้น',
                    'คุณเป็น เเอดมิน ',
                    'success',
                    )
        .then(() => window.location.assign("/Admin/DashBoardAdmin"))
            } else {
                Swal.fire(
                    'เข้าสู่ระบบล้มเหลว',
                    'กรุณากรอกรหัสผ่านกับไอดีใหม่ ',
                    'error'
                )
            }

        })

        .catch((error) => {
            console.log("error");
        });

}
    return (
            <div className="sm:pt-32 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                  {namelogo.map((namelogo) => {
                    return (
                <div className="max-w-md w-full space-y-8">
                    <div>
                        <img
                            className="mx-auto h-32 w-auto"
                            src={namelogo.LogoWeb || 'https://via.placeholder.com/300'}
                            alt="Workflow"
                        />
                        <h2 className="mt-6 text-center text-4xl font-extrabold text-gray-900">เข้าสู่ระบบ</h2>
                        <p className="mt-2 text-center text-2xl text-gray-600">
                        {namelogo.NameWeb}
                        </p>
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={saveStudent}>
                        <input type="hidden" name="remember" defaultValue="true" />
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label htmlFor="id_user" className="sr-only">
                                    รหัสประจำตัว
                                </label>
                                <input
                                    type="text"
                                    id="id_user"
                                    name="id_user"
                                    onChange={inputdata}
                                    autoComplete="id"
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="รหัสประจำตัว"
                                    
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only">
                                    รหัสผ่าน
                                </label>
                                <input
                                    type="password"
                                    id="password_user"
                                    name="password_user"
                                    onChange={inputdata}
                                    autoComplete="password"
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="รหัสผ่าน"
                                    
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember_me"
                                    name="remember_me"
                                    type="checkbox"
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                />
                                <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">
                                    จดจำฉัน
                                </label>
                            </div>

                            <div className="text-sm">
                                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                    ลืมรหัสผ่าน?
                                </a>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                id="but"
                                name="but"
                            // OnClick={saveStudent}
                            >
                                เข้าสู่ระบบ
                            </button>
                        </div>
                    </form>
                </div>
                 )
                })}
            </div>
    )
}

export default LoginForm;
