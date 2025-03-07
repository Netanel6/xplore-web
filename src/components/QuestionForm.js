import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  IconButton,
} from "@mui/material";
import { AddCircle, Delete } from "@mui/icons-material";

const QuestionForm = ({ onAddQuestion }) => {
  const initialQuestionState = {
    text: "",
    media: "",
    answers: ["", "", "", ""],
    correctAnswerIndex: null,
    explanation: "",
    points: 10,
    type: "American",
    difficulty: "Easy",
  };

  const [newQuestion, setNewQuestion] = useState(initialQuestionState);
  const [error, setError] = useState("");

  const handleQuestionTypeChange = (type) => {
    setNewQuestion({
      ...newQuestion,
      type,
      answers: type === "TrueOrFalse" ? ["", ""] : ["", "", "", ""],
      correctAnswerIndex: null,
    });
  };

  const handleAddQuestion = () => {
    if (!newQuestion.text || newQuestion.correctAnswerIndex === null || newQuestion.answers.some(a => a.trim() === "")) {
      setError("נא למלא את כל פרטי השאלה ולבחור תשובה נכונה.");
      return;
    }

    onAddQuestion({ ...newQuestion });
    setNewQuestion(initialQuestionState);
    setError("");
  };

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h6">הוספת שאלה חדשה</Typography>

      {error && <Typography color="error">{error}</Typography>}

      <TextField
        label="תוכן השאלה"
        fullWidth
        value={newQuestion.text}
        onChange={(e) => setNewQuestion({ ...newQuestion, text: e.target.value })}
        margin="dense"
      />

      <TextField
        label="מדיה"
        fullWidth
        value={newQuestion.media}
        onChange={(e) => setNewQuestion({ ...newQuestion, media: e.target.value })}
        margin="dense"
      />

      <TextField
        label="נקודות עבור תשובה נכונה"
        type="number"
        fullWidth
        value={newQuestion.points}
        onChange={(e) => setNewQuestion({ ...newQuestion, points: Number(e.target.value) })}
        margin="dense"
      />

      <TextField
        label="הסבר לתשובה"
        fullWidth
        value={newQuestion.explanation}
        onChange={(e) => setNewQuestion({ ...newQuestion, explanation: e.target.value })}
        margin="dense"
      />

      <FormControl fullWidth margin="dense">
        <InputLabel>סוג שאלה</InputLabel>
        <Select value={newQuestion.type} onChange={(e) => handleQuestionTypeChange(e.target.value)}>
          <MenuItem value="American">אמריקאית</MenuItem>
          <MenuItem value="TrueOrFalse">נכון או לא נכון</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth margin="dense">
        <InputLabel>רמת קושי</InputLabel>
        <Select value={newQuestion.difficulty} onChange={(e) => setNewQuestion({ ...newQuestion, difficulty: e.target.value })}>
          <MenuItem value="Easy">קלה</MenuItem>
          <MenuItem value="Medium">בינונית</MenuItem>
          <MenuItem value="Hard">קשה</MenuItem>
        </Select>
      </FormControl>

      <RadioGroup value={newQuestion.correctAnswerIndex} onChange={(e) => setNewQuestion({ ...newQuestion, correctAnswerIndex: Number(e.target.value) })}>
        {newQuestion.answers.map((answer, index) => (
          <Box key={index} sx={{ display: "flex", alignItems: "center", mt: 1 }}>
            <FormControlLabel value={index} control={<Radio />} label="" />
            <TextField
              fullWidth
              label={`תשובה ${index + 1}`}
              value={answer}
              onChange={(e) => {
                const updatedAnswers = [...newQuestion.answers];
                updatedAnswers[index] = e.target.value;
                setNewQuestion({ ...newQuestion, answers: updatedAnswers });
              }}
            />
          </Box>
        ))}
      </RadioGroup>

      <Button
        variant="contained"
        color="secondary"
        fullWidth
        onClick={handleAddQuestion}
        sx={{ mt: 2 }}
        startIcon={<AddCircle />}
      >
        הוסף שאלה
      </Button>
    </Box>
  );
};

export default QuestionForm;
