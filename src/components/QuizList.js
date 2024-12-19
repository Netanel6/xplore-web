import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
} from "@mui/material";
import { useQuizContext } from "../../context/quizContext";
import QuizDetailsDialog from "../../components/QuizDetailsDialog";

const QuizList = () => {
  const { quizList, isLoading, fetchQuizList } = useQuizContext();
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    fetchQuizList();
  }, [fetchQuizList]);

  const handleQuizClick = (quiz) => {
    setSelectedQuiz(quiz);
    setDialogOpen(true);
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Typography variant="h4" mb={3}>
        רשימת שאלונים
      </Typography>
      {quizList.length > 0 ? (
        <List>
          {quizList.map((quiz) => (
            <ListItem
              key={quiz._id}
              button
              onClick={() => handleQuizClick(quiz)}
              sx={{
                mb: 1,
                borderRadius: "8px",
                "&:hover": { backgroundColor: "#f0f0f0" },
              }}
            >
              <ListItemText primary={quiz.title} secondary={quiz.description} />
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography>אין שאלונים זמינים.</Typography>
      )}
      <QuizDetailsDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        quiz={selectedQuiz}
      />
    </Box>
  );
};

export default QuizList;
