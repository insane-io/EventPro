import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../axios";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    password1: "",
    password2: "",
    username: "",
    firstname: "",
    lastname: "",
    phone: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSave = async () => {
    if (formData.password1 !== formData.password2) {
      // toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post(`http://127.0.0.1:8000/authentication/signup/`, {
        email: formData.email,
        username: formData.username,
        first_name: formData.first_name,
        last_name: formData.last_name,
        phone: formData.phone,
        password: formData.password1,
      })
      console.log(res)
      console.log("registered Sucessfully");
      localStorage.setItem("access_token", res.data.access);
      localStorage.setItem("refresh_token", res.data.refresh);
      axiosInstance.defaults.headers["Authorization"] =
        "JWT " + localStorage.getItem("access_token");
      console.log("navigating");
      navigate("/updateprofile");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="grid grid-cols-5">
        <div className="col-span-3">
          <img src="https://huddle.day/assets/templates/basic/frontend2/media-uploader/join-us.png" alt="random" />
        </div>
        <div className="col-span-2 flex items-center justify-center">
          <form method="post" className="flex flex-col w-4/5 justify-center my-24">
            <label htmlFor="user-email" className="text-[#FF6B66] text-md font-bold" style={{ paddingTop: "13px" }}>
              &nbsp;Username
            </label>
            <input
              type="text"
              name="username"
              onChange={(e) => {
                handleChange(e);
              }}
              placeholder="Username"
              id="user-email"
              className="p-3 px-3 bg-[#faefe8] rounded-md focus:outline-none"
              autoComplete="on"
              required
            />
            <div className="form-border"></div>
            <label htmlFor="user-email" className="text-[#FF6B66] text-md font-bold" style={{ paddingTop: "13px" }}>
              &nbsp;First name
            </label>
            <input
              type="text"
              name="first_name"
              onChange={(e) => {
                handleChange(e);
              }}
              id="user-email"
              className="p-3 px-3 bg-[#faefe8] rounded-md focus:outline-none"
              placeholder="First Name"
              autoComplete="on"
              required
            />
            <div className="form-border"></div>
            <label htmlFor="user-email" className="text-[#FF6B66] text-md font-bold" style={{ paddingTop: "13px" }}>
              &nbsp;Last name
            </label>
            <input
              type="text"
              name="last_name"
              onChange={(e) => {
                handleChange(e);
              }}
              placeholder="Last Name"
              id="user-email"
              className="p-3 px-3  bg-[#faefe8] rounded-md focus:outline-none"
              autoComplete="on"
              required
            />
            <div className="form-border"></div>
            <label htmlFor="user-email" className="text-[#FF6B66] text-md font-bold" style={{ paddingTop: "13px" }}>
              &nbsp;Email
            </label>
            <input
              id="user-email"
              className="p-3 px-3  bg-[#faefe8] rounded-md focus:outline-none"
              onChange={(e) => { handleChange(e) }}
              type="email"
              name="email"
              autoComplete="on"
              placeholder="E-Mail"
              required
            />
            <div className="form-border"></div>
            <label htmlFor="user-password" className="text-[#FF6B66] text-md font-bold" style={{ paddingTop: "22px" }}>
              &nbsp;Password
            </label>
            <input
              type="password"
              placeholder=" Enter Password"

              name="password1"
              onChange={(e) => {
                handleChange(e);
              }}
              id="user-password"
              className="p-3 px-3  bg-[#faefe8] rounded-md focus:outline-none"

              required
            />
            <div className="form-border"></div>
            <label htmlFor="user-password" className="text-[#FF6B66] text-md font-bold" style={{ paddingTop: "22px" }}>
              &nbsp;Password
            </label>
            <input
              type="password"
              name="password2"
              placeholder=" Confirm Password"

              onChange={(e) => {
                handleChange(e);
              }}
              id="user-password"
              className="p-3 px-3  bg-[#faefe8] rounded-md focus:outline-none"

              required
            />
            <div className="form-border"></div>
            <button
              onClick={() => {
                handleSave();
              }}
              id="submit-btn"
              type="submit"
              name="submit"
              value="SIGN UP"
              className="bg-[#FF6B66] hover:bg-gray-900 w-full text-white font-thin py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline mt-5"
            >Register</button>
            <Link to="/login" className="flex justify-center mb-4 text-[#FF6B66]">
              Already a user? Sign-In{" "}
            </Link>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;