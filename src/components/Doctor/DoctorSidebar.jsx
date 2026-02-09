import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { LuLayoutDashboard } from "react-icons/lu";
import { FaAngleRight } from "react-icons/fa6";
import { Link } from "react-router";
import { LuUsers } from "react-icons/lu";
import { FaUserDoctor } from "react-icons/fa6";
import { TbFileInvoice } from "react-icons/tb";
import { AiOutlineLogout } from "react-icons/ai";

import { IoMdPersonAdd } from "react-icons/io";

function DoctorSidebar() {
  let [openMenu, setOpenMenu] = useState(null);
  let {
    logout,
    makeScheduleModel,
    makeAppointmentModel,
  } = useContext(AuthContext);
  let [activeIndex, setActiveIndex] = useState(1);
  return (
    <>
      <div className="  flex justify-between outline-1  outline-gray-300 overflow-y-auto h-full">
        <div className="outline-1 p-4 outline-gray-300 w-full flex flex-col justify-between">
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
                  }}
                  to={"/doctor/dashboard"}
                  className={`flex justify-between items-center p-2  rounded-lg text-gray-600 ${
                    activeIndex === 1 ? "active" : ""
                  }`}
                >
                  <div className="flex justify-center items-center gap-x-3">
                    <LuLayoutDashboard className="text-2xl" />
                    <span className="text-[16px] font-medium">Profile</span>
                  </div>
                </Link>
              </li>

              
              <li>
                <Link
                  to={"/doctor/dashboard/appointments"}
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

export default DoctorSidebar;
