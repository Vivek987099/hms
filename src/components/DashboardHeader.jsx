import React from "react";

function DashboardHeader(props) {
  return (
    <>
      <div className="w-full dark:bg-gray-800  flex justify-between items-center p-4 bg-white rounded-xl px-3 text-base lg:px-7 xl:px-15 shadow-[1px_1px_3px_rgba(0,0,0,0.1),-1px_-1px_3px_rgba(0,0,0,0.1)] mb-5">
        <div>
          <span className="text-sm dark:text-slate-100 md:text-base lg:text-lg font-semibold text-[#2c3e50]">{props.title}</span>
        </div>

        <div>
          <span className="text-sm dark:text-slate-100 md:text-base lg:text-lg font-semibold text-[#2c3e50]">{props.path}</span>
        </div>
      </div>
    </>
  );
}

export default DashboardHeader;
