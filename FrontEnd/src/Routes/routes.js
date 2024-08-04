import React from 'react';
import BaseLayout from '../Layout/baselayout'
import Notfound from '../Pages/Notfound';
import Register from "../Pages/Register";
import Login from "../Pages/Login";
import Home from '../Pages/Home';
import Events from '../Pages/Events';
import Eventinfo from '../Pages/Eventinfo'
import Profile from '../Pages/Profile';
import Updateprofile from '../Pages/Updateprofile';
import Addevent from '../Pages/AddEvents/Addevent';
import Approveevents from '../Pages/Aprroveevents';
import Commiteehome from '../Pages/Commiteehome';
import CommiteeDashboard from '../Pages/CommiteeDashboard';
import PermissionDenied from '../Pages/Permissiondenied';
import Myevents from '../Pages/Myevents';

const routesConfig = [
  {
    path: '',
    element: <BaseLayout />,
    children: [
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/CommiteeDashboard',
        element: <CommiteeDashboard />,
        roles: ['BaseUser','']
      },
      {
        path: '/commiteehome',
        element: <Commiteehome />,
        roles: ['BaseUser','']
      },
      {
        path: '/approveevents',
        element: <Approveevents/>,
        roles: ['Mentor']
      },
      {
        path: '/permissiondenied',
        element: <PermissionDenied/>,
      },
      {
        path: '/addevent',
        element: <Addevent />,
        roles: ['BaseUser','HOD']
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path:'/',
        index: true,
        element: <Home />,
      },
      {
        path:'/events',
        index: true,
        element: <Events/>,
      },
      {
        path: 'eventinfo/:Id',
        element: <Eventinfo />,
      }, 
      {
        path: 'myevents',
        element: <Myevents/>,
      },      
      {
        path:'/profile',
        index: true,
        element: <Profile/>,
        roles: ['BaseUser','Mentor','HOD','']
      },
      {
        path:'/updateprofile',
        index: true,
        element: <Updateprofile/>,
        // roles: ['BaseUser','Mentor']
      },
    ],
  },
  {
    path: '*',
    element: <Notfound/>,
  },
];

export default routesConfig;
