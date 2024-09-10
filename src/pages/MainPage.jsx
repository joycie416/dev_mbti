import React, { useEffect } from 'react'
import styled from '@emotion/styled'
import MainContent from '../components/MainContent'
import { useNavigate } from 'react-router-dom'

const MainPage = () => {
  const navigate = useNavigate();
  return (
    // <MainBody>
    <div className="main_body max-w-screen-lg w-full flex flex-col p-5 bg-gray-100" style={{height:'calc(100% - 68px)'}}>
      <MainContent/>
    </div>
    // </MainBody>
  )
}

export default MainPage

const MainBody = styled.div`
  max-width: 1280px;
  width: 100%;

  display: flex;
  flex-direction: column;


  margin: 0 auto;
`

