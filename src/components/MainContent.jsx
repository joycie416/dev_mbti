import React from 'react'
import styled from '@emotion/styled'
import { Link, useNavigate } from 'react-router-dom'
import useUserStore from '../zustand/bearStore'

const introTexts = [
  {
    title : '성격 유형 검사',
    content : '자신의 성격 유형을 파악하고 삶의 여러 영역에서 어떤 영향을 미치는지 알아보세요.'
  },
  {
    title : '성격 유형 이해',
    content : '다른 사람들이 어떻게 활동하는지 이해하는 데 도움을 줄 수 있습니다.'
  },
  {
    title : '팀 평가',
    content : '팀 내에서 자신과 동료들의 성격을 이해하고 협력할 수 있는 방법을 배워보세요.'
  },
]

const MainContent = () => {
  const {user} = useUserStore(state => state);
  const navigate = useNavigate();

  const handleTest = (e) => {
    e.preventDefault();
    if (user) {
      navigate('/test');
      return;
    } else {
      const result = confirm('로그인이 필요한 서비스입니다.\n로그인하시겠습니까?');
      if(result) {
        navigate('/signin');
        return;
      }
    }
  }

  return (
    <Content>
      <h3>
        Dev MBTI
      </h3>
      <IntroDiv>
        {introTexts.map(text => IntroCard(text)) }
      </IntroDiv>
      <Link to='/test' onClick={handleTest}>내 성격 알아보러 가기</Link>
    </Content>
  )
}

export default MainContent

const Content = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  gap: 50px;
`

const IntroDiv = styled.div`
  width: 100%;

  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 20px;
`

const IntroCard = ({title, content}) => {
  const Card = styled.div`
    display: flex;
    flex-direction: column;
    gap:10px;
  `

  const CardTitle = styled.p`
    font-size: 18px;
    font-weight: 600;
  `
  const CardContent = styled.p`
    text-align: justify;
  `
  return (
    <Card key={title}>
      <CardTitle>{title}</CardTitle>
      <CardContent>{content}</CardContent>
    </Card>
  )
}