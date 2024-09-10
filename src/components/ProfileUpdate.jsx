import styled from '@emotion/styled';
import React, { useRef } from 'react'
import { updateProfile } from '../axios/auth';
import useUserStore from '../zustand/bearStore';

const ProfileUpdate = () => {
  const {user, signIn} = useUserStore(state => state)
  const nickname = useRef(user.nickname);


  return (
    <form className='update_form w-80 h-40 flex flex-col justify-between items-center p-5 mb-10 mx-auto bg-white rounded-xl shadow-md'>
      <label>닉네임 변경</label>
      <Input defaultValue={nickname.current} placeholder='nickname' 
      onChange={(e) => {
        nickname.current = e.target.value;
      }}/>
      <Button onClick={(e) => {
        e.preventDefault();
        updateProfile({nickname: nickname.current}, user.accessToken);
        alert('닉네임이 변경되었습니다.');
        signIn({...user, nickname:nickname.current});
      }}>변경</Button>
    </form>
  )
}

export default ProfileUpdate

const UpdateForm = styled.form`
  width: 500px;
  height: 100px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin: auto;
`

const Input = styled.input`
  border: 1px solid black;
  border-radius: 3px;
  padding: 5px;
`

const Button = styled.button`
  padding: 5px 10px;
  background-color: #e8e8e8;

  &:hover {

  background-color: lightgray;
  }
`