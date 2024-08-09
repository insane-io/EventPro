import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';

const EmpEvent = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    start_date: '',
    end_date: '',
    location: '',
    image: null,
    venue: '',
    domain: '',
  });

  const [progress, setProgress] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const filledFields = Object.values(formData).filter((value) => value !== '' && value !== null).length;
    const totalFields = Object.keys(formData).length;
    setProgress((filledFields / totalFields) * 100);
    gsap.to('#bar', {
      width: `${progress}%`,
      duration: 3,
    });
  }, [formData, progress]);

  const handleDropdownToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleChange = (e, key) => {
    let value = e.target.value;
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  const handleFileChange = (e, key) => {
    setFormData({
      ...formData,
      [key]: e.target.files[0],
    });
  };

  const handleDropdownSelect = (value, key) => {
    setFormData({
      ...formData,
      [key]: value,
    });
    setIsOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('start_date', formData.start_date);
    formDataToSend.append('end_date', formData.end_date);
    formDataToSend.append('location', formData.location);
    formDataToSend.append('image', formData.image);
    formDataToSend.append('venue', formData.venue);
    formDataToSend.append('domain', formData.domain);

    try {
      const response = await axios.post('http://127.0.0.1:8000/event/event_add/', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Form submitted successfully:', response.data);
      navigate('/Commiteehome');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="mt-12 flex items-center justify-center h-screen my-4 flex-col">
      <div className="h-5 w-3/6 bg-neutral-600 my-5 rounded-3xl">
        <div id='bar'
          className="h-5 bg-red-400 rounded-3xl"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className="card w-1/2 p-4 shadow-lg bg-gray-100">
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="inputEventName" className="block text-gray-700 text-sm font-bold mb-2">
              Event Name
            </label>
            <input type="text" className="w-full p-2 border rounded" id="inputEventName" onChange={(e) => handleChange(e, 'name')} />
          </div>

          <div className="mb-3">
            <label htmlFor="inputEventDescription" className="block text-gray-700 text-sm font-bold mb-2">
              Event Description
            </label>
            <input type="text" className="w-full p-2 border rounded" id="inputEventDescription" onChange={(e) => handleChange(e, 'description')} />
          </div>

          <div className="mb-3">
            <label htmlFor="inputStartDate" className="block text-gray-700 text-sm font-bold mb-2">
              Start Date
            </label>
            <input type="date" className="w-full p-2 border rounded" id="inputStartDate" onChange={(e) => handleChange(e, 'start_date')} />
          </div>

          <div className="mb-3">
            <label htmlFor="inputEndDate" className="block text-gray-700 text-sm font-bold mb-2">
              End Date
            </label>
            <input type="date" className="w-full p-2 border rounded" id="inputEndDate" onChange={(e) => handleChange(e, 'end_date')} />
          </div>

          <div className="mb-3">
            <label htmlFor="inputLocation" className="block text-gray-700 text-sm font-bold mb-2">
              Location
            </label>
            <input type="text" className="w-full p-2 border rounded" id="inputLocation" onChange={(e) => handleChange(e, 'location')} />
          </div>

          <div className="mb-3">
            <label htmlFor="inputEventImage" className="block text-gray-700 text-sm font-bold mb-2">
              Event Image
            </label>
            <div className="flex items-center justify-between mb-3">
              <input
                type="file"
                className="w-full mr-3 p-2 border rounded"
                id="inputEventImage"
                onChange={(e) => handleFileChange(e, 'image')}
              />
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="inputVenue" className="block text-gray-700 text-sm font-bold mb-2">
              Venue
            </label>
            <div className="relative inline-block text-left">
              <button
                id="dropdownRadioButton"
                onClick={handleDropdownToggle}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="button"
              >
                {formData.venue || 'Select venue'}
                <svg
                  className={`w-2.5 h-2.5 ms-3 transform transition-transform ${isOpen ? 'rotate-180' : ''
                    }`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>

              {isOpen && (
                <div
                  id="dropdownDefaultRadio"
                  className="z-10 block w-48 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
                >
                  <ul
                    className="p-3 space-y-3 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownRadioButton"
                  >
                    <li>
                      <div className="flex items-center">
                        <input
                          id="default-radio-1"
                          type="radio"
                          value="Smartclassroom1"
                          name="venue"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                          onChange={() => handleDropdownSelect('Smartclassroom1', 'venue')}
                        />
                        <label
                          htmlFor="default-radio-1"
                          className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Smartclassroom1
                        </label>
                      </div>
                    </li>
                    <li>
                      <div className="flex items-center">
                        <input
                          id="default-radio-2"
                          type="radio"
                          value="Smartclassroom2"
                          name="venue"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                          onChange={() => handleDropdownSelect('Smartclassroom2', 'venue')}
                        />
                        <label
                          htmlFor="default-radio-2"
                          className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Smartclassroom2
                        </label>
                      </div>
                    </li>
                    <li>
                      <div className="flex items-center">
                        <input
                          id="default-radio-3"
                          type="radio"
                          value="Smartclassroom3"
                          name="venue"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                          onChange={() => handleDropdownSelect('Smartclassroom3', 'venue')}
                        />
                        <label
                          htmlFor="default-radio-3"
                          className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Smartclassroom3
                        </label>
                      </div>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="inputDomain" className="block text-gray-700 text-sm font-bold mb-2">
              Domain
            </label>
            <input type="text" className="w-full p-2 border rounded" id="inputDomain" onChange={(e) => handleChange(e, 'domain')} />
          </div>

          <div className="text-center">
            <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-700">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmpEvent;
