import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

const QuizDetailsDialog = ({ open, onClose, quiz }) => {
  if (!quiz) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{quiz.title}</DialogTitle>
      <DialogContent>
        <Typography variant="subtitle1" gutterBottom>
          {quiz.description}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          <strong>רמת קושי:</strong> {quiz.difficulty || "N/A"}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          <strong>תגיות:</strong> {quiz.tags?.join(", ") || "N/A"}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          <strong>מגבלת זמן:</strong> {quiz.timer || "N/A"} שניות
        </Typography>
        <Typography variant="body2" color="textSecondary">
          <strong>מספר משתתפים מקסימלי:</strong> {quiz.maxParticipants || "N/A"}
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          <strong>פעיל:</strong> {quiz.isActive ? "כן" : "לא"}
        </Typography>

        <Typography variant="h6" sx={{ mt: 3 }}>
          שאלות
        </Typography>
        {quiz.questions?.length > 0 ? (
          <List>
            {quiz.questions.map((question, index) => (
              <ListItem key={index} sx={{ mb: 1 }}>
                <ListItemText
                  primary={`שאלה ${index + 1}: ${question.text}`}
                  secondary={`תשובות: ${question.answers.join(", ")}`}
                />
                <Typography variant="body2" color="textSecondary">
                  <strong>תשובה נכונה:</strong> {question.answers[question.correctAnswerIndex]}
                </Typography>
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography variant="body2" color="textSecondary">
            אין שאלות זמינות.
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          סגור
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default QuizDetailsDialog;
