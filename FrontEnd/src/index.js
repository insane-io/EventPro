import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Register from './Pages/Register';
import CommiteeDashboard from './Pages/CommiteeDashboard';
import Commiteehome from './Pages/Commiteehome';
import PermissionDenied from './Pages/Permissiondenied';
import Login from './Pages/Login';
import Home from './Pages/Home';
import Eventinfo from './Pages/Eventinfo';
import Profile from './Pages/Profile';
import UpdateProfile from './Pages/Updateprofile';
import BaseLayout from './Layout/baselayout';
import Addevent from "./Pages/AddEvents/Addevent";
import Events from "./Pages/Events";
import { UserProvider } from './Context/MyContext';
import Approveevents from './Pages/Aprroveevents';
import DashBoard from './Pages/DashBoard';
import Roles from './Roles';
import Registrations from './Pages/Registrations';
import Myevents from './Pages/Myevents';

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path='/' element={<BaseLayout />}>
        <Route path='register' element={<Register />} />
        <Route path='CommiteeDashboard' element={<CommiteeDashboard />} />
        <Route path='approveevents' element={<Approveevents />} />
        <Route path='permissiondenied' element={<PermissionDenied />} />
        <Route path='login' element={<Login />} />
        <Route path='' element={<Home />} />
        <Route path='events' element={<Events />} />
        <Route path='eventinfo/:Id' element={<Eventinfo />} />
        <Route path='profile' element={<Profile />} />
        <Route path='registrations' element={<Registrations />} />
        <Route path='updateprofile' element={<UpdateProfile />} />
        <Route path='role' element={<Roles />} >
          <Route path='dashboard' element={<DashBoard />} />
          <Route path='committee' element={<Commiteehome />} />
          <Route path='addevent' element={<Addevent />} />
          <Route path='myevents' element={<Myevents />} />
        </Route>
      </Route>
    </Route>
  )
);

root.render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();