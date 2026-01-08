import React, { useContext, useEffect, useState } from "react";
import DashboardHeader from "./../components/DashboardHeader";
import { useLocation } from "react-router";
import { AuthContext } from "../context/AuthProvider";
import Otp from "./../components/Otp";
import {
  addNewUser,
  deleteUserById,
  getAllUsers,
  verifyUserOtp,
} from "../api/User";

function Users() {
  let location = useLocation();
  let { addUserModel, user } = useContext(AuthContext);
  let [step, setStep] = useState(1);

  let [message, setMessage] = useState("");

  let [OTP, setOTP] = useState("");

  let [loading, setLoading] = useState(false);

  let [userDetails, setUserDetails] = useState({
    username: "",
    password: "",
    role: "",
  });

  let [allUser, setAllUser] = useState([]);

  let handleChange = (e) => {
    let { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  let handleSendOtp = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      let res = await addNewUser(userDetails);

      if (res.status === 200) {
        setMessage(res.data.message);
        setLoading(false);
        setStep(2);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  let handleVerifyOTP = async (e) => {
    e.preventDefault();
    let verifyDetails = {
      username: userDetails.username,
      otp: OTP,
    };

    try {
      setLoading(true);
      let res = await verifyUserOtp(verifyDetails);
      if (res.status === 200) {
        setLoading(false);
        setStep(1);
        setOTP("");
        setUserDetails({
          username: "",
          password: "",
          role: "",
        });
        setMessage("");
        addUserModel.setOff();
        alert("User Registered successfully");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    let fetchAllUsers = async () => {
      try {
        let res = await getAllUsers(10, 0);
        if (res.status === 200) {
          setAllUser(res.data.content);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllUsers();
  }, []);

  let handleDeleteUser = async (id) => {
    try {
      let res = await deleteUserById(id);
      if (res.status === 200) {
        //update user list
        let updatedUsers = allUser.filter((user) => user.id !== id);
        setAllUser(updatedUsers);
        alert(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="user-page-container relative  bg-[#f5f7fb] p-4">
        <DashboardHeader
          title="Users"
          path={location.pathname}
        ></DashboardHeader>
        <div className="w-full   p-4 bg-white rounded-xl px-15 shadow-[1px_1px_3px_rgba(0,0,0,0.1),-1px_-1px_3px_rgba(0,0,0,0.1)] mt-5">
          <h1 className="text-[#2c3e50] font-semibold text-[1.1rem]">
            All Users
          </h1>
          <div className="mt-5 overflow-x-auto outline-2 outline-gray-200 rounded-lg">
            {allUser ? (
              <table className="w-full ">
                <thead className="bg-[#f8f9fa] text-[#2c3e50]">
                  <tr className="border-b border-gray-300">
                    <th className=" px-10 py-3 text-left font-semibold">
                      Username
                    </th>
                    <th className=" px-10 py-3 text-left font-semibold">
                      Role
                    </th>
                    <th className=" px-10 py-3 text-left font-semibold">
                      Status
                    </th>
                    {user.role === "ADMIN" && (
                      <th className=" px-10 py-3 text-left font-semibold">
                        Delete
                      </th>
                    )}

                    <th className=" px-10 py-3 text-left font-semibold">
                      Created At
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {allUser.map((currentUser, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-300 last:border-0"
                    >
                      <td className="px-10 py-3 text-left">
                        {currentUser.username}
                      </td>
                      <td className="px-10 py-3 text-left">
                        {currentUser.role}
                      </td>
                      <td className="px-10 py-3 text-left">
                        {currentUser.status ? (
                          <>
                            <span className="bg-green-400 text-white px-4 py-1 rounded-2xl text-sm">
                              Active
                            </span>
                          </>
                        ) : (
                          <>
                            <span>Deactive</span>
                          </>
                        )}
                      </td>

                      {user.role === "ADMIN" && (
                        <td className="px-10 py-3 text-left cursor-pointer">
                          <button
                            onClick={() => handleDeleteUser(currentUser.id)}
                            className="bg-red-500 text-white cursor-pointer px-4 py-1 rounded-2xl text-sm"
                          >
                            Delete
                          </button>
                        </td>
                      )}

                      <td className="px-10 py-3 text-left">
                        {currentUser.createdAt}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <>
                <h1>Users Not Available</h1>
              </>
            )}
          </div>
        </div>
        {/*   ========   ADD USER FORM =========== */}

        {addUserModel.value && (
          <>
            <div className="add-user-form add-user-form absolute inset-0 bg-black/40 top-0 left-0 w-full h-full flex justify-center items-center">
              {step === 1 && (
                <div className="bg-white p-7 rounded md:w-1/2 lg:w-1/3">
                  {!loading ? (
                    <>
                      <h3 className="text-[#2c3e50] text-[1.3rem] font-semibold mb-5">
                        Add User
                      </h3>
                      <form onSubmit={handleSendOtp} className="space-y-4 ">
                        {/* Email */}
                        <div>
                          <label className="block text-sm font-[500] text-gray-600 mb-1">
                            Username :
                          </label>
                          <input
                            type="text"
                            value={userDetails.username}
                            onChange={handleChange}
                            name="username"
                            placeholder="Enter username"
                            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#06adaa]"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Password :
                          </label>
                          <input
                            type="password"
                            name="password"
                            onChange={handleChange}
                            value={userDetails.password}
                            placeholder="Enter password"
                            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#06adaa]"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Role :
                          </label>
                         

                          <select
                            name="role"
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md p-2  focus:outline-none focus:ring-2 focus:ring-[#06adaa]"
                          >
                            <option value="">Select Role...</option>
                            <option value="ADMIN">ADMIN</option>
                            <option value="DOCTOR">DOCTOR</option>

                          </select>
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-end gap-x-5 mt-8">
                          <button
                            type="button"
                            disabled={loading}
                            onClick={addUserModel.setOff}
                            className="cursor-pointer w-1/3 bg-[#707070] text-white py-2 rounded-md font-semibold hover:bg-[#565656] transition duration-300"
                          >
                            cencel
                          </button>

                          <button
                            type="submit"
                            className="cursor-pointer w-1/3 bg-[#06adaa] text-white py-2 rounded-md font-semibold hover:bg-[#08908d] transition duration-300"
                          >
                            Send OTP
                          </button>
                        </div>
                      </form>
                    </>
                  ) : (
                    <>
                      <div className="loader"></div>
                    </>
                  )}
                </div>
              )}
              {step === 2 && (
                <div className=" bg-white p-7 rounded md:w-1/2 lg:w-1/3">
                  {!loading ? (
                    <>
                      <form onSubmit={handleVerifyOTP}>
                        <div>
                          <h3 className="text-[#2c3e50] text-[1.3rem] font-semibold mb-5">
                            Enter OTP
                          </h3>
                          <span className="text-[13px] block pb-4 text-gray-600">
                            {message}
                          </span>
                        </div>

                        <Otp otpLength={6} onChangeOtp={setOTP}></Otp>
                        <div className=" mt-6 flex justify-center items-center">
                          <button
                            type="submit"
                            disabled={loading}
                            className="cursor-pointer  w-1/3 bg-[#06adaa] text-white py-2 rounded-md font-semibold hover:bg-[#08908d] transition duration-300"
                          >
                            Register
                          </button>
                        </div>
                      </form>
                    </>
                  ) : (
                    <>
                      <div className="loader"></div>
                    </>
                  )}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Users;
