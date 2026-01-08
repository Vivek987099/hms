import React from "react";
import { BiPlusMedical } from "react-icons/bi";
import logo from "../assets/logo/logo.png";
import { NavLink, useNavigate } from "react-router";
import { IoMenu, IoClose } from "react-icons/io5";

function Header() {
  let menus = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Contact", path: "/contact" },
  ];
  let [isMenuOpen, setIsMenuOpen] = React.useState(false);
  let navigate=useNavigate();

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }


  return (
    <>
      <div className=".header h-3 md:h-6 lg:7  xl:h-10 w-full bg-[#06adaa]"></div>
      <div className="h-12 md:h-18 lg:h-20 xl:h-25 w-full bg-[#fff] shadow-lg sticky top-0 left-0 z-50">
        <div className="container   h-full flex  items-center justify-between">
          <div className="flex  items-center justify-center gap-x-2 md:gap-x-3 lg:gap-x-4">
            <h1 className="font-bold text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-gray-700 cursor-pointer">
              <img
                src={logo}
                alt="logo"
                className="size-10 md:size-18 lg:size-20"
              />
            </h1>
            <h1 className=" md:text-3xl lg:text-4xl xl:text-5xl font-semibold  text-gray-700">
              RM Health Care
            </h1>
          </div>
          <div className="flex justify-center items-center gap-x-3 lg:gap-x-5">
            <nav className="hidden lg:flex  justify-center items-center ">
              {menus.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className="inline-block mx-2 md:mx-3 lg:mx-4 font-medium text-gray-700 hover:text-[#06adaa] cursor-pointer"
                >
                  {item.name}
                </NavLink>
              ))}
            </nav>
            <button
              onClick={()=>navigate("/login")}
              className="bg-[#06adaa] text-white font-semibold px-3 py-1 rounded cursor-pointer"
            >
              Login
            </button>
           

            {/* ===== MENU BUTTONS ====== */}
            {
              !isMenuOpen && !isMenuOpen ? (<> <button
              onClick={toggleMenu}
              className="lg:hidden bg-[#06adaa] text-white font-semibold px-2 py-1 text-2xl rounded cursor-pointer"
            >
              <IoMenu />
            </button></>):(<><button
              onClick={toggleMenu}
              className="lg:hidden bg-[#06adaa] text-white font-semibold px-2 py-1 text-2xl rounded cursor-pointer"
            >
              <IoClose />
            </button></>)


            }
            

            {/* MOBILE MENU */}
            {isMenuOpen && isMenuOpen ? (
              <div className="lg:hidden h-70 w-70 bg-gray-100 rounded-2xl absolute top-18 right-5 shadow-xl p-5">
                <h1 className="text-center font-bold text-2xl text-gray-800">
                  Menu
                </h1>
                <div>
                  {menus.map((item) => (
                    <div
                      key={item.path}
                      className="my-3   bg-white  hover:bg-gray-200   rounded"
                    >
                      <NavLink
                        to={item.path}
                        className="font-medium text-gray-700 hover:text-[#06adaa] py-2 px-1 w-full block cursor-pointer"
                      >
                        {item.name}
                      </NavLink>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
