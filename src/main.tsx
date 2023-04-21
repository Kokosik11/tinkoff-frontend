import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";     
    
//core
import "primereact/resources/primereact.min.css";   
import 'primeflex/primeflex.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { router } from './app/router/router.tsx';

const mainRouter = createBrowserRouter(router);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={mainRouter} />
  </React.StrictMode>,
)
