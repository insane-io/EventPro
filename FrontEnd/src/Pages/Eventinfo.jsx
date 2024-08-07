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
    const { login } = useContext(MyContext)

    useEffect(() => {
        axiosInstance
            .get(`event/event_info/?event_unique_id=${Id}`)
            .then((res) => {
                setEventInfo(res.data.event);
                console.log(res.data.event.banner);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }, []);

    const handleSubmit = () => {
        if (login) {
            const formData = new FormData(); 
            formData.append("event_unique_id", Id);
            axiosInstance.post(`event/register_event/`, formData)
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
                        style={{ boxShadow: "0px 1px 10px grey", borderRadius: "20px", display: "block", Width: "70%", maxHeight: "450px", minHeight: '420px' }}
                        src={`http://127.0.0.1:8000${eventinfo?.banner}`}
                        alt="..."
                    />
                    <div
                        className="col-10 col-lg-4 col-sm-10 card max-h-max"
                        style={{
                            border: "none",
                            borderRadius: "20px",
                            boxShadow: "0px 1px 10px grey",
                            position: "relative",
                        }}
                    >
                        <div className="flex flex-col details" style={{ border: 'none' }}>
                            <h2 className="m-3 mb-3 text-4xl font-bold">{eventinfo?.name}</h2>
                            <div className="flex flex-row mt-5 gap-2">
                                <div className='mx-3 rounded' style={{ width: "5px", backgroundColor: "#f05c0c" }}></div>
                                <div className="flex flex-col">
                                    <p className="text-xl ">Venue</p>
                                    <h4 className="text-2xl font-bold">Classroom : {eventinfo?.venue?.name}</h4>
                                    <h4 className="text-2xl font-bold">Floor : {eventinfo?.venue?.address}</h4>

                                    <p className="text-lg text-grey">Start Date</p>
                                    <h4 className="text-2xl font-bold">{eventinfo?.start_date}</h4>
                                    <p className="text-lg text-grey">End Date</p>
                                    <h4 className="text-2xl font-bold">{eventinfo?.end_date}</h4>
                                    <p className="text-xl text-grey">Location</p>
                                    <h4 className="text-2xl font-bold">{eventinfo?.location}</h4>
                                </div>
                            </div>
                        </div>
                        <button
                            style={{ width: "90%", borderRadius: "10px", backgroundColor: "#f05c0c", border: "none", color: "white", fontWeight: "bolder", fontSize: "20px", position: "absolute", bottom: "25px", left: "50%", transform: "translateX(-50%)" }}
                            onClick={handleSubmit}
                            className="p-4"
                        >Register
                        </button>
                    </div>
                </div>
                <div className="m-5 md:ms-4 md:w-4/6">
                    <div className="text-lg"><b>About</b></div>
                    <p className="mb-4 col-12 col-lg-8" style={{ height: "2px", backgroundColor: "#dddddd", }}></p>
                    <p className="about ">{eventinfo?.description}</p>
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
