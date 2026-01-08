import React from 'react'
import { NavLink } from 'react-router';

function InfoSection(props) {
  return (
    <div className="h-80 w-full bg-[url('/public/infoImg/istockphoto-2225338639-612x612.jpg')] bg-no-repeat  bg-cover flex justify-center items-center">
            <p className='font-bold'><NavLink to={'/'}>HOME</NavLink> // <span className='uppercase text-[#06adaa]'>{props.title}</span></p>
        
      
    </div>
  )
}

export default InfoSection
