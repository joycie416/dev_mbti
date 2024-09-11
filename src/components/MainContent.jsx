import React from 'react'
import styled from '@emotion/styled'
import { Link, useNavigate } from 'react-router-dom'
import useUserStore from '../zustand/bearStore'

const introTexts = [
  {
    title: '성격 유형 검사',
    content: '자신의 성격 유형을 파악하고 삶의 여러 영역에서 어떤 영향을 미치는지 알아보세요.'
  },
  {
    title: '성격 유형 이해',
    content: '다른 사람들이 어떻게 활동하는지 이해하는 데 도움을 줄 수 있습니다.'
  },
  {
    title: '팀 평가',
    content: '팀 내에서 자신과 동료들의 성격을 이해하고 협력할 수 있는 방법을 배워보세요.'
  },
]

const MainContent = () => {
  const { user } = useUserStore(state => state);
  const navigate = useNavigate();

  const handleTest = (e) => {
    e.preventDefault();
    if (user) {
      navigate('/test');
      return;
    } else {
      const result = confirm('로그인이 필요한 서비스입니다.\n로그인하시겠습니까?');
      if (result) {
        navigate('/signin');
        return;
      }
    }
  }

  return (
    <div className="main_content w-full flex flex-col items-center gap-y-5">
      <h3>
        Dev MBTI
      </h3>
      <IntroDiv>
        {introTexts.map(text => IntroCard(text))}
      </IntroDiv>
      <button className='bg-blue-500 p-4 rounded-lg text-white'
        onClick={handleTest}>내 성격 알아보러 가기</button>
    </div>
  )
}

export default MainContent

const IntroDiv = styled.div`
  width: 100%;

  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 20px;
`

const IntroCard = ({ title, content }) => {
  return (
    <div className='card bg-white flex flex-col items-center gap-y-5 p-3 rounded-lg' key={title}>
      <p className='card_ttle font-bold text-lg'>{title}</p>
      <p className='card_content leading-5'>{content}</p>
    </div>
  )
}