import React, { Fragment, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Container,
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText,
    Button
} from 'reactstrap';
import Swal from 'sweetalert2';
import { Disclosure, Menu, Transition, Popover } from '@headlessui/react'
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline'


const Header = () => {
    const navigation = [
        { name: 'ข้อมูลการศึกษาต่อ', href: '/educationstudentallstudent', current: true },
        { name: 'ข้อมูลมหาวิทยาลัย', href: '/educationstudent', current: false },
        
    
    ]
    const profile = [
        { name: 'ข้อมูลส่วนตัว', href: '/profile/' },
        { name: 'ข้อมูลการศึกษาต่อ', href: '/detaileducationstudent/' }
    ]
    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }
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

    if (session.id === null) {
        return (
            <div className="fixed left-0 right-0 z-50 top-0">
                {/* เต็มหน้าจอ */}
                <div className="mx-auto">
                    <div className="pb-2 sm:pt-4 md:pt-4 bg-yellow-600">
                        <Popover>
                            {({ open }) => (
                                <>
                                    <div className="pt-2 sm:pb-4 md:pb-4 px-4">
                                        <nav
                                            className="relative flex items-center justify-between sm:h-10 lg:justify-start"
                                            aria-label="Global"
                                        >
                                            <div className="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
                                                <div className="flex items-center justify-between w-full md:w-auto">
                                                    <a href="/">
                                                        <span className="sr-only">Workflow</span>
                                                        <img
                                                            className="h-16 w-auto"
                                                            src="https://lh3.googleusercontent.com/proxy/sFH-HbHtnXnn1mfvVRkAC66F3HWv7iUVcEWFlCs0OVP3Iykod4zYHPuWueE0DgW_s9bj-SQwZi3lrGuo7sVR9nEERCaz7s1W7FGn8UV78ELqT1S2XOL5qAM"
                                                        />
                                                    </a>
                                                    <div className="-mr-2 flex items-center md:hidden">
                                                        <Popover.Button className="bg-yellow-600 rounded-md p-2 inline-flex items-center justify-center text-white hover:text-black focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                                            <span className="sr-only">Open main menu</span>
                                                            <MenuIcon className="h-6 w-6" aria-hidden="true" />
                                                        </Popover.Button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="hidden md:block md:ml-auto md:pr-4 md:space-x-8">
                                                {navigation.map((item) => (
                                                    <a key={item.name} href={item.href} className="font-medium text-white hover:text-gray hover:no-underline">
                                                        {item.name}
                                                    </a>
                                                ))}
                                                <a href="/login" type="button" className="items-center justify-center px-4 py-2.5 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                                                    เข้าสู่ระบบ
                                                     </a>
                                            </div>
                                        </nav>
                                    </div>

                                    {/* ย่อหน้าจอ */}
                                    <Transition
                                        show={open}
                                        as={Fragment}
                                        enter="duration-150 ease-out"
                                        enterFrom="opacity-0 scale-95"
                                        enterTo="opacity-100 scale-100"
                                        leave="duration-100 ease-in"
                                        leaveFrom="opacity-100 scale-100"
                                        leaveTo="opacity-0 scale-95"
                                    >
                                        <Popover.Panel
                                            focus
                                            static
                                            className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
                                        >
                                            <div className="rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
                                                <div className="px-5 pt-4 flex items-center justify-between">
                                                    <div>
                                                        <img
                                                            className="h-12 w-auto"
                                                            src="https://lh3.googleusercontent.com/proxy/sFH-HbHtnXnn1mfvVRkAC66F3HWv7iUVcEWFlCs0OVP3Iykod4zYHPuWueE0DgW_s9bj-SQwZi3lrGuo7sVR9nEERCaz7s1W7FGn8UV78ELqT1S2XOL5qAM"
                                                            alt=""
                                                        />
                                                    </div>
                                                    <div className="-mr-2">
                                                        <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-black hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-black">
                                                            <span className="sr-only">Close main menu</span>
                                                            <XIcon className="h-6 w-6" aria-hidden="true" />
                                                        </Popover.Button>
                                                    </div>
                                                </div>
                                                <div className="px-2 pt-2 pb-3 space-y-1">
                                                    {navigation.map((item) => (
                                                        <a
                                                            key={item.name}
                                                            href={item.href}
                                                            className="text-center block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                                                        >
                                                            {item.name}
                                                        </a>
                                                    ))}
                                                </div>
                                                <a
                                                    href="/login"
                                                    className="block w-full px-5 py-3 text-center font-medium text-indigo-600 bg-gray-50 hover:bg-gray-100"
                                                >
                                                    เข้าสู่ระบบ
                                                    </a>
                                            </div>
                                        </Popover.Panel>
                                    </Transition>
                                </>
                            )}
                        </Popover>
                    </div>
                </div>
            </div>
        );
    }
    else if(session.fname_staff = session.fname_staff) {
        return (
            <div className="fixed left-0 right-0 z-50 top-0">
                {/* เต็มหน้าจอ */}
                <div className="mx-auto">
                    <div className="pb-2 sm:pt-4 md:pt-4 bg-yellow-600">
                        <Popover>
                            {({ open }) => (
                                <>
                                    <div className="pt-2 sm:pb-4 md:pb-4 px-4">
                                        <nav
                                            className="relative flex items-center justify-between sm:h-10 lg:justify-start"
                                            aria-label="Global"
                                        >
                                            <div className="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
                                                <div className="flex items-center justify-between w-full md:w-auto">
                                                    <a href="/DashboardTeacher">
                                                        <span className="sr-only">Workflow</span>
                                                        <img
                                                            className="h-16 w-auto"
                                                            src="https://lh3.googleusercontent.com/proxy/sFH-HbHtnXnn1mfvVRkAC66F3HWv7iUVcEWFlCs0OVP3Iykod4zYHPuWueE0DgW_s9bj-SQwZi3lrGuo7sVR9nEERCaz7s1W7FGn8UV78ELqT1S2XOL5qAM"
                                                        />
                                                    </a>
                                                    <div className="-mr-2 flex items-center md:hidden">
                                                        <Popover.Button className="bg-yellow-600 rounded-md p-2 inline-flex items-center justify-center text-white hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-0 focus:ring-inset focus:ring-indigo-500">
                                                            <span className="sr-only">Open main menu</span>
                                                            <MenuIcon className="h-6 w-6" aria-hidden="true" />
                                                        </Popover.Button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="hidden md:block md:ml-auto md:pr-4 md:space-x-8">
                                                {navigation.map((item) => (
                                                    <a key={item.name} href={item.href} className="font-medium text-white hover:text-gray hover:no-underline">
                                                        {item.name}
                                                    </a>
                                                ))}
                                            </div>
                                            <div className="hidden md:block">
                                                {/* Profile dropdown */}
                                                <Menu as="div" className="ml-3 relative">
                                                    {({ open }) => (
                                                        <>
                                                            <div>
                                                                <Menu.Button className="bg-yellow-600 rounded-full flex items-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                                                    <span className="sr-only">Open user menu</span>
                                                                    <a href="#!" className="font-medium text-white hover:text-gray hover:no-underline mr-2">{session.fname_staff}{" "}{session.lname_staff}</a>
                                                                    <img
                                                                        className="h-8 w-8 rounded-full"
                                                                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                                                        alt=""
                                                                    />
                                                                </Menu.Button>
                                                            </div>
                                                            <Transition
                                                                show={open}
                                                                as={Fragment}
                                                                enter="transition ease-out duration-100"
                                                                enterFrom="transform opacity-0 scale-95"
                                                                enterTo="transform opacity-100 scale-100"
                                                                leave="transition ease-in duration-75"
                                                                leaveFrom="transform opacity-100 scale-100"
                                                                leaveTo="transform opacity-0 scale-95"
                                                            >
                                                                <Menu.Items
                                                                    static
                                                                    className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                                                                >
                                                                    {profile.map((item) => (
                                                                        <Menu.Item key={item.name}>
                                                                            {({ active }) => (
                                                                                <a
                                                                                    href={session.id == null ? item.href : item.href + session.id}
                                                                                    className={classNames(
                                                                                        active ? 'bg-gray-100' : '',
                                                                                        'block px-4 py-2 text-sm text-gray-700'
                                                                                    )}
                                                                                >
                                                                                    {item.name}
                                                                                </a>
                                                                            )}
                                                                        </Menu.Item>
                                                                    ))}
                                                                    <Menu.Item>
                                                                        <a
                                                                            onClick={logout}
                                                                            className='block hover:bg-gray-100 px-4 py-2 text-sm text-gray-700'
                                                                        >
                                                                            ออกจากระบบ
                                                                        </a>
                                                                    </Menu.Item>
                                                                </Menu.Items>
                                                            </Transition>
                                                        </>
                                                    )}
                                                </Menu>
                                            </div>
                                        </nav>
                                    </div>

                                    {/* ย่อหน้าจอ */}
                                    <Transition
                                        show={open}
                                        as={Fragment}
                                        enter="duration-150 ease-out"
                                        enterFrom="opacity-0 scale-95"
                                        enterTo="opacity-100 scale-100"
                                        leave="duration-100 ease-in"
                                        leaveFrom="opacity-100 scale-100"
                                        leaveTo="opacity-0 scale-95"
                                    >
                                        <Popover.Panel
                                            focus
                                            static
                                            className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
                                        >
                                            <div className="rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
                                                <div className="px-5 pt-4 flex items-center justify-between">
                                                    <div>
                                                        <img
                                                            className="h-12 w-auto"
                                                            src="https://lh3.googleusercontent.com/proxy/sFH-HbHtnXnn1mfvVRkAC66F3HWv7iUVcEWFlCs0OVP3Iykod4zYHPuWueE0DgW_s9bj-SQwZi3lrGuo7sVR9nEERCaz7s1W7FGn8UV78ELqT1S2XOL5qAM"
                                                            alt=""
                                                        />
                                                    </div>
                                                    <div className="-mr-2">
                                                        <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-white hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-0 focus:ring-inset focus:ring-indigo-500">
                                                            <span className="sr-only">Close main menu</span>
                                                            <XIcon className="h-6 w-6" aria-hidden="true" />
                                                        </Popover.Button>
                                                    </div>
                                                </div>
                                                <div className="px-2 pt-2 pb-2 space-y-1">
                                                    {navigation.map((item) => (
                                                        <a
                                                            key={item.name}
                                                            href={item.href}
                                                            className="text-center block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-300"
                                                        >
                                                            {item.name}
                                                        </a>
                                                    ))}
                                                    <br />
                                                    <div className="pt-4 pb-3 border-t border-gray-300">
                                                        <div className="h-20 rounded-xl bg-gray-700 flex items-center px-5">
                                                            <div className="flex-shrink-0">
                                                                <img
                                                                    className="h-10 w-10 rounded-full"
                                                                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                                                    alt=""
                                                                />
                                                            </div>
                                                            <div className="ml-3">
                                                                <div className="text-base text-white font-medium leading-none">{session.fname}{' '}{session.lname}</div>
                                                                <div className="text-sm font-medium leading-none text-white">{session.id}</div>
                                                            </div>
                                                            <button className="ml-auto bg-gray-300 flex-shrink-0 p-1 rounded-full text-dark-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                                                <span className="sr-only">View notifications</span>
                                                                <BellIcon className="h-6 w-6" aria-hidden="true" />
                                                            </button>
                                                        </div>
                                                        <div className="mt-3 px-2 space-y-1">
                                                            {profile.map((item) => (
                                                                <a
                                                                    key={item.name}
                                                                    href={session.id == null ? item.href : item.href + session.id}
                                                                    className="block text-center px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-white hover:bg-gray-700"
                                                                >
                                                                    {item.name}
                                                                </a>
                                                            ))}
                                                            <a
                                                                onClick={logout}
                                                                className='block text-center px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-white hover:bg-red-500'
                                                            >
                                                                ออกจากระบบ
                                                                        </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Popover.Panel>
                                    </Transition>
                                </>
                            )}
                        </Popover>
                    </div>
                </div>
            </div >
        );
    
    }
    else if(session.fname_admin = session.fname_admin) {
        return (
            <div className="fixed left-0 right-0 z-50 top-0">
                {/* เต็มหน้าจอ */}
                <div className="mx-auto">
                    <div className="pb-2 sm:pt-4 md:pt-4 bg-yellow-600">
                        <Popover>
                            {({ open }) => (
                                <>
                                    <div className="pt-2 sm:pb-4 md:pb-4 px-4">
                                        <nav
                                            className="relative flex items-center justify-between sm:h-10 lg:justify-start"
                                            aria-label="Global"
                                        >
                                            <div className="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
                                                <div className="flex items-center justify-between w-full md:w-auto">
                                                    <a href="/DashBoardAdmin">
                                                        <span className="sr-only">Workflow</span>
                                                        <img
                                                            className="h-16 w-auto"
                                                            src="https://lh3.googleusercontent.com/proxy/sFH-HbHtnXnn1mfvVRkAC66F3HWv7iUVcEWFlCs0OVP3Iykod4zYHPuWueE0DgW_s9bj-SQwZi3lrGuo7sVR9nEERCaz7s1W7FGn8UV78ELqT1S2XOL5qAM"
                                                        />
                                                    </a>
                                                    <div className="-mr-2 flex items-center md:hidden">
                                                        <Popover.Button className="bg-yellow-600 rounded-md p-2 inline-flex items-center justify-center text-white hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-0 focus:ring-inset focus:ring-indigo-500">
                                                            <span className="sr-only">Open main menu</span>
                                                            <MenuIcon className="h-6 w-6" aria-hidden="true" />
                                                        </Popover.Button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="hidden md:block md:ml-auto md:pr-4 md:space-x-8">
                                                {navigation.map((item) => (
                                                    <a key={item.name} href={item.href} className="font-medium text-white hover:text-gray hover:no-underline">
                                                        {item.name}
                                                    </a>
                                                ))}
                                            </div>
                                            <div className="hidden md:block">
                                                {/* Profile dropdown */}
                                                <Menu as="div" className="ml-3 relative">
                                                    {({ open }) => (
                                                        <>
                                                            <div>
                                                                <Menu.Button className="bg-yellow-600 rounded-full flex items-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                                                    <span className="sr-only">Open user menu</span>
                                                                    <a href="#!" className="font-medium text-white hover:text-gray hover:no-underline mr-2">{session.fname_admin}{" "}{session.fname_admin}</a>
                                                                    <img
                                                                        className="h-8 w-8 rounded-full"
                                                                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                                                        alt=""
                                                                    />
                                                                </Menu.Button>
                                                            </div>
                                                            <Transition
                                                                show={open}
                                                                as={Fragment}
                                                                enter="transition ease-out duration-100"
                                                                enterFrom="transform opacity-0 scale-95"
                                                                enterTo="transform opacity-100 scale-100"
                                                                leave="transition ease-in duration-75"
                                                                leaveFrom="transform opacity-100 scale-100"
                                                                leaveTo="transform opacity-0 scale-95"
                                                            >
                                                                <Menu.Items
                                                                    static
                                                                    className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                                                                >
                                                                    {profile.map((item) => (
                                                                        <Menu.Item key={item.name}>
                                                                            {({ active }) => (
                                                                                <a
                                                                                    href={session.id == null ? item.href : item.href + session.id}
                                                                                    className={classNames(
                                                                                        active ? 'bg-gray-100' : '',
                                                                                        'block px-4 py-2 text-sm text-gray-700'
                                                                                    )}
                                                                                >
                                                                                    {item.name}
                                                                                </a>
                                                                            )}
                                                                        </Menu.Item>
                                                                    ))}
                                                                    <Menu.Item>
                                                                        <a
                                                                            onClick={logout}
                                                                            className='block hover:bg-gray-100 px-4 py-2 text-sm text-gray-700'
                                                                        >
                                                                            ออกจากระบบ
                                                                        </a>
                                                                    </Menu.Item>
                                                                </Menu.Items>
                                                            </Transition>
                                                        </>
                                                    )}
                                                </Menu>
                                            </div>
                                        </nav>
                                    </div>

                                    {/* ย่อหน้าจอ */}
                                    <Transition
                                        show={open}
                                        as={Fragment}
                                        enter="duration-150 ease-out"
                                        enterFrom="opacity-0 scale-95"
                                        enterTo="opacity-100 scale-100"
                                        leave="duration-100 ease-in"
                                        leaveFrom="opacity-100 scale-100"
                                        leaveTo="opacity-0 scale-95"
                                    >
                                        <Popover.Panel
                                            focus
                                            static
                                            className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
                                        >
                                            <div className="rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
                                                <div className="px-5 pt-4 flex items-center justify-between">
                                                    <div>
                                                        <img
                                                            className="h-12 w-auto"
                                                            src="https://lh3.googleusercontent.com/proxy/sFH-HbHtnXnn1mfvVRkAC66F3HWv7iUVcEWFlCs0OVP3Iykod4zYHPuWueE0DgW_s9bj-SQwZi3lrGuo7sVR9nEERCaz7s1W7FGn8UV78ELqT1S2XOL5qAM"
                                                            alt=""
                                                        />
                                                    </div>
                                                    <div className="-mr-2">
                                                        <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-white hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-0 focus:ring-inset focus:ring-indigo-500">
                                                            <span className="sr-only">Close main menu</span>
                                                            <XIcon className="h-6 w-6" aria-hidden="true" />
                                                        </Popover.Button>
                                                    </div>
                                                </div>
                                                <div className="px-2 pt-2 pb-2 space-y-1">
                                                    {navigation.map((item) => (
                                                        <a
                                                            key={item.name}
                                                            href={item.href}
                                                            className="text-center block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-300"
                                                        >
                                                            {item.name}
                                                        </a>
                                                    ))}
                                                    <br />
                                                    <div className="pt-4 pb-3 border-t border-gray-300">
                                                        <div className="h-20 rounded-xl bg-gray-700 flex items-center px-5">
                                                            <div className="flex-shrink-0">
                                                                <img
                                                                    className="h-10 w-10 rounded-full"
                                                                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                                                    alt=""
                                                                />
                                                            </div>
                                                            <div className="ml-3">
                                                                <div className="text-base text-white font-medium leading-none">{session.fname}{' '}{session.lname}</div>
                                                                <div className="text-sm font-medium leading-none text-white">{session.id}</div>
                                                            </div>
                                                            <button className="ml-auto bg-gray-300 flex-shrink-0 p-1 rounded-full text-dark-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                                                <span className="sr-only">View notifications</span>
                                                                <BellIcon className="h-6 w-6" aria-hidden="true" />
                                                            </button>
                                                        </div>
                                                        <div className="mt-3 px-2 space-y-1">
                                                            {profile.map((item) => (
                                                                <a
                                                                    key={item.name}
                                                                    href={session.id == null ? item.href : item.href + session.id}
                                                                    className="block text-center px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-white hover:bg-gray-700"
                                                                >
                                                                    {item.name}
                                                                </a>
                                                            ))}
                                                            <a
                                                                onClick={logout}
                                                                className='block text-center px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-white hover:bg-red-500'
                                                            >
                                                                ออกจากระบบ
                                                                        </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Popover.Panel>
                                    </Transition>
                                </>
                            )}
                        </Popover>
                    </div>
                </div>
            </div >
        );
    
    }
    else if(session.fname = session.fname) {
        return (
            <div className="fixed left-0 right-0 z-50 top-0">
                {/* เต็มหน้าจอ */}
                <div className="mx-auto">
                    <div className="pb-2 sm:pt-4 md:pt-4 bg-yellow-600">
                        <Popover>
                            {({ open }) => (
                                <>
                                    <div className="pt-2 sm:pb-4 md:pb-4 px-4">
                                        <nav
                                            className="relative flex items-center justify-between sm:h-10 lg:justify-start"
                                            aria-label="Global"
                                        >
                                            <div className="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
                                                <div className="flex items-center justify-between w-full md:w-auto">
                                                    <a href="/">
                                                        <span className="sr-only">Workflow</span>
                                                        <img
                                                            className="h-16 w-auto"
                                                            src="https://lh3.googleusercontent.com/proxy/sFH-HbHtnXnn1mfvVRkAC66F3HWv7iUVcEWFlCs0OVP3Iykod4zYHPuWueE0DgW_s9bj-SQwZi3lrGuo7sVR9nEERCaz7s1W7FGn8UV78ELqT1S2XOL5qAM"
                                                        />
                                                    </a>
                                                    <div className="-mr-2 flex items-center md:hidden">
                                                        <Popover.Button className="bg-yellow-600 rounded-md p-2 inline-flex items-center justify-center text-white hover:text-gray-900 focus:outline-none focus:ring-0 focus:ring-inset focus:ring-indigo-500">
                                                            <span className="sr-only">Open main menu</span>
                                                            <MenuIcon className="h-6 w-6" aria-hidden="true" />
                                                        </Popover.Button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="hidden md:block md:ml-auto md:pr-4 md:space-x-8">
                                                {navigation.map((item) => (
                                                    <a key={item.name} href={item.href} className="font-medium text-white hover:text-gray hover:no-underline">
                                                        {item.name}
                                                    </a>
                                                ))}
                                            </div>
                                            <div className="hidden md:block">
                                                {/* Profile dropdown */}
                                                <Menu as="div" className="ml-3 relative">
                                                    {({ open }) => (
                                                        <>
                                                            <div>
                                                                <Menu.Button className="bg-yellow-600 rounded-full flex items-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                                                    <span className="sr-only">Open user menu</span>
                                                                    <a href="#!" className="font-medium text-white hover:text-gray hover:no-underline mr-2">{session.fname}{" "}{session.lname}</a>
                                                                    <img
                                                                        className="h-8 w-8 rounded-full"
                                                                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                                                        alt=""
                                                                    />
                                                                </Menu.Button>
                                                            </div>
                                                            <Transition
                                                                show={open}
                                                                as={Fragment}
                                                                enter="transition ease-out duration-100"
                                                                enterFrom="transform opacity-0 scale-95"
                                                                enterTo="transform opacity-100 scale-100"
                                                                leave="transition ease-in duration-75"
                                                                leaveFrom="transform opacity-100 scale-100"
                                                                leaveTo="transform opacity-0 scale-95"
                                                            >
                                                                <Menu.Items
                                                                    static
                                                                    className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                                                                >
                                                                    {profile.map((item) => (
                                                                        <Menu.Item key={item.name}>
                                                                            {({ active }) => (
                                                                                <a
                                                                                    href={session.id == null ? item.href : item.href + session.id}
                                                                                    className={classNames(
                                                                                        active ? 'bg-gray-100' : '',
                                                                                        'block px-4 py-2 text-sm text-gray-700'
                                                                                    )}
                                                                                >
                                                                                    {item.name}
                                                                                </a>
                                                                            )}
                                                                        </Menu.Item>
                                                                    ))}
                                                                    <Menu.Item>
                                                                        <a
                                                                            onClick={logout}
                                                                            className='block hover:bg-gray-100 px-4 py-2 text-sm text-gray-700'
                                                                        >
                                                                            ออกจากระบบ
                                                                        </a>
                                                                    </Menu.Item>
                                                                </Menu.Items>
                                                            </Transition>
                                                        </>
                                                    )}
                                                </Menu>
                                            </div>
                                        </nav>
                                    </div>

                                    {/* ย่อหน้าจอ */}
                                    <Transition
                                        show={open}
                                        as={Fragment}
                                        enter="duration-150 ease-out"
                                        enterFrom="opacity-0 scale-95"
                                        enterTo="opacity-100 scale-100"
                                        leave="duration-100 ease-in"
                                        leaveFrom="opacity-100 scale-100"
                                        leaveTo="opacity-0 scale-95"
                                    >
                                        <Popover.Panel
                                            focus
                                            static
                                            className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
                                        >
                                            <div className="rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
                                                <div className="px-5 pt-4 flex items-center justify-between">
                                                    <div>
                                                        <img
                                                            className="h-12 w-auto"
                                                            src="https://lh3.googleusercontent.com/proxy/sFH-HbHtnXnn1mfvVRkAC66F3HWv7iUVcEWFlCs0OVP3Iykod4zYHPuWueE0DgW_s9bj-SQwZi3lrGuo7sVR9nEERCaz7s1W7FGn8UV78ELqT1S2XOL5qAM"
                                                            alt=""
                                                        />
                                                    </div>
                                                    <div className="-mr-2">
                                                        <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-dark hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-0 focus:ring-inset focus:ring-dark">
                                                            <span className="sr-only">Close main menu</span>
                                                            <XIcon className="h-6 w-6" aria-hidden="true" />
                                                        </Popover.Button>
                                                    </div>
                                                </div>
                                                <div className="px-2 pt-2 pb-2 space-y-1">
                                                    {navigation.map((item) => (
                                                        <a
                                                            key={item.name}
                                                            href={item.href}
                                                            className="text-center block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-300"
                                                        >
                                                            {item.name}
                                                        </a>
                                                    ))}
                                                    <br />
                                                    <div className="pt-4 pb-3 border-t border-gray-300">
                                                        <div className="h-20 rounded-xl bg-gray-700 flex items-center px-5">
                                                            <div className="flex-shrink-0">
                                                                <img
                                                                    className="h-10 w-10 rounded-full"
                                                                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                                                    alt=""
                                                                />
                                                            </div>
                                                            <div className="ml-3">
                                                                <div className="text-base text-white font-medium leading-none">{session.fname}{' '}{session.lname}</div>
                                                                <div className="text-sm font-medium leading-none text-white">{session.id}</div>
                                                            </div>
                                                            <button className="ml-auto bg-gray-300 flex-shrink-0 p-1 rounded-full text-dark-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                                                <span className="sr-only">View notifications</span>
                                                                <BellIcon className="h-6 w-6" aria-hidden="true" />
                                                            </button>
                                                        </div>
                                                        <div className="mt-3 px-2 space-y-1">
                                                            {profile.map((item) => (
                                                                <a
                                                                    key={item.name}
                                                                    href={session.id == null ? item.href : item.href + session.id}
                                                                    className="block text-center px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-white hover:bg-gray-700"
                                                                >
                                                                    {item.name}
                                                                </a>
                                                            ))}
                                                            <a
                                                                onClick={logout}
                                                                className='block text-center px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-white hover:bg-red-500'
                                                            >
                                                                ออกจากระบบ
                                                                        </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Popover.Panel>
                                    </Transition>
                                </>
                            )}
                        </Popover>
                    </div>
                </div>
            </div >
        );
    }

}


export default Header;