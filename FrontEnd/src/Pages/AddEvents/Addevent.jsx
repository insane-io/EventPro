import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import axiosInstance from "../../axios"

const EmpEvent = () => {
  const navigate = useNavigate();
  const [venue, setVenue] = useState([])
  const [committee , setCommittiee] = useState([])
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    start_date: '',
    end_date: '',
    location: '',
    image: null,
    venue: '',
    domain: '',
    banner: null,
    committee: '',
    reg_fee: '',
    duration: '',
    prize : '',
  });

  const data = [
    { name: 'Event Name', fname: 'name', type: 'text' },
    { name: 'Description', fname: 'description', type: 'text' },
    { name: 'Start Date', fname: 'start_date', type: 'date' },
    { name: 'End Date', fname: 'end_date', type: 'date' },
    { name: 'Location', fname: 'location', type: 'text' },
    { name: 'Logo', fname: 'image', type: 'file' },
    { name: 'Venue', fname: 'venue', type: 'select' },
    { name: 'Domain', fname: 'domain', type: 'text' },
    { name: 'Banner Image', fname: 'banner', type: 'file' },
    { name: 'Committee', fname: 'committee', type: 'committee' },
    { name: 'Registration Amount', fname: 'reg_fee', type: 'text' },
    { name: 'Time', fname: 'Duration', type: 'text' },
    { name: 'Prize', fname: 'prize', type: 'text' },
  ]

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    async function getData() {
      try {
        const res = await axiosInstance.get("/venue/get_venue/")
        setVenue(res?.data)
        console.log(res?.data)
      } catch (error) {
        console.log(error)
      }

    }
    getData()
  }, [])

  useEffect(() => {
    async function getData() {
      try {
        const res = await axiosInstance.get("/user/get_committee/")
        setCommittiee(res?.data)
        console.log(res?.data)
      } catch (error) {
        console.log(error)
      }

    }
    getData()
  }, [])

  

  useEffect(() => {
    const filledFields = Object.values(formData).filter((value) => value !== '' && value !== null).length;
    const totalFields = Object.keys(formData).length;
    setProgress((filledFields / totalFields) * 100);
    gsap.to('#bar', {
      width: `${progress}%`,
      duration: 3,
    });
  }, [formData, progress]);

  const handleChange = (e, key) => {
    let value = e.target.value;
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  const handleFileChange = (e, key) => {
    setFormData({
      ...formData,
      [key]: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('start_date', formData.start_date);
    formDataToSend.append('end_date', formData.end_date);
    formDataToSend.append('location', formData.location);
    formDataToSend.append('domain', formData.domain);
    formDataToSend.append('image', formData.image);
    formDataToSend.append('venue', parseInt(formData.venue));
    formDataToSend.append('banner', formData.banner);
    formDataToSend.append('committee', parseInt(formData.committee));
    formDataToSend.append('reg_fee', formData.reg_fee);
    formDataToSend.append('duration', formData.duration);
    formDataToSend.append('prize', formData.prize);

    try {
      const response = await axiosInstance.post('http://127.0.0.1:8000/event/event_add/', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Form submitted successfully:', response.data);
      navigate('/role/committee');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="flex items-center h-screen my-4 flex-col">
      <div className="h-5 w-3/6 bg-neutral-600 my-5 rounded-3xl">
        <div id='bar'
          className="h-5 bg-red-400 rounded-3xl"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <form onSubmit={handleSubmit} className='flex flex-col w-3/6 bg-gray-100 p-5'>
        {data.map((d, i) => (
          <div className='flex flex-col' key={i}>
            <label htmlFor={d.fname} className='my-2 font-bold'>{d.name}</label>
            {d.type === 'file' ? (
              <input type={d.type} name={d.fname} onChange={(e) => handleFileChange(e, `${d.fname}`)} className=' focus:outline-none p-3 rounded-lg border-2' />
            ) : d.type === 'select' ?
              (
                <select name={d.fname} onChange={(e) => handleChange(e, `${d.fname}`)} className='p-3 rounded-lg focus:outline-none'>
                  {venue.map((d, i) => (
                    <option key={i} value={d.id}>{d.name}</option>
                  ))}
                </select>
              ) : d.type === 'committee' ? (
                <select name={d.fname} onChange={(e) => handleChange(e, `${d.fname}`)} className='p-3 rounded-lg focus:outline-none'>
                  {committee.map((d, i) => (
                    <option key={i} value={d.id}>{d.name}</option>
                  ))}
                </select>
              ) :
              (
                <input type={d.type} name={d.fname} onChange={(e) => handleChange(e, `${d.fname}`)} className=' focus:outline-none p-3 rounded-lg border-2' />
              )}
          </div>
        ))}
        <button type='submit' className='bg-blue-500 p-2 rounded-lg text-white mt-5'>Submit</button>
      </form>
    </div>
  );
};

export default EmpEvent;
