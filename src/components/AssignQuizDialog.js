import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  Button,
  Alert,
  CircularProgress,
  Box,
  Typography,
} from "@mui/material";
import { assignQuizToUser } from "../services/userService";
import { useUserContext } from "../context/userContext";
import { useQuizContext } from "../context/quizContext";

const AssignQuizDialog = ({ open, onClose, selectedUser }) => {
  const { fetchUserList } = useUserContext();
  const { quizList, fetchQuizList, isLoading } = useQuizContext();
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [error, setError] = useState("");

  // Fetch quizzes when the dialog opens
  useEffect(() => {
    if (open) {
      console.log("Fetching quiz list...");
      fetchQuizList();
    }
  }, [open, fetchQuizList]);

  // Assign quiz to the user
  const handleAssignQuiz = async () => {
    if (!selectedQuiz) {
      setError("נא לבחור חידון.");
      return;
    }

    try {
      const payload = {
        id: selectedQuiz._id,
      };

      console.log("Sending payload:", payload);

      await assignQuizToUser(selectedUser.id, payload);

      console.log("Quiz assigned successfully.");

      // Refresh user list and close the dialog
      fetchUserList();
      onClose();
      setSelectedQuiz(null);
      setError("");
    } catch (err) {
      console.error("Error assigning quiz:", err.response?.data || err.message);
      setError("לא ניתן להוסיף חידון.");
    }
  };

  if (isLoading) {
    return (
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ textAlign: "right", dir: "rtl" }}>הוסף חידון למשתמש</DialogTitle>
        <DialogContent>
          <Box display="flex" justifyContent="center" alignItems="center" height="200px">
            <CircularProgress />
          </Box>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ textAlign: "right", dir: "rtl" }}>הוסף חידון למשתמש</DialogTitle>
      <DialogContent sx={{ dir: "rtl", textAlign: "right" }}>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <List>
          {quizList.length > 0 ? (
            quizList.map((quiz) => (
              <ListItem
                key={quiz._id}
                button
                onClick={() => setSelectedQuiz(quiz)}
                sx={{
                  mb: 1,
                  borderRadius: "8px",
                  backgroundColor: selectedQuiz?._id === quiz._id ? "#d1eaff" : "inherit",
                  "&:hover": { backgroundColor: "#f1f1f1" },
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <ListItemText
                  primary={<Typography variant="body1" fontWeight="bold">{quiz.title}</Typography>}
                  secondary={quiz.description}
                  sx={{ textAlign: "right" }}
                />
                {selectedQuiz?._id === quiz._id && (
                  <Typography variant="body2" color="primary" sx={{ fontWeight: "bold" }}>
                    ✅ נבחר
                  </Typography>
                )}
              </ListItem>
            ))
          ) : (
            <Typography sx={{ textAlign: "center", mt: 2 }} color="textSecondary">
              לא נמצאו חידונים זמינים
            </Typography>
          )}
        </List>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "space-between", dir: "rtl" }}>
        <Button onClick={onClose} color="secondary">
          ביטול
        </Button>
        <Button onClick={handleAssignQuiz} color="primary" variant="contained" disabled={!selectedQuiz}>
          שמור
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AssignQuizDialog;
