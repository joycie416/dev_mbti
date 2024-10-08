import React from 'react'
import styled from '@emotion/styled'
import SignUpForm from '../components/SignUpForm'
import useUserStore from '../zustand/bearStore';

const SignUpPage = () => {
  const { user } = useUserStore(state => state);
  if (user) {
    return <Navigate to='/'/>
  }
  
  return (
    <SignUpBody>
      <SignUpForm />
    </SignUpBody>
  )
}

export default SignUpPage

const SignUpBody = styled.div`
  width: 350px;
  /* height: 330px; */
  height: fit-content;

  padding: 20px;

  border: 1px solid lightgray;
  border-radius: 20px;

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
`
