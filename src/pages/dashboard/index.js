import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Paper, Button } from "@mui/material";
import MainContainer from "../../../components/mainContainer";
import UserList from "../../components/UserList";
import UserDetails from "../../components/UserDetails";
import AddUserDialog from "../../components/AddUserDialog";
import EditUserDialog from "../../components/EditUserDialog";
import AddQuizDialog from "../../components/AddQuizDialog";
import { useUserContext } from "../../context/userContext";

const Dashboard = () => {
  const { userList, fetchUserList, isLoading: userLoading } = useUserContext();
  const [selectedUser, setSelectedUser] = useState(null);
  const [addUserDialogOpen, setAddUserDialogOpen] = useState(false);
  const [editUserDialogOpen, setEditUserDialogOpen] = useState(false);
  const [addQuizDialogOpen, setAddQuizDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchUserList();
  }, []);

  if (userLoading) {
    return (
      <Box display="flex" alignItems="center" justifyContent="center" height="100vh">
        <Typography variant="h5">טוען...</Typography>
      </Box>
    );
  }

  return (
    <MainContainer>
      {/* 🏠 Page Title */}
      <Typography variant="h4" textAlign="center" sx={{ mb: 4 }}>
        דשבורד
      </Typography>

      <Grid container spacing={3}>
        {/* 📂 User List Section */}
        <Grid item xs={4}>
          <Paper elevation={3} sx={{ p: 3, bgcolor: "#f9f9f9" }}>
            <UserList
              userList={userList}
              setSelectedUser={setSelectedUser}
              setEditUserDialogOpen={setEditUserDialogOpen}
              setEditingUser={setEditingUser}
              fetchUserList={fetchUserList}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => setAddUserDialogOpen(true)}
              fullWidth
              sx={{ mt: 2 }}
            >
              הוסף משתמש חדש
            </Button>
          </Paper>
        </Grid>

        {/* 📂 User Details Section */}
        <Grid item xs={4}>
          <UserDetails user={selectedUser} fetchUserList={fetchUserList} />
        </Grid>

        {/* 📂 Quiz Management Section */}
        <Grid item xs={4}>
          <Paper elevation={3} sx={{ p: 3, bgcolor: "#f9f9f9" }}>
            <Typography variant="h6" sx={{ mb: 2 }}>ניהול חידונים</Typography>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => setAddQuizDialogOpen(true)}
              fullWidth
            >
              הוסף חידון חדש
            </Button>
          </Paper>
        </Grid>
      </Grid>

      {/* 🛠 Dialogs */}
      <AddUserDialog open={addUserDialogOpen} onClose={() => setAddUserDialogOpen(false)} />
      <EditUserDialog
        open={editUserDialogOpen}
        onClose={() => setEditUserDialogOpen(false)}
        user={editingUser}
        fetchUserList={fetchUserList}
      />
      <AddQuizDialog open={addQuizDialogOpen} onClose={() => setAddQuizDialogOpen(false)} />
    </MainContainer>
  );
};

export default Dashboard;
