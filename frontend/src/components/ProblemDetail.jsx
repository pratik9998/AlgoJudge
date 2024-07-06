import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ResizableBox } from 'react-resizable';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-c_cpp';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/theme-xcode';
import { useId } from './IdContext';
import 'react-resizable/css/styles.css';

const ProblemDetail = () => {
    const [problem, setProblem] = useState(null);
    const [language, setLanguage] = useState('c_cpp'); // Default language
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

    // State for code editor content
    const [editorContent, setEditorContent] = useState('');

    useEffect(() => {
        // Set initial editor content when language or problem changes
        if (language) {
            setEditorContent(getDefaultCodeSnippet(language));
        }
    }, [language, problem]);

    // Handler for resizing the resizable box
    const handleResize = (event, { size }) => {
        setBoxWidth(size.width);
    };

    // Handler for language change in the code editor
    const handleLanguageChange = (selectedLanguage) => {
        setLanguage(selectedLanguage);
    };

    // Default code snippet based on selected language
    const getDefaultCodeSnippet = (lang) => {
        switch (lang) {
            case 'c_cpp':
                return `#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    cout << "Hello World\\n";\n    return 0;\n}`;
            case 'java':
                return `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello World");\n    }\n}`;
            case 'python':
                return `print("Hello World")`;
            default:
                return '';
        }
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
                    <div className="flex-1 p-6 bg-slate-400 shadow-sm flex flex-col overflow-hidden overflow-y-auto">
                        <div className="flex flex-col h-full">
                            <h2 className="text-2xl font-bold mb-4 text-gray-800">Code Editor</h2>
                            <div className="flex items-center mb-4">
                                <label className="mr-2">Select Language:</label>
                                <select
                                    value={language}
                                    onChange={(e) => handleLanguageChange(e.target.value)}
                                    className="px-2 py-1 border border-gray-300 rounded bg-gray-100 text-gray-700"
                                >
                                    <option value="c_cpp">C++</option>
                                    <option value="java">Java</option>
                                    <option value="python">Python</option>
                                </select>
                            </div>
                            <AceEditor
                                mode={language}
                                theme="xcode"
                                className="flex-1"
                                fontSize={14}
                                showPrintMargin={true}
                                showGutter={true}
                                highlightActiveLine={true}
                                value={editorContent}
                                onChange={(newValue) => setEditorContent(newValue)}
                                setOptions={{
                                    useWorker: false,
                                    showLineNumbers: true,
                                    tabSize: 4,
                                }}
                                style={{ minHeight: '250px', maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}
                            />
                        </div>

                        <div className="mt-4">
                            <div className="mb-4 p-4 bg-gray-100 rounded-lg">
                                <h2 className="text-xl font-semibold mb-4 text-gray-700">Input</h2>
                                <textarea className="w-full h-20 p-4 border rounded bg-gray-200 text-gray-700" placeholder="Enter input here..."></textarea>
                            </div>
                            <div className="mb-4 p-4 bg-gray-100 rounded-lg">
                                <h2 className="text-xl font-semibold mb-4 text-gray-700">Output</h2>
                                <textarea className="w-full h-20 p-4 border rounded bg-gray-200 text-gray-700" readOnly placeholder="Output will be displayed here..."></textarea>
                            </div>
                        </div>

                        <div className="fixed bg-black right-5 bottom-0.5 flex flex-row justify-end space-x-4 p-3">
                            <button className="bg-blue-500 text-white px-4 py-2 rounded">Run</button>
                            <button className="bg-green-500 text-white px-4 py-2 rounded">Submit</button>
                        </div>
                    </div>
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
