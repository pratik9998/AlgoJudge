import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import axios from 'axios';
import {useMaxId} from './maxId'

const AddNewProblem = () => {
    const { maxId } = useMaxId();
    // console.log(maxId)
    // const nmaxid = maxId + 1;
    // console.log("nmaxid is "+ nmaxid)

    const { register, handleSubmit, control, reset,  setError,
        formState: { errors, isSubmitting }, } = useForm({
        defaultValues: {
            problem_id: maxId+1,
            title: '',
            description: '',
            constraints: '',
            inputDescription: '',
            outputDescription: '',
            tags: [{ tag: '' }],
            difficultyLevel: 'easy',
            timeLimit: '',
            memoryLimit: '',
            sampleTestcases: [{ input: '', output: '', explanation: '' }],
            testcases: [{ input: '', output: '' }]
        }
    });

    const { fields: sampleTestcaseFields, append: appendSampleTestcase, remove: removeSampleTestcase } = useFieldArray({
        control,
        name: 'sampleTestcases'
    });

    const { fields: tagFields, append: appendTag, remove: removeTag } = useFieldArray({
        control,
        name: 'tags'
    });

    const { fields: testcaseFields, append: appendTestcase, remove: removeTestcase } = useFieldArray({
        control,
        name: 'testcases'
    });

    const onSubmit = async (data) => {
        data.tags = data.tags.map(tag => tag.tag); // Transform tags array to simple string array
        try {
            console.log(data);
            const res = await axios.post('http://localhost:8000/admin/add-new-problem', data); // adjust endpoint accordingly
            if (res.status === 200) {
                alert(res.data.message);
                console.log('Problem added successfully:', res.data);
                // Optionally, redirect or show success message
                reset();
            }
            else{
                setError('myform', { type: 'manual', message: res.message });
                throw new Error(res.message);
            }
        } catch (error) {
            // console.error('Error adding problem: ', error.message);
            setError('myform', {message: error.message})
            alert('Failed to add the problem.');
            // Handle error state
        }
    };

    return (
        <div className="w-screen min-h-screen bg-blue-200 m-0 p-0 box-border font-sans">
            <div className="max-w-4xl mx-auto bg-[#ced8ff] p-8 rounded shadow">
                <h1 className="text-2xl font-bold mb-4">Add New Problem</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Title */}
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                        <input type="text" id="title" {...register('title', { required: true })} className="px-1 mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" required />
                    </div>

                    {/* Description */}
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea id="description" {...register('description', { required: true })} rows="4" className="px-1 mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" required></textarea>
                    </div>

                    {/* Constraints */}
                    <div>
                        <label htmlFor="constraints" className="block text-sm font-medium text-gray-700">Constraints</label>
                        <textarea id="constraints" {...register('constraints', { required: true })} rows="2" className="px-1 mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" required></textarea>
                    </div>

                    {/* Input Description */}
                    <div>
                        <label htmlFor="inputDescription" className="block text-sm font-medium text-gray-700">Input Description</label>
                        <textarea id="inputDescription" {...register('inputDescription', { required: true })} rows="2" className="px-1 mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" required></textarea>
                    </div>

                    {/* Output Description */}
                    <div>
                        <label htmlFor="outputDescription" className="block text-sm font-medium text-gray-700">Output Description</label>
                        <textarea id="outputDescription" {...register('outputDescription', { required: true })} rows="2" className="px-1 mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" required></textarea>
                    </div>

                    {/* Difficulty Level */}
                    <div>
                        <label htmlFor="difficultyLevel" className="block text-sm font-medium text-gray-700">Difficulty Level</label>
                        <select id="difficultyLevel" {...register('difficultyLevel', { required: true })} className="px-1 mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" required>
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                        </select>
                    </div>

                    {/* Time Limit */}
                    <div>
                        <label htmlFor="timeLimit" className="block text-sm font-medium text-gray-700">Time Limit (in seconds)</label>
                        <input type="number" id="timeLimit" {...register('timeLimit', { required: true })} className="px-1 mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" required />
                    </div>

                    {/* Memory Limit */}
                    <div>
                        <label htmlFor="memoryLimit" className="block text-sm font-medium text-gray-700">Memory Limit (in MB)</label>
                        <input type="number" id="memoryLimit" {...register('memoryLimit', { required: true })} className="px-1 mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" required />
                    </div>

                    {/* Tags */}
                    <div>
                        <label htmlFor="tags" className="block text-sm font-medium text-gray-700">Tags</label>
                        <div className="space-y-2">
                            {tagFields.map((field, index) => (
                                <div key={field.id} className="flex items-center">
                                    <textarea {...register(`tags.${index}.tag`)} className="px-1 mt-1 block w-22 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"></textarea>
                                    <button type="button" onClick={() => removeTag(index)} className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Remove</button>
                                </div>
                            ))}
                        </div>
                        <button type="button" onClick={() => appendTag({ tag: '' })} className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Add Tag</button>
                    </div>

                    {/* Sample Testcases */}
                    <div className="mt-4">
                        <button type="button" onClick={() => appendSampleTestcase({ input: '', output: '', explanation: '' })} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Add Sample Testcase</button>
                    </div>

                    {sampleTestcaseFields.map((testcase, index) => (
                        <div key={testcase.id} className="mt-4 space-y-4 flex flex-col">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor={`sampleTestcases[${index}].input`} className="block text-sm font-medium text-gray-700">Input</label>
                                    <textarea id={`sampleTestcases[${index}].input`} {...register(`sampleTestcases.${index}.input`, { required: true })} rows="2" className="px-1 mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"></textarea>
                                </div>
                                <div>
                                    <label htmlFor={`sampleTestcases[${index}].output`} className="block text-sm font-medium text-gray-700">Output</label>
                                    <textarea id={`sampleTestcases[${index}].output`} {...register(`sampleTestcases.${index}.output`, { required: true })} rows="2" className="px-1 mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"></textarea>
                                </div>
                            </div>
                            <div>
                                <label htmlFor={`sampleTestcases[${index}].explanation`} className="block text-sm font-medium text-gray-700">Explanation</label>
                                <textarea id={`sampleTestcases[${index}].explanation`} {...register(`sampleTestcases.${index}.explanation`, { required: true })} rows="2" className="px-1 mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"></textarea>
                            </div>
                            <div className="flex justify-end">
                                <button type="button" onClick={() => removeSampleTestcase(index)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Remove</button>
                            </div>
                        </div>
                    ))}

                    {/* Testcases */}
                    <div className="mt-4">
                        <button type="button" onClick={() => appendTestcase({ input: '', output: '' })} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Add Testcase</button>
                    </div>

                    {testcaseFields.map((testcase, index) => (
                        <div key={testcase.id} className="mt-4 space-y-4 flex flex-col">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor={`testcases[${index}].input`} className="block text-sm font-medium text-gray-700">Input</label>
                                    <textarea id={`testcases[${index}].input`} {...register(`testcases.${index}.input`, { required: true })} rows="2" className="px-1 mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"></textarea>
                                </div>
                                <div>
                                    <label htmlFor={`testcases[${index}].output`} className="block text-sm font-medium text-gray-700">Output</label>
                                    <textarea id={`testcases[${index}].output`} {...register(`testcases.${index}.output`, { required: true })} rows="2" className="px-1 mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"></textarea>
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <button type="button" onClick={() => removeTestcase(index)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Remove</button>
                            </div>
                        </div>
                    ))}

                    {/* Submit Button */}
                    <div className="mt-4">
                        <button type="submit" className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Add Problem</button>
                    </div>

                    {errors.myform && <div className="block text-sm text-red-500 text-center">{errors.myform.message}</div>}
                </form>
            </div>
        </div>
    );
};

export default AddNewProblem;
