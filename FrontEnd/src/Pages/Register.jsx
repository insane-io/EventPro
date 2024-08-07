import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../axios";
import { MyContext } from "../Context/MyContext";

const Register = () => {

  const { setLogin, setUid } = useContext(MyContext)
  const [formData, setFormData] = useState({
    email: "",
    password1: "",
    password2: "",
    username: "",
    first_name: "",
    last_name: "",
    // phone: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async (e) => {
    e.preventDefault(); // Prevent default form submission

    if (formData.password1 !== formData.password2) {
      // toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await axiosInstance.post(`/authentication/signup/`, {
        email: formData.email,
        username: formData.username,
        first_name: formData.first_name,
        last_name: formData.last_name,
        // phone: formData.phone,
        password: formData.password1,
      });
      console.log(res);
      console.log("Registered successfully");
      setLogin(true)

      localStorage.setItem("access_token", res.data.access);
      localStorage.setItem("refresh_token", res.data.refresh);
      axiosInstance.defaults.headers["Authorization"] =
        "JWT " + localStorage.getItem("access_token");
      console.log("Navigating");
      const decode = res.data.access
      setUid(decode.user_id)
      navigate("/");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="grid grid-cols-5">
      <div className="col-span-3">
        <img src="https://huddle.day/assets/templates/basic/frontend2/media-uploader/join-us.png" alt="random" />
      </div>
      <div className="col-span-2 flex items-center justify-center">
        <form onSubmit={handleSave} className="flex flex-col w-4/5 justify-center my-24">
          <label htmlFor="username" className="text-[#FF6B66] text-md font-bold" style={{ paddingTop: "13px" }}>
            &nbsp;Username
          </label>
          <input
            type="text"
            name="username"
            onChange={handleChange}
            placeholder="Username"
            id="username"
            className="p-3 px-3 bg-[#faefe8] rounded-md focus:outline-none"
            autoComplete="on"
            required
          />
          <div className="form-border"></div>
          <label htmlFor="first_name" className="text-[#FF6B66] text-md font-bold" style={{ paddingTop: "13px" }}>
            &nbsp;First name
          </label>
          <input
            type="text"
            name="first_name"
            onChange={handleChange}
            id="first_name"
            className="p-3 px-3 bg-[#faefe8] rounded-md focus:outline-none"
            placeholder="First Name"
            autoComplete="on"
            required
          />
          <div className="form-border"></div>
          <label htmlFor="last_name" className="text-[#FF6B66] text-md font-bold" style={{ paddingTop: "13px" }}>
            &nbsp;Last name
          </label>
          <input
            type="text"
            name="last_name"
            onChange={handleChange}
            placeholder="Last Name"
            id="last_name"
            className="p-3 px-3 bg-[#faefe8] rounded-md focus:outline-none"
            autoComplete="on"
            required
          />
          <div className="form-border"></div>
          <label htmlFor="email" className="text-[#FF6B66] text-md font-bold" style={{ paddingTop: "13px" }}>
            &nbsp;Email
          </label>
          <input
            id="email"
            className="p-3 px-3 bg-[#faefe8] rounded-md focus:outline-none"
            onChange={handleChange}
            type="email"
            name="email"
            autoComplete="on"
            placeholder="E-Mail"
            required
          />
          <div className="form-border"></div>
          <label htmlFor="password1" className="text-[#FF6B66] text-md font-bold" style={{ paddingTop: "22px" }}>
            &nbsp;Password
          </label>
          <input
            type="password"
            placeholder="Enter Password"
            name="password1"
            onChange={handleChange}
            id="password1"
            className="p-3 px-3 bg-[#faefe8] rounded-md focus:outline-none"
            required
          />
          <div className="form-border"></div>
          <label htmlFor="password2" className="text-[#FF6B66] text-md font-bold" style={{ paddingTop: "22px" }}>
            &nbsp;Confirm Password
          </label>
          <input
            type="password"
            name="password2"
            placeholder="Confirm Password"
            onChange={handleChange}
            id="password2"
            className="p-3 px-3 bg-[#faefe8] rounded-md focus:outline-none"
            required
          />
          <div className="form-border"></div>
          <button
            type="submit"
            className="bg-[#FF6B66] hover:bg-gray-900 w-full text-white font-thin py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline mt-5"
          >
            Register
          </button>
          <Link to="/login" className="flex justify-center mb-4 text-[#FF6B66]">
            Already a user? Sign-In
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Register;
