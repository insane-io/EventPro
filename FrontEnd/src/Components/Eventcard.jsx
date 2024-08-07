import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import {Modal} from "../Components/Modal"

const Eventcard = (props) => {

  const [show, setShow] = useState()

  const handleShow = () => {
    setShow(true)
  }

  const handleClose = () => {
    setShow(false)
  }

  return (
    <>
      <div>
        <Link to={props.link} className='mx-auto'>
        <div className='bg-[#FFE5E5] rounded-3xl' >
              <img src={imgae} alt='college' className='w-full object-cover h-40 rounded-3xl p-4' />
              <p className='mb-2 ps-4 text-2xl font-extrabold text-[#FF6B66]'><strong>Flipkart GRID 6.0 - Software Development Track</strong></p>
              <p className='ps-4 text-xl text-[#FF6B66] '><strong> Venue :</strong> Tech Convention Center</p>
              <div className=' grid grid-cols-2'>
                <div className='col-span-1'>
                  <p className='text-left text-l text-[#FF6B66] mt-4 px-4'>2024-09-15</p>
                  <p className='text-left text-l text-[#FF6B66] px-4 '>09:00 AM</p>
                </div>
                <div className='col-span-1 px-4 mt-4'>
                  <p className='text-right text-2xl text-[#FF6B66] '>Prize Worth</p>
                  <p className='text-right text-4xl font-extrabold text-[#FF0000]'>$5000</p>
                </div>
              </div>
              <div className='grid grid-cols-2 mt-8 p-4'>
                <div className='col-span-1 '>
                  <button className="text-white font-medium rounded-3xl  px-5 py-2.5 text-center bg-[#FF6B66]"
                    type="button">More Details</button>
                </div>
                <div className='col-span-1 '>
                  <p className='text-right text-4xl font-extrabold text-[#FF6B66]'>$50</p>
                </div>

              </div>

            </div>
        </Link>
        {props.page === "dashboard" ? (
          <div>
            <div className='flex justify-evenly my-3'>
              <button className='bg-green-500 p-2 rounded-md text-white hover:scale-105' onClick={handleShow}>Approve</button>
              <button className='bg-red-500 p-2 rounded-md text-white hover:scale-105'>Disapprove</button>
              <Modal showModal={show} handleCloseModal={handleClose} page={"dashboard"} url={props.url} id={props.id} onApprove={props.onApprove}/>
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
