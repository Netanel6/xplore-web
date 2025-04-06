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
  Divider
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useQuizContext } from "../context/quizContext";
import QuestionForm from "./QuestionForm";
import { convertToMilliseconds } from "../utils/timeUtils";


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

  const handleAddQuestion = (question) => {
    setQuestions([...questions, question]);
  };

  const handleRemoveQuestion = (index) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const handleSaveQuiz = async () => {
    if (!quizTitle) {
      setError("נא למלא את כל השדות ולהוסיף לפחות שאלה אחת.");
      return;
    }

    const scoreBoard = {
      scores: []
    };

    const quiz = {
      title: quizTitle,
      quizTimer: convertToMilliseconds(quizTimerValue, quizTimerUnit),
      answerLockTimer: convertToMilliseconds(answerLockValue, answerLockUnit),
      isActive,
      questions,
      totalScore: 0,
      currentScore: 0,
      scoreBoard
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
    <Container maxWidth="md" sx={{dir: "rtl" }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" component="h2">
          הוספת חידון חדש
        </Typography>
        <Divider />

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <TextField
          label="כותרת החידון"
          fullWidth
          value={quizTitle}
          onChange={(e) => setQuizTitle(e.target.value)}
          margin="dense"
        />

        {/* Quiz Timer */}
        <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
          <TextField
            label="זמן חידון"
            type="number"
            value={quizTimerValue}
            onChange={(e) => setQuizTimerValue(parseInt(e.target.value, 10) || 0)}
            sx={{ mr: 2, width: "100px" }}
          />
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel>יחידה</InputLabel>
            <Select value={quizTimerUnit} onChange={(e) => setQuizTimerUnit(e.target.value)}>
              <MenuItem value="seconds">שניות</MenuItem>
              <MenuItem value="minutes">דקות</MenuItem>
              <MenuItem value="hours">שעות</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Answer Lock Timer */}
        <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
          <TextField
            label="נעילת תשובה"
            type="number"
            value={answerLockValue}
            onChange={(e) => setAnswerLockValue(parseInt(e.target.value, 10) || 0)}
            sx={{ mr: 2, width: "100px" }}
          />
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel>יחידה</InputLabel>
            <Select value={answerLockUnit} onChange={(e) => setAnswerLockUnit(e.target.value)}>
              <MenuItem value="seconds">שניות</MenuItem>
              <MenuItem value="minutes">דקות</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Is Active */}
        <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
          <Typography sx={{ mr: 2 }}>פעיל:</Typography>
          <Switch checked={isActive} onChange={(e) => setIsActive(e.target.checked)} />
        </Box>

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
