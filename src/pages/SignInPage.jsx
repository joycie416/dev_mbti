import React from 'react'
import styled from '@emotion/styled'
import SignInForm from '../components/SignInForm'

const SignInPage = () => {
  return (
    <SignInBody>
      <SignInForm/>
    </SignInBody>
  )
}

export default SignInPage

const SignInBody = styled.div`
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