import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../axios";
import { MyContext } from "../Context/MyContext"
import login_img from "../Assets/login img.jpg"

const Login = () => {

  const { setLogin, setUser } = useContext(MyContext)
  const navigate = useNavigate();
  const [staff, setStaff] = useState("baseUser")
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postData = new FormData();
    postData.append("email", formData.email);
    postData.append("password", formData.password);

    try {
      console.log(postData);
      const res = await axiosInstance.post(`/authentication/login/`, postData);
      localStorage.setItem("access_token", res.data.access);
      localStorage.setItem("refresh_token", res.data.refresh);
      localStorage.setItem("role", res.data.role);
      axiosInstance.defaults.headers["Authorization"] =
        "Bearer " + localStorage.getItem("access_token");
      setLogin(true)
      res.data.role === null ? setUser("undefined") :setUser(res.data.role);
      res.data.role === null ? localStorage.setItem("role", "undefined") : localStorage.setItem("role", res.data.role)
      navigate("/profile");
    } catch (error) {
      console.error("Error:", error);
      // Handle errors, show error message to the user
    }
  };

  return (
    <>
      <div className="grid grid-cols-5">
        <div className="col-span-3 ">
          {
            staff === "baseUser" ? (
              <img src="https://images.squarespace-cdn.com/content/v1/6362a31ebcf57907d45a58bc/4caac7f7-353a-45d6-8817-8e8a4a4fb853/wordsmith-custom-blog-Internal-communications-importing-marketing-lessons.png?format=1500w" alt="random" className="w-11/12 h-[29rem]"/>
            ) : (
          <img src={login_img} alt="random" className="w-11/12 h-11/12"/>
            )
          }
        </div>
        <div className="col-span-2 m-16 flex flex-col justify-center" >
          <div className="flex w-full">
            <button onClick={()=>{setStaff("baseUser")}} className={`mx-auto border-2 w-full py-1 rounded-md ${staff !=="baseUser" ? " text-[#FF6B66]" : "bg-[#FF6B66] text-white"}`}>User</button>
            <button onClick={()=>{setStaff("staff")}} className={`mx-auto border-2 w-full py-1 rounded-md bg-[#] ${staff !== "staff" ? " text-[#FF6B66]" : "bg-[#FF6B66] text-white"}`}>Staff</button>
          </div>
          <label htmlFor="user-email" className="text-[#FF6B66] text-md font-bold" style={{ paddingTop: "13px" }}>
            Email
          </label>
          <input
            id="user-email"
            className="form-content my-2 bg-[#faefe8] p-3 rounded-md focus:outline-none"
            type="email"
            name="email"
            placeholder="Email"
            onChange={(e) => handleChange(e)}
            autoComplete="on"
            required
          />
          <div className="form-border"></div>
          <label htmlFor="user-password" className="text-[#FF6B66] text-md font-bold" style={{ paddingTop: "22px" }}>
            Password
          </label>
          <input
            id="user-password"
            className="form-content my-2 bg-[#faefe8] p-3 rounded-md focus:outline-none"
            type="password"
            name="password"
            placeholder="******"
            onChange={(e) => handleChange(e)}
            required
          />
          <div className="form-border"></div>
          <input
            id="submit-btn"
            type="submit"
            name="submit"
            value="LOGIN"
            className="bg-[#FF6B66] p-2 rounded-xl text-white mt-4 cursor-pointer hover:bg-gray-900"
            onClick={handleSubmit}
          />
          <a href="#" id="signup">
            <Link to="/register" className="mb-4 text-[#FF6B66] font-bold text-sm hover:text-blue-800">
              Don't Have an account?
            </Link>
          </a>
        </div>
      </div>
    </>
  );
};

export default Login;