import styled from '@emotion/styled'
import React, { useEffect } from 'react'
import useUserStore from '../zustand/bearStore'
import { deleteTestResult, updateTestResultVisibility } from '../axios/testResults';

const ResultCard = ({ result, handleUpdate, handleDelete }) => {
  const { user } = useUserStore(state => state);

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
            ? <><ButtonVisible onClick={handleUpdate}>{result.visibility ? '나만보기' : '공개하기'}</ButtonVisible>
                <ButtonDelete onClick={handleDelete}>{'삭제'}</ButtonDelete></>
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