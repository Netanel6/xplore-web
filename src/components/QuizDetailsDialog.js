// QuizDetailsDialog.js
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
  Divider,
  Box,
  Chip,
  Card,
  CardContent,
} from "@mui/material"; // Added Card and CardContent
import { formatTime } from "../utils/timeUtils";

const QuizDetailsDialog = ({ open, onClose, quiz }) => {
  if (!quiz) return null;

  const formattedQuizTimeLimit = formatTime(quiz.quizTimer, { showZeroSeconds: false });
  const formattedAnswerLockTimeLimit = formatTime(quiz.answerLockTimer, { showZeroSeconds: false });

    // Helper function for consistent styling of labels
    const labelStyle = { fontWeight: 'bold', marginRight: '8px' };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ textAlign: "center", backgroundColor: '#f0f0f0', fontWeight: 'bold' }}>
        {quiz.title}
      </DialogTitle>
      <DialogContent sx={{ padding: '24px' }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
           <Box>
                <Typography variant="body1">
                   <span style={labelStyle}>מגבלת זמן למבחן:</span> {formattedQuizTimeLimit}
                </Typography>
                <Typography variant="body1">
                   <span style={labelStyle}>מגבלת זמן לכל שאלה:</span> {formattedAnswerLockTimeLimit}
                </Typography>
           </Box>
          <Chip
            label={quiz.isActive ? "פעיל" : "לא פעיל"}
            color={quiz.isActive ? "success" : "default"}
            sx={{ justifySelf: 'flex-end' }} // Align to the right
          />
        </Box>

        <Divider sx={{ mb: 2 }} />

        <Typography variant="h6" sx={{ mt: 1, mb: 3, textAlign: 'center', textDecoration: 'underline' }}>
          שאלות
        </Typography>
        {quiz.questions?.length > 0 ? (
          <List>
            {quiz.questions.map((question, index) => (
              <Card key={index} sx={{ mb: 2,  border: '1px solid #ddd', borderRadius: '8px' }}>
                <CardContent>
                  <ListItem sx={{ display: "block" }}>
                    <ListItemText
                      primary={
                        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                          שאלה {index + 1}: {question.text}
                        </Typography>
                      }
                      secondary={
                        <>
                         <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                            <Typography variant="body2" component="span" sx={labelStyle}>
                              סוג שאלה:
                            </Typography>
                            <Chip
                              label={question.type === "American" ? "אמריקאית" : "נכון/לא נכון"}
                              color="primary"
                              size="small"
                              sx={{ ml: 1 }}
                            />
                              <Typography variant="body2" component="span" sx={{...labelStyle, ml:2}}>
                                  קושי:
                              </Typography>
                               <Chip
                                  label={question.difficulty}
                                  color="secondary"
                                  size="small"
                                  sx={{ ml: 1 }}
                              />
                          </Box>

                          {question.media && (
                            <Box sx={{ mt: 2 }}>
                              <Typography variant="body2" sx={labelStyle}>מדיה:</Typography>
                                {question.media.startsWith("http") ? ( // Basic check if it's a URL
                                  <img src={question.media} alt={`Media for question ${index + 1}`} style={{ maxWidth: '100%', maxHeight: '200px' }} />
                                ) : (
                                  <Typography variant="body2">{question.media}</Typography> // Display as text if not a URL
                                )}
                            </Box>
                          )}
                          <Typography variant="body2" sx={{ mt: 1 }}>
                          <span style={labelStyle}>תשובות:</span> {question.answers.join(", ")}
                          </Typography>
                          <Typography variant="body2" sx={{ mt: 1 }}>
                          <span style={labelStyle}>תשובה נכונה:</span> {question.answers[question.correctAnswerIndex]}
                          </Typography>
                          {question.explanation && (
                            <Typography variant="body2" sx={{ mt: 1 }}>
                            <span style={labelStyle}>הסבר:</span> {question.explanation}
                            </Typography>
                          )}
                        </>
                      }
                    />
                  </ListItem>
                </CardContent>
              </Card>
            ))}
          </List>
        ) : (
          <Typography variant="body2" color="textSecondary">
            אין שאלות זמינות.
          </Typography>
        )}
      </DialogContent>
      <DialogActions sx={{ padding: '16px 24px' }}>
        <Button onClick={onClose} color="primary" variant="contained">
          סגור
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default QuizDetailsDialog;