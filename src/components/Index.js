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

function Index() {

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

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

export default Index;
