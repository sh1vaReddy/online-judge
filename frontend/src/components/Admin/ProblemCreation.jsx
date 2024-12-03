import { useState } from "react";
import { useCreateProblemMutation } from "../../redux/Problemapi";


const ProblemCreation = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [inputFormat, setInputFormat] = useState("");
  const [outputFormat, setOutputFormat] = useState("");
  const [constraints, setConstraints] = useState("");
  const [examples, setExamples] = useState([{ input: "", output: "" }]);
  const [tags, setTags] = useState([]);
  const [difficulty, setDifficulty] = useState("Easy");


  const [createProblem, { isLoading, isSuccess, isError }] = useCreateProblemMutation();


  const addExample = () => {
    setExamples([...examples, { input: "", output: "" }]);
  };


  const deleteExample = () =>
  {
    setExamples(examples.filter((example, index) => index !== examples.length - 1));
  }



  const saveproblem = async () =>
  {
    const problemData = {
      title,
      description,
      inputFormat,
      outputFormat,
      constraints,
      examples,
      tags,
      difficulty,
    };

    try {
      const response = await createProblem(problemData).unwrap();
      console.log("Problem created successfully:", response);
    } catch (error) {
      console.error("Error creating problem:", error);
    }
  }


  const updateExample = (index, key, value) => {
    const updatedExamples = [...examples];
    updatedExamples[index][key] = value;
    setExamples(updatedExamples);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6 text-gray-900 dark:text-white">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6">Create a New Problem</h1>

        {/* Problem Title */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Problem Title</label>
          <input
            type="text"
            className="w-full mt-1 p-2 border rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter the problem title"
          />
        </div>

        {/* Problem Description */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Description</label>
          <textarea
            className="w-full mt-1 p-2 border rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the problem statement in detail"
          ></textarea>
        </div>

        {/* Input Format */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Input Format</label>
          <textarea
            className="w-full mt-1 p-2 border rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none"
            rows="3"
            value={inputFormat}
            onChange={(e) => setInputFormat(e.target.value)}
            placeholder="Describe the input format"
          ></textarea>
        </div>

        {/* Output Format */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Output Format</label>
          <textarea
            className="w-full mt-1 p-2 border rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none"
            rows="3"
            value={outputFormat}
            onChange={(e) => setOutputFormat(e.target.value)}
            placeholder="Describe the output format"
          ></textarea>
        </div>

        {/* Constraints */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Constraints</label>
          <textarea
            className="w-full mt-1 p-2 border rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none"
            rows="3"
            value={constraints}
            onChange={(e) => setConstraints(e.target.value)}
            placeholder="Specify the problem constraints"
          ></textarea>
        </div>

        {/* Examples */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Examples</label>
          {examples.map((example, index) => (
            <div key={index} className="mb-2">
              <label className="block text-xs font-medium">
                Example {index + 1}
              </label>
              <input
                type="text"
                className="w-full mt-1 mb-2 p-2 border rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none"
                value={example.input}
                onChange={(e) => updateExample(index, "input", e.target.value)}
                placeholder="Example input"
              />
              <input
                type="text"
                className="w-full mt-1 p-2 border rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none"
                value={example.output}
                onChange={(e) => updateExample(index, "output", e.target.value)}
                placeholder="Example output"
              />
            </div>
          ))}
          <div className="">
            <button
              className="mt-2 mr-2 px-4 py-2 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-700 rounded-lg text-sm"
              onClick={addExample}
            >
              Add Example
            </button>
            <button
              className="mt-2  px-4 py-2 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-700 rounded-lg text-sm"
              onClick={deleteExample}
            >
              Remove Example
            </button>
          </div>
        </div>

        {/* Tags */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Tags</label>
          <input
            type="text"
            className="w-full mt-1 p-2 border rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none"
            value={tags.join(", ")}
            onChange={(e) => setTags(e.target.value.split(","))}
            placeholder="Enter tags separated by commas"
          />
        </div>

        {/* Difficulty */}
        <div className="mb-6">
          <label className="block text-sm font-medium">Difficulty</label>
          <select
            className="w-full mt-1 p-2 border rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>

        {/* Submit Button */}
        <button className="w-full px-4 py-2 bg-black text-white dark:bg-white dark:text-black rounded-lg hover:opacity-90"
        onClick={saveproblem}
        >
          Save Problem
        </button>
      </div>
    </div>
  );
};

export default ProblemCreation;
