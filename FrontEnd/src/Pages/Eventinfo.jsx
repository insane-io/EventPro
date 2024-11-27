import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../axios";
import { MyContext } from "../Context/MyContext"

function Eventinfo() {
    const params = useParams();
    const { Id } = params;
    const navigate = useNavigate()
    const [eventinfo, setEventInfo] = useState();
    const [EventId, setEventId] = useState()
    const { login } = useContext(MyContext)



    useEffect(() => {
        axiosInstance
            .get(`event/event_info/?event_unique_id=${Id}`)
            .then((res) => {
                setEventInfo(res.data.event);
                setEventId(res.data.event.unique_id)
                console.log(res.data)
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }, []);

    const handleSubmit = () => {
        if (login) {
            axiosInstance.post(`event/register_event/?event_unique_id=${EventId}`)
                .then((res) => {
                    console.log(res?.data);
                    toast.success("Registered successfully!");
                })
                .catch((error) => {
                    console.error("Error:", error);
                    toast.error("Registration failed. Please try again.");
                })
        }
        else {
            navigate("/login")
        }


    };

    const [isExpanded, setIsExpanded] = useState(false);

    const toggleReadMore = () => {
        setIsExpanded(!isExpanded);
    };

    const truncatedDescription = eventinfo?.description?.slice(0, 100);

    return (
        <>
            <ToastContainer />
            <style>
                {`
            @media (max-width: 992px) {
                .page-detail {
                    display: flex !important;
                    flex-direction: column !important;
                    align-items: center !important;
                }
                .card{
                    display: none !important;
                }
            }
            @media (min-width: 992px) {
                .base{
                    display: none !important;
                }
            }
        `}
            </style>

            <div className="lg:mx-20">
                <div className="grid flex-row gap-12 m-2 page-detail lg:grid-cols-3 lg:m-5 ">
                    <img
                        className="w-full col-span-2"
                        style={{ boxShadow: "0px 1px 10px grey", borderRadius: "20px", display: "block", Width: "70%", maxHeight: "350px", minHeight: '420px' }}
                        src={`http://127.0.0.1:8000${eventinfo?.banner}`}
                        alt="..."
                    />
                    <div
                        className="col-10 col-lg-4 col-sm-10 card h-[32rem] max-md:relative right-20 w-[30%] relative group"
                        style={{
                            border: "none",
                            borderRadius: "20px",
                            boxShadow: "0px 1px 10px grey",
                            position: "fixed",
                        }}
                    >
                        <div
                            className="absolute top-0 left-0 right-0 bg-[#FFE5E5] text-white p-4 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            style={{ boxShadow: "0px 1px 10px grey", zIndex: 10 }}
                        >
                            <p className=" font-bold text-[#FF6B66]">Number of Registrations :<strong className="ms-2">{eventinfo?.total_registrations}</strong></p>
                        </div>
                        <div className="flex flex-col details" style={{ border: 'none' }}>
                            <h2 className="m-3 mb-3 text-4xl font-bold text-[#FF6B66]">{eventinfo?.name}</h2>
                            <div className="flex flex-row mt-5 gap-2">
                                <div className='mx-3 rounded' style={{ width: "5px", backgroundColor: "#FF6B66" }}></div>
                                <div className="flex flex-col">
                                    <p className="text-xl ">Venue</p>
                                    <h4 className="text-2xl font-bold text-[#FF6B66]">{eventinfo?.venue?.name}, {eventinfo?.venue?.address}</h4>
                                    <p className="text-lg text-grey">Date</p>
                                    <h4 className="text-2xl font-bold text-[#FF6B66]">{eventinfo?.start_date} to {eventinfo?.end_date}</h4>
                                    <p className="text-xl text-grey">Location</p>
                                    <h4 className="text-2xl font-bold text-[#FF6B66]">{eventinfo?.location}</h4>
                                    <p className="text-xl text-grey">Prizes worth</p>
                                    <h4 className="text-2xl font-bold text-[#FF6B66]">{eventinfo?.prize === "" ? "₹ 0" : `₹ ${eventinfo?.prize}`}</h4>
                                    <p className="text-xl text-grey">Registration Fee</p>
                                    <h4 className="text-2xl font-bold text-[#FF6B66]">{eventinfo?.reg_fee === "" || eventinfo?.reg_fee === "0" ? "Free" : `₹ ${eventinfo?.reg_fee}` }</h4>
                                </div>
                            </div>
                        </div>
                        <button
                            style={{ width: "90%", borderRadius: "10px", backgroundColor: "#FF6B66", border: "none", color: "white", fontWeight: "bolder", fontSize: "20px", position: "absolute", bottom: "25px", left: "50%", transform: "translateX(-50%)" }}
                            className="p-4"
                            onClick={handleSubmit}
                        >
                            Register
                        </button>
                    </div>
                </div>
                <div className="m-5 md:ms-4 md:w-7/12">
                    <div className="text-2xl mb-5 mt-10 text-[#FF6B66]">
                        <b>About Event</b>
                    </div>

                    <p className="about">
                        {isExpanded ? eventinfo?.description : truncatedDescription}
                        {eventinfo?.description?.length > 100 && (
                            <span
                                className="inline-block px-3 py-1 mt-2 text-white bg-blue-500 rounded-md cursor-pointer"
                                onClick={toggleReadMore}>
                                {isExpanded ? 'Read Less' : 'Read More'}
                            </span>
                        )}
                    </p>

                    <p className="my-4 col-12 col-lg-8" style={{ height: "2px", backgroundColor: "#dddddd" }}></p>
                </div>
            </div>

            <div className="flex flex-row base" style={{ height: "70px ", backgroundColor: '#FAF9F6', width: '100%' }}>
                <button className='w=4/5' onClick={handleSubmit} style={{ alignItems: 'flex-end', backgroundColor: "#b8ecc4", border: "none", borderRadius: "10px" }} >
                    Register
                </button>
            </div>
        </>
    );
}

export default Eventinfo;
