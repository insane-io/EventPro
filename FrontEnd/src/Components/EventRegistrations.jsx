import React from 'react'
import img from "../Assets/img 2.png"

const EventRegistrations = () => {
  return (
    <div className='w-full rounded-xl h-40 bg-[#FFE5E5] p-4 hover:scale-105' style={{boxShadow:" rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px"}}>
      <div className='flex flex-row gap-4'>
        <img src={img} alt="" className='' style={{height: "7.7rem", width: "8rem"}}/>
        <div className='flex-col flex text-[#FF6B66]'>
            <h1 className='text-3xl font-semibold'>Title</h1>
            <h1>Event Date: </h1>
            <h1>Registred On: </h1>
            <h1>Venue: </h1>
        </div>
      </div>
    </div>
  )
}

export default EventRegistrations
