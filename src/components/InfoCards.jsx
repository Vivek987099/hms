import React from "react";
import { LuUsers } from "react-icons/lu";

function InfoCards(props) {
  return (
    <>
      <div
      style={{borderColor:props.color}}
        
        className={`info-card relative dark:bg-gray-800 dark:[&>*]:text-slate-100  w-full min-h-40 bg-white border-t-4   rounded-2xl p-7  overflow-hidden shadow-lg`}
      >
        {/* Total Users Text */}
        <p className="text-sm opacity-90 ">{props.title} </p>

        {/* Count */}
        <h2 className="text-4xl font-bold">{props.total}</h2>

        {/* Icon Box */}
        <div
         style={{backgroundColor:props.color}}
          className={`icon-wrapper text-2xl absolute top-5 right-5 p-3 rounded-xl backdrop-blur-xl bg-red-500 text-white`}
        >{props.icon}
         
        </div>

        {/* Growth Box */}
        <div className="absolute bottom-4 left-5 flex items-center gap-2">
          <span className="bg-white/20 px-2 py-1 rounded text-sm font-semibold">
            +95%
          </span>
          <span className="text-sm opacity-90">Last Month</span>
        </div>

        {/* Dots */}
        <div className="absolute bottom-4 right-5 text-xl">⋮</div>
      </div>
    </>
  );
}

export default InfoCards;
