import React, { useState } from 'react';
import { Modal } from '../Components/Modal';
import { useNavigate } from 'react-router-dom';
import {Link} from "react-router-dom"

export default function Commiteehistory ({ events }) {

  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [message, setMessage] = useState()
  const navigate = useNavigate()

  const handleOpenModal = (user, message) => {
    setModalContent(user);
    setMessage(message);
    setShowModal(true);
  };

  console.log(events)

  const handleCloseModal = () => {
    setShowModal(false);
    setModalContent(null);
  };

  return (
    <>
      {events.map(event => (
        <>
        <>
        <div key={event.id} className='event-card'>
          <div className=' text-black px-44 my-6' >
            <div className='bg-[#FFE5E5]  rounded-xl'>
              <div className=' grid grid-cols-12 p-3'>
                <div className='col-span-2'>
                  <div className='flex flex-col'>
                  <Link to={`/eventinfo/${event.unique_id}`}>
                    <img src={`http://127.0.0.1:8000${event.banner}`} className='rounded h-40' alt={event.name} />
                    </Link>   
                  </div>
                </div>
                <div className='col-span-8 ms-4'>
                  <p className='mb-2 text-2xl font-extrabold text-[#FF6B66] flex justify-between'>
                    <Link to={`/eventinfo/${event.unique_id}`}><span>{event.name}</span></Link>
                    <span
                      className={`flex items-center justify-center w-6 h-6 rounded-full text-white ${event.is_approved ? 'bg-green-500' : 'bg-red-500'}`}
                      style={{ fontSize: '12px' }}>
                    </span>
                  </p>
                  <p className='text-l text-[#FF6B66] '><strong> Venue :</strong> {event.venue.address}</p>
                  <div  className='flex gap-5 m-2'>
                    {event.approvals.map(approval => (
                      <button key={approval.id}  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        {
                          approval.user.profile_image === null ?
                            (
                              <img src="https://static.vecteezy.com/system/resources/thumbnails/003/337/584/small/default-avatar-photo-placeholder-profile-icon-vector.jpg" alt="" onClick={() => handleOpenModal(approval.user, approval.message)} style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
                            ) : (
                              <img src={`http://127.0.0.1:8000${approval.user.profile_image}`} alt={approval.user.first_name} onClick={() => handleOpenModal(approval.user, approval.message)} style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
                            )
                        }
                        <p className='text-[#FF6B66] text-sm'>{approval.user.first_name}</p>
                      </button>
                    ))}
                  </div>
                </div>
                <div className='col-span-2'>
                  <p className='text-right text-2xl text-[#FF6B66]'>Prize Worth</p>
                  <p className='text-right text-2xl font-extrabold text-[#FF0000]'>₹{event.prize}</p>
                  <p className='text-right text-l text-[#FF6B66] my-3'>{event.start_date} <strong className='m-1'>09:00 AM</strong></p>
                  <p className='text-right text-3xl font-extrabold text-[#FF6B66]'>₹ {event.reg_fee}</p>
                </div>
              </div>
            </div>
          </div>

          <Modal handleCloseModal={handleCloseModal} page={"myevents"} message={message} modalContent={modalContent} showModal={showModal} />

        </div>
        </>
        </>


      ))}
    </>
  )
}
