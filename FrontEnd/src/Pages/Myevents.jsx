import React from 'react'
import Eventcard from "../Components/Eventcard"

const Myevents = () => {
  return (
    <div>
      <div className="my-5">
      {/* Left Side */}
      <div className="p-4 w-full">

        <div className="flex flex-row">
          {/* Filter Card */}
          <div className="mb-10 p-4 w-full sm:w-1/3 bg-gray-200 rounded">
            <h2 style={{fontSize:"30px"}} className='mb-5'>Filter</h2>
            <div className="mb-4">
              <label>
                <input
                  type="radio"
                  name="filter"
                  value="Sports"
                />
                Sports
              </label>
            </div>
            <div className="mb-4">
              <label>
                <input
                  type="radio"
                  name="filter"
                  value="Technical"
                />
                Technical
              </label>
            </div>
            <div className="mb-4">
              <label>
                <input
                  type="radio"
                  name="filter"
                  value="Cultural"
                />
                Cultural
              </label>
            </div>
            <button
              type="button"
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
              Clear Filters
            </button>
          </div>

          {/* Spacer */}
          <div className="w-4 sm:w-10"></div>

          {/* Event Card and Additional Card Boxes */}
          <div className="mb-10 p-4 w-full sm:w-3/3 bg-gray-200 rounded">
            <div className="mb-5">
              <h2 style={{fontSize:"40px", textAlign:"center", }}>MY EVENTS</h2>
              <div className="flex flex-wrap ">
              <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 px-3 mx-6 my-3">
                <Eventcard
                  img=""
                  id={"location"}
                  domain="domain"
                />
              </div>
          </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
    </div>
  )
}

export default Myevents
