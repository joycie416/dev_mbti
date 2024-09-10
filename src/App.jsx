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
import useUserStore from './zustand/bearStore'
import { getUserProfile } from './axios/auth'

function App() {
  // const { user, signIn, signOut } = useUserStore(state => state);

  // useEffect(() => {
  //   const response = getUserProfile();
  //   if (response.id) {
  //     signIn({ ...data, accessToken: token, userId: data.id });
  //   } else {
  //     console.log('Expired token')
  //     signOut();
  //     localStorage.removeItem('accessToken');
  //     alert('토큰이 만료되었습니다. 다시 로그인해주세요.')
  //     return <Navigate to='/'/>
  //   }
  // })

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
