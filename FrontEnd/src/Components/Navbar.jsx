import React, { useState, useEffect, useContext } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import logo from "../Assets/Screenshot 2024-08-12 072831.png";
import { MyContext } from '../Context/MyContext';
import LoadingBar from 'react-top-loading-bar'
import { GrTask } from "react-icons/gr";

const Navbar = () => {
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { login, user } = useContext(MyContext)
  const [progress, setProgress] = useState(0)
  const [nav, setnav] = useState([{ name: 'Home', link: "/" }, { name: 'Events', link: "/events" }])
  console.log(login)
  useEffect(() => {
    user === "Principal" || user === "HOD" || user === "Mentor" ? setnav([{ name: 'Dashboard', link: "/role/dashboard" }]) : user === "Committee" ? setnav([{ name: 'Committee', link: "/role/committee" }, { name: 'My Events', link: "/role/myevents" }]) : setnav([{ name: 'Home', link: "/" }, { name: 'Events', link: "/events" }])
  }, [user])

  const loader = (link) => {
    setProgress(40)
    setTimeout(() => {
      navigate(link)
      setProgress(100)
    }, 50)
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    
    <nav className={`font-bold text-2xl fixed w-full z-20 top-0 start-0 bg-white border-b-2`}>
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <NavLink to="/"><img src={logo} className="h-14 w-24" alt="Logo" /></NavLink>
        </div>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <button onClick={toggleMenu} type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded={isMenuOpen}>
            <span className="sr-only">Open main menu</span>
            <svg className={`w-5 h-5 ${isMenuOpen ? 'text-gray-900' : 'text-black'}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
        </div>
        <div className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${isMenuOpen ? 'block' : 'hidden'}`} id="navbar-sticky">
          <ul className="md:gap-14 flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 
           rounded-lg bg-transparent md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
            {nav.map((d, i) => (
              <li key={i}>
                <NavLink onClick={() => { loader(`${d.link}`) }} to={d.link} className={({ isActive }) => isActive ? `block py-2 px-3 rounded text-[#FF6B66]` : `hover:text-[#FF6B66] block py-2 px-3 rounded text-black`} aria-current="page">{d.name}</NavLink>
              </li>
            ))}
            {login ? (
              <>
              {
                user === "BaseUser" ? 
                (<li>
                  <NavLink onClick={() => { loader('registrations') }} to="/registrations" className={({ isActive }) => isActive ? `block py-2 px-3 rounded text-[#FF6B66]` : `hover:text-[#FF6B66] block py-2 px-3 rounded text-black`}>My registrations</NavLink>
                </li>) : null
              }
                <li>
                  <NavLink onClick={() => { loader('profile') }} to="/Profile" className={({ isActive }) => isActive ? `block py-2 px-3 rounded text-[#FF6B66]` : `hover:text-[#FF6B66] block py-2 px-3 rounded text-black`}>Profile</NavLink>
                </li>
              </>
            ) : (
              <li>
                <NavLink onClick={() => { loader('login') }} to="/login" className={({ isActive }) => isActive ? `block py-2 px-3 rounded text-[#FF6B66]` : `hover:text-[#FF6B66] block py-2 px-3 rounded text-black`}>Login</NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
      <LoadingBar
        color='#FF6B66'
        progress={progress}
        onLoaderFinished={() => setProgress(100)}
        height={5}
      />
    </nav>
  );
};

export default Navbar;
