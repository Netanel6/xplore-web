import React, { useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Switch,
} from "@mui/material";
import { useQuizContext } from "../context/quizContext";
import QuizDetailsDialog from "../components/QuizDetailsDialog";

const QuizList = () => {
  const { quizList, isLoading } = useQuizContext(); // ✅ Use only injected data
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleQuizClick = (quiz) => {
    setSelectedQuiz(quiz);
    setDialogOpen(true);
  };

  if (quizLoading) {
    return (
      <Paper elevation={3} sx={{ p: 3, bgcolor: "#fff" }}>
        <Typography variant="body1" color="textSecondary">
          טוען שאלונים...
        </Typography>
      </Paper>
    );
  }

  return (
    <Box p={3}>
      <Typography variant="h4" mb={3}>
        רשימת חידונים
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
              {/* ✅ Timer Toggle */}
              <Switch
                checked={quiz.quizTimer > 0}
                onChange={() => console.log(`Quiz Timer: ${quiz.quizTimer > 0 ? "Enabled" : "Disabled"}`)}
              />
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography>אין חידונים זמינים.</Typography>
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
