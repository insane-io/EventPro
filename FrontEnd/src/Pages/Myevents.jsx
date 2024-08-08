import React, { useEffect, useState } from 'react';
import axiosInstance from '../axios';
import { Commiteehistory } from '../Components/Commiteehistory';

const Myevents = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function getdata() {
      try {
        const res = await axiosInstance.get('/event/event_info/');
        console.log(res.data);
        setEvents(res.data.events);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    getdata();
  }, []);

  return (
    <>
      <div className='text-4xl font-extrabold text-[#FF6B66] text-center my-8'>My Events</div>
      <Commiteehistory events={events} />
    </>
  );
}

export default Myevents;
