import React, { useState, useEffect } from 'react';
import Eventcard from '../Components/Eventcard';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import image from "../Assets/home_image.svg"
import img1 from "../Assets/img 1.svg"
import img2 from "../Assets/img 2.png"
import img3 from "../Assets/img 3.svg"
import { useGSAP } from '@gsap/react'
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const [data, setData] = useState();

  useEffect(() => {
    async function getdata() {
      try {
        const res = await axios.get('http://127.0.0.1:8000/event/homepage/');
        setData(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    getdata();
  }, []);

  useGSAP(()=>{
    gsap.to("#text", {
      opacity: 1,
      translateY: 0,
      duration: 1,
      stagger: 0.5
    })
  } , [])

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/events');
  };

  return (
    <div className='inter-font'>
      <div className='w-full flex items-center flex-col'>
        <div id='title' className='text-center flex-col font-bold lg:translate-y-12 lg:text-8xl md:text-6xl text-4xl text-[#FF6B66]'>
          <h1 id='text' className=' translate-y-20 opacity-0'>BOOK AND EXPLORE</h1>
          <h1 id='text' className=' translate-y-20 opacity-0'>UPCOMING EVENTS</h1>
        </div>
        <img src={image} alt="" className='w-full ' />
      </div>
      <div className='md:grid md:grid-cols-2 flex flex-col items-center mx-10 my-10 gap-x-10 gap-y-20'>
        <img id='images' src={img1} alt=""/>
        <h1 className='flex flex-col text-center md:gap-9 font-thin'><p className='lg:text-5xl text-3xl font-bold text-[#FF6B66]'>Academic Events</p><span className='lg:text-3xl md:text-xl font-thin'>Join us for an insightful lecture on [Topic] by [Speaker's Name], a renowned expert in the field. This is a unique opportunity to deepen your understanding and engage in stimulating discussions.</span></h1>
        <img src={img2} alt="" className='block md:hidden'/>
        <h1 className='flex flex-col text-center md:gap-9'><p className='lg:text-5xl text-3xl font-bold text-[#FF6B66]'>Cultural Events</p><span className='lg:text-3xl md:text-xl font-thin'>Get ready to be dazzled by the rhythm and grace of our Dance Show! From classical ballet to contemporary dance, our performers will take you on a mesmerizing journey through movement. Don't miss this chance to witness the beauty and artistry of dance. Mark your calendars and join us for a spectacular show</span></h1>
        <img src={img2} alt="" className='hidden md:block w-full'/>
        <img src={img3} alt=""/>
        <h1 className='flex flex-col text-center md:gap-9'><p className='lg:text-5xl md:text-3xl font-bold text-[#FF6B66]'>Sports Events</p><span className='lg:text-3xl md:text-xl font-thin'>Get ready for an action-packed day filled with thrilling competitions and fun activities. Whether you're an athlete or a fan, come and be part of the excitement. Cheer on your favorite teams and enjoy a day of sportsmanship and camaraderie. Don't miss out—see you there!</span></h1>
      </div>
      {/* <div className='mx-6'>
        {data && (
          <>
            <div >
              <div className='flex justify-between items-center'>
                <button className='text-2xl my-5 text-[#FF6B66] font-bold' onClick={handleClick}>On Going Events</button>
                <Link to="/events" className='bg-[#FF6B66] text-white p-3 rounded'>See All Events  </Link>
              </div>
              <div className='flex gap-4'>
                {data.ongoing_events.map((event, index) => (
                  <Eventcard key={index} img={event.image} Title={event.name} id={event.location} domain={event.domain} link={`/eventinfo/${event.unique_id}`} />
                ))}
              </div>

            </div>
            <div >
              <div className='flex justify-between items-center'>
                <h1 className='text-2xl text-[#FF6B66] my-5 font-bold'>Upcoming Events</h1>
                <Link to="/events" className='bg-[#FF6B66] text-white p-3 rounded'>See All Events  </Link>
              </div>
              <div className='flex gap-4 mb-5'>
                {data.upcoming_events.map((event, index) => (
                  <Eventcard key={index} img={event.image} Title={event.name} id={event.location} domain={event.domain} link={`/eventinfo/${event.unique_id}`} />
                ))}
              </div>
            </div>
          </>
        )}
      </div> */}
    </div>
  );
};

export default Home;
