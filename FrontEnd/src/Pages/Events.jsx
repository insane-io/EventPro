import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Eventcard from "../Components/Eventcard"
import { Link } from 'react-router-dom';

const Explore = () => {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({
    technical: false,
    cultural: false,
    sports: false,
    gaming: false,
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/event/event_info/');
        if (Array.isArray(response.data.events)) {
          setData(response.data.events);
          console.log(response.data);
        } else {
          console.error("Data is not an array:", response.data.events);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  const handleFilterChange = (filterName) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: !prevFilters[filterName],
    }));
  };

  const filteredData = data.filter((event) => {
    if (!filters.technical && !filters.cultural && !filters.sports && !filters.gaming) {
      return true;
    }
    if (filters.technical && event.domain === 'Technical') {
      return true;
    }
    if (filters.cultural && event.domain === 'Cultural') {
      return true;
    }
    if (filters.sports && event.domain === 'Sports') {
      return true;
    }
    if (filters.gaming && event.domain === 'Gaming') {
      return true;
    }
    return false;
  });

  return (
    <div className='md:h-screen '>
      <div className='grid grid-cols-5 gap-5 mx-4 '>
        <div className='col-span-1 h-screen hidden md:block '>
          <div className='text-black bg-[#FFE5E5] h-screen rounded-xl mt-4 p-3'>
            <h1 className='text-black font-semibold mx-3 text-3xl'>Filter By</h1>
            <div className='flex flex-row gap-2 items-center mx-5 mt-3' id='trending' name='trending'>
              <input
                type="checkbox"
                id="trendingCheckbox"
                checked={filters.technical}
                onChange={() => handleFilterChange('technical')}
                className='size-4'
              />
              <label htmlFor='trendingCheckbox' className='text-xl'>Technical Events</label>
            </div>
            <div className='flex flex-row gap-2 items-center mx-5'>
              <input
                type="checkbox"
                id="adventureCheckbox"
                checked={filters.cultural}
                onChange={() => handleFilterChange('cultural')}
                className='size-4'
              />
              <label htmlFor='adventureCheckbox' className='text-xl'>Cultural Events</label>
            </div>
            <div className='flex flex-row gap-2 items-center mx-5'>
              <input
                type="checkbox"
                id="beachCheckbox"
                checked={filters.sports}
                onChange={() => handleFilterChange('sports')}
                className='size-4'
              />
              <label htmlFor='beachCheckbox' className='text-xl'>Sports</label>
            </div>
            <div className='flex flex-row gap-2 items-center mx-5'>
              <input
                type="checkbox"
                id="heritageCheckbox"
                checked={filters.gaming}
                onChange={() => handleFilterChange('gaming')}
                className='size-4'
              />
              <label htmlFor='heritageCheckbox' className='text-xl'>Gaming Events</label>
            </div>
          </div>
        </div>
        <div className='col-span-4 md:col-span-4 mt-3 rounded-lg'>
          <div className='grid xl:grid-cols-3 md:grid-cols-3 grid-cols-1 gap-5'>
            {filteredData.map((event) => (
              <Eventcard img={event.image} Title={event.name} venue={event.venue.name} address={event.venue.address} link={`/eventinfo/${event.unique_id}`} sdate={event.start_date} edate={event.end_date} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explore;
