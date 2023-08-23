// import React, { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchQuizQuestionsAsync, selectQuizQuestions } from '../redux/quiz/quizSlice';
// import QuizQuestion from './QuizQuestions'; 
// import '../pages/Quiz.css'

// interface quizQuestion {
//   question: string;
//   id: number;
//   options: string[];
//   correctOption: string;
// }

// const Quiz: React.FC = () => {
//   const dispatch = useDispatch();
//   const quizQuestions = useSelector(selectQuizQuestions);
//   const [currentQuestions, setCurrentQuestions] = useState<quizQuestion[]>([]);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [selectedOptions, setSelectedOptions] = useState(new Array(10).fill(null));
//   const [isQuizCompleted, setIsQuizCompleted] = useState(false);

  
//   useEffect(() => {
//     dispatch(fetchQuizQuestionsAsync() as any);
//   }, [dispatch]);


//   useEffect(() => {
//     if (quizQuestions.length > 0) {
//       const copiedQuestions = [...quizQuestions];
//       const randomQuestions = copiedQuestions
//         .sort(() => 0.5 - Math.random())
//         .slice(0, 10)
//         .map((question, index) => ({
//           ...question,
//           question: `${index + 1}. ${question.question}`,
//         }));
//       setCurrentQuestions(randomQuestions);
//     }
//   }, [quizQuestions]);

//   const handleOptionSelect = (optionIndex: number) => {
//     setSelectedOptions((prevSelectedOptions) => [
//       ...prevSelectedOptions.slice(0, currentQuestionIndex),
//       optionIndex,
//       ...prevSelectedOptions.slice(currentQuestionIndex + 1),
//     ]);
//   };

  
//   const handleNextQuestion = () => {
    
//     if (currentQuestionIndex +2 === currentQuestions.length) {
       
//       setIsQuizCompleted(true); // If it's the last question
//     } else {
//       setCurrentQuestionIndex((prevIndex) => prevIndex + 1); // Move to the next question
//     }
//   };
  
  

//   const handlePreviousQuestion = () => {
//     setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
//   };

//   const handleShowResults = () => {
//     setIsQuizCompleted(true);
//   };

//   const handleResetQuiz = () => {
//     setCurrentQuestionIndex(0);
//     setSelectedOptions(new Array(10).fill(null));
//     setIsQuizCompleted(false);
//   };

//   const currentQuestion = currentQuestions[currentQuestionIndex];

//   const totalScore = isQuizCompleted
//     ? selectedOptions.reduce((total, optionIndex, index) => {
//         const correctOptionIndex = currentQuestions[index]?.correctOption;
//         return total + (optionIndex === correctOptionIndex ? 1 : 0);
//       }, 0)
//     : 0;
//     return (
//         <div className="quiz-container">
//           {quizQuestions.length > 0 ? (
//             currentQuestion ? (
//               <QuizQuestion
//             question={currentQuestion.question}
//             options={currentQuestion.options}
//             selectedOption={selectedOptions[currentQuestionIndex]}
//             onOptionSelect={handleOptionSelect}
//             onNextQuestion={handleNextQuestion}
//             onPreviousQuestion={handlePreviousQuestion}
//             isLastQuestion={currentQuestionIndex === currentQuestions.length - 1}
//             isFirstQuestion={currentQuestionIndex === 0}
//             isQuizCompleted={isQuizCompleted}
//             onShowResults={handleShowResults}
//             />
//             ) : (
//               <div>No more questions!</div>
//             )
//           ) : (
//             <div>Loading...</div>
//           )}
    
//           {isQuizCompleted && (
//             <div>
//               {/* Show quiz completion message and start over button */}
//               <h3 className='question'>Quiz Completed!</h3>
//               <p>Total Score: {totalScore}</p>
//               <button onClick={handleResetQuiz} className='startover'>Start Over</button>
    
//               {/* Show results button */}
//               <button onClick={handleShowResults} className='show-results'>
//                 Show Results
//               </button>
//             </div>
//           )}
//         </div>
//       );
//     };
    
//     export default Quiz;