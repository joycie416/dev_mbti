import React, { useRef, useState } from 'react'
import styled from '@emotion/styled'
import { Link, useNavigate } from 'react-router-dom'
import { register } from '../axios/auth'

const inputObj = [
  {
    name: 'id',
    type: 'text'
  },
  {
    name: 'password',
    type: 'password'
  },
  {
    name: 'nickname',
    type: 'text'
  },
]

const SignUpForm = () => {
  const inputs = { id: useRef(''), password: useRef(''), nickname: useRef('') };
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

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
      <H3>회원가입</H3>
      {inputObj.map(obj => Input(obj))}
      {message ? <p className='warning'>{message}</p> : null}
      <p className='notice'>이미 계정이 있으신가요? <span><Link to='/signin'>로그인</Link></span></p>
      <Button onClick={async (e) => {
        e.preventDefault();
        // try {
          // const { message: msg, success } = await register({ id: inputs.id.current, password: inputs.password.current, nickname: inputs.nickname.current });
          const { data:{message, success} } = await register({ id: inputs.id.current, password: inputs.password.current, nickname: inputs.nickname.current });

          // setMessage(msg);
          if (success) {
            alert(`회원가입에 성공했습니다.`);
            navigate('/signin')
          } else {
            setMessage(message);
            // console.log('실패', success)
          }
        // } catch (error) {
        //   setMessage(message);
        //   // console.error(error)
        // }

      }}>완료</Button>
    </Form>
  )
}

export default SignUpForm

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