import React, { useState } from 'react';
import { Modal } from '../Components/Modal';


export const Commiteehistory = ({ events }) => {

  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const handleOpenModal = (user) => {
    setModalContent(user);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalContent(null);
  };

  return (
    <>
      {events.map(event => (
        <div key={event.id} className='event-card'>
          <div className=' text-black px-44 my-6' >
            <div className='bg-[#FFE5E5]  rounded-xl'>
              <div className=' grid grid-cols-12 p-3'>
                <div className='col-span-2'>
                  <div className='flex flex-col'>
                    <img src={event.image} className='rounded ' alt={event.name} />
                  </div>
                </div>
                <div className='col-span-8 ms-4'>
                  <p className='mb-2 text-2xl font-extrabold text-[#FF6B66] flex justify-between'>
                    <span>{event.name}</span>
                    <span
                      className={`flex items-center justify-center w-6 h-6 rounded-full text-white ${event.is_approved ? 'bg-green-500' : 'bg-red-500'}`}
                      style={{ fontSize: '12px' }}>
                      
                    </span>
                  </p>
                  <p className='text-l text-[#FF6B66] '><strong> Venue :</strong> {event.venue.address}</p>

                  {event.approvals.map(approval => (
                    <div key={approval.id} className='flex gap-5 m-2'>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <img src={approval.user.profile_image} alt={approval.user.first_name} onClick={() => handleOpenModal(approval.user)} style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
                        <p className='text-[#FF6B66] text-sm'>{approval.user.first_name}</p>
                      </div>
                    </div>
                  ))}

                </div>
                <div className='col-span-2'>

                  <p className='text-right text-2xl text-[#FF6B66]'>Prize Worth</p>
                  <p className='text-right text-2xl font-extrabold text-[#FF0000]'>$5000</p>
                  <p className='text-right text-l text-[#FF6B66] my-3'>{event.start_date} <strong className='m-1'>09:00 AM</strong></p>
                  <p className='text-right text-3xl font-extrabold text-[#FF6B66]'>${event.reg_fee}</p>
                </div>
              </div>
            </div>

          </div>

          <Modal handleCloseModal={handleCloseModal} modalContent={modalContent} showModal={showModal} />

        </div>


      ))}
    </>
  )
}
