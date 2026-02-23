import Swal from "sweetalert2";
import { checkAuth, getProfile, loginUser, logoutUser } from "./../api/Auth";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import useToggle from "../customhokks/useToggle";
import { getAllDepartments } from "../api/Department_API";
import { getAllPatients } from "../api/PatientApi";

const AuthContext = createContext();

function AuthProvider({ children }) {
  let [user, setUser] = useState(null);
  let [isLoggedIn, setIsLoggedIn] = useState(false);
  let [loading, setLoading] = useState(false);
  let [allDepartment, setAllDepartment] = useState([]);
  let [allPatients, setAllPatients] = useState([]);
  let [isLast, setIsLast] = useState(false);
  let [totalPages, setTotalPages] = useState(0);
  let [currentPage, setCurrentPage] = useState(0);
  let [circleLoader, setCircleLoader] = useState(false);

  let navigate = useNavigate();

  let fetchAllDepartment = async () => {
    try {
      let res = await getAllDepartments(sessionStorage.getItem("token"));
      if (res.status === 200) {
        setAllDepartment(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  let fetchAllPatients = async () => {
    let pageSize = 10;
    try {
      let res = await getAllPatients(
        pageSize,
        currentPage,
        sessionStorage.getItem("token"),
      );
      if (res.status === 200) {
        setAllPatients(res.data.content);
        setIsLast(res.data.last);
        setTotalPages(res.data.totalPages);
      }
    } catch (error) {
      console.log(error);
    }
  };

  let verifyAuth = async () => {
    try {
      setLoading(true);
      let response = await checkAuth(sessionStorage.getItem("token"));
      if (response.status === 200) {
        setIsLoggedIn(response.data.LoggedIn);
        let profile = await getProfile(sessionStorage.getItem("token"));
        if (profile.status === 200) {
          setUser({
            username: profile.data.username,
            role: profile.data.role,
            status: profile.data.status,
            createAt: profile.data.createdAt,
          });
          setLoading(false);
          if (profile.data.role === "ADMIN") {
            navigate("/admin/dashboard");
          }
          if (profile.data.role === "DOCTOR") {
            navigate("/doctor/dashboard");
          }
          
        }
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setUser(null);
        setIsLoggedIn(false);
      }
      navigate("/");
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    verifyAuth();
  }, []);

  let login = async (loginDetails) => {
    setCircleLoader(true);
    try {
      let response = await loginUser(loginDetails);
      if (response.status === 200) {
        sessionStorage.setItem("token", response.data.token);
        let authResponse = await checkAuth(sessionStorage.getItem("token"));
        if (authResponse.status === 200) {
          if (authResponse.data.LoggedIn) {
            setIsLoggedIn(authResponse.data.LoggedIn);
            let profile = await getProfile(sessionStorage.getItem("token"));
            if (profile.status === 200) {
              setUser({
                username: profile.data.username,
                role: profile.data.role,
                status: profile.data.status,
                createAt: profile.data.createdAt,
              });
                setCircleLoader(false);
                if (profile.data.role === "ADMIN") {
                  navigate("/admin/dashboard");
                }
                if (profile.data.role === "DOCTOR") {
                  navigate("/doctor/dashboard");
                }

              Swal.fire({
                title: "Login Successful",
                text: response?.data?.message,
                icon: "success",
                confirmButtonText: "OK",
                customClass: {
                  confirmButton:
                    "px-6 py-2 bg-[#06adaa] text-white rounded-md hover:bg-[#08908d] block w-full",
                },
                buttonsStyling: false,
              })
            }
          }
        }
      }
    } catch (error) {
      setCircleLoader(false);
      console.log("error console ");

      Swal.fire({
        title: "Login Failed",
        text:
          error.response?.data?.message || "An error occurred during login.",
        icon: "error",
        confirmButtonText: "OK",
        customClass: {
          confirmButton:
            "px-6 py-2 bg-[#06adaa] text-white rounded-md hover:bg-[#08908d] block w-full",
        },
        buttonsStyling: false,
      });
    }
  };

  let logout = () => {
    try {
      sessionStorage.removeItem("token");
      setUser(null);
      setIsLoggedIn(false);
      navigate("/login");
    } catch (error) {
      alert("Logout failed due to some error. Please try again.");
    }
  };

  // Custom toggles for modals

  let addUserModel = useToggle(false);
  let makeScheduleModel = useToggle(false);
  let createDepartModel = useToggle(false);
  let editDepartModel = useToggle(false);
  let updateDoctorModel = useToggle(false);
  let editScheduleModel = useToggle(false);
  let makeAppointmentModel = useToggle(false);
  let updateAppointmentModel = useToggle(false);
  let addPatientModel = useToggle(false);
  let updatePatientModel = useToggle(false);
  let sidebarToggle = useToggle(true);
  let mobileMenuToggle = useToggle(false);

  return (
    <AuthContext.Provider
      value={{
        login,
        user,
        isLoggedIn,
        loading,
        logout,
        addUserModel,
        makeScheduleModel,
        createDepartModel,
        editDepartModel,
        allDepartment,
        fetchAllDepartment,
        addPatientModel,
        setAllDepartment,
        updateDoctorModel,
        editScheduleModel,
        makeAppointmentModel,
        setAllPatients,
        mobileMenuToggle,
        allPatients,
        isLast,
        totalPages,
        setCurrentPage,
        fetchAllPatients,
        currentPage,
        sidebarToggle,
        updateAppointmentModel,
        updatePatientModel,
        setLoading,
        circleLoader,
        setCircleLoader
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider, AuthContext };
