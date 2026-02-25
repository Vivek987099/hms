import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import Swal from "sweetalert2";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
function Login() {
  let [showPassword, setShowPassword] = React.useState(false);
  let [loginDetails, setLoginDetails] = React.useState({
    username: "",
    password: "",
  });

  let { login, circleLoader } = useContext(AuthContext);
  let handleChange = (e) => {
    const { name, value } = e.target;
    setLoginDetails({
      ...loginDetails,
      [name]: value,
    });
  };

  let handleLogin = (e) => {
    e.preventDefault();

    if (!loginDetails.username || !loginDetails.password) {
      Swal.fire({
        title: "Oops!",
        text: "Please enter both username and password.",
        icon: "error",

        confirmButtonText: "OK",
        customClass: {
          confirmButton:
            "px-6 py-2 bg-[#06adaa] text-white rounded-md hover:bg-[#08908d] block w-full",
        },
        buttonsStyling: false,
      });
    } else {
      // console.log("hello");
      login(loginDetails);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-[#eaf3fa] dark:bg-gray-900  px-4">
        {!circleLoader ? (
          <>
            <div className="bg-white dark:bg-gray-800 w-full max-w-md rounded-lg shadow-lg p-8">
              <h2 className="text-3xl dark:text-slate-100 font-bold text-center text-gray-800 mb-6">
                Login To HMS
              </h2>

              <form onSubmit={handleLogin} className="space-y-4">
                {/* Email */}
                <div>
                  <label className="block dark:text-slate-300 text-sm font-medium text-gray-700 mb-1">
                    Username :
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={loginDetails.username}
                    onChange={handleChange}
                    placeholder="Enter your username"
                    className="w-full border dark:text-slate-100 border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#06adaa]"
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="block dark:text-slate-300 text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>

                  <div className="relative w-full h-full">
                    <input
                      name="password"
                      onChange={handleChange}
                      value={loginDetails.password}
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="w-full dark:text-slate-100 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#06adaa]"
                    />
                    {showPassword ? (
                      <FaEyeSlash
                        className="absolute top-[30%] right-5 text-[1.3rem]"
                        onClick={() => setShowPassword(!showPassword)}
                      />
                    ) : (
                      <FaEye
                        className="absolute top-[30%] right-5 text-[1.3rem]"
                        onClick={() => {
                          setShowPassword(!showPassword);
                        }}
                      />
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="cursor-pointer w-full disabled:cursor-crosshair disabled:bg-gray-600 bg-[#06adaa] text-white py-2 rounded-md font-semibold hover:bg-[#08908d] transition duration-300"
                >
                  Login
                </button>

                {/* Signup Link */}
                <p className="text-center text-sm text-gray-600 dark:text-slate-300 mt-4">
                  Don’t have an account?{" "}
                  <a href="/signup" className="text-[#06adaa] hover:underline">
                    Sign up
                  </a>
                </p>
              </form>
            </div>
          </>
        ) : (
          <>
            <span class="circle-loader"></span>
          </>
        )}
      </div>
    </>
  );
}

export default Login;
