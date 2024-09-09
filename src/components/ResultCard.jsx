import styled from '@emotion/styled'
import React, { useEffect } from 'react'
import useUserStore from '../zustand/bearStore'
import { deleteTestResult, updateTestResultVisibility } from '../axios/testResults';

const ResultCard = ({result, setChange, setResults}) => {
  const {user} = useUserStore(state => state);

  const editVisibility = (e) => {
    e.preventDefault();
    console.log('change visibility :', result);
    updateTestResultVisibility(result.id, result.visibility);
    setChange(prev => !prev);
  }

  const deleteResult = (e) => {
    e.preventDefault();
    console.log('delete result :', result);
    deleteTestResult(result.id);
    setResults(prev => prev.filter(ele => ele.id !== result.id));
  }  

  return (
    <Card>
      <Top>
        <p>{result.nickname}</p>
        <p>{result.date.slice(0, 10)}</p>
      </Top>
      <p>{result.result}</p>
      <Bottom>
        {
          result.userId === user?.userId
            ? <><ButtonVisible onClick={editVisibility}>{result.visibility ? '나만보기' : '공개하기'}</ButtonVisible> <ButtonDelete onClick={deleteResult}>{'삭제'}</ButtonDelete></>
            : null
        }
      </Bottom>
    </Card>
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