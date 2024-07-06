import React, { useState, useEffect } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-c_cpp';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/theme-xcode';
import 'react-resizable/css/styles.css';
import axios from 'axios';

const Editor = ({problem}) => {
    const [language, setLanguage] = useState('c_cpp'); // Default language
    const [editorContent, setEditorContent] = useState('');
    const [inputData, setInputData] = useState('');
    const [outputData, setOutputData] = useState('');

    useEffect(() => {
        // Set initial editor content when language changes
        if (language) {
            setEditorContent(getDefaultCodeSnippet(language));
        }
    }, [language]);

    const handleLanguageChange = (selectedLanguage) => {
        setLanguage(selectedLanguage);
    };

    // Default code snippet based on selected language
    const getDefaultCodeSnippet = (lang) => {
        switch (lang) {
            case 'c_cpp':
                return `#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n\n    cout << "Hello World\\n";\n\n    return 0;\n}`;
            case 'java':
                return `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello World");\n    }\n}`;
            case 'python':
                return `print("Hello World")`;
            default:
                return '';
        }
    };

    const handleRunClick = async () => {
        try {
            const response = await axios.post('http://localhost:8000/run', {
                language: language,
                code: editorContent,
                input: inputData,
                timeLimit: problem.timeLimit,
                memoryLimit: problem.memoryLimit
            });

            const result = response.data;
            setOutputData(result.output || result.error || 'Error: No output or error message received');
        } catch (error) {
            setOutputData(`Error: ${error.message}`);
        }
    };

    return (
        <>
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
                        className="flex-1 rounded-lg"
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
                        style={{ minHeight: '250px',width:screen ,maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}
                    />
                </div>

                <div className="mt-4">
                    <div className="mb-4 p-4 bg-gray-100 rounded-lg">
                        <h2 className="text-xl font-semibold mb-4 text-gray-700">Input</h2>
                        <textarea
                            className="w-full h-20 p-4 border rounded bg-gray-200 text-gray-700"
                            placeholder="Enter input here..."
                            value={inputData}
                            onChange={(e) => setInputData(e.target.value)}
                        ></textarea>
                    </div>
                    {outputData && <div className="mb-4 p-4 bg-gray-100 rounded-lg">
                        <h2 className="text-xl font-semibold mb-4 text-gray-700">Output</h2>
                        <textarea
                            className="w-full h-20 p-4 border rounded bg-gray-200 text-gray-700"
                            readOnly
                            placeholder="Output will be displayed here..."
                            value={outputData}
                        ></textarea>
                    </div>}
                </div>

                <div className="fixed bg-black right-5 bottom-0.5 flex flex-row justify-end space-x-4 p-3">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleRunClick}>Run</button>
                    <button className="bg-green-500 text-white px-4 py-2 rounded">Submit</button>
                </div>
            </div>
        </>
    );
};

export default Editor;
