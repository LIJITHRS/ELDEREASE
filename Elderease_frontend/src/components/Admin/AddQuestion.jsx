import { useState } from "react";
import axios from "axios";

const AddQuestion = () => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState("");

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question || options.some(opt => opt === "") || !correctAnswer) {
      alert("Please fill all fields");
      return;
    }

    try {
      await axios.post("http://localhost:5000/questions", {
        question,
        options,
        correctAnswer,
      });
      alert("Question added successfully");
      setQuestion("");
      setOptions(["", "", "", ""]);
      setCorrectAnswer("");
    } catch (error) {
      console.error("Error adding question", error);
      alert("Failed to add question");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Add Health Question</h2>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2">Question:</label>
        <input
          type="text"
          className="w-full p-2 border rounded mb-4"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          required
        />
        {options.map((option, index) => (
          <div key={index} className="mb-2">
            <label>Option {index + 1}:</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              required
            />
          </div>
        ))}
        <label className="block mt-4">Correct Answer:</label>
        <select
          className="w-full p-2 border rounded"
          value={correctAnswer}
          onChange={(e) => setCorrectAnswer(e.target.value)}
          required
        >
          <option value="">Select Correct Answer</option>
          {options.map((option, index) => (
            <option key={index} value={option}>{option}</option>
          ))}
        </select>
        <button type="submit" className="mt-4 w-full bg-blue-500 text-white p-2 rounded">
          Add Question
        </button>
      </form>
    </div>
  );
};

export default AddQuestion;
