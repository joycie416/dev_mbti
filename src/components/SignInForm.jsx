import React, { useRef, useState } from 'react'
import styled from '@emotion/styled'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../axios/auth'
import useUserStore from '../zustand/bearStore'

const inputObj = [
  {
    name: 'id',
    type: 'text'
  },
  {
    name: 'password',
    type: 'password'
  },
]

const SignInForm = () => {
  const inputs = { id: useRef(''), password: useRef('') };
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const {signIn} = useUserStore(state => state);

  const Input = ({ name, type }) => {
    // console.log(inputs);
    return (
      <StInput id={name} type={type} placeholder={name} key={name}
        onChange={(e) => {
          inputs[name].current = e.target.value;
        }} />
    )
  }

  return (
    <Form>
      <H3>로그인</H3>
      {inputObj.map(obj => Input(obj))}
      {message ? <p className='warning'>{message}</p> : null}
      <p className='notice'>계정이 없으신가요? <span><Link to='/signup'>회원가입</Link></span></p>
      <Button onClick={async (e) => {
        e.preventDefault();
        // try {
          const { data } = await login({ id: inputs.id.current, password: inputs.password.current });

          // setMessage(msg);
          if (data.success) {
            // alert(`로그인에 성공했습니다.`);
            signIn(data);
            localStorage.setItem('accessToken', data.accessToken);
            navigate('/mypage');
          } else {
            setMessage(data.message);
            // console.log('실패', success)
          }
        // } catch (error) {
        //   setMessage('로그인에 실패했습니다.');
        //   console.error(error)
        // }

      }}>로그인</Button>
    </Form>
  )
}

export default SignInForm

const Form = styled.form`
  width: 100%;
  height:100%;

  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
  align-items: center;
  gap: 30px;

  .warning {
    width: 100%;
    /* height: 13px; */
    font-size: 13px;
    text-align: center;
    vertical-align: middle;
    color: red;
  }

  .notice {
    width: 100%;
    font-size: 13px;
    text-align: left;
  }

  a {
    text-decoration: none;
    color: skyblue;
  }
`
const H3 = styled.h3`
  /* margin-bottom: 20px; */
`

const Button = styled.button`
  padding: 5px 10px;
  border: none;
  border-radius: 5px;

  cursor: pointer;

  &:hover {
    background-color: lightgray;
  }
`

const StInput = styled.input`
  width: 100%;
  height: 35px;
  padding: 5px;
  border: 1px solid black;
  border-radius: 3px;
`