import React from 'react';

function Editor() {
    return (
        <div className="lg:w-1/2 p-4 flex flex-col">
            <h2 className="text-xl font-semibold mb-4">Code Editor</h2>
            <textarea className="w-full h-1/3 p-4 border rounded mb-4" placeholder="Write your code here..."></textarea>

            <div className="flex-1 flex flex-col">
                <div className="flex-1 mb-4">
                    <h2 className="text-xl font-semibold mb-4">Input</h2>
                    <textarea className="w-full h-full p-4 border rounded" placeholder="Enter input here..."></textarea>
                </div>
                <div className="flex-1 mb-4">
                    <h2 className="text-xl font-semibold mb-4">Output</h2>
                    <textarea className="w-full h-full p-4 border rounded" readOnly placeholder="Output will be displayed here..."></textarea>
                </div>
            </div>

            <div className="flex justify-end space-x-4">
                <button className="bg-blue-500 text-white px-4 py-2 rounded">Run</button>
                <button className="bg-green-500 text-white px-4 py-2 rounded">Submit</button>
            </div>
        </div>
    );
}

export default Editor
