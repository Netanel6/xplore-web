import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Button,
  Divider,
  Paper,
  Grid,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import MainContainer from "../../../components/mainContainer";
import AssignQuizDialog from "../../components/AssignQuizDialog";
import AddUserDialog from "../../components/AddUserDialog";
import AddQuizDialog from "../../components/AddQuizDialog";
import QuizDetailsDialog from "../../components/QuizDetailsDialog"; // Import QuizDetailsDialog
import { useUserContext } from "../../context/userContext";
import { useQuizContext } from "../../context/quizContext";

const Dashboard = () => {
  const { userList, fetchUserList, isLoading: userLoading } = useUserContext();
  const { quizList, fetchQuizList, isLoading: quizLoading } = useQuizContext();
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedQuiz, setSelectedQuiz] = useState(null); // State for selected quiz
  const [assignQuizDialogOpen, setAssignQuizDialogOpen] = useState(false);
  const [addUserDialogOpen, setAddUserDialogOpen] = useState(false);
  const [addQuizDialogOpen, setAddQuizDialogOpen] = useState(false);
  const [quizDetailsDialogOpen, setQuizDetailsDialogOpen] = useState(false); // State for quiz details dialog

  useEffect(() => {
    fetchUserList();
    fetchQuizList();
  }, [fetchUserList, fetchQuizList]);

  if (userLoading || quizLoading) {
    return (
      <Box display="flex" alignItems="center" justifyContent="center" height="100vh">
        <Typography variant="h5">טוען...</Typography>
      </Box>
    );
  }

  return (
    <MainContainer>
      <Typography variant="h4" textAlign="center" sx={{ mb: 4 }}>
        דשבורד
      </Typography>
      <Grid container spacing={3}>
        {/* User Section */}
        <Grid item xs={4}>
          <Paper elevation={3} sx={{ p: 3, bgcolor: "#f9f9f9" }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              רשימת משתמשים
            </Typography>
            <List>
              {userList.map((user) => (
                <ListItem
                  key={user._id}
                  button
                  onClick={() => setSelectedUser(user)}
                  sx={{
                    mb: 1,
                    borderRadius: "8px",
                    "&:hover": { backgroundColor: "#e0e0e0" },
                  }}
                >
                  <Avatar sx={{ mr: 2, bgcolor: "#1976d2" }}>
                    <PersonIcon />
                  </Avatar>
                  <ListItemText
                    primary={user.name}
                    secondary={`מס׳ טלפון: ${user.phone_number}`}
                  />
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedUser(user);
                      setAssignQuizDialogOpen(true);
                    }}
                  >
                    הוסף שאלון
                  </Button>
                </ListItem>
              ))}
            </List>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setAddUserDialogOpen(true)}
              fullWidth
              sx={{ mt: 3 }}
            >
              הוסף משתמש חדש
            </Button>
          </Paper>
        </Grid>

        {/* User Info Section */}
        <Grid item xs={8}>
          <Paper elevation={3} sx={{ p: 3, bgcolor: "#fff" }}>
            {selectedUser ? (
              <>
                <Typography variant="h5" sx={{ mb: 2 }}>
                  פרטי משתמש
                </Typography>
                <Typography variant="body1">
                  <strong>שם:</strong> {selectedUser.name}
                </Typography>
                <Typography variant="body1">
                  <strong>מס׳ טלפון:</strong> {selectedUser.phone_number}
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Typography variant="h6" sx={{ mb: 2 }}>
                  שאלונים משויכים
                </Typography>
                {selectedUser.quiz_list?.length > 0 ? (
                  <List>
                    {selectedUser.quiz_list.map((quiz) => (
                      <ListItem key={quiz.id}>
                        <ListItemText primary={quiz.title} />
                      </ListItem>
                    ))}
                  </List>
                ) : (
                  <Typography color="textSecondary">אין שאלונים משויכים למשתמש זה.</Typography>
                )}
              </>
            ) : (
              <Typography variant="body1" color="textSecondary">
                בחר משתמש כדי לראות פרטים.
              </Typography>
            )}
          </Paper>
        </Grid>

        {/* Quiz Section */}
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 3, bgcolor: "#e8f5e9" }}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="h6" sx={{ mb: 2 }}>
                רשימת שאלונים
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => setAddQuizDialogOpen(true)}
              >
                הוסף שאלון חדש
              </Button>
            </Box>
            <List>
              {quizList.map((quiz) => (
                <ListItem
                  key={quiz._id}
                  button
                  onClick={() => {
                    setSelectedQuiz(quiz);
                    setQuizDetailsDialogOpen(true);
                  }}
                  sx={{
                    mb: 1,
                    borderRadius: "8px",
                    "&:hover": { backgroundColor: "#e0e0e0" },
                  }}
                >
                  <ListItemText
                    primary={quiz.title}
                    secondary={quiz.description}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>

      {/* Dialogs */}
      <AssignQuizDialog
        open={assignQuizDialogOpen}
        onClose={() => setAssignQuizDialogOpen(false)}
        selectedUser={selectedUser}
      />
      <AddUserDialog
        open={addUserDialogOpen}
        onClose={() => setAddUserDialogOpen(false)}
      />
      <AddQuizDialog
        open={addQuizDialogOpen}
        onClose={() => setAddQuizDialogOpen(false)}
      />
      <QuizDetailsDialog
        open={quizDetailsDialogOpen}
        onClose={() => setQuizDetailsDialogOpen(false)}
        quiz={selectedQuiz}
      />
    </MainContainer>
  );
};

export default Dashboard;
