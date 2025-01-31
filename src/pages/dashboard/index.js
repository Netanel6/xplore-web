import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Button,
  Paper,
  Grid,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import MainContainer from "../../../components/mainContainer";
import AddUserDialog from "../../components/AddUserDialog";
import AddQuizDialog from "../../components/AddQuizDialog";
import QuizDetailsDialog from "../../components/QuizDetailsDialog";
import UserDetails from "../../components/UserDetails"; // Import UserDetails
import QuizList from "../../components/QuizList"; // Import QuizList
import { useUserContext } from "../../context/userContext";

const Dashboard = () => {
  const { userList, fetchUserList, isLoading: userLoading } = useUserContext();
  const [selectedUser, setSelectedUser] = useState(null);
  const [addUserDialogOpen, setAddUserDialogOpen] = useState(false);
  const [addQuizDialogOpen, setAddQuizDialogOpen] = useState(false);

  useEffect(() => {
    fetchUserList();
  }, [fetchUserList]);

  if (userLoading) {
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

        {/* User Details Section */}
        <Grid item xs={8}>
          <UserDetails user={selectedUser} />
        </Grid>

        {/* Quiz Section */}
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 3, bgcolor: "#e8f5e9" }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              רשימת שאלונים
            </Typography>
            <QuizList />
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              sx={{ mt: 3 }}
              onClick={() => setAddQuizDialogOpen(true)}
            >
              הוסף שאלון חדש
            </Button>
          </Paper>
        </Grid>
      </Grid>

      {/* Dialogs */}
      <AddUserDialog
        open={addUserDialogOpen}
        onClose={() => setAddUserDialogOpen(false)}
      />
      <AddQuizDialog
        open={addQuizDialogOpen}
        onClose={() => setAddQuizDialogOpen(false)}
      />
    </MainContainer>
  );
};

export default Dashboard;
