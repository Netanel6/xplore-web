import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  List,
  ListItem,
  IconButton,
  Select,
  MenuItem,
  Typography,
  FormControl,
  InputLabel,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const EditQuizForm = ({ open, onClose, quiz, onSave }) => {
  const [editedQuiz, setEditedQuiz] = useState({
    title: quiz?.title || "",
    quizTimer: quiz?.quizTimer || 60,
    answerLockTimer: quiz?.answerLockTimer || 10,
    isActive: quiz?.isActive || true,
    creatorId: quiz?.creatorId || "",
    totalScore: quiz?.totalScore || 0,
    questions: quiz?.questions || [],
  });

  // Handles input change
  const handleInputChange = (field, value) => {
    setEditedQuiz((prev) => ({ ...prev, [field]: value }));
  };

  // Handles question input change
  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...editedQuiz.questions];
    updatedQuestions[index] = { ...updatedQuestions[index], [field]: value };
    setEditedQuiz((prev) => ({ ...prev, questions: updatedQuestions }));
  };

  // Adds a new question
  const addQuestion = () => {
    setEditedQuiz((prev) => ({
      ...prev,
      questions: [
        ...prev.questions,
        { id: prev.questions.length + 1, text: "", answers: ["", "", "", ""], correctAnswerIndex: 0, points: 0, type: "American", difficulty: "Easy" },
      ],
    }));
  };

  // Removes a question
  const removeQuestion = (index) => {
    const updatedQuestions = editedQuiz.questions.filter((_, i) => i !== index);
    setEditedQuiz((prev) => ({ ...prev, questions: updatedQuestions }));
  };

  // Handles form submission
  const handleSubmit = () => {
    onSave(editedQuiz);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>עריכת חידון</DialogTitle>
      <DialogContent dividers>
        {/* Quiz Title */}
        <TextField
          label="שם החידון"
          fullWidth
          value={editedQuiz.title}
          onChange={(e) => handleInputChange("title", e.target.value)}
          margin="dense"
        />

        {/* Quiz Timer */}
        <TextField
          label="זמן חידון (שניות)"
          type="number"
          fullWidth
          value={editedQuiz.quizTimer}
          onChange={(e) => handleInputChange("quizTimer", Number(e.target.value))}
          margin="dense"
        />

        {/* Answer Lock Timer */}
        <TextField
          label="זמן נעילת תשובה (שניות)"
          type="number"
          fullWidth
          value={editedQuiz.answerLockTimer}
          onChange={(e) => handleInputChange("answerLockTimer", Number(e.target.value))}
          margin="dense"
        />

        {/* Is Active */}
        <FormControl fullWidth margin="dense">
          <InputLabel>מצב חידון</InputLabel>
          <Select value={editedQuiz.isActive} onChange={(e) => handleInputChange("isActive", e.target.value)}>
            <MenuItem value={true}>פעיל</MenuItem>
            <MenuItem value={false}>לא פעיל</MenuItem>
          </Select>
        </FormControl>

        {/* Questions List */}
        <Typography variant="h6" sx={{ mt: 3 }}>
          שאלות
        </Typography>
        <List>
          {editedQuiz.questions.map((question, index) => (
            <ListItem key={index} sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
              <TextField
                label={`שאלה ${index + 1}`}
                fullWidth
                value={question.text}
                onChange={(e) => handleQuestionChange(index, "text", e.target.value)}
                margin="dense"
              />
              {question.answers.map((answer, ansIndex) => (
                <TextField
                  key={ansIndex}
                  label={`תשובה ${ansIndex + 1}`}
                  fullWidth
                  value={answer}
                  onChange={(e) => {
                    const updatedAnswers = [...question.answers];
                    updatedAnswers[ansIndex] = e.target.value;
                    handleQuestionChange(index, "answers", updatedAnswers);
                  }}
                  margin="dense"
                />
              ))}
              {/* Correct Answer Index */}
              <FormControl fullWidth margin="dense">
                <InputLabel>תשובה נכונה</InputLabel>
                <Select
                  value={question.correctAnswerIndex}
                  onChange={(e) => handleQuestionChange(index, "correctAnswerIndex", e.target.value)}
                >
                  {question.answers.map((_, ansIndex) => (
                    <MenuItem key={ansIndex} value={ansIndex}>
                      תשובה {ansIndex + 1}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {/* Points */}
              <TextField
                label="נקודות"
                type="number"
                fullWidth
                value={question.points}
                onChange={(e) => handleQuestionChange(index, "points", Number(e.target.value))}
                margin="dense"
              />
              {/* Question Type */}
              <FormControl fullWidth margin="dense">
                <InputLabel>סוג שאלה</InputLabel>
                <Select value={question.type} onChange={(e) => handleQuestionChange(index, "type", e.target.value)}>
                  <MenuItem value="American">אמריקאית</MenuItem>
                  <MenuItem value="TrueOrFalse">נכון או לא נכון</MenuItem>
                </Select>
              </FormControl>
              {/* Difficulty */}
              <FormControl fullWidth margin="dense">
                <InputLabel>רמת קושי</InputLabel>
                <Select value={question.difficulty} onChange={(e) => handleQuestionChange(index, "difficulty", e.target.value)}>
                  <MenuItem value="Easy">קל</MenuItem>
                  <MenuItem value="Medium">בינוני</MenuItem>
                  <MenuItem value="Hard">קשה</MenuItem>
                </Select>
              </FormControl>
              {/* Remove Question Button */}
              <IconButton color="error" onClick={() => removeQuestion(index)} sx={{ mt: 1 }}>
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
        <Button startIcon={<AddCircleOutlineIcon />} onClick={addQuestion} color="primary">
          הוסף שאלה
        </Button>
      </DialogContent>
      <DialogActions>   
        <Button onClick={onClose} color="secondary">
          ביטול
        </Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          שמור שינויים
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditQuizForm;
