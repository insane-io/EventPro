import React from 'react'
import EventRegistrations from '../Components/EventRegistrations'

const Registrations = () => {
  return (
    <div className='xl:px-40 lg:px-20 md:px-20 grid lg:grid-cols-2 grid-cols-1 px-5 gap-7 my-10'>
      <EventRegistrations/>
      <EventRegistrations/>
      <EventRegistrations/>
      <EventRegistrations/>
      <EventRegistrations/>
      <EventRegistrations/>
      <EventRegistrations/>
    </div>
  )
}

export default Registrations
