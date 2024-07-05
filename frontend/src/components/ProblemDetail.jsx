import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Editor from './Editor';
import {useId} from './IdContext'

const ProblemDetail = () => {
    
    const [problem, setProblem] = useState(null);
    const { id } = useId();

    // useEffect(() => {
        
    // }, []);

    const fetchProblemDetail = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/problem-detail?id=${id}`);
            //console.log(response.data.problem); // Log the fetched data to console
            setProblem(response.data.problem); // Update state with fetched problem data
        } catch (error) {
            console.error('Error fetching problem detail: ', error);
        }
    };

    fetchProblemDetail();

    return (
        <div className="flex flex-col lg:flex-row h-full">
            {problem ? 
              <div className="lg:w-1/2 p-4 border-r border-gray-200 overflow-y-auto"> 
                <h1 className="text-2xl font-bold mb-4">{problem.title}</h1>
                <section className="mb-4">
                    <h2 className="text-xl font-semibold">Problem Description</h2>
                    <p>{problem.description}</p>
                </section>
                <section className="mb-4">
                    <h2 className="text-xl font-semibold">Constraints</h2>
                    <p>{problem.constraints}</p>
                </section>
                <section className="mb-4">
                    <h2 className="text-xl font-semibold">Input</h2>
                    <p>{problem.inputDescription}</p>
                </section>
                <section className="mb-4">
                    <h2 className="text-xl font-semibold">Output</h2>
                    <p>{problem.outputDescription}</p>
                </section>
                <section className="mb-4">
                    <h2 className="text-xl font-semibold">Sample Testcases</h2>
                    {problem.sampleTestcases && problem.sampleTestcases.map((testcase, index) => (
                        <div className="testcase mb-2" key={index}>
                            <div className="sample-container">
                                <div className="sample-input">
                                    <h3 className="text-lg font-medium">Sample Input {index + 1}</h3>
                                    <pre>{testcase.input.replace(/\\n/g, '\n').replace(/\\t/g, '\t')}</pre>
                                </div>
                                <div className="sample-output">
                                    <h3 className="text-lg font-medium">Sample Output {index + 1}</h3>
                                    <pre>{testcase.output.replace(/\\n/g, '\n').replace(/\\t/g, '\t')}</pre>
                                </div>
                            </div>
                            <p>Explanation: {testcase.explanation}</p>
                        </div>
                    ))}
                </section>
            </div> : ""}
            
            <Editor />
        </div>
    );
}

export default ProblemDetail;
