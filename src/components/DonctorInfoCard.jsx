import { FaArrowRight } from "react-icons/fa";

import { GiRibbonMedal } from "react-icons/gi";

function DonctorInfoCard(props) {
  return (
    <>
      <div className="  font-poppins rounded-2xl shadow-xl w-80 h-110 overflow-hidden bg-white hover:translate-y-[-6px] transition-transform ease-in-out duration-500 cursor-pointer">
        <div className="outline w-full h-65 overflow-hidden">
          <img src="" alt="profle photo" className="w-full  object-center" />
        </div>

        <div className="p-3">
          <h1 className="font-semibold text-[1rem] mt-3">Dr. {props.doctorName}</h1>
          <p className="text-[#06adaa] font-[500]">{props.specialization}</p>
          <p className="text-gray-900 mt-2 font-[500] text-[0.95rem] flex items-center gap-2">
            {" "}
            <GiRibbonMedal className="text-[1.2rem]" />
            30+ Years of Exp
          </p>

          <button className="bg-[#06adaa] w-full mt-4 py-2 text-white font-[500] rounded-full flex items-center justify-center gap-2 hover:bg-[#059ca1] transition-colors duration-300">
            View Profile <FaArrowRight />
          </button>
        </div>
      </div>
    </>
  );
}

export default DonctorInfoCard;
