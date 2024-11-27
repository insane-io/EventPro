import axiosInstance from '../axios'
import React, { useState, useEffect } from 'react';

export const Modal = ({ handleCloseModal, modalContent, showModal, page, url, id,message, onApprove, button }, props) => {

    const [content, setContent] = useState(modalContent);

    useEffect(() => {
        setContent(modalContent);
    }, [modalContent]);
    
    const handleButton = async () => {
        try {
            if (button === "approve") {
                await axiosInstance.post(`event/${url}?event_id=${id}`, { message: content })
            } else if (button === "disapprove") {
                await axiosInstance.post(`event/disapprove/?event_id=${id}`, { message: content })
                console.log("Event disapproved")
            }
            onApprove();
        } catch (error) {
            console.error(error);
        }
    };

    const handleClose = () => {
        handleCloseModal();
    };

    if (!showModal) return null;

    return (
        <div
            id="static-modal"
            tabIndex="-1"
            className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full overflow-y-auto overflow-x-hidden bg-gray-900 bg-opacity-50"
        >
            <div className="relative p-4 w-full max-w-2xl max-h-full">
                <div className="relative bg-white rounded-3xl border-[#FF6B66] border">
                    <div className="p-4 md:p-5 space-y-4">
                        <form>
                            <div className="mb-4">
                                {
                                    page === "dashboard" ? (
                                        <div className={`${button === "approve" ? 'text-green-400' : 'text-red-400'} font-bold text-2xl underline mb-5`}>Enter Feedback</div>
                                    ) : (
                                        <div className="flex items-center">
                                            <img
                                                src={`http://127.0.0.1:8000${modalContent.profile_image}`}
                                                alt="Profile 1"
                                                className="w-12 h-12 rounded-full"
                                            />
                                            <p className="ml-2 text-3xl font-bold text-[#FF6B66]">{modalContent.first_name}</p>
                                        </div>
                                    )
                                }
                                <textarea
                                    className="appearance-none resize-none h-40 focus:outline-none border-[#FF6B66] rounded w-full py-2 px-3"
                                    style={{ borderWidth: '1px', borderStyle: 'solid' }}
                                    id="description"
                                    name="description"
                                    placeholder={page === "dashboard" ? "Reason" : "Description"}
                                    // value={props.page === "myevents" ? {message} : content} 
                                    value={message}
                                    onChange={(e) => setContent(e.target.value)}
                                />

                            </div>
                        </form>
                    </div>
                    <div className="flex justify-end p-4 md:p-5">
                        <button
                            onClick={handleClose}
                            className="text-[#FF6B66] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-3xl text-sm px-5 py-2.5 text-center border-2 border-[#FF6B66]">
                            Close
                        </button>
                        {page === "dashboard" && (
                            <button onClick={handleButton} className='text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-3xl text-sm px-5 py-2.5 text-center mx-3 bg-[#FF6B66]'>Save</button>
                        )}
                    </div>
                </div>
            </div>
        </div >
    );
};
