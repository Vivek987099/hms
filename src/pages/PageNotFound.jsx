import React from "react";
import pageNotFoundImage from "../assets/logo/1.webp";
import { useNavigate } from "react-router";

function PageNotFound() {
  let navigate = useNavigate();
  return (
    <div className="w-full h-screen">
      <div className="flex flex-col gap-y-7">
        <div className=" flex justify-center mt-10">
          <img src={pageNotFoundImage} alt="not found" />
        </div>
        <div>
          <h1 className="text-5xl text-center text-gray-300 font-semibold">
            Page not found
          </h1>
          <p className="text-gray-500 mt-10  text-2xl w-120 text-center mx-auto">
            No worries! Let’s take you back while our bear is searching
            everywhere
          </p>
          <div className="flex justify-center">
            {" "}
            <button
              onClick={() => navigate("/")}
              className="bg-[#06adaa] cursor-pointer  text-white px-4 py-2 rounded mt-4 font-semibold"
            >
              Go Back Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PageNotFound;
