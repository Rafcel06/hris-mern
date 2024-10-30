import React from 'react';
import { Guard } from '../AuthGuard/Guard';
import { faGauge, faAddressCard, faUsers, faUserTie, faFile, faFileLines, faCircle } from "@fortawesome/free-solid-svg-icons";

const LazyLogin = React.lazy(() => import('../Authenticate/Login'));
const LazyForgot = React.lazy(() => import('../Authenticate/Forgot'));
const LazyReset = React.lazy(() => import('../Authenticate/Reset'));
const LazyNotFound = React.lazy(() => import('../HRISComponent/Notfound'));
const LazyHome = React.lazy(() => import('../HRISComponent/Home'));
const LazyDashboard = React.lazy(() => import('../HRISComponent/Dashboard'));
const LazyAllPeople = React.lazy(() => import('../HRISComponent/AllPeople'));
const LazyPeople = React.lazy(() => import('../HRISComponent/People'));


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
        path: '',
        icons: faGauge,
        index: true,
        element: (
          <Guard>
            <LazyDashboard />
          </Guard>
        ),
      },
      {
        path: 'dashboard',
        icons: faGauge,
        element: (
          <Guard>
            <LazyDashboard />
          </Guard>
        ),
      },
      {
        path: 'people',
        icons: faUsers,
        element: (
          <Guard>
            <LazyPeople />
          </Guard>
        ),
        children: [
          {
            path: 'all-people', 
            element: (
              <Guard>
                <LazyAllPeople />
              </Guard>
            ),
          },
          {
            path: 'org-Chart', 
            element: (
              <Guard>
                <LazyAllPeople />
              </Guard>
            ),
          },
          {
            path: 'tracker', 
            element: (
              <Guard>
                <LazyAllPeople />
              </Guard>
            ),
          },
          {
            path: 'compliance-hub', 
            element: (
              <Guard>
                <LazyAllPeople />
              </Guard>
            ),
          },
          {
            path: 'immagration', 
            element: (
              <Guard>
                <LazyAllPeople />
              </Guard>
            ),
          },
          {
            path: 'background-check', 
            element: (
              <Guard>
                <LazyAllPeople />
              </Guard>
            ),
          },
          {
            path: 'equipment', 
            element: (
              <Guard>
                <LazyAllPeople />
              </Guard>
            ),
          },
          {
            path: 'coworker', 
            element: (
              <Guard>
                <LazyAllPeople />
              </Guard>
            ),
          },
        ],
      },
      {
        path: 'payroll',
        icons: faGauge,
        element: (
          <Guard>
            <LazyDashboard />
          </Guard>
        ),
        children : [
          {
            path: 'upcoming-payment', 
            element: (
              <Guard>
                <LazyAllPeople />
              </Guard>
            ),
          },
          {
            path: 'billing', 
            element: (
              <Guard>
                <LazyAllPeople />
              </Guard>
            ),
          },
          {
            path: 'global-payroll', 
            element: (
              <Guard>
                <LazyAllPeople />
              </Guard>
            ),
          },
          {
            path: 'tax-document', 
            element: (
              <Guard>
                <LazyAllPeople />
              </Guard>
            ),
          },
          {
            path: 'expenses', 
            element: (
              <Guard>
                <LazyAllPeople />
              </Guard>
            ),
          },
        ]
      },
      {
        path: 'iT',
        icons: faGauge,
        element: (
          <Guard>
            <LazyDashboard />
          </Guard>
        ),
      },
      {
        path: 'analytics',
        icons: faGauge,
        element: (
          <Guard>
            <LazyDashboard />
          </Guard>
        ),
      },
      {
        path: 'hub',
        icons: faGauge,
        element: (
          <Guard>
            <LazyDashboard />
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
