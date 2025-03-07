// context/QuizContext.js
import React, { createContext, useContext, useState, useCallback } from "react";
import { fetchQuizzes, createQuiz, updateQuiz } from "../services/quizService";

const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [quizList, setQuizList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchQuizList = useCallback(async () => {
    setIsLoading(true);
    try {
      const quizzes = await fetchQuizzes();
      setQuizList(quizzes);
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addQuiz = async (quiz) => {
    try {
      const newQuiz = await createQuiz(quiz);
      setQuizList((prev) => [...prev, newQuiz]);
    } catch (error) {
      console.error("Error creating quiz:", error);
    }
  };
  const editQuiz = useCallback(
    async (quizId, updatedQuizData) => {
      setIsLoading(true);
      try {
        // Find the INDEX of the quiz to update.
        const quizIndex = quizList.findIndex((quiz) => quiz._id === quizId);

        if (quizIndex === -1) {
          console.error(`Quiz with id ${quizId} not found.`);
          return; // Or throw an error, depending on your error handling.
        }

        // Create a NEW array with the updated quiz at the correct index.
        setQuizList((prevQuizList) => {
          const newQuizList = [...prevQuizList]; //  Clone
          newQuizList[quizIndex] = {
            ...newQuizList[quizIndex], // Keep existing properties
            ...updatedQuizData,        // Overwrite with updates
          };
          return newQuizList;
        });

        // Make the API call
        await updateQuiz(quizId, updatedQuizData);


      } catch (error) {
        console.error("Error editing quiz:", error);
        // Re-fetch on error to revert the optimistic update
        await fetchQuizList();
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [quizList, fetchQuizList] // Add quizList as dependency
  );

  return (
    <QuizContext.Provider
      value={{ quizList, isLoading, fetchQuizList, addQuiz, editQuiz }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuizContext = () => useContext(QuizContext);