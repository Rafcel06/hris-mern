import React from 'react';
import { Guard } from '../AuthGuard/Guard';
import { faGauge, faAddressCard,faUsers,faUserTie, faFile,faFileLines, faCircle   } from "@fortawesome/free-solid-svg-icons";


const LazyLogin = React.lazy(() => import('../Authenticate/Login'));
const LazyForgot = React.lazy(() => import('../Authenticate/Forgot'));
const LazyReset = React.lazy(() => import('../Authenticate/Reset'));
const LazyNotFound = React.lazy(() => import('../HRISComponent/Notfound'));
const LazyHome = React.lazy(() => import('../HRISComponent/Home'));
const LazyDashboard = React.lazy(() => import('../HRISComponent/Dashboard'));
const LazyMyinfo = React.lazy(() => import('../HRISComponent/Myinfo'));
const LazyPeople = React.lazy(() => import('../HRISComponent/People'));
const LazyHiring = React.lazy(() => import('../HRISComponent/Hiring'));
const LazyReport = React.lazy(() => import('../HRISComponent/Report'));
const LazyFiles = React.lazy(() => import('../HRISComponent/Files'));
const LazyProfile = React.lazy(() => import('../HRISComponent/Profile'));
const LazyJob = React.lazy(() => import('../HRISComponent/Job'));


// Route configuration array
export const routeConfig = [
  {
    path: '/',
    element: <LazyLogin />,
    exact: true,
  },
  {
    path: '/forgot-password',
    element: <LazyForgot />,
  },
  {
    path: '/reset-password',
    element: <LazyReset />,
  },
  {
    path: '/home',
    element: (
      <Guard>
        <LazyHome />
      </Guard>
    ),
    children: [
      {
        path: 'dashboard',
        icons :faGauge,
        index: true,
        element: (
          <Guard>
            <LazyDashboard />
          </Guard>
        ),
      },
      {
        path: 'myinfo',
        icons : faAddressCard,
        parentnaviagtion :true,
        element: (
          <Guard>
            <LazyProfile />
          </Guard>
        ),
      },

      {
        path: 'profile',
        icons :faCircle,
        subnaviagtion : true,
        element: (
          <Guard>
            <LazyProfile />
          </Guard>
        ),
      },
      {
        path: 'job',
        icons : faCircle,
        subnaviagtion : true,
        element: (
          <Guard>
            <LazyJob />
          </Guard>
        ),
      },

      {
        path: 'people',
        icons :faUsers,
        element: (
          <Guard>
            <LazyPeople />
          </Guard>
        ),
      },
      {
        path: 'hiring',
        icons :faUserTie,
        element: (
          <Guard>
            <LazyHiring />
          </Guard>
        ),
      },
      {
        path: 'report',
        icons :faFile,
        element: (
          <Guard>
            <LazyReport />
          </Guard>
        ),
      },
      {
        path: 'files',
        icons :faFileLines,
        element: (
          <Guard>
            <LazyFiles />
          </Guard>
        ),
      },
    ],
  },
  {
    path: '*',
    element: <LazyNotFound />,
  },
];
