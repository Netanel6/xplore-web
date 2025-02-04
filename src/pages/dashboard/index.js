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
  IconButton,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MainContainer from "../../../components/mainContainer";
import AddUserDialog from "../../components/AddUserDialog";
import EditUserDialog from "../../components/EditUserDialog"; // ✅ Import EditUserDialog
import UserDetails from "../../components/UserDetails";
import { useUserContext } from "../../context/userContext";
import { deleteUser } from "../../services/userService";

const Dashboard = () => {
  // 🏗 State Management
  const { userList, fetchUserList, isLoading: userLoading } = useUserContext();
  const [selectedUser, setSelectedUser] = useState(null);
  const [addUserDialogOpen, setAddUserDialogOpen] = useState(false);
  const [editUserDialogOpen, setEditUserDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  // ⏳ Fetch users when the component mounts
  useEffect(() => {
    fetchUserList();
  }, []);

  // 🛠 Handle User Deletion
  const handleDeleteUser = async (userId) => {
    if (window.confirm("האם אתה בטוח שברצונך למחוק את המשתמש?")) {
      try {
        await deleteUser(userId);
        fetchUserList(); // Refresh user list after deletion
        setSelectedUser(null); // Reset selected user
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  // 🛠 Handle User Editing (Open Dialog)
  const handleEditUser = (user) => {
    setEditingUser(user);
    setEditUserDialogOpen(true);
  };

  // ⏳ Loading State
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
            <Typography variant="h6" sx={{ mb: 2 }}>רשימת משתמשים</Typography>
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
                  secondaryAction={
                    <>
                      <IconButton color="primary" onClick={() => handleEditUser(user)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton color="error" onClick={() => handleDeleteUser(user.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </>
                  }
                >
                  <Avatar sx={{ mr: 2, bgcolor: "#1976d2" }}>
                    <PersonIcon />
                  </Avatar>
                  <ListItemText primary={user.name} secondary={`מס׳ טלפון: ${user.phone_number}`} />
                </ListItem>
              ))}
            </List>
            <Button variant="contained" color="primary" onClick={() => setAddUserDialogOpen(true)} fullWidth sx={{ mt: 3 }}>
              הוסף משתמש חדש
            </Button>
          </Paper>
        </Grid>

        {/* 📂 User Details Section */}
        <Grid item xs={8}>
          <UserDetails user={selectedUser} fetchUserList={fetchUserList} />
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
    </MainContainer>
  );
};

export default Dashboard;
