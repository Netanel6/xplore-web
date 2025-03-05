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

const QuizList = () => {
  const { quizList, isLoading, updateQuiz } = useQuizContext();
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const handleQuizClick = (quiz) => {
    setSelectedQuiz(quiz);
    setDialogOpen(true);
  };

  const handleEditClick = () => {
    setDialogOpen(false); // Close details dialog before opening edit
    setTimeout(() => setEditDialogOpen(true), 300); // Smooth transition
  };

  const handleSaveQuiz = (updatedQuiz) => {
    updateQuiz(updatedQuiz); // ✅ Update quiz in context/state
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
    <Box p={3} dir="rtl"> {/* ✅ Ensures RTL alignment */}
      <Typography variant="h5" mb={2} textAlign="right">
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
                display: "flex",
                justifyContent: "space-between", // ✅ Proper spacing
                alignItems: "center",
                "&:hover": { backgroundColor: "#f0f0f0" },
              }}
            >
              {/* ✅ Toggle Button (Left Side) */}
              <Switch
                checked={quiz.quizTimer > 0}
                onChange={() =>
                  console.log(
                    `Quiz Timer: ${quiz.quizTimer > 0 ? "Enabled" : "Disabled"}`
                  )
                }
              />

              {/* ✅ Text (Compact & Shortened) */}
              <ListItemText
                primary={quiz.title.length > 15 ? `${quiz.title.substring(0, 15)}...` : quiz.title}
                secondary={
                  quiz.description && quiz.description.length > 20
                    ? `${quiz.description.substring(0, 20)}...`
                    : quiz.description
                }
                sx={{ textAlign: "right", flex: 1, whiteSpace: "nowrap" }}
              />
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography textAlign="right">אין חידונים זמינים.</Typography>
      )}

      {/* ✅ Quiz Details Dialog */}
      <QuizDetailsDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        quiz={selectedQuiz}
      >
        <Button
          variant="outlined"
          color="primary"
          onClick={handleEditClick}
          sx={{ mt: 2 }}
        >
          ערוך חידון
        </Button>
      </QuizDetailsDialog>

      {/* ✅ Edit Quiz Dialog */}
      {selectedQuiz && (
        <EditQuizForm
          open={editDialogOpen}
          onClose={() => setEditDialogOpen(false)}
          quiz={selectedQuiz}
          onSave={handleSaveQuiz}
        />
      )}
    </Box>
  );
};

export default QuizList;
