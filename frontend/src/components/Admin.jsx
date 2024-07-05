import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import {useId} from './IdContext'
import {useMaxId} from './maxId'

const Admin = () => {
  const [problems, setProblems] = useState([]);
  const { setId } = useId();
  const { maxId, setMaxId } = useMaxId();

  useEffect(() => {
    const fetchProblems = async () => {
        const response = await axios.get('http://localhost:8000/admin');
        setProblems(response.data);
      };
      fetchProblems();
    }, []);

    problems.sort((a, b) => a.problem_id - b.problem_id);

    if(problems.length > 0){
      const maxid = problems[problems.length - 1].problem_id;
      setMaxId(maxid);
      // console.log("maxid is : " + maxId)
    }

    const handleDelete = async (problem_id) => {
      const isConfirmed = window.confirm("Are you sure you want to delete this problem?");
      if (!isConfirmed) {
        return;
      }

      try {
        const response = await axios.delete(`http://localhost:8000/admin?id=${problem_id}`);
        if (response.status === 200) {
          // console.log(response.data)
          alert(`Problem with ID ${problem_id} deleted successfully.`);
          setProblems(problems.filter(problem => problem.problem_id !== problem_id));
        }
      } catch (error) {
        console.error(`Error deleting problem with ID ${problem_id}:`, error);
      }
    };

  return (
    <div className="w-screen min-h-screen bg-[#ced8ff] m-0 p-0 box-border font-sans">          
      <div className="container mx-auto p-10">
        <div className="flex justify-end mb-4">
          <Link to="/admin/add-new-problem">
            <button className="text-white bg-green-500 rounded px-4 py-2">Add New Problem</button>
          </Link>
        </div>
        <h1 className="text-2xl font-bold mb-4">Problems</h1>
        <table className="min-w-full bg-white border border-gray-300 rounded-lg overflow-hidden">
          <thead>
            <tr>
              <th className="py-2 px-4 border border-gray-300">Problem Id</th>
              <th className="py-2 px-4 border border-gray-300">Name</th>
              <th className="py-2 px-4 border border-gray-300">Update</th>
              <th className="py-2 px-4 border border-gray-300">Delete</th>
            </tr>
          </thead>
          <tbody>
            {problems && problems.map((problem) => (
              <tr key={problem.problem_id} className="border border-gray-300">
                <td className="py-2 px-4 border border-gray-300 text-center">{problem.problem_id}</td>
                <td className="py-2 px-4 border border-gray-300 text-blue-500">
                  <Link 
                    to={`/problem-detail?id=${problem.problem_id}`}
                    onClick={() => setId(problem.problem_id)}
                  >
                    {problem.title}
                  </Link>
                </td>
                <td className="py-2 px-4 border border-gray-300 text-center">
                  <button className="text-white bg-blue-500 rounded px-4 py-1">Update</button>
                </td>
                <td className="py-2 px-4 border border-gray-300 text-center">
                  <button className="text-white bg-red-500 rounded px-4 py-1"
                  onClick={() => handleDelete(problem.problem_id)} >Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

  )
}

export default Admin
