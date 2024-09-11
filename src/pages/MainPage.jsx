import React, { useEffect } from 'react'
import styled from '@emotion/styled'
import MainContent from '../components/MainContent'
import { useNavigate } from 'react-router-dom'

const MainPage = () => {
  const navigate = useNavigate();
  return (
    <MainBody>
      <button onClick={(e) => {
        e.preventDefault();
        navigate('/results')
      }}>결과목록으로</button>
      <MainContent/>
    </MainBody>
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

