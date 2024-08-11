import React, { useEffect, useState } from 'react'
import EventRegistrations from '../Components/EventRegistrations'
import axiosInstance from "../axios"

const Registrations = () => {

  const [data, setData] = useState([])
  useEffect(()=>{
    async function getData(){
      try {
        const res = await axiosInstance.get("/event/user_regs/")
        setData(res?.data)
        
      } catch (error) {
        console.log(error)
      }
    }
    getData()
  }, [])

  console.log(data)
  return (
    <div className='xl:px-40 lg:px-20 md:px-20 grid lg:grid-cols-2 grid-cols-1 px-5 gap-7 my-10'>
      {
        data.map((d)=>(
          <EventRegistrations img={d.event.image} title={d.event.name} date={d.event.start_date} registered={d.registration_date} venue={d.event.venue}/>
        ))
      }
    </div>
  )
}

export default Registrations
