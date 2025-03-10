import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  Button,
  Alert,
  CircularProgress,
  Box,
  Typography,
} from "@mui/material";
import { assignQuizzesToUser } from "../services/userService";
import { useUserContext } from "../context/userContext";
import { useQuizContext } from "../context/quizContext";

const AssignQuizDialog = ({ open, onClose, selectedUser }) => {
  const { fetchUserList } = useUserContext();
  const { quizList, fetchQuizList, isLoading } = useQuizContext();
  const [selectedQuizzes, setSelectedQuizzes] = useState([]);
  const [error, setError] = useState("");

  // Fetch quizzes when the dialog opens
  useEffect(() => {
    if (open) {
      console.log("Fetching quiz list...");
      fetchQuizList();
    }
  }, [open, fetchQuizList]);

  // Handle quiz selection
  const handleToggle = (quizId) => () => {
    const currentIndex = selectedQuizzes.indexOf(quizId);
    const newSelectedQuizzes = [...selectedQuizzes];

    if (currentIndex === -1) {
      newSelectedQuizzes.push(quizId);
    } else {
      newSelectedQuizzes.splice(currentIndex, 1);
    }

    setSelectedQuizzes(newSelectedQuizzes);
  };

  // Assign quizzes to the user
  const handleAssignQuizzes = async () => {
    if (selectedQuizzes.length === 0) {
      setError("נא לבחור לפחות חידון אחד.");
      return;
    }

    try {
      const payload = selectedQuizzes.map((quizId) => ({ id: quizId }));

      console.log("Sending payload:", payload);

      await assignQuizzesToUser(selectedUser.id, payload);

      console.log("Quizzes assigned successfully.");

      // Refresh user list and close the dialog
      fetchUserList();
      onClose();
      setSelectedQuizzes([]);
      setError("");
    } catch (err) {
      console.error("Error assigning quizzes:", err.response?.data || err.message);
      setError("לא ניתן להוסיף חידונים.");
    }
  };

  if (isLoading) {
    return (
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ textAlign: "right", dir: "rtl" }}>הוסף חידונים למשתמש</DialogTitle>
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
      <DialogTitle sx={{ textAlign: "right", dir: "rtl" }}>הוסף חידונים למשתמש</DialogTitle>
      <DialogContent sx={{ dir: "rtl", textAlign: "right" }}>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <List>
          {quizList.length > 0 ? (
            quizList.map((quiz) => (
              <ListItem
                key={quiz._id}
                button
                onClick={handleToggle(quiz._id)}
                sx={{
                  mb: 1,
                  borderRadius: "8px",
                  backgroundColor: selectedQuizzes.indexOf(quiz._id) !== -1 ? "#d1eaff" : "inherit",
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
                <Checkbox
                  edge="end"
                  checked={selectedQuizzes.indexOf(quiz._id) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": quiz._id }}
                />
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
        <Button onClick={handleAssignQuizzes} color="primary" variant="contained" disabled={selectedQuizzes.length === 0}>
          שמור
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AssignQuizDialog;
