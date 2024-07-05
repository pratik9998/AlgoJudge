import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import ProblemDetail from './ProblemDetail'
import {useId} from './IdContext'

const Problems = () => {
  const [problems, setProblems] = useState([]);
  const { setId } = useId();

  useEffect(() => {
    const fetchProblems = async () => {
      const response = await axios.get('http://localhost:8000/problems');
      setProblems(response.data);
    };
    fetchProblems();
  }, []);

  const getDifficultyclassName = (difficulty) => {
    switch (difficulty) {
      case 'easy':
        return 'text-green-900 bg-green-300';
      case 'medium':
        return 'text-yellow-900 bg-yellow-300';
      case 'hard':
        return 'text-red-900 bg-red-300';
      default:
        return '';
    }
  };

  return (
    <div className="w-screen min-h-screen bg-[#ced8ff] m-0 p-0 box-border font-sans">               <Navbar />
      <div className="container mx-auto p-10">
        <h1 className="text-2xl font-bold mb-4">Problems</h1>
        <table className="min-w-full bg-white border border-gray-300 rounded-lg overflow-hidden">
          <thead>
            <tr>
              <th className="py-2 px-4 border border-gray-300">#</th>
              <th className="py-2 px-4 border border-gray-300">Name</th>
              <th className="py-2 px-4 border border-gray-300">Tags</th>
              <th className="py-2 px-4 border border-gray-300">Difficulty</th>
            </tr>
          </thead>
          <tbody>
            {problems && problems.map((problem, index) => (
              <tr key={problem.problem_id} className="border border-gray-300">
                <td className="py-2 px-4 border border-gray-300">{index + 1}</td>
                <td className="py-2 px-4 border border-gray-300 text-blue-500">

                  <Link 
                  to={`/problem-detail?id=${problem.problem_id}`}
                  onClick={()=>setId(problem.problem_id)}
                  >{problem.title}</Link>
                  
                </td>
                <td className="py-2 px-4 border border-gray-300 text-center">{problem.tags.join(', ')}</td>
                <td className={`py-2 px-4 border border-gray-300 text-center ${getDifficultyclassName(problem.difficultyLevel)}`}>
                  {problem.difficultyLevel}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </div>
  );
};

export default Problems
