const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

//Here is the Sample Testcase schema
const sampleTestcaseSchema = new Schema({
    input: { type: String, required: true },
    output: { type: String, required: true },
    explanation: { type: String }
});

//Here is the Testcase schema (for judging)
const testcaseSchema = new Schema({
    input: { type: String, required: true },
    output: { type: String, required: true }
});

//the Problem schema
const problemSchema = new Schema({
    problem_id: { type: Number, unique: true, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    constraints: { type: String, required: true },
    inputDescription: { type: String, required: true },
    outputDescription: { type: String, required: true },
    tags: { type: [String] },
    difficultyLevel: { type: String, enum: ['easy', 'medium', 'hard'], required: true },
    timeLimit: { type: Number, required: true },
    memoryLimit: { type: Number, required: true },
    sampleTestcases: [sampleTestcaseSchema],
    testcases: [testcaseSchema] // For judging
});

problemSchema.plugin(AutoIncrement, { inc_field: 'problem_id' });

module.exports = mongoose.model('Problem', problemSchema);
