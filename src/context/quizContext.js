import React, { createContext, useContext, useState, useCallback } from "react";
import { fetchQuizzes, createQuiz } from "../services/quizService";

const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [quizList, setQuizList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchQuizList = useCallback(async () => {
    console.log("🔄 Fetching quizzes...");
    setIsLoading(true);
    try {
      const quizzes = await fetchQuizzes();
      console.log("✅ Quizzes fetched successfully:", quizzes);
      setQuizList(quizzes);
    } catch (error) {
      console.error("❌ Error fetching quizzes:", error);
    } finally {
      console.log("📢 Quiz fetching complete.");
      setIsLoading(false);
    }
  }, []);

  const addQuiz = async (quiz) => {
    console.log("➕ Adding new quiz:", quiz);
    try {
      const newQuiz = await createQuiz(quiz);
      console.log("✅ Quiz created:", newQuiz);
      setQuizList((prev) => [...prev, newQuiz]);
    } catch (error) {
      console.error("❌ Error creating quiz:", error);
    }
  };

  return (
    <QuizContext.Provider value={{ quizList, isLoading, fetchQuizList, addQuiz }}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuizContext = () => useContext(QuizContext);
