import React, { useState, useEffect } from "react";
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
  Grid,
  CircularProgress,
  Alert,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { convertToMilliseconds, getInitialTimeUnit } from "../utils/timeUtils";
import { useQuizContext } from "../context/quizContext";

const EditQuizForm = ({ open, onClose, quiz }) => {
  const [editedQuiz, setEditedQuiz] = useState(() => {
    return quiz
      ? {
          ...quiz, //  Copy ALL properties from the original quiz
          questions: quiz.questions
            ? quiz.questions.map((question) => ({
                ...question, // Deep copy of each question
                answers: question.answers ? [...question.answers] : [], // Deep copy of answers
              }))
            : [],
          quizTimer: quiz.quizTimer || 60000,
          answerLockTimer: quiz.answerLockTimer || 10000,
          title: quiz.title || "",
          creatorId: quiz.creatorId || "",
          isActive: quiz.isActive !== undefined ? quiz.isActive : true,
          totalScore: quiz.totalScore || 0,
        }
      : {
          questions: [],
          quizTimer: 60000,
          answerLockTimer: 10000,
          title: "",
          creatorId: "",
          isActive: true,
          totalScore: 0,
        };
  });

  const [quizTimeUnit, setQuizTimeUnit] = useState(
    quiz ? getInitialTimeUnit(quiz.quizTimer) : "seconds"
  );
  const [answerLockTimeUnit, setAnswerLockTimeUnit] = useState(
    quiz ? getInitialTimeUnit(quiz.answerLockTimer) : "seconds"
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { editQuiz } = useQuizContext();

  useEffect(() => {
    if (quiz) {
      setEditedQuiz((prevEditedQuiz) => ({
        ...quiz, // Start with a copy of the NEW quiz data
        questions: quiz.questions
          ? quiz.questions.map((question) => ({
              ...question, // Deep copy
              answers: question.answers ? [...question.answers] : [], // Deep copy
            }))
          : [],
        quizTimer:
          quiz.quizTimer !== undefined
            ? quiz.quizTimer
            : prevEditedQuiz.quizTimer,
        answerLockTimer:
          quiz.answerLockTimer !== undefined
            ? quiz.answerLockTimer
            : prevEditedQuiz.answerLockTimer,
        title: quiz.title !== undefined ? quiz.title : prevEditedQuiz.title,
        creatorId:
          quiz.creatorId !== undefined ? quiz.creatorId : prevEditedQuiz.creatorId,
        isActive:
          quiz.isActive !== undefined ? quiz.isActive : prevEditedQuiz.isActive,
        totalScore:
          quiz.totalScore !== undefined
            ? quiz.totalScore
            : prevEditedQuiz.totalScore,
      }));
      setQuizTimeUnit(getInitialTimeUnit(quiz.quizTimer));
      setAnswerLockTimeUnit(getInitialTimeUnit(quiz.answerLockTimer));
    }
  }, [quiz]);

  const handleInputChange = (field, value) => {
    setEditedQuiz((prev) => ({ ...prev, [field]: value }));
  };

  const handleQuestionChange = (index, field, value) => {
    setEditedQuiz((prev) => {
      const updatedQuestions = [...prev.questions];
      updatedQuestions[index] = { ...updatedQuestions[index], [field]: value };
      return { ...prev, questions: updatedQuestions };
    });
  };

  const addQuestion = () => {
    setEditedQuiz((prev) => ({
      ...prev,
      questions: [
        ...prev.questions,
        {
          text: "",
          media: "",
          answers: ["", "", "", ""],
          correctAnswerIndex: 0,
          points: 0,
          type: "American",
          difficulty: "Easy",
          explanation: "",
        },
      ],
    }));
  };

  const removeQuestion = (index) => {
    setEditedQuiz((prev) => {
      const updatedQuestions = prev.questions.filter((_, i) => i !== index);
      return { ...prev, questions: updatedQuestions };
    });
  };

  const handleTimeInputChange = (field, value, unit) => {
    const milliseconds = convertToMilliseconds(Number(value), unit);
    handleInputChange(field, milliseconds);
  };

  const handleSubmit = async () => {
    const quizId = quiz?._id;

    if (!quizId) {
      console.error("Quiz ID is missing!");
      setError("Quiz ID is missing!");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      // Prepare data: remove _id from the object being sent
      const { _id, ...quizDataToSend } = editedQuiz;

      // Ensure questions array is properly formatted
      const preparedQuiz = {
        ...quizDataToSend,
        questions: quizDataToSend.questions.map((question) => ({
          ...question,
          answers: question.answers || [], // Ensure answers is always an array
          type: question.type || "American", // Default value if undefined
          difficulty: question.difficulty || "Easy", // Default value if undefined
          correctAnswerIndex:
            question.correctAnswerIndex !== undefined
              ? question.correctAnswerIndex
              : 0,
        })),
      };

      await editQuiz(quizId, preparedQuiz); // Send data WITHOUT _id
      onClose();
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to update quiz. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getQuizTimerDisplayValue = () => {
    return quizTimeUnit === "hours"
      ? editedQuiz.quizTimer / (60 * 60 * 1000)
      : quizTimeUnit === "minutes"
      ? editedQuiz.quizTimer / (60 * 1000)
      : editedQuiz.quizTimer / 1000;
  };

  const getAnswerLockTimerDisplayValue = () => {
    return answerLockTimeUnit === "hours"
      ? editedQuiz.answerLockTimer / (60 * 60 * 1000)
      : answerLockTimeUnit === "minutes"
      ? editedQuiz.answerLockTimer / (60 * 1000)
      : editedQuiz.answerLockTimer / 1000;
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>עריכת חידון</DialogTitle>
      <DialogContent dividers>
        {error && <Alert severity="error">{error}</Alert>}
        <TextField
          label="שם החידון"
          fullWidth
          value={editedQuiz.title || ""}
          onChange={(e) => handleInputChange("title", e.target.value)}
          margin="dense"
        />

        {/* Quiz Timer Input */}
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={6}>
            <TextField
              label="זמן חידון"
              type="number"
              fullWidth
              value={getQuizTimerDisplayValue()}
              onChange={(e) =>
                handleTimeInputChange("quizTimer", e.target.value, quizTimeUnit)
              }
              margin="dense"
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth margin="dense">
              <InputLabel>יחידה</InputLabel>
              <Select
                value={quizTimeUnit}
                onChange={(e) => setQuizTimeUnit(e.target.value)}
              >
                <MenuItem value="hours">שעות</MenuItem>
                <MenuItem value="minutes">דקות</MenuItem>
                <MenuItem value="seconds">שניות</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {/* Answer Lock Timer Input */}
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={6}>
            <TextField
              label="זמן נעילת תשובה"
              type="number"
              fullWidth
              value={getAnswerLockTimerDisplayValue()}
              onChange={(e) =>
                handleTimeInputChange(
                  "answerLockTimer",
                  e.target.value,
                  answerLockTimeUnit
                )
              }
              margin="dense"
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth margin="dense">
              <InputLabel>יחידה</InputLabel>
              <Select
                value={answerLockTimeUnit}
                onChange={(e) => setAnswerLockTimeUnit(e.target.value)}
              >
                <MenuItem value="hours">שעות</MenuItem>
                <MenuItem value="minutes">דקות</MenuItem>
                <MenuItem value="seconds">שניות</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <FormControl fullWidth margin="dense">
          <InputLabel>מצב חידון</InputLabel>
          <Select
            value={editedQuiz.isActive !== undefined ? editedQuiz.isActive : true} // Handle undefined
            onChange={(e) => handleInputChange("isActive", e.target.value)}
          >
            <MenuItem value={true}>פעיל</MenuItem>
            <MenuItem value={false}>לא פעיל</MenuItem>
          </Select>
        </FormControl>

        <Typography variant="h6" sx={{ mt: 3 }}>
          שאלות
        </Typography>
        <List>
          {editedQuiz.questions.map((question, index) => (
            <ListItem
              key={index}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <TextField
                label={`שאלה ${index + 1}`}
                fullWidth
                value={question.text || ""}
                onChange={(e) =>
                  handleQuestionChange(index, "text", e.target.value)
                }
                margin="dense"
              />

              {/* Media */}
              <TextField
                label="קישור לתמונה/סרטון"
                fullWidth
                value={question.media || ""}
                onChange={(e) =>
                  handleQuestionChange(index, "media", e.target.value)
                }
                margin="dense"
              />

              {question.answers.map((answer, ansIndex) => (
                <TextField
                  key={ansIndex}
                  label={`תשובה ${ansIndex + 1}`}
                  fullWidth
                  value={answer || ""}
                  onChange={(e) => {
                    setEditedQuiz((prevQuiz) => {
                      const updatedQuestions = [...prevQuiz.questions];
                      const updatedAnswers = [
                        ...updatedQuestions[index].answers,
                      ];
                      updatedAnswers[ansIndex] = e.target.value;
                      updatedQuestions[index] = {
                        ...updatedQuestions[index],
                        answers: updatedAnswers,
                      };
                      return { ...prevQuiz, questions: updatedQuestions };
                    });
                  }}
                  margin="dense"
                />
              ))}

              <FormControl fullWidth margin="dense">
                <InputLabel>תשובה נכונה</InputLabel>
                <Select
                  value={question.correctAnswerIndex !== undefined ? question.correctAnswerIndex : 0}
                  onChange={(e) =>
                    handleQuestionChange(
                      index,
                      "correctAnswerIndex",
                      Number(e.target.value)
                    )
                  }
                >
                  {question.answers.map((_, ansIndex) => (
                    <MenuItem key={ansIndex} value={ansIndex}>
                      תשובה {ansIndex + 1}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                label="נקודות"
                type="number"
                fullWidth
                value={question.points || 0}
                onChange={(e) =>
                  handleQuestionChange(index, "points", Number(e.target.value))
                }
                margin="dense"
              />

              <FormControl fullWidth margin="dense">
                <InputLabel>סוג שאלה</InputLabel>
                <Select
                  value={question.type || "American"}
                  onChange={(e) =>
                    handleQuestionChange(index, "type", e.target.value)
                  }
                >
                  <MenuItem value="American">אמריקאית</MenuItem>
                  <MenuItem value="TrueOrFalse">נכון או לא נכון</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth margin="dense">
                <InputLabel>רמת קושי</InputLabel>
                <Select
                  value={question.difficulty || "Easy"}
                  onChange={(e) =>
                    handleQuestionChange(index, "difficulty", e.target.value)
                  }
                >
                  <MenuItem value="Easy">קל</MenuItem>
                  <MenuItem value="Medium">בינוני</MenuItem>
                  <MenuItem value="Hard">קשה</MenuItem>
                </Select>
              </FormControl>

              <TextField
                label="הסבר"
                fullWidth
                value={question.explanation || ""}
                onChange={(e) =>
                  handleQuestionChange(index, "explanation", e.target.value)
                }
                margin="dense"
              />

              <IconButton
                color="error"
                onClick={() => removeQuestion(index)}
                sx={{ mt: 1 }}
              >
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
        <Button
          startIcon={<AddCircleOutlineIcon />}
          onClick={addQuestion}
          color="primary"
        >
          הוסף שאלה
        </Button>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          ביטול
        </Button>
        <Button
          onClick={handleSubmit}
          color="primary"
          variant="contained"
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "שמור שינויים"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditQuizForm;