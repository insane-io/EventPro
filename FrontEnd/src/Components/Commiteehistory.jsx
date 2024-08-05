import React, { useState } from 'react';
import { Modal } from '../Components/Modal';
import { MdOutlineSpeakerNotes } from "react-icons/md";

export const Commiteehistory = () => {
    
      const [showModal, setShowModal] = useState(false);
      const [modalContent, setModalContent] = useState('');
    
      const handleOpenModal = (content) => {
        setModalContent(content);
        setShowModal(true);
      };
    
      const handleCloseModal = () => {
        setShowModal(false);
        setModalContent('');
      };

  return (
    <>

      <div className=' text-black px-24 my-8' >
        <div className='bg-[#FFE5E5]  rounded-xl'>
          <div className=' grid grid-cols-12 p-5'>
            <div className='col-span-2'>
              <div className='flex flex-col'>
                <img src='https://images.unsplash.com/' className='rounded ' alt='college' />
              </div>
            </div>
            <div className='col-span-8 ms-4'>
              <p className='mb-2 text-3xl font-extrabold text-[#FF6B66]'><strong>Flipkart GRID 6.0 - Software Development Track</strong></p>
              <p className='text-xl text-[#FF6B66] '><strong> Venue :</strong> Tech Convention Center</p>

              <div className=' flex gap-5 m-2'>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <img src='profile1.jpg' alt='Profile 1' style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
                  <p className='text-[#FF6B66]'>Profile 1 Name</p>
                  <button onClick={() => handleOpenModal('Notes for Profile 1')}> <MdOutlineSpeakerNotes className='size-8' color="#FF6B66" /></button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <img src='profile2.jpg' alt='Profile 2' style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
                  <p className='text-[#FF6B66]'>Profile 2 Name</p>
                  <button className='' onClick={() => handleOpenModal('Notes for Profile 2')}> <MdOutlineSpeakerNotes className='size-8' color="#FF6B66" /></button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <img src='profile3.jpg' alt='Profile 3' style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
                  <p className='text-[#FF6B66]'>Profile 3 Name</p>
                  <button onClick={() => handleOpenModal('Notes for Profile 3')}> <MdOutlineSpeakerNotes className='size-8' color="#FF6B66" /></button>
                </div>
              </div>

            </div>
            <div className='col-span-2'>
              <p className='text-right text-4xl text-[#FF6B66]'>Prize Worth</p>
              <p className='text-right text-5xl font-extrabold text-[#FF0000]'>$5000</p>
              <p className='text-right text-xl text-[#FF6B66] my-3'>2024-09-15 <strong className='m-1'>09:00 AM</strong></p>
              <p className='text-right text-5xl font-extrabold text-[#FF6B66]'>$50</p>
            </div>
          </div>
        </div>

      </div>
      
       <Modal handleCloseModal={handleCloseModal}  modalContent={modalContent} showModal={showModal}/>

    </>
  )
}
