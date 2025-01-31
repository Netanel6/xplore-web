import React from "react";
import { UserProvider } from "../context/userContext";
import { QuizProvider } from "../context/quizContext"; // Import QuizProvider

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <QuizProvider>
        <Component {...pageProps} />
      </QuizProvider>
    </UserProvider>
  );
}

export default MyApp;
