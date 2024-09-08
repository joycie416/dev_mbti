import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import styled from '@emotion/styled'

const HearderLayout = () => {
  return (
    <>
      <Header>
        <HomeButton/>
        <ButtonUl>
          <li>
            <Link to='/signin' style={{textDecoration:'none', color:'black'}}>로그인</Link>
          </li>
          <hr />
          <li>
            <Link to='/signup' style={{textDecoration:'none', color:'black'}}>회원가입</Link>
          </li>
          <hr />
          <li>
            <Link to='/mypage' style={{textDecoration:'none', color:'black'}}>마이페이지</Link>
          </li>
        </ButtonUl>
      </Header>
      <Outlet/>
    </>
  )
}

export default HearderLayout


const Header = styled.header`
  /* width: 100%; */

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 10px;

  position: sticky;
  top:0;
  z-index: 3;
`

const ButtonUl = styled.ul`
  display: flex;
  align-items: center;

  hr {
    width: 1px;
    height: 18px;

    background-color: black;
    border: none;

    margin: 0 5px;
  }
`

const HomeButton = () => {
  return (
    <Link to='/' style={{textDecoration:'none', color:'black'}}>
      Dev MBTI
    </Link>
  )
}
