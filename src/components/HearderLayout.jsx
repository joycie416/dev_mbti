import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import styled from '@emotion/styled'
import useUserStore from '../zustand/bearStore'
import { getUserProfile } from '../axios/auth'

const HearderLayout = () => {
  const { user, signIn, signOut } = useUserStore(state => state);
  const navigate = useNavigate();

  const getTokenInfo = async (token) => {
    const { data } = await getUserProfile(token);
    // console.log(data);
    if (data.id) {
      signIn({ ...data, accessToken: token, userId: data.id });
    } else {
      console.log('Expired token')
      signOut();
      localStorage.removeItem('accessToken');
      alert('토큰이 만료되었습니다. 다시 로그인해주세요.')
      navigate('/signin');
    }
  }

  useEffect(() => {
    if (!user) {
      const token = localStorage.getItem('accessToken');
      // console.log('token :', token);
      if (token) {
        console.log('Getting user info from token')
        getTokenInfo(token);
      }
    }
  }, [])

  // console.log('userData', user?.userId)

  return (
    <>
      <Header>
        <button className='p-4'
          onClick={(e) => {
            e.preventDefault();
            navigate('/');
          }}>
          Dev MBTI
        </button>
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

  background-color: white;

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

const SignInOut = ({ user, signOut }) => {
  // console.log(user?.accessToken);
  const navigate = useNavigate();

  const handleToResult = (e) => {
    e.preventDefault();
    if (user) {
      navigate('/results');
      return;
    } else {
      const result = confirm('로그인이 필요한 서비스입니다.\n로그인하시겠습니까?');
      if (result) {
        navigate('/signin');
        return;
      }
    }
  }

  if (user) {
    return (
      <>
        <li>
          <button className='p-4'
            onClick={handleToResult}>결과 보기</button>
        </li>
        <hr />
        <li>
          <button className='p-4'
            onClick={() => {
              localStorage.removeItem('accessToken');
              signOut();
              navigate('/');
            }}>로그아웃</button>
        </li>
        <hr />
        <li>
          <button className='p-4'
            onClick={(e) => {
              e.preventDefault();
              navigate('/mypage');
            }}>마이페이지</button>
        </li>
      </>
    )
  } else {
    return (
      <>
        <li>
          <button className='p-4'
            onClick={(e) => {
              e.preventDefault();
              navigate('/signin');
            }}>로그인</button>
        </li>
      </>)
  }
}