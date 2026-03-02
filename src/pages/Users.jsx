import React, { useContext, useEffect, useState } from "react";
import DashboardHeader from "./../components/DashboardHeader";
import { useLocation } from "react-router";
import { AuthContext } from "../context/AuthProvider";
import { addNewUser, deleteUserById, getAllUsers } from "../api/User";

function Users() {
  let location = useLocation();
  let { addUserModel, user, allDepartment, fetchAllDepartment } =
    useContext(AuthContext);
  let [doctorRole, setDoctorRole] = useState(false);

  let [loading, setLoading] = useState(false);

  let [userDetails, setUserDetails] = useState({
    username: "",
    password: "",
    role: "",
  });

  const [doctorDetails, setdoctorDetails] = useState({
    doctorName: "",
    specialization: "",
    fee: "",
    departmentId: "",
  });
  const [file, setFile] = useState(null);

  let [allUser, setAllUser] = useState([]);

  let handleChange = (e) => {
    let { name, value } = e.target;
    if (name === "username" || name === "password" || name === "role") {
      setUserDetails({ ...userDetails, [name]: value });
    }

    if (
      name === "doctorName" ||
      name === "specialization" ||
      name === "fee" ||
      name === "departmentId"
    ) {
      setdoctorDetails({ ...doctorDetails, [name]: value });
    }

    if (name === "profilePhoto") {
      setFile(e.target.files[0]);
    }
  };

  let handleSendOtp = async (e) => {
    try {
      e.preventDefault();

      setLoading(true);

      let formData = new FormData();
      formData.append(
        "user",
        new Blob([JSON.stringify(userDetails)], { type: "application/json" }),
      );

      if (!userDetails.role.trim()) {
        alert("Please select user role");
        setLoading(false);
        return;
      }

      if (doctorRole) {
        if (
          doctorDetails.doctorName.trim() === "" ||
          doctorDetails.specialization.trim() === "" ||
          doctorDetails.fee.trim() === "" ||
          doctorDetails.departmentId.trim() === ""
        ) {
          alert("Please fill all doctor details");
          setLoading(false);
          return;
        }
      }

      if (
        doctorDetails.doctorName.trim() !== "" &&
        doctorDetails.specialization.trim() !== "" &&
        doctorDetails.fee.trim() !== "" &&
        doctorDetails.departmentId.trim() !== ""
      ) {
        formData.append(
          "doctor",
          new Blob([JSON.stringify(doctorDetails)], {
            type: "application/json",
          }),
        );
        formData.append("file", file);
      }
      let res = await addNewUser(formData, sessionStorage.getItem("token"));
      if (res.status === 200) {
        setLoading(false);
        setUserDetails({
          username: "",
          password: "",
          role: "",
        });
        if (doctorRole) {
          setdoctorDetails({
            doctorName: "",
            specialization: "",
            fee: "",
            departmentId: "",
          });
        }
        addUserModel.setOff()
        alert(res.data.message);
        fetchAllUsers();
      }
    } catch (error) {
      setLoading(false);
      if (error.response.status === 400) {
        alert(error.response.data.message);
      }
    }
  };

  let fetchAllUsers = async () => {
    try {
      let res = await getAllUsers(10, 0, sessionStorage.getItem("token"));
      if (res.status === 200) {
        setAllUser(res.data.content);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchAllUsers();
    fetchAllDepartment();
  }, []);

  let handleDeleteUser = async (id) => {
    try {
      let res = await deleteUserById(id, sessionStorage.getItem("token"));
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
      <div className="user-page-container relative dark:bg-gray-900  dark:[&_*]:text-slate-100 bg-[#f5f7fb] p-4">
        <DashboardHeader
          title="Users"
          path={location.pathname}
        ></DashboardHeader>
        <div className="w-full  dark:bg-gray-800 p-4 bg-white rounded-xl px-3 lg:px-5 xl:px-15 shadow-[1px_1px_3px_rgba(0,0,0,0.1),-1px_-1px_3px_rgba(0,0,0,0.1)] mt-5">
          <h1 className="text-[#2c3e50] font-semibold text-[1.1rem]">
            All Users
          </h1>
          <div className="mt-5   overflow-x-auto outline-2 outline-gray-200 dark:outline-gray-600 rounded-lg">
            {allUser ? (
              <table className="w-full dark:bg-gray-800 ">
                <thead className="bg-[#f8f9fa] text-[#2c3e50]">
                  <tr className="border-b border-gray-300 dark:border-gray-600 dark:bg-gray-800">
                    <th className=" px-3 md:px-5 lg:px-10 py-2 text-left font-semibold">
                      Username
                    </th>
                    <th className=" px-3 md:px-5 lg:px-10 py-2 text-left font-semibold">
                      Role
                    </th>
                    <th className=" px-3 md:px-5 lg:px-10 py-2 text-left font-semibold">
                      Status
                    </th>
                    {user.role === "ADMIN" && (
                      <th className=" px-3 md:px-5 lg:px-10 py-2 text-left font-semibold">
                        Delete
                      </th>
                    )}


                    <th className=" hidden lg:table-cell px-10 py-3 text-left font-semibold">
                      Created At
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {allUser.map((currentUser, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-300 dark:border-gray-600 last:border-0"
                    >
                      <td className="  px-3  md:px-5 lg:px-10 py-2 text-left">
                        {currentUser.username}
                      </td>
                      <td className="  px-3  md:px-5 lg:px-10 py-2 text-left">
                        {currentUser.role}
                      </td>
                      <td className="  px-3  md:px-5 lg:px-10 py-2 text-left">
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
                        <td className=" px-3 md:px-5 lg:px-10 py-2 text-left cursor-pointer">
                          <button
                            onClick={() => handleDeleteUser(currentUser.id)}
                            className="bg-red-500 text-white cursor-pointer px-4 py-1 rounded-2xl text-sm"
                          >
                            Delete
                          </button>
                        </td>
                      )}

                      <td className="px-10 py-3 hidden lg:table-cell text-left">
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
              <div className={`bg-white dark:bg-gray-900   h-full w-full p-7`}>
                {!loading ? (
                  <>
                    <h3 className="text-[#2c3e50] text-[1.3rem] font-semibold mb-5">
                      Add User
                    </h3>
                    <form onSubmit={handleSendOtp} className="{space-y-4 }">
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

                        <div className=" flex  gap-x-7 mt-3">
                          <div>
                            <input
                              type="radio"
                              value="ADMIN"
                              name="role"
                              checked={userDetails.role === "ADMIN"}
                              id="admin"
                              onChange={(e) => {
                                (setDoctorRole(false),
                                  setdoctorDetails({
                                    doctorName: "",
                                    specialization: "",
                                    fee: "",
                                    departmentId: "",
                                  }),
                                  setFile(null),
                                  setUserDetails({
                                    ...userDetails,
                                    role: e.target.value,
                                  }));
                              }}
                              className="peer hidden"
                            />
                            <label
                              htmlFor="admin"
                              className="border-2 cursor-pointer border-[#06adaa] px-4 py-1 rounded font-semibold text-[#06adaa] transition-all duration-200 peer-checked:bg-[#06adaa] peer-checked:text-white peer-checked:outline-0"
                            >
                              ADMIN
                            </label>
                          </div>
                          <div>
                            <input
                              type="radio"
                              value="DOCTOR"
                              name="role"
                              id="doctor"
                              checked={userDetails.role === "DOCTOR"}
                              onChange={(e) => {
                                (setDoctorRole(true),
                                  setUserDetails({
                                    ...userDetails,
                                    role: e.target.value,
                                  }));
                              }}
                              className="peer hidden"
                            />
                            <label
                              htmlFor="doctor"
                              className="border-2 cursor-pointer border-[#06adaa] px-4 py-1 rounded font-semibold text-[#06adaa] transition-all duration-200 peer-checked:bg-[#06adaa] peer-checked:text-white peer-checked:outline-0"
                            >
                              DOCTOR
                            </label>
                          </div>
                        </div>
                      </div>

                      {doctorRole && (
                        <>
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5">
                            <div>
                              <label className="block text-sm font-[500] text-gray-600 mb-1">
                                Doctor Name :
                              </label>
                              <input
                                type="text"
                                onChange={handleChange}
                                value={doctorDetails.doctorName}
                                name="doctorName"
                                placeholder="Enter username"
                                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#06adaa]"
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Specialization :
                              </label>
                              <input
                                type="text"
                                name="specialization"
                                onChange={handleChange}
                                value={doctorDetails.specialization}
                                placeholder="Enter specialization"
                                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#06adaa]"
                              />
                            </div>
                            <div>
                              <select
                                name="departmentId"
                                onChange={handleChange}
                                value={doctorDetails.departmentId}
                                className="w-full text-gray-500 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#06adaa]"
                              >
                                <option value="">Select Department</option>
                                {allDepartment.map((department, index) => (
                                  <option
                                    key={index}
                                    value={department.departId}
                                  >
                                    {department.departmentName}
                                  </option>
                                ))}
                              </select>
                            </div>

                            {/* Fee */}
                            <div>
                              <label
                                htmlFor="fee"
                                className="block text-gray-700 font-medium mb-1"
                              >
                                Consultation Fee
                              </label>
                              <input
                                type="number"
                                onChange={handleChange}
                                value={doctorDetails.fee}
                                name="fee"
                                id="fee"
                                placeholder="Enter Fee "
                                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
                              />
                            </div>

                            {/* SELECT USER FOR DOCTOR  */}

                            {/* Profile Photo */}
                            <div>
                              <label
                                htmlFor="profilePhoto"
                                className="block text-white px-5 py-1.5 cursor-pointer font-medium mb-1 bg-[#06adaa]"
                              >
                                Select Profile Photo
                              </label>
                              <input
                                type="file"
                                name="profilePhoto"
                                id="profilePhoto"
                                onChange={handleChange}
                                accept="image/*"
                                className="w-full text-gray-700 cursor-pointer"
                              />
                            </div>
                          </div>
                        </>
                      )}

                      {/* Submit Button */}
                      <div className="flex justify-center gap-x-5 mt-8">
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
                          Create
                        </button>
                      </div>
                    </form>
                  </>
                ) : (
                  <>
                    <div className="w-full h-full flex justify-center items-center bg-gray-300">
                      <span class="circle-loader"></span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Users;
