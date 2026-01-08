import React, { useEffect, useRef, useState } from "react";

function Otp({ otpLength ,onChangeOtp }) {
  let [otpArr, setOtpArr] = useState(new Array(otpLength).fill(""));
  let otpRef = useRef([]);



  let handleOtpChange=(e,index)=>{
    let val = e.target.value;
   if (val === "" || isNaN(val)) {
      return;
    }
    else{
      let newOtpArr=[...otpArr]
      newOtpArr[index]=val
      setOtpArr(newOtpArr)
      //focus next input box
      if(index<otpLength-1){
        otpRef.current[index+1].focus()
      }
    }
   

  }
  useEffect(()=>{
otpRef.current[0].focus();
  },[])

  useEffect(()=>{
    onChangeOtp(otpArr.join(""))  
  },[otpArr])

  let handleKeyDown=(e,index)=>{
    if(e.key==="Backspace"){

      if(otpArr[index]===""){
        if(index>0){
          otpRef.current[index-1].focus()
        }
      }
      if(otpArr[index]!==""){
        let newOtpArr=[...otpArr]
        newOtpArr[index]=""
        setOtpArr(newOtpArr)
        if(index>0){
          otpRef.current[index-1].focus()
        }
      }
    }
    if(e.key==="ArrowLeft"){
      if(index>0){
        otpRef.current[index-1].focus()
      }
    }
    if(e.key==="ArrowRight"){
      if(index<otpLength-1){
        otpRef.current[index+1].focus()
      }
      
    }
  }

  return (
    <>
      <div className="flex justify-center">
        {otpArr.map((value, index) => (
          <input
            onChange={(e) => handleOtpChange(e, index)}
            key={index}
            ref={(e)=>(otpRef.current[index]=e)}
            value={otpArr[index]}
            type="text"
            onKeyDown={(e)=>handleKeyDown(e,index)}
            maxLength={1}
            className="outline-2 inline rounded text-center text-gray-600 outline-gray-400 focus:outline-[#06adaa] size-10 mx-1.5"
          />
        ))}
      </div>
    </>
  );
}

export default Otp;
