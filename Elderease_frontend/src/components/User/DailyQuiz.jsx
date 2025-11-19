import { useState, useEffect } from "react";
import axios from "axios";

const DailyQuiz = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [username, setUsername] = useState("");
  const [score, setScore] = useState(null); // State to store score

  useEffect(() => {
    axios
      .get("http://localhost:5000/questions/daily")
      .then((response) => setQuestions(response.data))
      .catch((error) => console.error("Error fetching questions:", error));
  }, []);

  const handleOptionChange = (questionId, selectedOption) => {
    setAnswers({ ...answers, [questionId]: selectedOption });
  };

  const handleSubmit = () => {
    if (!username) {
      alert("Please enter your username before submitting.");
      return;
    }

    const formattedAnswers = Object.entries(answers).map(([questionId, selectedOption]) => ({
      questionId,
      selectedOption
    }));

    const submissionData = { username, answers: formattedAnswers };

    axios
      .post("http://localhost:5000/questions/submit", submissionData)
      .then((response) => {
        alert("Your answers have been submitted!");
        setAnswers({});
        setScore(response.data.score); // Store received score
        document.querySelectorAll("input[type=radio]").forEach((radio) => (radio.checked = false));
      })
      .catch((error) => console.error("Error submitting answers:", error));
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Daily Health Quiz</h2>
      <div className="mb-4">
        <label className="block text-lg font-medium mb-2">Enter your username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 border rounded-lg"
          placeholder="Enter your username"
        />
      </div>
      <div className="space-y-6">
        {questions.length > 0 ? (
          questions.map((q, index) => (
            <div key={q._id} className="bg-white p-6 border rounded-lg shadow-md">
              <p className="font-semibold text-lg mb-3">{`${index + 1}. ${q.question}`}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {q.options.map((option, i) => (
                  <label key={i} className="flex items-center space-x-2 bg-gray-100 p-2 rounded-lg cursor-pointer">
                    <input
                      type="radio"
                      name={`q${q._id}`}
                      value={option}
                      onChange={() => handleOptionChange(q._id, option)}
                      className="form-radio h-5 w-5 text-blue-600"
                    />
                    <span className="text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">Loading questions...</p>
        )}
      </div>
      {questions.length > 0 && (
        <div className="text-center mt-6">
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 text-lg font-semibold shadow-md"
          >
            Submit Answers
          </button>
        </div>
      )}

      {score !== null && (
        <div className="mt-6 text-center">
          <h3 className="text-xl font-semibold text-green-600">Your Score: {score} / {questions.length}</h3>
        </div>
      )}
    </div>
  );
};

export default DailyQuiz;
