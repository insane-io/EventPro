import React, { useState, useEffect } from 'react';

export const Modal = ({ handleCloseModal, modalContent, showModal }) => {
    
    const [content, setContent] = useState(modalContent);

    useEffect(() => {
        setContent(modalContent);
    }, [modalContent]);

    const handleClose = () => {
        handleCloseModal();
    };

    if (!showModal) return null;

    return (
        <div
            id="static-modal"
            tabIndex="-1"
            aria-hidden="true"
            className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full overflow-y-auto overflow-x-hidden bg-gray-900 bg-opacity-50"
        >
            <div className="relative p-4 w-full max-w-2xl max-h-full">
                <div className="relative bg-white rounded-3xl border-[#FF6B66] border">
                    <div className="p-4 md:p-5 space-y-4">
                        <form>
                            <div className="mb-4">
                                <div className="flex items-center">
                                    <img
                                        src="profile1.jpg"
                                        alt="Profile 1"
                                        className="w-12 h-12 rounded-full"
                                    />
                                    <p className="ml-2 text-3xl font-bold text-[#FF6B66]">Profile 1 Name</p>
                                </div>
                                <textarea
                                    className="appearance-none border-white rounded w-full py-2 px-3"
                                    style={{ borderWidth: '1px', borderStyle: 'solid' }}
                                    id="description"
                                    name="description"
                                    placeholder="Description"
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                />
                            </div>
                        </form>
                    </div>
                    <div className="flex items-center p-4 md:p-5">
                        <button
                            onClick={handleClose}
                            type="button"
                            className="text-white ml-auto focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-3xl text-sm px-5 py-2.5 text-center bg-[#FF6B66]"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
