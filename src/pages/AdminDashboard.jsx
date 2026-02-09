import React, { useContext } from "react";
import AdminHeader from "../components/adminComponents/AdminHeader";
import AdminSidebard from "./../components/adminComponents/AdminSidebard";
import { Outlet } from "react-router";
import { AuthContext } from "../context/AuthProvider";

function AdminDashboard() {

  let {sidebarToggle} =useContext(AuthContext)
  

  return (
    <>
       <div className="flex flex-col h-[calc(100vh-0px)]">

      {/* Top Navbar */}
      <AdminHeader />


      {/* Sidebar + Content */}
      <div className="flex flex-1 overflow-hidden">

        {/* Sidebar */}
        <div className={`w-[20%] border-r border-gray-300 transition-all ease-in-out duration-500 hidden lg:block  ${sidebarToggle.value? 'xl:ml-0':'xl:-ml-77'}`}>
          <AdminSidebard />
        </div>

        {/* Main content - only this scrolls */}
        <div className="flex-1 overflow-auto bg-[#f5f7fb]">
          <Outlet />
        </div>
      </div>
    </div>
    </>
  );
}

export default AdminDashboard;
