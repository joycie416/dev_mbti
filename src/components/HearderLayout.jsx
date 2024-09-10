import React, { useEffect } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import styled from '@emotion/styled'
import useUserStore from '../zustand/bearStore'
import { getUserProfile } from '../axios/auth'

const HearderLayout = () => {
  const { user, signIn, signOut } = useUserStore(state => state);
  const navigate = useNavigate();

  useEffect(() => {
    const getTokenInfo = async (token) => {
      const { data } = await getUserProfile(token);
      // console.log(data);
      if (data.id) {
        await signIn({ ...data, accessToken: token, userId: data.id });
      } else {
        console.log('Expired token')
        signOut();
        localStorage.removeItem('accessToken');
        alert('토큰이 만료되었습니다. 다시 로그인해주세요.')
        // navigate('/');
      }

    }


    if (!user) {
      const token = localStorage.getItem('accessToken');
      // console.log('token :', token);
      if (token) {
        console.log('Getting user info from token')
        getTokenInfo(token);
      }
    }
  }, [])

  console.log('userData', user)

  return (
    <>
      <Header>
        <HomeButton />
        <ButtonUl>
          <SignInOut user={user} signOut={signOut} />
        </ButtonUl>
      </Header>
      <Outlet />
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
    <Link to='/' style={{ textDecoration: 'none', color: 'black' }}>
      Dev MBTI
    </Link>
  )
}

const SignInOut = ({ user, signOut }) => {
  // console.log(user?.accessToken);
  if (user) {
    return (
      <>
        <li>
          <Link to='/' style={{ textDecoration: 'none', color: 'black' }}
            onClick={() => {
              localStorage.removeItem('accessToken');
              signOut();
            }}>로그아웃</Link>
        </li>
        <hr />
        <li>
          <Link to='/mypage' style={{ textDecoration: 'none', color: 'black' }}>마이페이지</Link>
        </li>
      </>
    )
  } else {
    return (
      <>
        <li>
          <Link to='/signin' style={{ textDecoration: 'none', color: 'black' }}>로그인</Link>
        </li>
      </>)
  }
}