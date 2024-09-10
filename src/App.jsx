import { useEffect, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './index.css'
import MainPage from './pages/MainPage'
import SignInPage from './pages/SignInPage'
import SignUpPage from './pages/SignUpPage'
import TestPage from './pages/TestPage'
import ResultPage from './pages/ResultPage'
import MyPage from './pages/MyPage'
import HearderLayout from './components/HearderLayout'
import useBearsStore from './zustand/bearStore'
import { getUserProfile } from './axios/auth'

const ProtectedRoute = ({element:Element}) => {
  const { user } = useBearsStore(state => state);
  console.log('protected router :', user);

  return user ? <Element /> : <Navigate to='/signin'/>;
}

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<HearderLayout />}>
          <Route path='/' element={<MainPage />} />
          <Route path='/signin' element={<SignInPage />} />
          <Route path='/signup' element={<SignUpPage />} />
          <Route path='/test' element={<TestPage/>}/>
          <Route path='/results' element={<ResultPage/>}/>
          <Route path='/mypage' element={<MyPage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
