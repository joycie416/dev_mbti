import React from 'react'
import styled from '@emotion/styled'

const MainPage = () => {
  return (
    <MainBody>
        <h3>
          Dev MBTI
        </h3>
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
