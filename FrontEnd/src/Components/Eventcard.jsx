import React from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../axios';
import { toast, ToastContainer } from 'react-toastify';

const Eventcard = (props) => {
  const handleButton = async () => {
    try {
      await axiosInstance.post(`event/${props.url}?event_id=${props.id}`);
      props.onApprove();
      toast.success("Event Approved")
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <>
      <div>
        <Link to={props.link} className='mx-auto'>
          <div className="border-2 h-auto rounded-xl bg-none hover:scale-105 shadow-md">
            <div className="image flex items-center flex-col">
              <img src={`http://127.0.0.1:8000${props.img}`} alt='' className="w-60 h-80 object-cover" />
              <h1 className="mt-3 text-xl font-semibold w-5/6">{props.Title}</h1>
              <h1 className="my-1 font-thin w-5/6 text-gray-400">{props.sdate} to {props.edate}</h1>
            </div>
          </div>
        </Link>
        {props.page === "dashboard" ? (
          <div>
            <div className='flex justify-evenly my-3'>
              <button className='bg-green-500 p-2 rounded-md text-white hover:scale-105' onClick={handleButton}>Approve</button>
              <button className='bg-red-500 p-2 rounded-md text-white hover:scale-105'>Disapprove</button>
            </div>
            <div className='flex flex-row justify-between mx-5'>
              {props.mentor ? <div>✅ Mentor</div> : <div>❌ Mentor</div>}
              {props.hod ? <div>✅ HOD</div> : <div>❌ HOD</div>}
              {props.dean ? <div>✅ Dean</div> : <div>❌ Dean</div>}
            </div>
          </div>
        ) : null}
        <ToastContainer
        position="top-right"
        autoClose={5000}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover/>
      </div>
      
    </>
  );
};

export default Eventcard;