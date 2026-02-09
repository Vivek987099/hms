import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import logoImage from "./../../assets/logo/logo.png";
import { MdMenuOpen } from "react-icons/md";
import { IoMdSearch } from "react-icons/io";
import doctorimg from "./../../assets/doctor/doctor1.jpg";
import { AuthContext } from "../../context/AuthProvider";
import { FiMenu } from "react-icons/fi";
import { IoCloseSharp } from "react-icons/io5";

import { LuLayoutDashboard } from "react-icons/lu";
import { FaAngleRight } from "react-icons/fa6";
import { LuUsers } from "react-icons/lu";
import { FaUserDoctor } from "react-icons/fa6";
import { TbFileInvoice } from "react-icons/tb";
import { IoMdPersonAdd } from "react-icons/io";

function AdminHeader() {
  let { user, sidebarToggle } = useContext(AuthContext);
  let [openMenu, setOpenMenu] = useState(null);
  let {
    addUserModel,
    addDoctorModel,
    makeScheduleModel,
    createDepartModel,
    makeAppointmentModel,
    addPatientModel,
    mobileMenuToggle,
  } = useContext(AuthContext);
  let [activeIndex, setActiveIndex] = useState(1);
  return (
    <>
      <header className="admin-header outline-1 z-50 py-1 bg-white outline-gray-300">
        <div className="container flex flex-row-reverse lg:flex-row justify-between items-center">
          <div className=" lg:flex items-center gap-x-6 hidden">
            <div className="lg:flex gap-x-2 items-center hidden">
              <img className="" src={logoImage} alt="" width={60} />
              <h4 className="font-semibold text-gray-600 text-4xl">HEALTH</h4>
            </div>
            <div className="flex items-center gap-x-4">
              <button
                onClick={() => sidebarToggle.toggle()}
                className="cursor-pointer ml-4 text-gray-600 outline-none focus:outline-none p-1.5 rounded-full bg-blue-50 hover:bg-blue-100 transition-all duration-300"
              >
                {" "}
                <MdMenuOpen className="text-2xl" />
              </button>
              <div className="relative lg:w-50 xl:w-80 h-8 lg:inline-block  hidden">
                <IoMdSearch className="absolute left-2 top-1.5 z-10 text-2xl text-gray-600" />

                <input
                  className="absolute top-0 left-0 h-full w-full pl-10 text-gray-600 outline-none focus:outline-none p-1.5 rounded bg-blue-50  transition-all duration-300"
                  type="search"
                  placeholder="search...."
                />
              </div>
            </div>
          </div>
          <div className="lg:hidden flex justify-center items-center">
            <button
              onClick={() => mobileMenuToggle.setOn()}
              className="cursor-pointer"
            >
              <FiMenu className="text-2xl" />
            </button>
          </div>
          <div className="flex items-center gap-x-3">
            {/* <div className="outline-2 outline-blue-600 p-0.5  rounded-full overflow-hidden size-10">
              <img
                src={doctorimg}
                alt=""
                className=" object-cover rounded-full"
              />
            </div> */}
            <div>
              <h3 className="font-semibold text-sm lg:text-[1.1rem] text-gray-700">
                {user.username}
              </h3>
              <span className="text-gray-500">{user.role}</span>
            </div>
          </div>
        </div>
      </header>
      <div
        className={`absolute lg:hidden outline-2 outline-gray-200 h-full transition-all ease-in-out duration-300 ${
          mobileMenuToggle.value ? "left-0" : "-left-150"
        }  top-0 bg-white z-100  w-[50%]`}
      >
        <div className="flex items-center justify-between outline-1 px-2">
          <div className="p-4 flex gap-x-2 items-center ">
            <img className="" src={logoImage} alt="" width={60} />
            <h4 className="font-semibold text-gray-600 text-2xl">HEALTH</h4>
          </div>
          <div>
            <button onClick={() => mobileMenuToggle.setOff()}>
              <IoCloseSharp className="text-2xl text-gray-400" />
            </button>
          </div>
        </div>
        <div>
          <div className="p-2 ">
            <h5 className="text-gray-500 mt-3 text-[12px] font-semibold">
              {" "}
              MAIN PAGES
            </h5>
            <ul className="mt-5 admin-menu">
              <li>
                <Link
                  onClick={() => {
                    setActiveIndex(1);
                    setOpenMenu(null);
                    mobileMenuToggle.setOff();
                  }}
                  to={"/admin/dashboard"}
                  className={`flex justify-between items-center p-2  rounded-lg text-gray-600 ${
                    activeIndex === 1 ? "active" : ""
                  }`}
                >
                  <div className="flex justify-center items-center gap-x-3">
                    <LuLayoutDashboard className="text-2xl" />
                    <span className="text-[16px] font-medium">Dashboard</span>
                  </div>
                </Link>
              </li>
              <li
                onClick={() => {
                  setOpenMenu(openMenu === 1 ? null : 1), setActiveIndex(2);
                }}
              >
                <Link
                  to={"/admin/dashboard/users"}
                  className={`flex justify-between items-center p-2 text-gray-600  rounded-lg ${
                    activeIndex === 2 ? "active" : ""
                  }`}
                >
                  {/* Dropdown Toggle Button */}
                  <div className="flex justify-center items-center gap-x-3">
                    <LuUsers className="text-2xl" />
                    <span className="text-[16px] font-medium">Users</span>
                  </div>
                  <span>
                    <FaAngleRight
                      className={`${
                        openMenu === 1
                          ? " rotate-90 text-blue-600 "
                          : "rotate-0"
                      } transition-all duration-200`}
                    />
                  </span>
                </Link>

                <div
                  className={`  pl-5 ${
                    openMenu === 1
                      ? "max-h-20 opacity-100 before:max-h-20 mb-3 "
                      : " max-h-0 opacity-0 before:max-h-0 "
                  } relative transition-all ease-in-out duration-300  before:transition-all  before:ease-in-out   before:duration-200  overflow-hidden before:content-[''] before:absolute  before:w-[2px]  before:bg-gray-300 before:my-2`}
                >
                  <ul className="pl-4">
                    <li className="  rounded-lg">
                      <button
                        onClick={() => {
                          addUserModel.toggle();
                          mobileMenuToggle.setOff();
                        }}
                        className="flex justify-between items-center p-1"
                      >
                        <div className="flex justify-center items-center gap-x-3">
                          <IoMdPersonAdd className="text-[16px]" />
                          <span className="text-[13px] font-medium">
                            Add User
                          </span>
                        </div>
                      </button>
                    </li>
                    {user.role === "ADMIN" && (
                      <li className="  rounded-lg">
                        <button className="flex justify-between items-center p-1">
                          <div className="flex justify-center items-center gap-x-3">
                            <IoMdPersonAdd className="text-[16px]" />
                            <span className="text-[13px] font-medium">
                              Update User
                            </span>
                          </div>
                        </button>
                      </li>
                    )}
                  </ul>
                </div>
              </li>
              <li>
                <Link
                  onClick={() => {
                    setActiveIndex(3), setOpenMenu(openMenu === 2 ? null : 2);
                  }}
                  to={"/admin/dashboard/doctors"}
                  className={`flex justify-between items-center p-2  text-gray-600 rounded-lg ${
                    activeIndex === 3 ? "active" : ""
                  }`}
                >
                  <div className="flex justify-center items-center gap-x-3">
                    <FaUserDoctor className="text-2xl" />
                    <span className="text-[16px] font-medium">Doctors</span>
                  </div>
                  <span
                    className={`${
                      openMenu === 2 ? " rotate-90 text-blue-600 " : "rotate-0"
                    } transition-all duration-200`}
                  >
                    <FaAngleRight />
                  </span>
                </Link>
                <div
                  className={`  pl-5 ${
                    openMenu === 2
                      ? "max-h-20 opacity-100 before:max-h-20 mb-3 "
                      : " max-h-0 opacity-0 before:max-h-0 "
                  } relative transition-all ease-in-out duration-300  before:transition-all  before:ease-in-out   before:duration-200  overflow-hidden before:content-[''] before:absolute  before:w-[2px]  before:bg-gray-300 before:my-2`}
                >
                  <ul className="pl-4">
                    <li className="  rounded-lg">
                      <button
                        onClick={() => {
                          addDoctorModel.toggle();
                          mobileMenuToggle.setOff();
                        }}
                        className="flex justify-between items-center p-1"
                      >
                        <div className="flex justify-center items-center gap-x-3">
                          <IoMdPersonAdd className="text-[16px]" />
                          <span className="text-[13px] font-medium">
                            Add New Doctor
                          </span>
                        </div>
                      </button>
                    </li>
                  </ul>
                </div>
              </li>
              <li>
                <Link
                  onClick={() => {
                    setActiveIndex(4), setOpenMenu(openMenu === 3 ? null : 3);
                  }}
                  to={"/admin/dashboard/patients"}
                  className={`flex justify-between items-center p-2  text-gray-600 rounded-lg ${
                    activeIndex === 4 ? "active" : ""
                  }`}
                >
                  <div className="flex justify-center items-center gap-x-3">
                    <FaUserDoctor className="text-2xl" />
                    <span className="text-[16px] font-medium">Patients</span>
                  </div>
                  <span
                    className={`${
                      openMenu === 3 ? " rotate-90 text-blue-600 " : "rotate-0"
                    } transition-all duration-200`}
                  >
                    <FaAngleRight />
                  </span>
                </Link>
                <div
                  className={`  pl-5 ${
                    openMenu === 3
                      ? "max-h-20 opacity-100 before:max-h-20 mb-3 "
                      : " max-h-0 opacity-0 before:max-h-0 "
                  } relative transition-all ease-in-out duration-300  before:transition-all  before:ease-in-out   before:duration-200  overflow-hidden before:content-[''] before:absolute  before:w-[2px]  before:bg-gray-300 before:my-2`}
                >
                  <ul className="pl-4">
                    <li className="  rounded-lg">
                      <button
                        onClick={() => {
                          addPatientModel.toggle();
                          mobileMenuToggle.setOff();
                        }}
                        className="flex justify-between items-center p-1"
                      >
                        <div className="flex justify-center items-center gap-x-3">
                          <IoMdPersonAdd className="text-[16px]" />
                          <span className="text-[13px] font-medium">
                            Add Patient
                          </span>
                        </div>
                      </button>
                    </li>
                  </ul>
                </div>
              </li>
              <li>
                <Link
                  to={"/admin/dashboard/appointments"}
                  onClick={() => {
                    setActiveIndex(5), setOpenMenu(openMenu === 4 ? null : 4);
                  }}
                  className={`flex justify-between items-center p-2 text-gray-600  rounded-lg ${
                    activeIndex === 5 ? "active" : ""
                  }`}
                >
                  <div className="flex justify-center items-center gap-x-3">
                    <TbFileInvoice className="text-2xl" />
                    <span className="text-[16px] font-medium">
                      Appointments
                    </span>
                  </div>
                  <span
                    className={`${
                      openMenu === 4 ? " rotate-90 text-blue-600 " : "rotate-0"
                    } transition-all duration-200`}
                  >
                    <FaAngleRight />
                  </span>
                </Link>
                <div
                  className={`  pl-5 ${
                    openMenu === 4
                      ? "max-h-20 opacity-100 before:max-h-20 mb-3 "
                      : " max-h-0 opacity-0 before:max-h-0 "
                  } relative transition-all ease-in-out duration-300  before:transition-all  before:ease-in-out   before:duration-200  overflow-hidden before:content-[''] before:absolute  before:w-[2px]  before:bg-gray-300 before:my-2`}
                >
                  <ul className="pl-4">
                    <li className="  rounded-lg">
                      <button
                        onClick={() => {
                          makeAppointmentModel.setOn();
                          mobileMenuToggle.setOff();
                        }}
                        className="flex justify-between items-center p-1"
                      >
                        <div className="flex justify-center items-center gap-x-3">
                          <LuUsers className="text-[16px]" />
                          <span className="text-[13px] font-medium">
                            Make Appointment
                          </span>
                        </div>
                      </button>
                    </li>
                  </ul>
                </div>
              </li>
              <li>
                <Link
                  to={"/admin/dashboard/doctor-schedule"}
                  onClick={() => {
                    setActiveIndex(6), setOpenMenu(openMenu === 5 ? null : 5);
                  }}
                  className={`flex justify-between items-center p-2 text-gray-600  rounded-lg ${
                    activeIndex === 6 ? "active" : ""
                  }`}
                >
                  <div className="flex justify-center items-center gap-x-3">
                    <TbFileInvoice className="text-2xl" />
                    <span className="text-[16px] font-medium">
                      Doctor Schedule
                    </span>
                  </div>
                  <span
                    className={`${
                      openMenu === 5 ? " rotate-90 text-blue-600 " : "rotate-0"
                    } transition-all duration-200`}
                  >
                    <FaAngleRight />
                  </span>
                </Link>
                <div
                  className={`  pl-5 ${
                    openMenu === 5
                      ? "max-h-20 opacity-100 before:max-h-20 mb-3 "
                      : " max-h-0 opacity-0 before:max-h-0 "
                  } relative transition-all ease-in-out duration-300  before:transition-all  before:ease-in-out   before:duration-200  overflow-hidden before:content-[''] before:absolute  before:w-[2px]  before:bg-gray-300 before:my-2`}
                >
                  <ul className="pl-4">
                    <li className="  rounded-lg">
                      <button
                        onClick={() => {
                          makeScheduleModel.toggle();
                          mobileMenuToggle.setOff();
                        }}
                        className="flex justify-between items-center p-1"
                      >
                        <div className="flex justify-center items-center gap-x-3">
                          <LuUsers className="text-[16px]" />
                          <span className="text-[13px] font-medium">
                            Make Schedule
                          </span>
                        </div>
                      </button>
                    </li>
                  </ul>
                </div>
              </li>
              <li>
                <Link
                  to={"/admin/dashboard/department"}
                  onClick={() => {
                    setActiveIndex(7), setOpenMenu(openMenu === 6 ? null : 6);
                  }}
                  className={`flex justify-between items-center p-2 text-gray-600  rounded-lg ${
                    activeIndex === 7 ? "active" : ""
                  }`}
                >
                  <div className="flex justify-center items-center gap-x-3">
                    <TbFileInvoice className="text-2xl" />
                    <span className="text-[16px] font-medium">Department</span>
                  </div>
                  <span
                    className={`${
                      openMenu === 6 ? " rotate-90 text-blue-600 " : "rotate-0"
                    } transition-all duration-200`}
                  >
                    <FaAngleRight />
                  </span>
                </Link>
                <div
                  className={`  pl-5 ${
                    openMenu === 6
                      ? "max-h-20 opacity-100 before:max-h-20 mb-3 "
                      : " max-h-0 opacity-0 before:max-h-0 "
                  } relative transition-all ease-in-out duration-300  before:transition-all  before:ease-in-out   before:duration-200  overflow-hidden before:content-[''] before:absolute  before:w-[2px]  before:bg-gray-300 before:my-2`}
                >
                  <ul className="pl-4">
                    <li className="  rounded-lg">
                      <button
                        onClick={() => {
                          createDepartModel.toggle();
                          mobileMenuToggle.setOff();
                        }}
                        className="flex justify-between items-center p-1"
                      >
                        <div className="flex justify-center items-center gap-x-3">
                          <LuUsers className="text-[16px]" />
                          <span className="text-[13px] font-medium">
                            Create New Department
                          </span>
                        </div>
                      </button>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminHeader;
