import React, { useState, useEffect, useContext } from 'react';
import img from "../Assets/profile.webp";
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axios';
import { Link } from 'react-router-dom';
import { MyContext } from '../Context/MyContext';

const Profile = () => {
  const { setLogin, setUser, user } = useContext(MyContext)
  const navigate = useNavigate();
  const [data, setData] = useState('')

  useEffect(() => {
    axiosInstance.get(`user/get_userprofile/`)
      .then((res) => {
        setData(res.data)
        console.log(res.data)
      })
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    localStorage.removeItem('role')
    axiosInstance.defaults.headers['Authorization'] = null
    setLogin(false)
    navigate('/login');
    setUser("")
  }
  console.log(data)
  return (
    <>
      {user === '' ? (
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <h1 className='text-3xl' style={{ color: '#FF0000' }}>To Be Verified By Admin</h1>
          <p>
            <Link to="/">Click here to explore</Link>
          </p>
          <button onClick={handleLogout} className='py-3 px-5 rounded-lg text-white font-bold my-3 bg-[#FF6B66]'>Logout</button>
        </div>
      ) : (
        <div className='md:grid md:grid-cols-4 flex flex-col gap-5 mx-8'>
          <div className='flex flex-col items-center justify-start h-auto lg:col-span-1 md:col-span-2 p-4 border-2'>
            {
              data.profile_image ? (
                <img src={`http://127.0.0.1:8000/${data?.profile_image}`} alt="Profile" className='flex my-3 rounded-full w-52 h-52' />
              ) : (
                <img src="https://static.vecteezy.com/system/resources/thumbnails/003/337/584/small/default-avatar-photo-placeholder-profile-icon-vector.jpg" alt="" className='flex my-3 rounded-full w-52 h-52' />
              )
            }
            <button onClick={handleLogout} className='w-2/4 p-3 mt-5 text-white bg-red-700 rounded'>Logout</button>
            <Link to='/updateprofile' className='w-3/4 p-3 mt-5 flex justify-center text-white bg-orange-400 rounded'>Update Profile</Link>
          </div>
          <div className='lg:col-span-3 md:col-span-2 p-5 border-2'>
            <h1 className='p-3 text-xl bg-gray-300'>Name: {`${data?.first_name} ${data?.last_name}`}</h1>
            <h1 className='p-3 text-xl bg-gray-100'>E-Mail: {data?.email}</h1>
            <h1 className='p-3 text-xl bg-gray-300'>Phone: {data?.phone_number}</h1>
            <h1 className='p-3 text-xl bg-gray-100'>Role: {data?.role?.role}</h1>
            <h1 className='p-3 text-xl bg-gray-300'>Committee: {data?.committee?.map(item => (
              <span key={item?.id} className='pl-2'>{item?.name}</span>
            ))}</h1>
            <h1 className='p-3 text-xl bg-gray-100'>Branch: {data?.branch}</h1>
          </div>
        </div>
      )
      }
    </>
  );
};

export default Profile;
