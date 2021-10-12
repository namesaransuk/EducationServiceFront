import React, { useState, useEffect } from "react";
import Pagination from './pagination/paginationnewindex';
import Paginations from './pagination/paginationnewindexstudent';
import ViewDashBoardAdmin from './ViewAdmin/ViewDashBoardAdmin';
import ViewDashboardTeacher from './ViewTeacher/ViewDashboardTeacher';

import {
  BriefcaseIcon,
  CalendarIcon,
  CheckIcon,
  ChevronDownIcon,
  CurrencyDollarIcon,
  LinkIcon,
  LocationMarkerIcon,
  PencilIcon,
} from '@heroicons/react/solid'
import { Menu, Transition } from '@headlessui/react'
import SilderIndex from '../components/SilderIndex';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Card, Button, CardImg, CardTitle, CardText, CardGroup,
  CardSubtitle, CardBody, CardDeck, TabContent, TabPane, Nav, NavItem, NavLink, Row, Col
} from 'reactstrap';
import Swal from 'sweetalert2';
import { AcademicCapIcon, BookmarkAltIcon, UsersIcon, LibraryIcon, UserIcon, OfficeBuildingIcon, IdentificationIcon } from '@heroicons/react/outline'

function Index() {

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
  const features = [
    {
      name: 'มหาวิทยาลัย',
      href: './universityall',
      description:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
      icon: LibraryIcon,
    },
    {
      name: 'คณะ',
      href: './fucultyall',
      description:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
      icon: OfficeBuildingIcon,
    },
    {
      name: 'สาขา',
      href: './courseall',
      description:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
      icon: UserIcon,
    },
    {
      name: 'กลุ่มสาขา',
      href: './groupcourseall',
      description:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
      icon: UsersIcon,
    },
    {
      name: 'วุฒิ',
      href: './degreeall',
      description:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
      icon: AcademicCapIcon,
    },
  ]

  const featuresUniversity = [
    {
      name: 'ข้อมูลการศึกษาต่อ',
      href: './educationall',
      description:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
      icon: BookmarkAltIcon,
    },
  ]

  const featuresStudent = [
    {
      name: 'ข้อมูลการศึกษาต่อของนักเรียน',
      href: './educationstudentall',
      description:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
      icon: IdentificationIcon,
    },
  ]

  const session = {
    id: localStorage.getItem('id'),
    fname: localStorage.getItem('fname'),
    lname: localStorage.getItem('lname'),
    // id_staff: localStorage.getItem('id_staff'),
    fname_staff: localStorage.getItem('fname_staff'),
    lname_staff: localStorage.getItem('lname_staff'),
    fname_admin: localStorage.getItem('fname_admin'),
    lname_admin: localStorage.getItem('lname_admin'),
  }
  // const sessionstaff = {
  //     id_staff: localStorage.getItem('id_staff'),
  //     fname_staff: localStorage.getItem('fname_staff'),
  //     lname_staff: localStorage.getItem('lname_staff'),
  // }

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

  const [ses, setSes] = useState(session);
  // const [ses2, setSes2] = useState(sessionstaff);


  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get('https://educationservice.herokuapp.com/EducationNew/getDataNewAll');
      setPosts(res.data);
    };

    fetchPosts();
  }, []);


  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);


  const [isOpen, setIsOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem('id');
    localStorage.removeItem('fname');
    localStorage.removeItem('lname');
    localStorage.removeItem('fname_staff');
    localStorage.removeItem('lname_staff');
    localStorage.removeItem('fname_admin');
    localStorage.removeItem('lname_admin');
    Swal.fire(

      'ออกจากระบบเสร็จสิ้น',
      '',
      'success',
      window.location.assign("/")
    )
    window.location.assign("/")

  }
  const toggle = () => setIsOpen(!isOpen);

  const [educationdata, setEducationdata] = useState([]);
  //ไปดึง api ของอันเก่ามาใช้จาก url
  const updateEducationdata = () => {
    axios.get("https://educationservice.herokuapp.com/EducationData/getAllEducationData").then((response) => {
      console.log(response);
      setEducationdata(response.data);
    });
  };

  useEffect(() => {
    updateEducationdata();
  }, []);



  if (session.id === null) {
    return (
      <div>
        {namelogo.map((namelogo) => {
          return (
            <div className="pt-36 md:pt-52 bg-yellow-600 mx-auto">
              <div className="mx-auto sm:text-center lg:text-left pb-12 md:pb-28">
                <h1 className="text-center mx-auto text-3xl font-extrabold text-white sm:text-5xl md:text-6xl lg:text-7xl sm:max-w-5xl md:max-w-4xl lg:max-w-6xl">
                  <span className="block xl:inline">{namelogo.NameWeb}</span>{' '}
                  <span className="block text-red-800 xl:inline">{namelogo.EngNameWeb || "EducationServiceWebsite"}</span>
                </h1>
                <p className="mt-3 text-center text-base text-dark sm:mt-5 sm:text-lg sm:max-w-2xl sm:mx-auto md:mt-5">
                  {namelogo.DetailWeb || "EducationServiceWebsite"}
                </p>
                {/* <div className="mr-3 ml-3 mt-3 sm:mt-8 sm:flex sm:justify-center">
            <div className="mt-2 sm:mt-0 sm:ml-3">
              <a
                href="#"
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
              >
                เข้าสู่ระบบ
              </a>
            </div>
            <div className="mt-2 sm:mt-0 sm:ml-3">
              <a
                href="#"
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10"
              >
                ลงทะเบียน
                                            </a>
            </div>
          </div> */}
              </div>
              <SilderIndex />
            </div>)
        })}
        <div class="wow fadeInUpBig bg-fixed w-full h-72 md:h-96 bg-center overflow-y-1 shadow-inner" style={{ backgroundImage: `url("https://i.pinimg.com/originals/c9/7b/d3/c97bd3d324813cbf8cf36315c35aef63.jpg")`, filter: 'blur(0px)' }}>
          <h2 className="flex py-32 md:py-44 z-50 font-semibold justify-center">ประชาสัมพันธ์</h2>
        </div>
        <div class="container-fluid mt-5">
          {/* <center><h2> ประชาสัมพันธ์ </h2></center> */}

          <div class="row row-cols-1 row-cols-md-3">
            {currentPosts.map((Post) => {
              return (
                <div class="col mb-4">
                  <Card className="span3 wow bounceInUp" data-wow-iteration="5" data-wow-duration="0.15s" class="span3 wow flip" style={{visibility: "hidden", animationDuration: "0.15s", animationIterationCount: 5, animationName: "none"}}>
                    <CardImg width="10" className="mx-auto" src={Post.new_image || 'https://via.placeholder.com/604x317'} />
                    <CardBody>
                      <div className="lg:items-center lg:justify-between">
                        <div className="flex-1 min-w-0">
                          <h2 className="text-lg flex-warp font-bold leading-7 text-gray-900 sm:text-xl pb-3 border-b">{Post.new_name}</h2>
                          <div className="">
                            <div className="mt-2 flex items-center text-sm text-gray-500">
                              <BriefcaseIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                              รายละเอียด : {Post.new_sub_detail || "ประชาสัมพันธ์ทั่วไป"}
                            </div>
                            <div className="mt-2 flex items-center text-sm text-gray-500">
                              <LocationMarkerIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                              เริ่มกิจกรรม : {Post.new_date_open || "ไม่ระบุวัน"}
                            </div>
                             <div className="mt-2 flex items-center text-sm text-gray-500">
                              <LocationMarkerIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                              จบกิจกรรม : {Post.new_date_close || "ไม่ระบุวัน"}
                            </div>
                          </div>
                        </div>
                        <div className="mt-3 lg:mt-0">
                          <span className="">
                            <a
                              type="button"
                              href={"/Student/New_detail/" + Post.id_new}
                              className="hover:no-underline inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                              ดูรายละเอียด
                            </a>
                          </span>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </div>
              );
            })}
          </div>
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={posts.length}
            paginate={paginate}
          />
          <br />
        </div>
      </div>

    );
  }
  else if (session.fname_staff = session.fname_staff) {
    return (
      <ViewDashboardTeacher />
    );
  }
  else if (session.fname_admin = session.fname_admin) {
    return (
      <ViewDashBoardAdmin />
    );
  }
  else {
    return (
      <div>
        {namelogo.map((namelogo) => {
          return (
            <div className="pt-36 md:pt-52 bg-yellow-600 mx-auto">
              <div className="mx-auto sm:text-center lg:text-left pb-12 md:pb-28">
                <h1 className="text-center mx-auto text-3xl font-extrabold text-white sm:text-5xl md:text-6xl lg:text-7xl sm:max-w-5xl md:max-w-4xl lg:max-w-6xl">
                  <span className="block xl:inline">{namelogo.NameWeb}</span>{' '}
                  <span className="block text-red-800 xl:inline">{namelogo.EngNameWeb || "EducationServiceWebsite"}</span>
                </h1>
                <p className="mt-3 text-center text-base text-dark sm:mt-5 sm:text-lg sm:max-w-2xl sm:mx-auto md:mt-5">
                  {namelogo.DetailWeb || "EducationServiceWebsite"}
                </p>
                {/* <div className="mr-3 ml-3 mt-3 sm:mt-8 sm:flex sm:justify-center">
        <div className="mt-2 sm:mt-0 sm:ml-3">
          <a
            href="#"
            className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
          >
            เข้าสู่ระบบ
          </a>
        </div>
        <div className="mt-2 sm:mt-0 sm:ml-3">
          <a
            href="#"
            className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10"
          >
            ลงทะเบียน
                                        </a>
        </div>
      </div> */}
              </div>
              <SilderIndex />
            </div>)
        })}
           <div class="wow fadeInUpBig bg-fixed w-full h-72 md:h-96 bg-center overflow-y-1 shadow-inner" style={{ backgroundImage: `url("https://i.pinimg.com/originals/c9/7b/d3/c97bd3d324813cbf8cf36315c35aef63.jpg")`, filter: 'blur(0px)' }}>
          <h2 className="flex py-32 md:py-44 z-50 font-semibold justify-center">ประชาสัมพันธ์</h2>
        </div>
        <div class="container-fluid mt-5">
          {/* <center><h2> ประชาสัมพันธ์ </h2></center> */}
          <div class="row row-cols-1 row-cols-md-3">
            {currentPosts.map((Post) => {
              return (
                <div class="col mb-4">
                  <Card>
                    <CardImg width="10" className="mx-auto" src={Post.new_image || 'https://via.placeholder.com/604x317'} />
                    <CardBody>
                      <div className="lg:items-center lg:justify-between">
                        <div className="flex-1 min-w-0">
                          <h2 className="text-lg flex-warp font-bold leading-7 text-gray-900 sm:text-xl pb-3 border-b">{Post.new_name}</h2>
                          <div className="">
                            <div className="mt-2 flex items-center text-sm text-gray-500">
                              <BriefcaseIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                              รายละเอียด : {Post.new_sub_detail || "กิจกรรมทั่วไป"}
                            </div>
                            <div className="mt-2 flex items-center text-sm text-gray-500">
                              <LocationMarkerIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                              เริ่มกิจกรรม : {Post.new_date_open || "ไม่ระบุวัน"}
                            </div>
                             <div className="mt-2 flex items-center text-sm text-gray-500">
                              <LocationMarkerIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                              จบกิจกรรม : {Post.new_date_close || "ไม่ระบุวัน"}
                            </div>
                          </div>
                        </div>
                        <div className="mt-3 lg:mt-0">
                        <span className="">
                            <a
                              type="button"
                              href={"/Student/New_detail/" + Post.id_new}
                              className="hover:no-underline inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                              ดูรายละเอียด
                            </a>
                          </span>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </div>
              );
            })}
          </div>
          <Paginations
            postsPerPage={postsPerPage}
            totalPosts={posts.length}
            paginate={paginate}
          />
          <br />
        </div>
      </div>

    );
  }

}

export default Index;
