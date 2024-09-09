import React, { useEffect, useState } from 'react'
import { getTestResults } from '../axios/testResults';
import ResultCard from '../components/ResultCard';

const ResultPage = () => {
  const [results, setResults] = useState([]);
  const [change, setChange] = useState(false);

  const fetchResults = async () => {
    const data = await getTestResults();
    setResults(data.filter(ele => ele.visibility));
  };

  useEffect(() => {
    fetchResults();
  }, [change]);

  const handleUpdate = () => {
    fetchResults();
  };

  const handleDelete = () => {
    fetchResults();
  };
  return (
    <div className="w-full flex flex-col items-center justify-center bg-white shadow-lg rounded-lg p-8">
      <div className="bg-white max-w-2xl w-full">
        <h1 className="text-3xl font-bold text-primary-color mb-6 text-center">
          모든 테스트 결과
        </h1>
        {results.map(result => (
          <ResultCard result={result} setChange={setChange} setResults={setResults} key={result.id}/>
        ))}
      </div>
    </div>
  )
}

export default ResultPage