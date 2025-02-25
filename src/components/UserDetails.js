import React, { useState } from "react";
import {
  Paper,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
  Button,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AssignQuizDialog from "./AssignQuizDialog";
import { deleteQuizForUser } from "../services/userService";

const UserDetails = ({ user }) => {
  const [assignQuizDialogOpen, setAssignQuizDialogOpen] = useState(false);

  if (!user) {
    return (
      <Paper elevation={3} sx={{ p: 3, bgcolor: "#fff" }}>
        <Typography variant="body1" color="textSecondary">
          בחר משתמש כדי לראות פרטים.
        </Typography>
      </Paper>
    );
  }

  const handleDeleteQuiz = async (quizId) => {
    try {
      await deleteQuizForUser(user.id, quizId);
      alert("החידון הוסר בהצלחה!");
    } catch (error) {
      console.error("Error deleting quiz:", error);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, bgcolor: "#fff" }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        פרטי משתמש
      </Typography>
      <Typography variant="body1">
        <strong>שם:</strong> {user.name}
      </Typography>
      <Typography variant="body1">
        <strong>מס׳ טלפון:</strong> {user.phone_number}
      </Typography>
      <Divider sx={{ my: 2 }} />
      <Typography variant="h6" sx={{ mb: 2 }}>
        שאלונים משויכים
      </Typography>
      {user.quiz_list?.length > 0 ? (
        <List>
          {user.quiz_list.map((quiz) => (
            <ListItem key={quiz.id} secondaryAction={
              <IconButton edge="end" color="error" onClick={() => handleDeleteQuiz(quiz.id)}>
                <DeleteIcon />
              </IconButton>
            }>
              <ListItemText primary={quiz.title} />
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography color="textSecondary">אין שאלונים משויכים למשתמש זה.</Typography>
      )}
      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 3 }}
        onClick={() => setAssignQuizDialogOpen(true)}
      >
        הוסף חידון
      </Button>
      <AssignQuizDialog open={assignQuizDialogOpen} onClose={() => setAssignQuizDialogOpen(false)} selectedUser={user} />
    </Paper>
  );
};

export default UserDetails;
