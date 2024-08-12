import React, { useContext, useEffect, useState } from 'react';
import { MyContext } from "../Context/MyContext";
import Eventcard from "../Components/Eventcard";
import axiosInstance from "../axios";
import gsap from 'gsap';

const DashBoard = () => {
  const { user } = useContext(MyContext);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [url, setUrl] = useState();
  const [sidebar, setSidebar] = useState(
    localStorage.getItem('dashboardSidebar') === 'true'
  );
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    async function getData() {
      try {
        const res = await axiosInstance.get('/event/unapproved_event/');
        setData(res?.data);
        console.log(res.data);
      } catch (error) {
        console.error(error);
      }
    }
    getData();
  }, [user, update]);

  const handleSidebar = () => {
    setSidebar(!sidebar);
    localStorage.setItem('dashboardSidebar', !sidebar);
    gsap.to("sidebar", {

    })
  };

  useEffect(() => {
    if (user === "Principal") {
      setFilteredData(data.filter((event) => event.approved_by_mentor === true && event.approved_by_hod === true && event.approved_by_dean === false));
      setUrl('approve_by_dean/');
    } else if (user === "HOD") {
      setFilteredData(data.filter((event) => event.approved_by_dean === false && event.approved_by_mentor === true && event.approved_by_hod === false));
      setUrl('approve_by_hod/');
    } else if (user === "Mentor") {
      setFilteredData(data.filter((event) => event.approved_by_mentor === false && event.approved_by_dean === false && event.approved_by_hod === false));
      setUrl('approve_by_mentor/');
    }
  }, [data]);

  const handleUpdate = () => {
    setUpdate(!update);
  };

  return (
    <>
      <div className='flex w-full justify-end'>
        <button className='me-10 border-[#FF6B66] border-2 text-[#FF6B66] font-semibold mb-2 p-3 rounded-full' onClick={handleSidebar}>Filters</button>
      </div>
      <div className={`grid grid-cols-5 gap-3`}>
        <div className={`border-2 ${sidebar ? "block col-span-1" : "hidden"} p-3 -translate-y-[4.18rem]`}>
          <h1 className='text-2xl'>Filters</h1>
          <div className='flex flex-col px-4 text-lg my-4'>
            <h1 className='px-2 py-1 border-2 flex justify-between flex-row'>Date <h1>▼</h1></h1>
            <div className='mx-6'>
              <h1><input id='hii' type="checkbox" /><label htmlFor="hii">hiii</label></h1>
            </div>
          </div>
        </div>
        <div className={`${sidebar ? "col-span-4 grid-cols-3" : "col-span-5 grid-cols-4"} grid my-3 mx-5 gap-4`}>
          {filteredData.map((event) => (
            <Eventcard key={event.id} img={event?.image} venue={event.venue.name} address={event.venue.address} prize={event.prize} fee={event.reg_fee} Title={event?.name} link={`/eventinfo/${event?.unique_id}`} sdate={event?.start_date} edate={event?.end_date} page={"dashboard"} mentor={event?.approved_by_mentor} hod={event?.approved_by_hod} dean={event?.approved_by_dean} url={url} id={event.unique_id} onApprove={handleUpdate} />
          ))}
        </div>
      </div>
    </>
  );
};

export default DashBoard;
