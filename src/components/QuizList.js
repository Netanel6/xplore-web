import React, { useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Switch,
  Button,
} from "@mui/material";
import { useQuizContext } from "../context/quizContext";
import QuizDetailsDialog from "../components/QuizDetailsDialog";
import EditQuizForm from "../components/EditQuizForm";
import QuizListWithEdit from "../components/QuizListWithEdit";

const QuizList = () => {
  const { quizList, isLoading, updateQuiz } = useQuizContext();
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const handleQuizClick = (quiz) => {
    setSelectedQuiz(quiz);
    setDetailsDialogOpen(true); // Open details dialog
  };

  const handleEditClick = (quiz) => {
    setSelectedQuiz(quiz);
    setEditDialogOpen(true);
  };

  const handleSaveQuiz = (updatedQuiz) => {
    updateQuiz(updatedQuiz);
    setEditDialogOpen(false);
  };

  if (isLoading) {
    return (
      <Box p={3} dir="rtl">
        <Typography variant="body1" color="textSecondary">
          טוען שאלונים...
        </Typography>
      </Box>
    );
  }

  return (
    <Box p={3} dir="rtl">
      <Typography variant="h5" mb={2} textAlign="right">
        רשימת חידונים
      </Typography>

      {quizList.length > 0 ? (
        <QuizListWithEdit
          quizList={quizList}
          onQuizClick={handleQuizClick}
          onEditQuiz={handleEditClick}
        />
      ) : (
        <Typography textAlign="right">אין חידונים זמינים.</Typography>
      )}

      <QuizDetailsDialog
        open={detailsDialogOpen}
        onClose={() => setDetailsDialogOpen(false)}
        quiz={selectedQuiz}
      />

      <EditQuizForm
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        quiz={selectedQuiz}
      />
    </Box>
  );
};

export default QuizList;