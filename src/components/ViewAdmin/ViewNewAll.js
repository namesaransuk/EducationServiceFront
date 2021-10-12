import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' //fornt
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import Pagination from '../pagination/paginationnew';

import {
  Row, Col, Button, FormGroup, Label, Input,
  NavLink, Table
} from 'reactstrap';
import Swal from 'sweetalert2';

import confirm from "reactstrap-confirm";

const ViewNewAll = () => {
  const [Admin, setAdmin] = useState([])
  const [filteredData, setFilteredData] = useState(Admin);

  const handleSearch = (event) => {
    let value = event.target.value.toLowerCase();
    let result = [];
    console.log(value);
    result = Admin.filter((data) => {
      return data.new_name.search(value) != -1;

    });
    setFilteredData(result);
  }
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(1);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get('https://educationservice.herokuapp.com/EducationNew');
      setAdmin(response.data);
      setFilteredData(response.data);
        };
    fetchPosts();
  }, []);


  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = Admin.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div>
      <div className="px-4 flex flex-col max-w-3xl mx-auto mt-32">
        <div className="text-center mx-auto">
          <h3 className="text-center">ข่าวประชาสัมพันธ์</h3>
          <Col>
            <FormGroup>
              <Label for="year_edu">ค้นหา</Label>
              <Input type="text" className="text-center" name="fname_staff" id="fname_staff" placeholder="กรุณาใส่ชื่อที่จะค้นหา" onChange={(event) => handleSearch(event)} />
            </FormGroup>
          </Col>
        </div>
      </div>
      <div className="flex flex-col max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Row className="pt-5">
          <Col>
            <h3 className="block text-left">ข่าว</h3>
          </Col>
          <Col>
            <a className="block text-right" href="/Admin/InsertNew">เพิ่มข่าวประชาสัมพันธ์</a>
          </Col>
        </Row>
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="table-striped min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-500">
                  <tr>
                  <th
                      scope="col"
                      className="px-12 py-3 text-left text-md font-medium text-white uppercase tracking-wider"
                    >
                      รูป
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-md font-medium text-white uppercase tracking-wider"
                    >
                      หัวข้อข่าว
                    </th>
                    <th
                      scope="col"
                      className="break-all px-6 py-3 text-left text-md font-medium text-white uppercase tracking-wider"
                    >
                      กิจกรรมเริ่ม
                    </th>
                    <th
                      scope="col"
                      className="break-all px-6 py-3 text-left text-md font-medium text-white uppercase tracking-wider"
                    >
                      กิจกรรมจบ
                    </th>
                    {/* <th
                      scope="col"
                      className="px-6 py-3 text-left text-md font-medium text-white uppercase tracking-wider"
                    >
                      รายละเอียด
                    </th> */}
                    {/* <th
                      scope="col"
                      className="px-6 py-3 text-left text-md font-medium text-white uppercase tracking-wider"
                    >
                      url
                    </th> */}
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-md font-medium text-white uppercase tracking-wider"
                    >
                      เเก้ไข
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredData.map((Admin) => (
                    <tr key={Admin.id_new}>
                      <td className="px-6 py-4 whitespace-wrap">
                        <div className="flex items-center">
                          {/* <div className="flex-shrink-0 h-10 w-10">
                              <img className="h-10 w-10 rounded-full" src={person.image} alt="" />
                            </div> */}
                            
                          <div className="ml-4">
                            <div className="text-md font-medium text-gray-900"><img width="100" className="mx-auto" src={Admin.new_image || 'https://via.placeholder.com/150'} /></div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap ">
                        <div className="text-md text-gray-900">{Admin.new_name} </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap ">
                        <div className="text-md text-gray-900">{Admin.new_date_open} </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap ">
                        <div className="text-md text-gray-900">{Admin.new_date_close} </div>
                      </td>
                      {/* <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-md text-gray-900">{Admin.new_detail}</div>
                      </td> */}
                      {/* <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-md text-gray-900">{Admin.new_url}</div>
                      </td> */}
                      <td><a href={"/Admin/EditNew/" + Admin.id_new} className="text-white bg-green-600 hover:bg-green-800 rounded-md px-4 py-2.5 hover:no-underline">
                          เเก้ไข
                        </a></td>     
                         
                    </tr>
                  ))}
                </tbody> 
              
              </table>

            </div>
          </div>               <center> {filteredData.length === 0 && <span>ไม่พบข้อมูลที่ค้นหา</span>} </center>

        </div>
      </div>
    </div>
  );
}

export default ViewNewAll;