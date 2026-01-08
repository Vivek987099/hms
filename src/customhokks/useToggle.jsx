import React, { useState } from 'react'

function useToggle(initialValue=false) {
    let [value,setValue]=useState(initialValue)
const toggle=()=>{
    setValue(prev => !prev)
}
const setOn=()=>setValue(true)
const setOff=()=>setValue(false)
    

  return {value,toggle,setOff,setOn}
}

export default useToggle
