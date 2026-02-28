import DashboardHeader from "../components/DashboardHeader";
import { useLocation } from "react-router";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import {
  addDepartment,
  deleteDepartment,
  updateDepartment,
} from "../api/Department_API";

function Department() {
  let location = useLocation();
  let [currentDepartment, setCurrentDepartment] = useState({
    departmentName: "",
    departmentDescription: "",
  });
  let [currentDepartmentId, setCurrentDepartmentId] = useState(null);

  let [departmentDetails, setDepartmentDetails] = useState({
    departmentName: "",
    departmentDescription: "",
  });

  let {
    createDepartModel,
    editDepartModel,
    fetchAllDepartment,
    allDepartment,
    setAllDepartment,
    user,
  } = useContext(AuthContext);

  useEffect(() => {
    fetchAllDepartment();
  }, []);

  let handleChange = (e) => {
    let { name, value } = e.target;
    setDepartmentDetails({ ...departmentDetails, [name]: value });
  };

  let handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let res = await addDepartment(departmentDetails,sessionStorage.getItem("token"));
      if (res.status === 200) {
        alert(res.data.message);
        setDepartmentDetails({
          departmentName: "",
          departmentDescription: "",
        });
        fetchAllDepartment();
        createDepartModel.setOff();
      }
    } catch (error) {
      console.log(error);
    }
  };

  let handleDelete = async (id) => {
    try {
      let res = await deleteDepartment(id,sessionStorage.getItem("token"));
      if (res.status === 200) {
        let filteredDepartments = allDepartment.filter(
          (department) => department.departId !== id
        );

        setAllDepartment(filteredDepartments);
        alert(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  let handleEdit = (department) => {
    setCurrentDepartmentId(department.departId);
    setCurrentDepartment({
      departmentName: department.departmentName,
      departmentDescription: department.departmentDescription,
    });
    editDepartModel.setOn();
  };
  let handleEditChange = (e) => {
    let { name, value } = e.target;
    setCurrentDepartment({ ...currentDepartment, [name]: value });
  };

  let handleUpdatedData = async (e) => {
    e.preventDefault();
    try {
      let res = await updateDepartment(currentDepartmentId, currentDepartment,sessionStorage.getItem("token"));
      if (res.status === 200) {
        let updatedList = allDepartment.map((dept) =>
          dept.departId === currentDepartmentId
            ? { ...dept, ...currentDepartment }
            : dept
        );
        setAllDepartment(updatedList);
        setCurrentDepartmentId(null);
        setCurrentDepartment({
          departmentName: "",
          departmentDescription: "",
        });
        editDepartModel.setOff();
        alert(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
    console.log(currentDepartment);
  };

  return (
    <>
      <div className="doctor-page-container dark:bg-gray-900 p-4 relative">
        <DashboardHeader
          title="Departments"
          path={location.pathname}
        ></DashboardHeader>

        <div className="w-full dark:bg-gray-800 p-4 bg-white rounded-xl px-15 shadow-[1px_1px_3px_rgba(0,0,0,0.1),-1px_-1px_3px_rgba(0,0,0,0.1)] mt-5">
          <div className="flex justify-between">
            <h1 className="text-[#2c3e50] font-semibold text-[1.1rem] dark:text-slate-100">
              All Departments
            </h1>
          </div>
          <div className="mt-5 overflow-x-auto outline-2 outline-gray-200 rounded-lg">
            {allDepartment ? (
              <>
                <table className="w-full ">
                  <thead className="bg-[#f8f9fa] text-[#2c3e50]">
                    <tr className="border-b border-gray-300">
                      <th className=" px-10 py-3 text-left font-semibold">
                        Department Name
                      </th>
                      <th className=" px-10 py-3 text-left font-semibold">
                        Description
                      </th>

                      {user.role === "ADMIN" && (
                        <th className=" px-10 py-3 text-center font-semibold">
                          Action
                        </th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {allDepartment.map((department, index) => (
                      <tr
                        key={index}
                        className="border-b border-gray-300 last:border-0 dark:text-slate-100"
                      >
                        <td className="px-10 py-3 text-left">
                          {department.departmentName}
                        </td>
                        <td className="px-10 py-3 text-left">
                          {department.departmentDescription}
                        </td>

                        {user.role === "ADMIN" && (
                          <td className="px-10 py-3 text-center">
                            <div className="flex flex-col justify-center items-center gap-2 lg:flex-row">
                              <button
                                onClick={() =>
                                  handleDelete(department.departId)
                                }
                                className="bg-red-500 text-white cursor-pointer px-4 py-1 mr-2 rounded-2xl text-[10px]"
                              >
                                Delete
                              </button>
                              <button
                                onClick={() => handleEdit(department)}
                                className="bg-green-500 text-white cursor-pointer px-4 py-1 rounded-2xl text-[10px]"
                              >
                                Edit
                              </button>
                            </div>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            ) : (
              <>
                <h1>Appointments Are unavailable </h1>
              </>
            )}
          </div>
        </div>

        {/* =========      ADD DEPARTMENT FORM    ========== */}
        {createDepartModel.value && (
          <div className="add-user-form absolute inset-0 bg-black/40 top-0 left-0 w-full h-full flex justify-center items-center">
            <div className="bg-white p-7 dark:bg-gray-800 dark:[&_*]:text-slate-100 rounded md:w-1/2 lg:w-1/3">
              <h3 className="text-[#2c3e50] text-[1.3rem] font-semibold mb-5">
                Add Department
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4 ">
                {/* Email */}
                <div>
                  <label className="block text-sm font-[500] text-gray-600 mb-1">
                    Department Name :
                  </label>
                  <input
                    type="text"
                    name="departmentName"
                    value={departmentDetails.departmentName}
                    onChange={handleChange}
                    required
                    placeholder="Enter department name"
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#06adaa]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description :
                  </label>
                  <input
                    type="text"
                    name="departmentDescription"
                    onChange={handleChange}
                    value={departmentDetails.departmentDescription}
                    placeholder="Enter Description"
                    required
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#06adaa]"
                  />
                </div>

                {/* Submit Button */}
                <div className="flex justify-end gap-x-5 mt-8">
                  <button
                    type="button"
                    onClick={createDepartModel.setOff}
                    className="cursor-pointer w-1/3 bg-[#707070] text-white py-2 rounded-md font-semibold hover:bg-[#565656] transition duration-300"
                  >
                    cencel
                  </button>

                  <button
                    type="submit"
                    className="cursor-pointer w-1/3 bg-[#06adaa] text-white py-2 rounded-md font-semibold hover:bg-[#08908d] transition duration-300"
                  >
                    save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/*  =========       EDIT DEPARTMENT FORM   ========== */}

        {editDepartModel.value && (
          <div className="add-user-form absolute inset-0 bg-black/40 top-0 left-0 w-full h-full flex justify-center items-center">
            <div className="bg-white p-7 rounded md:w-1/2 lg:w-1/3">
              <div className="flex items-center gap-x-5  mb-5">
                <h3 className="text-[#2c3e50] text-[1.3rem] font-semibold">
                  Edit Department
                </h3>
                <span>{currentDepartmentId}</span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 ">
                {/* Email */}
                <div>
                  <label className="block text-sm font-[500] text-gray-600 mb-1">
                    Department Name :
                  </label>
                  <input
                    type="text"
                    name="departmentName"
                    value={currentDepartment.departmentName}
                    required
                    onChange={handleEditChange}
                    placeholder="Enter department name"
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#06adaa]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description :
                  </label>
                  <input
                    type="text"
                    name="departmentDescription"
                    value={currentDepartment.departmentDescription}
                    placeholder="Enter Description"
                    required
                    onChange={handleEditChange}
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#06adaa]"
                  />
                </div>

                {/* Submit Button */}
                <div className="flex justify-end gap-x-5 mt-8">
                  <button
                    type="button"
                    onClick={editDepartModel.setOff}
                    className="cursor-pointer w-1/3 bg-[#707070] text-white py-2 rounded-md font-semibold hover:bg-[#565656] transition duration-300"
                  >
                    cencel
                  </button>

                  <button
                    type="submit"
                    onClick={handleUpdatedData}
                    className="cursor-pointer w-1/3 bg-[#06adaa] text-white py-2 rounded-md font-semibold hover:bg-[#08908d] transition duration-300"
                  >
                    save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Department;
