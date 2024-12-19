import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Alert,
  Box,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Chip,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Switch,
} from "@mui/material";
import { AddCircle, Delete } from "@mui/icons-material";
import { useQuizContext } from "../context/quizContext";
import { useUserContext } from "../context/userContext";

const AddQuizDialog = ({ open, onClose }) => {
  const { addQuiz } = useQuizContext();
  const { currentUser } = useUserContext();

  const [quizTitle, setQuizTitle] = useState("");
  const [quizDescription, setQuizDescription] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState({
    text: "",
    answers: ["", "", "", ""],
    correctAnswer: "",
  });
  const [timer, setTimer] = useState(60);
  const [maxParticipants, setMaxParticipants] = useState(10);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [error, setError] = useState("");

  const handleAddQuiz = async () => {
    if (!quizTitle || !quizDescription || !difficulty) {
      setError("נא למלא את כל השדות ולהוסיף לפחות שאלה אחת.");
      return;
    }

    const quiz = {
      title: quizTitle,
      description: quizDescription,
      difficulty,
      tags,
      questions,
      timer,
      maxParticipants,
      creatorId: currentUser.id,
      startTime,
      endTime,
      isActive,
    };

    try {
      await addQuiz(quiz);
      onClose();
      resetFields();
    } catch {
      setError("שגיאה ביצירת שאלון.");
    }
  };

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const handleRemoveTag = (tag) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleAddQuestion = () => {
    if (
      !newQuestion.text ||
      newQuestion.answers.some((a) => !a) ||
      !newQuestion.correctAnswer
    ) {
      setError("נא למלא את כל פרטי השאלה ולבחור תשובה נכונה.");
      return;
    }
    const question = {
      ...newQuestion,
      correctAnswerIndex: newQuestion.answers.indexOf(newQuestion.correctAnswer),
    };
    setQuestions([...questions, question]);
    setNewQuestion({ text: "", answers: ["", "", "", ""], correctAnswer: "" });
    setError("");
  };

  const handleRemoveQuestion = (index) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const resetFields = () => {
    setQuizTitle("");
    setQuizDescription("");
    setDifficulty("");
    setTags([]);
    setQuestions([]);
    setTimer(60);
    setMaxParticipants(10);
    setStartTime("");
    setEndTime("");
    setIsActive(true);
    setError("");
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>הוסף שאלון חדש</DialogTitle>
      <DialogContent>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <TextField
          label="כותרת"
          value={quizTitle}
          onChange={(e) => setQuizTitle(e.target.value)}
          fullWidth
          margin="dense"
        />
        <TextField
          label="תיאור"
          value={quizDescription}
          onChange={(e) => setQuizDescription(e.target.value)}
          fullWidth
          margin="dense"
        />
        <FormControl fullWidth margin="dense">
          <InputLabel>רמת קושי</InputLabel>
          <Select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <MenuItem value="Easy">קל</MenuItem>
            <MenuItem value="Medium">בינוני</MenuItem>
            <MenuItem value="Hard">קשה</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="תגית חדשה"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAddTag()}
          fullWidth
          margin="dense"
        />
        <Box display="flex" flexWrap="wrap" gap={1} sx={{ mt: 1, mb: 2 }}>
          {tags.map((tag, index) => (
            <Chip
              key={index}
              label={tag}
              onDelete={() => handleRemoveTag(tag)}
              color="primary"
            />
          ))}
        </Box>
        <TextField
          label="מגבלת זמן (שניות)"
          type="number"
          value={timer}
          onChange={(e) => setTimer(Number(e.target.value))}
          fullWidth
          margin="dense"
        />
        <TextField
          label="מספר משתתפים מקסימלי"
          type="number"
          value={maxParticipants}
          onChange={(e) => setMaxParticipants(Number(e.target.value))}
          fullWidth
          margin="dense"
        />
        <TextField
          label="זמן התחלה"
          type="datetime-local"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          fullWidth
          margin="dense"
        />
        <TextField
          label="זמן סיום"
          type="datetime-local"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          fullWidth
          margin="dense"
        />
        <Box display="flex" alignItems="center" mt={2} mb={2}>
          <Typography>שאלון פעיל</Typography>
          <Switch checked={isActive} onChange={(e) => setIsActive(e.target.checked)} />
        </Box>
        <Box>
          <Typography variant="h6" sx={{ mt: 2, mb: 2 }}>
            שאלות
          </Typography>
          {questions.length > 0 && (
            <List>
              {questions.map((question, index) => (
                <ListItem
                  key={index}
                  sx={{ borderBottom: "1px solid #ddd", mb: 1, padding: "8px 0" }}
                >
                  <ListItemText
                    primary={question.text}
                    secondary={`תשובות: ${question.answers.join(", ")}`}
                  />
                  <IconButton onClick={() => handleRemoveQuestion(index)}>
                    <Delete />
                  </IconButton>
                </ListItem>
              ))}
            </List>
          )}
          <Box sx={{ mt: 2 }}>
            <TextField
              label="שאלה"
              value={newQuestion.text}
              onChange={(e) => setNewQuestion({ ...newQuestion, text: e.target.value })}
              fullWidth
              margin="dense"
            />
            {newQuestion.answers.map((answer, index) => (
              <TextField
                key={index}
                label={`תשובה ${index + 1}`}
                value={answer}
                onChange={(e) =>
                  setNewQuestion({
                    ...newQuestion,
                    answers: newQuestion.answers.map((a, i) => (i === index ? e.target.value : a)),
                  })
                }
                fullWidth
                margin="dense"
              />
            ))}
            <FormControl fullWidth margin="dense">
              <InputLabel>תשובה נכונה</InputLabel>
              <Select
                value={newQuestion.correctAnswer}
                onChange={(e) =>
                  setNewQuestion({ ...newQuestion, correctAnswer: e.target.value })
                }
              >
                {newQuestion.answers.map((answer, index) => (
                  <MenuItem key={index} value={answer}>
                    {answer || `תשובה ${index + 1}`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              variant="outlined"
              onClick={handleAddQuestion}
              startIcon={<AddCircle />}
              sx={{ mt: 2 }}
            >
              הוסף שאלה
            </Button>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>ביטול</Button>
        <Button onClick={handleAddQuiz}>שמור</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddQuizDialog;
