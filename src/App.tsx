/* eslint-disable react-hooks/exhaustive-deps */
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import { protectedRoutes, router } from './app/router/router';
import { useRecoilState } from 'recoil';
import { userState } from './common/store/userStore';
import { accountState } from './common/store/accountStore';
import { useEffect } from 'react';

function App() {
  const [ user, setUser ] = useRecoilState(userState);
  const [ account, setAccount ] = useRecoilState(accountState);

  const mainRouter = createBrowserRouter(user?.email ? protectedRoutes : router);

  return (
    <>
      <RouterProvider router={mainRouter} />
    </>
  )
}

export default App
