import React, { useCallback } from 'react'
import { deleteTestResult, getTestResults, updateTestResultVisibility } from '../axios/testResults';
import ResultCard from '../components/ResultCard';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Navigate } from 'react-router-dom';

const ResultPage = () => {
  const token = localStorage.getItem('accessToken');
  if (!token) {
    return <Navigate to='/' />
  }

  const queryClient = useQueryClient();

  const fetchResults = async () => {
    const data = await getTestResults();
    return data;
  };

  const { data: results, isPending, isError } = useQuery({
    queryKey: ['results'],
    queryFn: fetchResults,
    select: useCallback(value => value.filter(ele => ele.visibility))
  })

  const editVisibility = async (result) => {
    console.log('change visibility :', result);
    await updateTestResultVisibility(result.id, result.visibility);
  }

  const { mutate: update } = useMutation({
    mutationFn: editVisibility,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['results']
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
        queryKey: ['results']
      })
    }
  })

  const handleDelete = (result) => (e) => {
    e.stopPropagation();
    remove(result);
    // refetchResults();
  };

  if (isPending) {
    return (
      <div className="w-full flex flex-col items-center justify-center bg-gray-100 p-8" style={{ minHeight: 'calc(100% - 68px)' }}>
        <h1 className="text-md text-primary-color text-center">
          데이터 조회 중입니다.<br />시간이 조금 소요될 수 있습니다.
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
    <div className="w-full flex flex-col items-center justify-center bg-gray-100 p-8" style={{ minHeight: 'calc(100% - 68px)' }}>
      <div className="max-w-2xl w-full">
        <h1 className="text-3xl font-bold text-primary-color mb-6 text-center">
          모든 테스트 결과
        </h1>
        {results?.map(result => (
          <ResultCard result={result} handleUpdate={handleUpdate(result)} handleDelete={handleDelete(result)} key={result.id} />
        ))}
      </div>
    </div>
  )
}

export default ResultPage