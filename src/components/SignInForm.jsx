import React, { useRef, useState } from 'react'
import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom'
import { login } from '../axios/auth'

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

  const Input = ({ name, type }) => {
    console.log(inputs);
    return (
      <StInput id={name} type={type} placeholder={name} key={name}
        style={{
          width: '100%',
          height: 35,
          padding: 5,
          imeMode: name === 'id' ? 'disabled' : 'auto'
          // marginBottom:20
        }}
        onChange={(e) => {
          inputs[name].current = e.target.value;
        }} />
    )
  }

  return (
    <Form>
      <H3>로그인</H3>
      {inputObj.map(obj => Input(obj))}
      <p>{message}</p>
      <Button onClick={async (e) => {
        e.preventDefault();
        try {
          const { message: msg, success } = await login({ id: inputs.id.current, password: inputs.password.current, nickname: inputs.nickname.current });

          // setMessage(msg);
          if (success) {
            // alert(`로그인에 성공했습니다.`);
            navigate('/mypage')
          } else {
            setMessage(msg);
            // console.log('실패', success)
          }
        } catch (error) {
          setMessage('로그인에 실패했습니다.');
          console.error(error)
        }

      }}>완료</Button>
    </Form>
  )
}

export default SignInForm

const Form = styled.form`
  width: 100%;
  height:100%;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  p {
    width: 100%;
    height: 40px;
    text-align: center;
    vertical-align: middle;
    color: red;
  }
`
const H3 = styled.h3`
  /* margin-bottom: 20px; */
`

const Button = styled.button`
  padding: 10px;
`

const StInput = styled.input`
  width: 100%;
  height: 35px;
  padding: 5px;
  ime-mode: ${(props) => { props.name === 'id' ? 'disabled' : 'auto' }}
`