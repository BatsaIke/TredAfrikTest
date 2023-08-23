import React from 'react';
import './QuizQuestions.css';

interface QuizQuestionProps {
  question: string;
  options: string[];
  selectedOption: any;
  onOptionSelect: (optionIndex: number) => void;
  onNextQuestion: () => void;
  onPreviousQuestion: () => void;
  isLastQuestion: boolean;
  isFirstQuestion: boolean;
  isQuizCompleted: boolean;
  onShowResults: () => void; // New prop for showing results
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  options,
  selectedOption,
  onOptionSelect,
  onNextQuestion,
  onPreviousQuestion,
  isLastQuestion,
  isFirstQuestion,
 
}) => {
  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onOptionSelect(parseInt(e.target.value, 10));
  };

  return (
    <div className="quiz-question">
      <h3>{question}</h3>
      <ul>
        {options.map((option, index) => (
          <li key={index}>
            <label>
              <input
                type="radio"
                value={index}
                checked={selectedOption === index}
                onChange={handleOptionChange}
              />
              {option}
            </label>
          </li>
        ))}
      </ul>
      <div className="quiz-button-container">
        <button
          onClick={onPreviousQuestion}
          disabled={isFirstQuestion || selectedOption === null}
        >
          Previous
        </button>
        <button
          onClick={onNextQuestion}
          disabled={isLastQuestion || selectedOption === null}
        >
          {isLastQuestion ? 'Finish' : 'Next'}
        </button>
      </div>
    </div>
  );
};

export default QuizQuestion;
