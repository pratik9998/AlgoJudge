import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Editor from '../compiler/Editor';
import { ResizableBox } from 'react-resizable';
import { useId } from './IdContext';

const ProblemDetail = () => {
    const [problem, setProblem] = useState(null);
    const { id } = useId();

    useEffect(() => {
        const fetchProblemDetail = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/problem-detail?id=${id}`);
                setProblem(response.data.problem);
            } catch (error) {
                console.error('Error fetching problem detail: ', error);
            }
        };

        fetchProblemDetail();
    }, [id]);

    // State for resizable box width
    const [boxWidth, setBoxWidth] = useState(window.innerWidth / 2); // Initial width, adjust as necessary

    // Handler for resizing the resizable box
    const handleResize = (event, { size }) => {
        setBoxWidth(size.width);
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {problem ? (
                <>
                    <ResizableBox
                        className="bg-slate-400 shadow-sm border-r border-gray-300 overflow-y-auto"
                        width={boxWidth}
                        height="100vh"
                        minConstraints={[200, window.innerHeight]}
                        axis="x"
                        onResize={handleResize}
                    >
                        <div className="w-full h-full p-6 overflow-y-auto">
                            <h1 className="text-2xl font-bold mb-4 text-gray-800">{problem.title}</h1>

                            <section className="mb-4 p-4 bg-gray-100 rounded-lg">
                                <h2 className="text-xl font-semibold text-gray-700 mb-2">Description</h2>
                                <p className="text-gray-600">{problem.description}</p>
                            </section>

                            <section className="mb-4 p-4 bg-gray-100 rounded-lg">
                                <h2 className="text-xl font-semibold text-gray-700 mb-2">Constraints</h2>
                                <p className="text-gray-600">{problem.constraints}</p>
                            </section>

                            <section className="mb-4 p-4 bg-gray-100 rounded-lg">
                                <h2 className="text-xl font-semibold text-gray-700 mb-2">Input</h2>
                                <p className="text-gray-600">{problem.inputDescription}</p>
                            </section>

                            <section className="mb-4 p-4 bg-gray-100 rounded-lg">
                                <h2 className="text-xl font-semibold text-gray-700 mb-2">Output</h2>
                                <p className="text-gray-600">{problem.outputDescription}</p>
                            </section>

                            <section className="mb-4 p-4 bg-gray-100 rounded-lg">
                                <h2 className="text-xl font-semibold text-gray-700 mb-2">Sample Testcases</h2>
                                {problem.sampleTestcases && problem.sampleTestcases.map((testcase, index) => (
                                    <div className="mb-4 p-4 bg-gray-300 rounded-lg" key={index}>
                                        <div className="mb-2">
                                            <h3 className="text-lg font-medium text-gray-700">Input {index + 1}</h3>
                                            <pre className="bg-gray-200 p-2 rounded text-gray-700">{testcase.input.replace(/\\n/g, '\n').replace(/\\t/g, '\t')}</pre>
                                        </div>
                                        <div className="mb-2">
                                            <h3 className="text-lg font-medium text-gray-700">Output {index + 1}</h3>
                                            <pre className="bg-gray-200 p-2 rounded text-gray-700">{testcase.output.replace(/\\n/g, '\n').replace(/\\t/g, '\t')}</pre>
                                        </div>
                                        <p className="text-gray-600">Explanation: {testcase.explanation}</p>
                                    </div>
                                ))}
                            </section>
                        </div>
                    </ResizableBox>
                    <Editor problem={problem}/>
                </>
            ) : (
                <div className="flex items-center justify-center w-full h-full">
                    <p className="text-gray-500">Loading problem details...</p>
                </div>
            )}
        </div>
    );
};

export default ProblemDetail;
