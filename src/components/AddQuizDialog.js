import React, { useState } from "react";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Switch,
  Box,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Alert,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useQuizContext } from "../context/quizContext";
import QuestionForm from "./QuestionForm";

const AddQuizDialog = () => {
  const { addQuiz } = useQuizContext();

  const [quizTitle, setQuizTitle] = useState("");
  const [quizTimerValue, setQuizTimerValue] = useState(5);
  const [quizTimerUnit, setQuizTimerUnit] = useState("minutes");
  const [answerLockValue, setAnswerLockValue] = useState(10);
  const [answerLockUnit, setAnswerLockUnit] = useState("seconds");
  const [isActive, setIsActive] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState("");

  const convertToMilliseconds = (value, unit) => {
    switch (unit) {
      case "hours":
        return value * 60 * 60 * 1000;
      case "minutes":
        return value * 60 * 1000;
      case "seconds":
      default:
        return value * 1000;
    }
  };

  const handleAddQuestion = (question) => {
    setQuestions([...questions, question]);
  };

  const handleRemoveQuestion = (index) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const handleSaveQuiz = async () => {
    if (!quizTitle || questions.length === 0) {
      setError("נא למלא את כל השדות ולהוסיף לפחות שאלה אחת.");
      return;
    }

    const quiz = {
      title: quizTitle,
      quizTimer: convertToMilliseconds(quizTimerValue, quizTimerUnit),
      answerLockTimer: convertToMilliseconds(answerLockValue, answerLockUnit),
      isActive,
      questions,
      totalScore: 0,
    };

    try {
      await addQuiz(quiz);
      alert("החידון נוסף בהצלחה!");
      setQuestions([]);
      setQuizTitle("");
      setError("");
    } catch (error) {
      setError("שגיאה ביצירת חידון: " + error.message);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, dir: "rtl" }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" sx={{ textAlign: "center", mb: 2 }}>
          הוספת חידון חדש
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <TextField
          label="כותרת החידון"
          fullWidth
          value={quizTitle}
          onChange={(e) => setQuizTitle(e.target.value)}
          margin="dense"
        />

        <QuestionForm onAddQuestion={handleAddQuestion} />

        <Typography variant="h5" sx={{ mt: 3 }}>
          שאלות שנוספו
        </Typography>

        <List>
          {questions.map((question, index) => (
            <ListItem key={index} secondaryAction={<IconButton onClick={() => handleRemoveQuestion(index)} color="error"><Delete /></IconButton>}>
              <ListItemText primary={question.text} secondary={`נקודות: ${question.points}, סוג: ${question.type}`} />
            </ListItem>
          ))}
        </List>

        <Button variant="contained" color="primary" fullWidth onClick={handleSaveQuiz} sx={{ mt: 3 }}>
          שמור חידון
        </Button>
      </Paper>
    </Container>
  );
};

export default AddQuizDialog;
