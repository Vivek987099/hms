import React, { useContext, useState } from "react";
import { LuLayoutDashboard } from "react-icons/lu";
import { FaAngleRight } from "react-icons/fa6";
import { Link } from "react-router";
import { LuUsers } from "react-icons/lu";
import { FaUserDoctor } from "react-icons/fa6";
import { TbFileInvoice } from "react-icons/tb";
import { AiOutlineLogout } from "react-icons/ai";
import { AuthContext } from "../../context/AuthProvider";
import { IoMdPersonAdd } from "react-icons/io";

function AdminSidebard() {
  let { user } = useContext(AuthContext);
  let [openMenu, setOpenMenu] = useState(null);
  let {
    logout,
    addUserModel,
    makeScheduleModel,
    createDepartModel,
    makeAppointmentModel,
    addPatientModel,
  } = useContext(AuthContext);
  let [activeIndex, setActiveIndex] = useState(1);

  return (
    <>
      <div className="  flex justify-between outline-1 dark:bg-gray-900   outline-gray-300 overflow-y-auto h-full">
        <div className="outline-1 p-4  outline-gray-300 w-full flex flex-col justify-between">
          <div className="p-2 ">
            <h5 className="text-gray-500 dark:text-slate-100 mt-3 text-[12px] font-semibold">
              {" "}
              MAIN PAGES
            </h5>
            <ul className="mt-5 admin-menu ">
              <li>
                <Link
                  onClick={() => {
                    setActiveIndex(1);
                    setOpenMenu(null);
                  }}
                  to={"/admin/dashboard"}
                  className={`flex justify-between items-center p-2  rounded-lg text-gray-600 ${
                    activeIndex === 1 ? "active" : ""
                  }`}
                >
                  <div className="flex justify-center items-center gap-x-3">
                    <LuLayoutDashboard className="text-2xl" />
                    <span className="text-[16px] font-medium dark:text-slate-100 ">Dashboard</span>
                  </div>
                </Link>
              </li>
              <li
                onClick={() => {
                  (setOpenMenu(openMenu === 1 ? null : 1), setActiveIndex(2));
                }}
                className="dark:[&>*]:text-slate-100"
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
                        onClick={addUserModel.toggle}
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
                    {user.role === "admin" && (
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
              <li  className="dark:[&>*]:text-slate-100">
                <Link
                  onClick={() => {
                    (setActiveIndex(3), setOpenMenu(openMenu === 2 ? null : 2));
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
                      <button className="flex justify-between items-center p-1">
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
              <li  className="dark:[&>*]:text-slate-100">
                <Link
                  onClick={() => {
                    (setActiveIndex(4), setOpenMenu(openMenu === 3 ? null : 3));
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
                        onClick={addPatientModel.toggle}
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
              <li  className="dark:[&>*]:text-slate-100">
                <Link
                  to={"/admin/dashboard/appointments"}
                  onClick={() => {
                    (setActiveIndex(5), setOpenMenu(openMenu === 4 ? null : 4));
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
                        onClick={() => makeAppointmentModel.setOn()}
                        className="flex justify-between items-center p-1"
                      >
                        <div className="flex justify-center items-center gap-x-3">
                          <LuUsers className="text-[16px]" />
                          <span className="text-[13px] font-medium">
                            Add Appointment
                          </span>
                        </div>
                      </button>
                    </li>
                  </ul>
                </div>
              </li>
              <li  className="dark:[&>*]:text-slate-100">
                <Link
                  to={"/admin/dashboard/doctor-schedule"}
                  onClick={() => {
                    (setActiveIndex(6), setOpenMenu(openMenu === 5 ? null : 5));
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
                        onClick={makeScheduleModel.toggle}
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
              <li  className="dark:[&>*]:text-slate-100">
                <Link
                  to={"/admin/dashboard/department"}
                  onClick={() => {
                    (setActiveIndex(7), setOpenMenu(openMenu === 6 ? null : 6));
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
                        onClick={createDepartModel.toggle}
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
          <div className=" overflow-hidden rounded-2xl  mt-10">
            <div
              onClick={logout}
              className=" bg-[rgb(72,187,181)] py-10 flex items-center justify-center gap-x-2 text-white text-[1.2rem] font-semibold"
            >
              <AiOutlineLogout />
              <button className="cursor-pointer  ">Logout</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminSidebard;
