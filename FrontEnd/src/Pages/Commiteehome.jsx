import React from 'react'
import image from "../Assets/comittee img.svg"
import { useNavigate } from 'react-router-dom'

const Commiteehome = () => {

  const navigate = useNavigate()
  return (
    <>
      <div className='grid grid-cols-2 pt-16'>
        <div className='flex flex-col items-center justify-center'>
          <h1 className='text-9xl text-[#FF6B66] gothic'>Create and host </h1>
          <h1 className='text-9xl text-[#FF6B66] gothic'>your own Events</h1>
          <h1 className='w-4/6 font-extralight text-[#FF6B66] Inter mt-8 text-xl' style={{ letterSpacing: '-0.5px' }}>Take charge and bring your vision to life! Whether it's a sports match, a workshop, or a social gathering, now's your chance to create and host your very own event.</h1>
          <button onClick={() => { navigate("/role/addevent") }} className='mt-5 text-4xl bg-[#FF6B66] text-white py-2 px-12 rounded-full' style={{ boxShadow: "2px 2px 5px gray" }}>Get Started</button>
        </div>
        <img src={image} alt="" />
      </div>
    </>


  )
}

export default Commiteehome
