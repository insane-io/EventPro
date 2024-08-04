import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CommiteeDashboard = () => {
  const [eventData, setEventData] = useState({
    name: '',
    is_approved: 'Pending',
    venue: '',
    start_date: '',
  });

  useEffect(() => {
    // Fetch event data from the backend API
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/event/event_info/');
        // Assuming the first event in the array has the required data
        const firstEventData = response.data.events[0];
        setEventData({
          name: firstEventData.name,
          is_approved: firstEventData.is_approved,
          venue: firstEventData.venue,
          start_date: firstEventData.start_date,
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []); // Run this effect only once on component mount

  return (
    <div>
      <div className="card p-6 my-9 mx-10 bg-gray-200 rounded-lg shadow-md">
        <h1 className="text-3xl font-semibold mb-4">Event Details</h1>
        <div className="flex items-center space-x-8">
          <div className="card p-4 bg-white rounded-lg shadow-md w-2/3">
            <h1 className="text-xl">Event Name: {eventData.name}</h1>
            <p className="text-xl">Venue: {eventData.venue}</p>
            <p className="text-xl">Date: {eventData.start_date}</p>
          </div>
          <div className="card p-4 bg-white rounded-lg shadow-md">
            <p className="text-lg font-medium"> Status: {eventData.is_approved ? 'Approved' : 'Pending'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommiteeDashboard;
