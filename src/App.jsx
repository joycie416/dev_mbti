import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import MainPage from './pages/MainPage'
import SignInPage from './pages/SignInPage'
import SignUpPage from './pages/SignUpPage'
import TestPage from './pages/TestPage'
import ResultPage from './pages/ResultPage'
import MyPage from './pages/MyPage'
import HearderLayout from './components/HearderLayout'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<HearderLayout />}>
          <Route path='/' element={<MainPage />} />
          <Route path='/signin' element={<SignInPage />} />
          <Route path='/signup' element={<SignUpPage />} />
          <Route path='/test' element={<TestPage />} />
          <Route path='/results' element={<ResultPage />} />
          <Route path='/mypage' element={<MyPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
