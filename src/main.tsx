import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";     
    
//core
import "primereact/resources/primereact.min.css";   
import 'primeflex/primeflex.css';
import "primeicons/primeicons.css"; 

import '@fontsource/raleway';

import { RecoilRoot } from 'recoil'

import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { router } from './app/router/router.tsx';
import App from './App.tsx';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </React.StrictMode>,
)
