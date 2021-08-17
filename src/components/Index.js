import React, { useState, useEffect } from "react";
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

const [ses, setSes] = useState(session);
// const [ses2, setSes2] = useState(sessionstaff);

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
    axios.get("http://localhost:8080/EducationData/getAllEducationData").then((response) => {
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
      <div className="pt-36 md:pt-52 bg-yellow-600 mx-auto">
        <div className="mx-auto sm:text-center lg:text-left pb-12 md:pb-28">
          <h1 className="text-center mx-auto text-3xl font-extrabold text-white sm:text-5xl md:text-6xl lg:text-7xl sm:max-w-5xl md:max-w-4xl lg:max-w-6xl">
            <span className="block xl:inline">โรงเรียนประสาทรัฐประชากิจ</span>{' '}
            <span className="block text-red-800 xl:inline">Prasartratprachakit School</span>
          </h1>
          <p className="mt-3 text-center text-base text-dark sm:mt-5 sm:text-lg sm:max-w-2xl sm:mx-auto md:mt-5">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum, explicabo. Ex a error perspiciatis eos nulla aut dicta dolores? Culpa, quia! Corrupti, adipisci harum laboriosam dolores odit possimus veritatis tenetur.
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
      </div>
      <div class="wow fadeInUpBig bg-fixed w-full h-80 md:h-screen bg-center overflow-y-1" style={{ backgroundImage: `url("https://www.npru.ac.th/2019/img/gallery/npru-57.jpg")`, filter: 'blur(2px)' }}></div>
      <div class="container-fluid mt-5">
        <center><h2> ประชาสัมพันธ์ </h2></center>

        <div class="row row-cols-1 row-cols-md-3">
          {educationdata.map((educationdata) => {
            return (
              <div class="col mb-4">
                <Card>
                  <CardImg top width="" src="https://tcaster.net/wp-content/uploads/2020/10/631010.01.png" alt="Card image cap" />
                  <CardBody>
                    <div className="lg:items-center lg:justify-between">
                      <div className="flex-1 min-w-0">
                        <h2 className="text-lg flex-warp font-bold leading-7 text-gray-900 sm:text-xl pb-3 border-b">{educationdata.name_uni}</h2>
                        <div className="">
                          <div className="mt-2 flex items-center text-sm text-gray-500">
                            <BriefcaseIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                            รับจำนวน : {educationdata.number_of_edu}
                          </div>
                          <div className="mt-2 flex items-center text-sm text-gray-500">
                            <LocationMarkerIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                            รอบ : {educationdata.name_round}
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 lg:mt-0">
                        <span className="">
                          <a
                            type="button"
                            href={"/educationstudentdetail/" + educationdata.id_education}
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
        <br />
      </div>
    </div>

  );
        }
        else if(session.fname_staff = session.fname_staff) {
          return (
            <div className="mt-32 mx-auto">
              <div className="bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="lg:text-center">
                    <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                      จัดการข้อมูลทั้งหมด
                    </p>
                    {/* <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                      Lorem ipsum dolor sit amet consect adipisicing elit. Possimus magnam voluptatum cupiditate veritatis in
                      accusamus quisquam.
                    </p> */}
                  </div>
        
                  <div className="mt-10">
                    <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Main Menu</h2>
                    <dl className="mt-4 space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                      {features.map((feature) => (
                        <a className="hover:no-underline" href={feature.href}>
                          <div key={feature.name} className="relative">
                            <dt>
                              <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                                <feature.icon className="h-6 w-6" aria-hidden="true" />
                              </div>
                              <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{feature.name}</p>
                            </dt>
                            <dd className="mt-2 ml-16 text-base text-gray-500">{feature.description}</dd>
                          </div>
                        </a>
                      ))}
                    </dl>
        
                    <h2 className="mt-5 text-base text-indigo-600 font-semibold tracking-wide uppercase">University Information Menu</h2>
                    <dl className="mt-4 space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                      {featuresUniversity.map((feature) => (
                        <a className="hover:no-underline" href={feature.href}>
                          <div key={feature.name} className="relative">
                            <dt>
                              <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                                <feature.icon className="h-6 w-6" aria-hidden="true" />
                              </div>
                              <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{feature.name}</p>
                            </dt>
                            <dd className="mt-2 ml-16 text-base text-gray-500">{feature.description}</dd>
                          </div>
                        </a>
                      ))}
                    </dl>
        
                    <h2 className="mt-5 text-base text-indigo-600 font-semibold tracking-wide uppercase">Student Information Menu</h2>
                    <dl className="mt-4 space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                      {featuresStudent.map((feature) => (
                        <a className="hover:no-underline" href={feature.href}>
                          <div key={feature.name} className="relative">
                            <dt>
                              <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                                <feature.icon className="h-6 w-6" aria-hidden="true" />
                              </div>
                              <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{feature.name}</p>
                            </dt>
                            <dd className="mt-2 ml-16 text-base text-gray-500">{feature.description}</dd>
                          </div>
                        </a>
                      ))}
                    </dl>
        
                  </div>
                </div>
              </div>
            </div>
          );
        }
        else if(session.fname_admin = session.fname_admin) {
          return (
            <div>
                <center><h2> DashBoard </h2></center>
         <div class="container">
         <Row>
            <Col><Button href="./insertstudent">AddStudent</Button></Col>
          </Row>
          <Row>
            <Col><Button href="./Adminall">ข้อมูลผู้ดูเเล</Button></Col>
          </Row>
    </div>    
    
    
    
    </div>
    );
      }
      else {
        return (
          <div>
            <div className="pt-36 md:pt-52 bg-yellow-600 mx-auto">
              <div className="mx-auto sm:text-center lg:text-left pb-12 md:pb-28">
                <h1 className="text-center mx-auto text-3xl font-extrabold text-white sm:text-5xl md:text-6xl lg:text-7xl sm:max-w-5xl md:max-w-4xl lg:max-w-6xl">
                  <span className="block xl:inline">โรงเรียนประสาทรัฐประชากิจ</span>{' '}
                  <span className="block text-red-800 xl:inline">Prasartratprachakit School</span>
                </h1>
                <p className="mt-3 text-center text-base text-dark sm:mt-5 sm:text-lg sm:max-w-2xl sm:mx-auto md:mt-5">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum, explicabo. Ex a error perspiciatis eos nulla aut dicta dolores? Culpa, quia! Corrupti, adipisci harum laboriosam dolores odit possimus veritatis tenetur.
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
            </div>
            <div class="wow fadeInUpBig bg-fixed w-full h-80 md:h-screen bg-center overflow-y-1" style={{ backgroundImage: `url("https://www.npru.ac.th/2019/img/gallery/npru-57.jpg")`, filter: 'blur(2px)' }}></div>
            <div class="container-fluid mt-5">
              <center><h2> ประชาสัมพันธ์ </h2></center>
      
              <div class="row row-cols-1 row-cols-md-3">
                {educationdata.map((educationdata) => {
                  return (
                    <div class="col mb-4">
                      <Card>
                        <CardImg top width="" src="https://tcaster.net/wp-content/uploads/2020/10/631010.01.png" alt="Card image cap" />
                        <CardBody>
                          <div className="lg:items-center lg:justify-between">
                            <div className="flex-1 min-w-0">
                              <h2 className="text-lg flex-warp font-bold leading-7 text-gray-900 sm:text-xl pb-3 border-b">{educationdata.name_uni}</h2>
                              <div className="">
                                <div className="mt-2 flex items-center text-sm text-gray-500">
                                  <BriefcaseIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                                  รับจำนวน : {educationdata.number_of_edu}
                                </div>
                                <div className="mt-2 flex items-center text-sm text-gray-500">
                                  <LocationMarkerIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                                  รอบ : {educationdata.name_round}
                                </div>
                              </div>
                            </div>
                            <div className="mt-3 lg:mt-0">
                              <span className="">
                                <a
                                  type="button"
                                  href={"/educationstudentdetail/" + educationdata.id_education}
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
              <br />
            </div>
          </div>
      
        );
              }
    
}

export default Index;
