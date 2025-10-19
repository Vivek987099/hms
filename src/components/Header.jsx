import React from "react";
import { BiPlusMedical } from "react-icons/bi";
import logo from "../assets/logo/logo.png";
import { NavLink } from "react-router";

function Header() {
  let menus = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Contact", path: "/contact" },
  ];
  return (
    <>
      <div className="h-10 w-full bg-[#06adaa]"></div>
      <div className="h-15 md:h-18 lg:h-20 xl:h-25 w-full bg-[#fff] shadow-lg sticky top-0 left-0 z-50">
        <div className="container   h-full flex  items-center justify-between">
          <div className="flex  items-center justify-center gap-x-2 md:gap-x-3 lg:gap-x-4">
            {/* <BiPlusMedical className="text-[#06adaa] text-4xl md:text-5xl lg:text-6xl" /> */}
            <h1 className="font-bold text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-gray-700 cursor-pointer">
              <img
                src={logo}
                alt="logo"
                className="size-15 md:size-18 lg:size-20"
              />
            </h1>
            <h1 className=" md:text-3xl lg:text-4xl xl:text-5xl font-semibold  text-gray-700">
              RM Health Care
            </h1>
          </div>
          <div>

            <nav>
              {menus.map((item)=>(
                <NavLink key={item.path} to={item.path} className="inline-block mx-2 md:mx-3 lg:mx-4 font-medium text-gray-700 hover:text-[#06adaa] cursor-pointer">{item.name}</NavLink>
              ))
                
              }
            </nav>
            
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
