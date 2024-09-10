import styled from '@emotion/styled'
import React, { useEffect } from 'react'
import useUserStore from '../zustand/bearStore'
import { deleteTestResult, updateTestResultVisibility } from '../axios/testResults';

const ResultCard = ({ result, handleUpdate, handleDelete }) => {
  const { user } = useUserStore(state => state);

  return (
    <div className='result_card w-full flex flex-col mb-10 p-5 bg-white rounded-xl shadow-md'>
      <div className='result_card_top w-full flex justify-between items-center'>
        <p className='font-bold text-lg'>{result.nickname}</p>
        <p>{result.date.slice(0, 10)}</p>
      </div>
      <hr className='h-0.5 w-full my-2 bg-gray-100 border-0'/>
      <p className='mb-2 font-bold text-md'>{result.result}</p>
      <p className='leading-5'>{result.description}</p>
      <hr className='h-0.5 w-full my-3 bg-gray-100 border-0'/>
      <div className='result_card_bottom w-full h-8 flex justify-end'>
        {
          result.userId === user?.userId
            ? <><button className='px-3 py-2 mr-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600'
            onClick={handleUpdate}>{result.visibility ? '나만보기' : '공개하기'}</button>
                <button className='px-3 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600'
                 onClick={handleDelete}>{'삭제'}</button></>
            : null
        }
      </div>
    </div>
  )
}

export default ResultCard

const Card = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;

  margin-bottom: 20px;
`

const Top = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`

const Bottom = styled.div`
  width: 100%;
  height: 50px;
`

const ButtonVisible = styled.button`
  background-color: skyblue;
`

const ButtonDelete = styled.button`
  background-color: #ff3838;
`