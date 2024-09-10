import React, { useEffect, useState } from 'react'
import useUserStore from '../zustand/bearStore'
import { Navigate } from 'react-router-dom';
import { deleteTestResult, getTestResults, updateTestResultVisibility } from '../axios/testResults';
import ProfileUpdate from '../components/ProfileUpdate';
import ResultCard from '../components/ResultCard';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getUserProfile } from '../axios/auth';

const MyPage = () => {
  const { user, signIn, signOut } = useUserStore(state => state);
  if (!user) {
    return <Navigate to='/'/>
  }
  // const token = localStorage.getItem('accessToken');
  // const getTokenInfo = async (token) => {
  //   const { data } = await getUserProfile(token);
  //   // console.log(data);
  //   return data;
  // }
  // const userData = getTokenInfo(token);
  // console.log('token data :', userData);
  // if (userData.id) {
  //   signIn({ ...data, accessToken: token, userId: data.id });
  // } else {
  //   console.log('Expired token')
  //   signOut();
  //   localStorage.removeItem('accessToken');
  //   // alert('토큰이 만료되었습니다. 다시 로그인해주세요.')
  //   return <Navigate to='/signin'/>
  // }

  // console.log('myPage user :', user)
  const queryClient = useQueryClient();

  const fetchResults = async () => {
    const data = await getTestResults();
    return data
  };

  const { data: results, isPending, isError, refetch: refetchMyResults } = useQuery({
    queryKey: ['myResults'],
    queryFn: fetchResults,
    select: value => value.filter(ele => ele.userId === user.userId)
  })
  console.log('myResults :', results);

  const editVisibility = async (result) => {
    // return (e) => {
    // e.preventDefault();
    console.log('change visibility :', result);
    await updateTestResultVisibility(result.id, result.visibility);
    // setChange(prev => !prev);
    // }
  }

  const { mutate: update } = useMutation({
    mutationFn: editVisibility,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['myResults']
      })
    }
  })

  const handleUpdate = (result) => (e) => {
    e.stopPropagation();
    update(result);
    // refetchMyResults();
  };

  const deleteResult = async (result) => {
    console.log('delete :', result);
    await deleteTestResult(result.id);
  }

  const { mutate: remove } = useMutation({
    mutationFn: deleteResult,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['myResults']
      })
    }
  })

  const handleDelete = (result) => (e) => {
    e.stopPropagation();
    remove(result);
    // refetchResults();
  };

  return (
    <div>
      <h3>MyPage</h3>
      <ProfileUpdate />
      {results?.map(result => (
        <ResultCard result={result} handleUpdate={handleUpdate(result)} handleDelete={handleDelete(result)} key={result.id} />
      ))}
    </div>
  )
}

export default MyPage