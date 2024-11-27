import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Approveevents = (props) => {
    const [formData, setFormData] = useState({
        title: '',
        genre: '',
        date: '',
        location: '',
        img: null,
        about: '',
        cast_images: [],
    });
    const [isApproved, setIsApproved] = useState(false);

    useEffect(() => {
        // Fetch existing data and populate the form
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/getEventData'); // Replace with your API endpoint
                const eventData = response.data;

                setFormData({
                    title: eventData.title,
                    genre: eventData.genre,
                    date: eventData.date,
                    location: eventData.location,
                    img: null, // You might want to handle the image separately; this is a placeholder
                    about: eventData.about,
                    cast_images: eventData.cast_images || [],
                });

                // Set the approval status
                setIsApproved(eventData.isApproved || false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleApprove = async () => {
        // Update the approval status in the backend
        try {
            await axios.put('http://127.0.0.1:8000/api/approveEvent', { isApproved: true }); // Replace with your API endpoint
            setIsApproved(true);
            console.log('Event Approved successfully!');
        } catch (error) {
            console.error('Error approving event:', error);
        }
    };

    const handleDisapprove = async () => {
        // Update the approval status in the backend
        try {
            await axios.put('http://127.0.0.1:8000/api/disapproveEvent', { isApproved: false }); // Replace with your API endpoint
            setIsApproved(false);
            console.log('Event Disapproved successfully!');
        } catch (error) {
            console.error('Error disapproving event:', error);
        }
    };

    const handleChange = (e, key) => {
        setFormData({
            ...formData,
            [key]: e.target.value,
        });
    };

    const handleFileChange = (e, key) => {
        setFormData({
            ...formData,
            [key]: e.target.files[0],
        });
    };

    const handleAddCastImage = () => {
        setFormData({
            ...formData,
            cast_images: [...formData.cast_images, null],
        });
    };

    const handleRemoveCastImage = () => {
        const updatedCastImages = [...formData.cast_images];
        updatedCastImages.pop();
        setFormData({
            ...formData,
            cast_images: updatedCastImages,
        });
    };

    const handleCastImageFileChange = (e, index) => {
        const updatedCastImages = [...formData.cast_images];
        updatedCastImages[index] = e.target.files[0];
        setFormData({
            ...formData,
            cast_images: updatedCastImages,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append('title', formData.title);
        formDataToSend.append('genre', formData.genre);
        formDataToSend.append('date', formData.date);
        formDataToSend.append('location', formData.location);
        formDataToSend.append('img', formData.img);
        formDataToSend.append('about', formData.about);

        formData.cast_images.forEach((castImage, index) => {
            if (castImage) {
                formDataToSend.append('cast_images', castImage);
            }
        });

        try {
            // Send the updated event data to the backend
            await axios.put('http://127.0.0.1:8000/api/updateEvent', formDataToSend); // Replace with your API endpoint
            console.log('Event data updated successfully!');
        } catch (error) {
            console.error('Error updating event data:', error);
        }
    };

    return (
        <div className=" flex items-center justify-center h-screen my-4">
            <div className="card w-1/2 p-4 shadow-lg bg-gray-100">
                <form className="w-full" onSubmit={handleSubmit}>
                    {/* Title */}
                    <div className="mb-3">
                        <label htmlFor="exampleInputTitle" className="block text-gray-700 text-sm font-bold mb-2">
                            Title
                        </label>
                        <input type="text" className="w-full p-2 border rounded" id="exampleInputTitle" onChange={(e) => handleChange(e, 'title')} />
                    </div>

                    {/* Genre */}
                    <div className="mb-3">
                        <label htmlFor="exampleInputGenre" className="block text-gray-700 text-sm font-bold mb-2">
                            Genre
                        </label>
                        <input type="text" className="w-full p-2 border rounded" id="exampleInputGenre" onChange={(e) => handleChange(e, 'genre')} />
                    </div>

                    {/* Date */}
                    <div className="mb-3">
                        <label htmlFor="exampleInputDate" className="block text-gray-700 text-sm font-bold mb-2">
                            Date
                        </label>
                        <input type="text" className="w-full p-2 border rounded" id="exampleInputDate" onChange={(e) => handleChange(e, 'date')} />
                    </div>

                    {/* Location */}
                    <div className="mb-3">
                        <label htmlFor="exampleInputLocation" className="block text-gray-700 text-sm font-bold mb-2">
                            Location
                        </label>
                        <input type="text" className="w-full p-2 border rounded" id="exampleInputLocation" onChange={(e) => handleChange(e, 'location')} />
                    </div>

                    {/* Img */}
                    <div className="mb-3">
                        <label htmlFor="exampleInputImg" className="block text-gray-700 text-sm font-bold mb-2">
                            Img
                        </label>
                        <div className="flex items-center justify-between mb-3">
                            <input
                                type="file"
                                className="w-full mr-3 p-2 border rounded"
                                id="inputGroupFile02"
                                onChange={(e) => handleFileChange(e, 'img')}
                            />
                        </div>
                    </div>

                    {/* About */}
                    <div className="mb-3">
                        <label htmlFor="exampleInputAbout" className="block text-gray-700 text-sm font-bold mb-2">
                            About
                        </label>
                        <input type="text" className="w-full p-2 border rounded" id="exampleInputAbout" onChange={(e) => handleChange(e, 'about')} />
                    </div>
                    <div className="flex justify-between">
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Save Changes
                        </button>

                        <div className="flex justify-between my-1 ">
                            <button
                                type="button"
                                className={`${isApproved ? 'bg-green-500' : 'bg-gray-300'
                                    } hover:bg-green-700 text-white font-bold py-2 px-4 mx-2 rounded`}
                                onClick={handleApprove}
                            >
                                Approve
                            </button>
                            <button
                                type="button"
                                className={`${!isApproved ? 'bg-red-500' : 'bg-gray-300'
                                    } hover:bg-red-700 text-white font-bold py-2 px-4 rounded`}
                                onClick={handleDisapprove}
                            >
                                Disapprove
                            </button>
                            <div>{props.value}</div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Approveevents;
