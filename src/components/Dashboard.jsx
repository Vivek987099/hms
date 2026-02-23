import React, { useEffect, useState } from "react";
import InfoCards from "./InfoCards";
import { getTotalNoDoctor } from "../api/Doctors";
import {
  appointmentStatusCount,
  getRecentAppointments,
  totalAppointment,
} from "../api/AppointApi";
import { getTotalNoOfUser } from "../api/User";
import {
  getMonthwisePatient,
  getRecentPatients,
  getTotalPatientNo,
} from "../api/PatientApi";
import DashboardHeader from "./DashboardHeader";
import { useLocation, useNavigate } from "react-router";
import { GrNotes } from "react-icons/gr";
import { FaUserDoctor } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Bar,
  BarChart,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

function Dashboard() {
  let [totalUserNo, setTotalUserNo] = useState(0);
  let [totalDoctor, setTotalDoctor] = React.useState(0);
  let [appointmentsNo, setAppointmentsNo] = useState(0);
  let [totalPatientNo, setTotalPatientNo] = useState(0);
  let [apmntStatusCount, setApmntStatusCount] = useState([]);
  let [monthwisePatients, setMonthwisePatients] = useState([]);
  let [recentPatients, setRecentPatients] = useState([]);
  let [recentAppointments, setRecentAppointments] = useState([]);
  let navigate = useNavigate();
  useEffect(() => {
    let fetchTotalDoctors = async () => {
      let res = await getTotalNoDoctor(sessionStorage.getItem("token"));
      if (res.status === 200) {
        setTotalDoctor(res.data);
      }
    };
    let fetchTotalAppointments = async () => {
      let res = await totalAppointment(sessionStorage.getItem("token"));
      setAppointmentsNo(res.data);
    };
    let fetchTotalUser = async () => {
      let res = await getTotalNoOfUser(sessionStorage.getItem("token"));
      if (res.status === 200) {
        setTotalUserNo(res.data);
      }
    };

    let fetchTotalPatientNo = async () => {
      let res = await getTotalPatientNo();
      if (res.status === 200) {
        setTotalPatientNo(res.data);
      }
    };
    let fetchAppointmentStatus = async () => {
      let res = await appointmentStatusCount(sessionStorage.getItem("token"));
      if (res.status === 200) {
        setApmntStatusCount(res.data);
      }
    };
    let fetchMonthwisePatient = async () => {
      let res = await getMonthwisePatient(sessionStorage.getItem("token"));
      if (res.status === 200) {
        setMonthwisePatients(res.data);
      }
    };
    let fetchRecentPatients = async () => {
      try {
        let res = await getRecentPatients(sessionStorage.getItem("token"));
        if (res.status === 200) {
          setRecentPatients(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    let fetchRecentAppointments = async () => {
      try {
        let res = await getRecentAppointments(sessionStorage.getItem("token"));
        if (res.status === 200) {
          setRecentAppointments(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchTotalUser();
    fetchTotalAppointments();
    fetchTotalDoctors();
    fetchTotalPatientNo();
    fetchAppointmentStatus();
    fetchMonthwisePatient();
    fetchRecentPatients();
    fetchRecentAppointments();
  }, []);
  let location = useLocation();

  return (
    <>
      <div className="p-4">
        <DashboardHeader
          title="Dashboard"
          path={location.pathname}
        ></DashboardHeader>
        <div className=" flex justify-center gap-6">
          <div className="mt-3 w-full  grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  ">
            <InfoCards
              title="Total Doctors"
              total={totalDoctor}
              icon={<FaUserDoctor />}
              color="#2ecc71"
            ></InfoCards>
            <InfoCards
              title="Total Users"
              total={totalUserNo}
              icon={<FaUsers />}
              color="#4361ee"
            ></InfoCards>
            <InfoCards
              title="Total Appointments"
              total={appointmentsNo}
              icon={<GrNotes />}
              color="#3498db"
            ></InfoCards>
            <InfoCards
              title="Total Patient"
              total={totalPatientNo}
              icon={<IoPerson />}
              color="#f39c12"
            ></InfoCards>
          </div>
        </div>
        <div className="w-ful mt-3">
          <div className="flex gap-5 flex-col lg:flex-row">
            <div className="w-full bg-white p-4 rounded-xl px-15 shadow-[1px_1px_3px_rgba(0,0,0,0.1),-1px_-1px_3px_rgba(0,0,0,0.1)] mt-5">
              <div className="mb-5">
                <h1 className="text-[#2c3e50] font-semibold text-[1.1rem]">
                  Performance Overview
                </h1>
              </div>

              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={monthwisePatients}
                  margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 8 " />
                  <XAxis dataKey={"month"} />
                  <YAxis domain={[0, 10]} ticks={[0, 5, 10]} interval={0} />
                  <Tooltip />
                  <Legend />

                  <Bar
                    dataKey="totalPatients"
                    type={"monotone"}
                    fill="green"
                    activeDot={{ r: 6 }}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="w-full  bg-white p-4 rounded-xl px-15 shadow-[1px_1px_3px_rgba(0,0,0,0.1),-1px_-1px_3px_rgba(0,0,0,0.1)] mt-5">
              <div className="mb-5">
                <h1 className="text-[#2c3e50] font-semibold text-[1.1rem]">
                  Appointment Status
                </h1>
              </div>
              <ResponsiveContainer width={"100%"} height={300}>
                <PieChart>
                  <Pie
                    data={apmntStatusCount}
                    labelLine={false}
                    fill="#8884d8"
                    dataKey="count"
                    nameKey="status"
                    label={({ x, y, percent }) => (
                      <text
                        x={x}
                        y={y}
                        fill="#555"
                        fontSize={12}
                        textAnchor="middle"
                      >
                        {(percent * 100).toFixed(0)}%
                      </text>
                    )}
                  >
                    {apmntStatusCount.map((entry, index) => (
                      <Cell key={entry.status} fill={COLORS[index]} />
                    ))}
                  </Pie>
                  <Legend />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* RECENT APPOINTMENTS CONTAINER  */}

        <div className="w-full   p-4 bg-white rounded-xl px-15 shadow-[1px_1px_3px_rgba(0,0,0,0.1),-1px_-1px_3px_rgba(0,0,0,0.1)] mt-7">
          <div className="flex justify-between">
            <h1 className="text-[#2c3e50] font-semibold text-[1.1rem]">
              Recent Appointments
            </h1>
            <button
              onClick={() => navigate("/admin/dashboard/appointments")}
              className="text-blue-700 cursor-pointer px-3 py-0.5"
            >
              Vivew All
            </button>
          </div>
          <div className="mt-5 overflow-x-auto outline-2 outline-gray-200 rounded-lg">
            <table className="w-full ">
              <thead className="bg-[#f8f9fa] text-[#2c3e50]">
                <tr className="border-b border-gray-300">
                  <th className=" px-10 py-3 text-left font-semibold">
                    Doctor
                  </th>
                  <th className=" px-10 py-3 text-left font-semibold">
                    Patient
                  </th>
                  <th className=" px-10 py-3 text-left font-semibold">
                    Status
                  </th>
                  <th className=" px-10 py-3 text-left font-semibold">
                    Appointment Date
                  </th>
                  <th className=" px-10 py-3 text-left font-semibold">
                    Appointment Time
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentAppointments.map((appointment, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-300 last:border-0"
                  >
                    <td className="text-gray-800 px-10 py-3 text-left">
                      {appointment.doctorResponseDTO.doctorName}
                    </td>
                    <td className="text-gray-800 px-10 py-3 text-left">
                      {appointment.patientResponseDTO.patientName}
                    </td>
                    <td className="text-gray-800 px-10 py-3 text-left">
                      {appointment.status === "BOOKED" && (
                        <>
                          <span className="bg-amber-400 w-30 text-center text-sm block text-white px-4 py-2 font-semibold rounded-2xl">
                            BOOKED
                          </span>
                        </>
                      )}
                      {appointment.status === "CANCELED" && (
                        <>
                          <span className="bg-red-600 t w-30 text-center text-sm block text-white px-4 py-2 font-semibold rounded-2xl">
                            CANCELED
                          </span>
                        </>
                      )}
                      {appointment.status === "COMPLETED" && (
                        <>
                          <span className="bg-green-400 w-30 text-center text-sm block text-white px-4 py-2 font-semibold rounded-2xl">
                            COMPLETED
                          </span>
                        </>
                      )}
                    </td>
                    <td className="text-gray-800 px-10 py-3 text-left">
                      {appointment.date}
                    </td>
                    <td className="text-gray-800 px-10 py-3 text-left">
                      {appointment.time}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* RECENT PATIENTS CONTAINER */}
        <div className="w-full   p-4 bg-white rounded-xl px-15 shadow-[1px_1px_3px_rgba(0,0,0,0.1),-1px_-1px_3px_rgba(0,0,0,0.1)] mt-7">
          <div className="flex justify-between">
            <h1 className="text-[#2c3e50] font-semibold text-[1.1rem]">
              Recent Patients
            </h1>
            <button
              onClick={() => navigate("/admin/dashboard/patients")}
              className="text-blue-700 cursor-pointer px-3 py-0.5"
            >
              Vivew All
            </button>
          </div>

          <div className="mt-5 overflow-x-auto outline-2 outline-gray-200 rounded-lg">
            <table className="w-full ">
              <thead className="bg-[#f8f9fa] text-[#2c3e50]">
                <tr className="border-b border-gray-300">
                  <th className=" px-10 py-3 text-left font-semibold">
                    Patient Name
                  </th>
                  <th className=" px-10 py-3 text-left font-semibold">
                    Gender
                  </th>
                  <th className=" px-10 py-3 text-left font-semibold">Phone</th>
                  <th className=" px-10 py-3 text-left font-semibold">
                    Address
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentPatients.map((patient, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-300 last:border-0"
                  >
                    <td className="text-gray-800 px-10 py-3 text-left">
                      {patient.patientName}
                    </td>
                    <td className="text-gray-800 px-10 py-3 text-left">
                      {patient.gender}
                    </td>
                    <td className="text-gray-800 px-10 py-3 text-left">
                      {patient.phone}
                    </td>
                    <td className="text-gray-800 px-10 py-3 text-left">
                      {patient.adderes}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* RECENT PATIENT TABLE END */}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
