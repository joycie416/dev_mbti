import React, { useEffect, useState } from 'react'
import useUserStore from '../zustand/bearStore'
import { Navigate } from 'react-router-dom';
import { getTestResults } from '../axios/testResults';
import ProfileUpdate from '../components/ProfileUpdate';
import ResultCard from '../components/ResultCard';

const MyPage = () => {
  const {user} = useUserStore(state => state);

  if (!user) {
    return <Navigate to='/'/>
  }
  console.log('myPage user :', user)
  const [results, setResults] = useState([]);
  const [change, setChange] = useState(false);

  const fetchResults = async () => {
    const data = await getTestResults();
    // console.log(data);
    setResults(data.filter(ele => {
      // console.log(ele);
      return ele.userId === user.userId}));
  };

  useEffect(()=> {
    fetchResults();
  },[user, change])

  return (
    <div>
      <h3>MyPage</h3>
      <ProfileUpdate/>
      {results.map(result => (
        <ResultCard result={result} setChange={setChange} setResults={setResults}/>
      ))}
    </div>
  )
}

export default MyPage