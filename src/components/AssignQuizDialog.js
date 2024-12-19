import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Alert } from "@mui/material";
import { assignQuizToUser } from "../services/userService";
import { useUserContext } from "../context/userContext";

const AssignQuizDialog = ({ open, onClose, selectedUser }) => {
  const [newQuizTitle, setNewQuizTitle] = useState("");
  const [error, setError] = useState("");
  const { fetchUserList } = useUserContext();

  const handleAssignQuiz = async () => {
    if (!newQuizTitle) {
      setError("נא למלא את שם השאלון.");
      return;
    }

    try {
      await assignQuizToUser(selectedUser._id, { title: newQuizTitle });
      fetchUserList();
      onClose();
      setNewQuizTitle("");
      setError("");
    } catch (err) {
      setError("לא ניתן להוסיף שאלון.");
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>הוסף שאלון למשתמש</DialogTitle>
      <DialogContent>
        {error && <Alert severity="error">{error}</Alert>}
        <TextField
          label="שם השאלון"
          value={newQuizTitle}
          onChange={(e) => setNewQuizTitle(e.target.value)}
          fullWidth
          margin="dense"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          ביטול
        </Button>
        <Button onClick={handleAssignQuiz} color="primary">
          שמור
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AssignQuizDialog;
