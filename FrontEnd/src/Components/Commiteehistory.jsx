import React, { useState } from 'react';
import { Modal } from '../Components/Modal';
import { MdOutlineSpeakerNotes } from "react-icons/md";

export const Commiteehistory = ({ events }) => {

  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const handleOpenModal = (associate) => {
    setModalContent(associate);
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
                  <p className='mb-2 text-2xl font-extrabold text-[#FF6B66]'><strong>{event.name}</strong></p>
                  <p className='text-l text-[#FF6B66] '><strong> Venue :</strong> {event.venue.address}</p>

                  {event.associate.map(assoc => (

                  <div  key={assoc.id} className=' flex gap-5 m-2'>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <img src={assoc.profile_image} alt={assoc.first_name} onClick={() => handleOpenModal(assoc)}  style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
                      <p className='text-[#FF6B66] text-sm'>{assoc.first_name}</p>
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
