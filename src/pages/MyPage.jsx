import React from 'react'
import useUserStore from '../zustand/bearStore'
import { Navigate } from 'react-router-dom';
import { deleteTestResult, getTestResults, updateTestResultVisibility } from '../axios/testResults';
import ProfileUpdate from '../components/ProfileUpdate';
import ResultCard from '../components/ResultCard';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const MyPage = () => {
  const { user } = useUserStore(state => state);
  const token = localStorage.getItem('accessToken');
  if (!token) {
    return <Navigate to='/' />
  }

  // console.log('myPage user :', user)
  const queryClient = useQueryClient();

  const fetchResults = async () => {
    const data = await getTestResults();
    return data
  };

  const { data: results, isPending, isError } = useQuery({
    queryKey: ['myResults'],
    queryFn: fetchResults,
    select: value => value.filter(ele => ele.userId === user.userId)
  })

  const editVisibility = async (result) => {
    // console.log('change visibility :', result);
    await updateTestResultVisibility(result.id, result.visibility);
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
  };

  if (isPending) {
    return (
      <div className="w-full flex flex-col items-center justify-center bg-gray-100 p-8" style={{ minHeight: 'calc(100% - 68px)' }}>
        <h1 className="text-md text-primary-color text-center">
          데이터 조회 중입니다.<br/>시간이 조금 소요될 수 있습니다.
        </h1>
      </div>
    )
  }
  if (isError) {
    return (
      <div className="w-full flex flex-col items-center justify-center bg-gray-100 p-8" style={{ minHeight: 'calc(100% - 68px)' }}>
        <h1 className="text-md text-primary-color text-center">
          데이터 조회 중 오류가 발생했습니다
        </h1>
      </div>
    )
  }

  return (
    <div className="w-full flex flex-col items-center bg-gray-100 p-8" style={{ minHeight: 'calc(100% - 68px)' }}>
      <div className=" max-w-2xl w-full">
        <h1 className="text-3xl font-bold text-primary-color mb-6 text-center">
          마이페이지
        </h1>
        <ProfileUpdate />
        {results?.map(result => (
          <ResultCard result={result} handleUpdate={handleUpdate(result)} handleDelete={handleDelete(result)} key={result.id} />
        ))}
      </div>
    </div>
  )
}

export default MyPage