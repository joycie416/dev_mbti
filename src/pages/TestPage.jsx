import React from 'react'
import TestForm from '../components/TestForm'
import styled from '@emotion/styled'
import useUserStore from '../zustand/bearStore'
import { Navigate, useNavigate } from 'react-router-dom'
import { calculateMBTI } from '../utils/mbtiCalculator'
import { createTestResult } from '../axios/testResults'

const TestPage = () => {
  const { user } = useUserStore(state => state);
  const token = localStorage.getItem('accessToken');
  if (!token) {
    return <Navigate to='/' />
  }
  
  const navigate = useNavigate();

  const handleTestSubmit = async (answers) => {
    const result = calculateMBTI(answers);
    const resultData = {
      userId: user.userId,
      nickname: user.nickname,
      result: result[0],
      description: result[1],
      answers,
      date: new Date().toISOString(),
      visibility: true,
    };
    await createTestResult(resultData);
    navigate("/results");
  };

  return (
    <div className="test_body max-w-md mx-auto pb-10">
      <h1 className="text-2xl font-bold mb-4">MBTI 테스트</h1>
      <TestForm onSubmit={handleTestSubmit} />
    </div>
  );
}

export default TestPage