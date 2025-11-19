import { useState, useEffect } from "react";
import axios from "axios";

const AdminAnswers = () => {
  const [submittedAnswers, setSubmittedAnswers] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:5000/answers")
      .then((response) => {
        console.log("Fetched answers from backend:", response.data);
        setSubmittedAnswers(response.data);
      })
      .catch((error) => console.error("Error fetching submitted answers:", error));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:5000/correct-answers")
      .then((response) => {
        setCorrectAnswers(response.data);
      })
      .catch((error) => console.error("Error fetching correct answers:", error));
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">User Submitted Answers</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Username</th>
              <th className="border p-2">Question</th>
              <th className="border p-2">Selected Answer</th>
              <th className="border p-2">Correct</th>
            </tr>
          </thead>
          <tbody>
            {submittedAnswers.length > 0 ? (
              submittedAnswers.map((submission, index) => {
                let correctCount = 0;
                return submission.answers.map((answer, i) => {
                  const isCorrect =
                    correctAnswers[answer.questionId?._id] === answer.selectedOption;
                  if (isCorrect) correctCount++;
                  return (
                    <tr key={`${index}-${i}`} className="border">
                      <td className="border p-2">{submission.username}</td>
                      <td className="border p-2">
                        {answer.questionId && answer.questionId.question ? answer.questionId.question : "Question Not Found"}
                      </td>
                      <td className="border p-2">{answer.selectedOption}</td>
                      <td className={`border p-2 ${isCorrect ? "text-green-600" : "text-red-600"}`}>
                        {isCorrect ? "✔" : "✘"}
                      </td>
                    </tr>
                  );
                });
              })
            ) : (
              <tr>
                <td colSpan="4" className="text-center p-4">No answers submitted yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminAnswers;
