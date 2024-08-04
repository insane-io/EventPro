import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Components/Navbar'

function BaseLayout() {
  return (
    <>
      <div className="flex flex-col h-screen">
        <nav className="top-0 w-full text-white absoulte">
          <Navbar />
        </nav>
        <div className="overflow-y-auto pt-24">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default BaseLayout;
