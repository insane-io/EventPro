import React from 'react'
import img from "../Assets/img 2.png"

const EventRegistrations = (props) => {
  function truncateString(str, num) {
    if (str?.length <= num) {
      return str
    }
    return str?.slice(0, num) 
  }
  
  return (
    <div className='w-full rounded-xl h-40 bg-[#FFE5E5] p-4 hover:scale-105' style={{boxShadow:" rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px"}}>
      <div className='flex flex-row gap-4'>
        <img src={`http://127.0.0.1:8000${props?.img}`} alt="" className='' style={{height: "7.7rem", width: "8rem"}}/>
        <div className='flex-col flex text-[#FF6B66]'>
            <h1 className='text-3xl font-semibold'>{props?.title}</h1>
            <h1 className='flex flex-row gap-2'>Event Date: <h1 className='font-bold'>{props?.date}</h1></h1>
            <h1 className='flex flex-row gap-2'>Registred On: <h1 className='font-bold'>{truncateString(props?.registered, 10)}</h1></h1>
            <h1 className='flex flex-row gap-2'>Venue: <h1 className='font-bold'>{props?.venue}</h1></h1>
        </div>
      </div>
    </div>
  )
}

export default EventRegistrations
