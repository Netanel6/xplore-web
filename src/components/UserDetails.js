import React, { useState, useEffect } from "react";
import {
  Paper,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
  Button,
  IconButton,
  Box
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AssignQuizDialog from "./AssignQuizDialog";
import { deleteQuizForUser } from "../services/userService";
import { useQuizContext } from "../context/quizContext";

const UserDetails = ({ user }) => {
  const { quizList } = useQuizContext();
  const [assignQuizDialogOpen, setAssignQuizDialogOpen] = useState(false);
  const [assignedQuizzes, setAssignedQuizzes] = useState([]);

  useEffect(() => {
    if (!user || !quizList.length) return;

    console.log("📌 User Quiz List:", user.quiz_list);
    console.log("📌 Available Quizzes:", quizList);

    // Extract only quiz IDs from user.quiz_list
    const userQuizIds = user.quiz_list?.map((quiz) => (typeof quiz === "string" ? quiz : quiz.id)) || [];

    // Find full quiz objects that match the user's quiz IDs
    const filteredQuizzes = quizList.filter((quiz) => userQuizIds.includes(quiz._id));

    console.log("📌 Assigned Quizzes:", filteredQuizzes);
    setAssignedQuizzes(filteredQuizzes);
  }, [user, quizList]);

  const handleDeleteQuiz = async (quizId) => {
    try {
      await deleteQuizForUser(user.id, quizId);
      alert("החידון הוסר בהצלחה!");

      // Remove quiz from UI immediately
      setAssignedQuizzes((prev) => prev.filter((quiz) => quiz._id !== quizId));
    } catch (error) {
      console.error("❌ Error deleting quiz:", error);
    }
  };

  if (!user) {
    return (
      <Paper elevation={3} sx={{ p: 3, bgcolor: "#fff", dir: "rtl", textAlign: "right" }}>
        <Typography variant="body1" color="textSecondary">
          בחר משתמש כדי לראות פרטים.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper elevation={3} sx={{ p: 2, bgcolor: "#fff", dir: "rtl", textAlign: "right" }}>
      <Typography variant="h5" sx={{ mb: 4 }}>
        פרטי משתמש
      </Typography>
      <Typography variant="body1">
        <strong>שם:</strong> {user.name}
      </Typography>
      <Typography variant="body1">
        <strong>מס׳ טלפון:</strong> {user.phone_number}
      </Typography>
      <Divider sx={{ mt: 2 }} />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 3 }}
        onClick={() => setAssignQuizDialogOpen(true)}
      >
        הוסף חידון למשתמש
      </Button>
      <Divider sx={{ my: 2 }} />
      <Typography variant="h6" sx={{ mb: 1.5 }}>
        שאלונים משויכים
      </Typography>

      {assignedQuizzes.length > 0 ? (
        <List>
          {assignedQuizzes.map((quiz) => (
            <Box>
              <Divider/>
              <Box>
                <ListItem
                  key={quiz._id}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection: "row-reverse",
                  }}
                >

                  <IconButton edge="start" color="error" onClick={() => handleDeleteQuiz(quiz._id)}>
                    <DeleteIcon />
                  </IconButton>

                  <ListItemText primary={quiz.title} sx={{ textAlign: "right" }} />
                </ListItem>
              </Box>
            </Box>


          ))}
        </List>
      ) : (
        <Typography color="textSecondary">אין שאלונים משויכים למשתמש זה.</Typography>
      )}

      {/* 📜 Assign Quiz Dialog */}
      <AssignQuizDialog open={assignQuizDialogOpen} onClose={() => setAssignQuizDialogOpen(false)} selectedUser={user} />
    </Paper>
  );
};

export default UserDetails;
