import React, { useContext, useState } from 'react';
import defaultImg from '../Assets/profile.webp';
import axiosInstance from '../axios'; // Import your axios instance
import { MyContext } from '../Context/MyContext';

const UpdateProfile = () => {
    const [profileImg, setProfileImg] = useState(defaultImg);
    const [phone, setPhone] = useState('');
    const [branch, setBranch] = useState('');
    const {uid} = useContext(MyContext)


    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setProfileImg(reader.result);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('phone_number', phone);
        formData.append('branch', branch);
        formData.append('unique_id', uid)

        axiosInstance.post('user/post_userprofile/', formData)
        .then((res) => {
            console.log(res?.data)
        })
            .catch((error) => {
            console.error("Error:", error);
        })
    };

    return (
        <div className='grid grid-cols-4 gap-3 mx-10 mt-8 border-2 w-100 h-96'>
            <div className='flex flex-col items-center justify-start col-span-1 p-5 '>
                <img src="https://static.vecteezy.com/system/resources/thumbnails/003/337/584/small/default-avatar-photo-placeholder-profile-icon-vector.jpg" alt='' className='rounded-full h-60 w-60 ' />
                <label htmlFor='profile-pic-upload' className='p-5 my-5 font-bold text-white bg-yellow-300 rounded-md cursor-pointer text-basic'>
                    Update Profile Picture
                </label>
                <input id='profile-pic-upload' type='file' className='hidden' onChange={handleImageChange} />
            </div>
            <div className='col-span-3 p-5 '>
                <form onSubmit={handleSubmit}>
                    <div className='flex flex-row gap-3 mt-8'>
                        <h1 className='text-2xl'>Phone No.:</h1>
                        <input type='number' className='w-2/4 border-2' value={phone} onChange={(e) => setPhone(e.target.value)} />
                    </div>
                    <div className='flex flex-row gap-16 mt-8 '>
                        <label className='text-2xl' htmlFor='branch'>
                            Branch:
                        </label>
                        <select name='branch' id='branch' className='text-xl border-2' value={branch} onChange={(e) => setBranch(e.target.value)}>
                            <option value='CMPN'>CMPN</option>
                            <option value='IT'>IT</option>
                            <option value='EXTC'>EXTC</option>
                            <option value='ECS'>ECS</option>
                        </select>
                    </div>
                    <button type='submit' className='px-4 py-2 mt-8 font-bold text-white bg-blue-500 rounded hover:bg-blue-700'>
                        Update Profile
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateProfile;
