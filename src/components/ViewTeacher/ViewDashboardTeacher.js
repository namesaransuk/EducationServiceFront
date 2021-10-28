import React, { useState } from 'react';
import { Container, Row, Col, Button, } from 'reactstrap';
import { AcademicCapIcon, BookmarkAltIcon, UsersIcon, LibraryIcon, UserIcon, OfficeBuildingIcon, IdentificationIcon } from '@heroicons/react/outline'

const ViewDashboardTeacher = (props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen(prevState => !prevState);

  const features = [
    {
      name: 'มหาวิทยาลัย',
      href: '/Teacher/universityall',
      description:
        '',
      icon: LibraryIcon,
    },
    {
      name: 'คณะ',
      href: '/Teacher/facultyall',
      description:
      '',
      icon: OfficeBuildingIcon,
    },
    {
      name: 'สาขา',
      href: '/Teacher/courseall',
      description:
      '',
      icon: UserIcon,
    },
    {
      name: 'กลุ่มสาขา',
      href: '/Teacher/groupcourseall',
      description:
      '',
      icon: UsersIcon,
    },
    {
      name: 'หลักสูตร',
      href: '/Teacher/degreeall',
      description:
        '',
      icon: AcademicCapIcon,
    },
  ]

  const featuresUniversity = [
    {
      name: 'ข้อมูลการศึกษาต่อ',
      href: '/Teacher/educationall',
      description:
      '',
      icon: BookmarkAltIcon,
    },
  ]

  const featuresStudent = [
    {
      name: 'ข้อมูลการศึกษาต่อของนักเรียน',
      href: '/Teacher/educationstudentall',
      description:
      '',
      icon: IdentificationIcon,
    },
  ]

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
           
                <a className="hover:no-underline" href="/Teacher/Universityall">
                  <div className="relative">
                    <dt>
                      <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                        <LibraryIcon className="h-6 w-6" aria-hidden="true" />
                      </div>
                      <p className="ml-16 text-lg leading-6 font-medium text-gray-900" id="university" name="university">มหาวิทยาลัย</p>
                    </dt>
                    <dd className="mt-2 ml-16 text-base text-gray-500"></dd>
                  </div>
                </a>

                <a className="hover:no-underline" href="/Teacher/facultyall">
                  <div className="relative">
                    <dt>
                      <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                        <OfficeBuildingIcon className="h-6 w-6" aria-hidden="true" />
                      </div>
                      <p className="ml-16 text-lg leading-6 font-medium text-gray-900" id="faculty" name="faculty">คณะ</p>
                    </dt>
                    <dd className="mt-2 ml-16 text-base text-gray-500"></dd>
                  </div>
                </a>

                <a className="hover:no-underline" href="/Teacher/courseall">
                  <div className="relative">
                    <dt>
                      <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                        <UserIcon className="h-6 w-6" aria-hidden="true" />
                      </div>
                      <p className="ml-16 text-lg leading-6 font-medium text-gray-900" id="course" name="course">สาขา</p>
                    </dt>
                    <dd className="mt-2 ml-16 text-base text-gray-500"></dd>
                  </div>
                </a>

                <a className="hover:no-underline" href="/Teacher/groupcourseall">
                  <div className="relative">
                    <dt>
                      <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                        <UserIcon className="h-6 w-6" aria-hidden="true" />
                      </div>
                      <p className="ml-16 text-lg leading-6 font-medium text-gray-900" id="groupmajor" name="groupmajor">กลุ่มสาขา</p>
                    </dt>
                    <dd className="mt-2 ml-16 text-base text-gray-500"></dd>
                  </div>
                </a>

                <a className="hover:no-underline" href="/Teacher/degreeall">
                  <div className="relative">
                    <dt>
                      <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                        <AcademicCapIcon className="h-6 w-6" aria-hidden="true" />
                      </div>
                      <p className="ml-16 text-lg leading-6 font-medium text-gray-900" id="degree" name="degree">หลักสูตร</p>
                    </dt>
                    <dd className="mt-2 ml-16 text-base text-gray-500"></dd>
                  </div>
                </a>
            </dl>
            

            <h2 className="mt-5 text-base text-indigo-600 font-semibold tracking-wide uppercase">University Information Menu</h2>
            <dl className="mt-4 space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            
                <a className="hover:no-underline" href="/Teacher/educationall">
                  <div className="relative">
                    <dt>
                      <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                        <BookmarkAltIcon className="h-6 w-6" aria-hidden="true" />
                      </div>
                      <p className="ml-16 text-lg leading-6 font-medium text-gray-900" id="education" name="education">ข้อมูลการศึกษาต่อ</p>
                    </dt>
                    <dd className="mt-2 ml-16 text-base text-gray-500"></dd>
                  </div>
                </a>
             
            </dl>

            <h2 className="mt-5 text-base text-indigo-600 font-semibold tracking-wide uppercase">Student Information Menu</h2>
            <dl className="mt-4 space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            
                <a className="hover:no-underline" href="/Teacher/educationstudentall">
                  <div className="relative">
                    <dt>
                      <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                        <IdentificationIcon className="h-6 w-6" aria-hidden="true" />
                      </div>
                      <p className="ml-16 text-lg leading-6 font-medium text-gray-900" id="educationstudent" name="educationstudent">ข้อมูลการศึกษาต่อนักเรียน</p>
                    </dt>
                    <dd className="mt-2 ml-16 text-base text-gray-500"></dd>
                  </div>
                </a>
             
            </dl>

          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewDashboardTeacher;