import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Button,
  Divider,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  TextField,
  Alert,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import MainContainer from "../../components/mainContainer";

const Dashboard = ({ users }) => {
  const [hydrated, setHydrated] = useState(false);
  const [addUserDialogOpen, setAddUserDialogOpen] = useState(false);
  const [newUserName, setNewUserName] = useState("");
  const [newUserPhoneNumber, setNewUserPhoneNumber] = useState("");
  const [userList, setUserList] = useState(users || []);
  const [selectedUser, setSelectedUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return null; // Prevent UI mismatch
  }

  const handleAddUser = async () => {
    if (!newUserName || !newUserPhoneNumber) {
      setError("נא למלא את כל השדות.");
      return;
    }

    const newUser = { name: newUserName, phone_number: newUserPhoneNumber, quiz_list: [] };
    try {
      const response = await fetch("http://localhost:8080/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      if (response.ok) {
        const result = await response.json();
        setUserList((prev) => [...prev, result.data]);
        setAddUserDialogOpen(false);
        setNewUserName("");
        setNewUserPhoneNumber("");
        setError("");
      } else {
        setError("לא ניתן להוסיף משתמש.");
      }
    } catch (error) {
      setError("שגיאה בחיבור לשרת.");
      console.error("Error adding user:", error);
    }
  };

  return (
    <MainContainer onAddUser={() => setAddUserDialogOpen(true)}>
      <Typography
        variant="h4"
        component="h1"
        textAlign="center"
        sx={{ fontWeight: "bold", color: "#1976d2", mb: 2 }}
      >
        דשבורד
      </Typography>
      <Box display="flex" height="100%" overflow="hidden">
        {/* Scrollable User List Container */}
        <Box
          width="30%"
          bgcolor="#f5f5f5"
          p={2}
          boxShadow="0px 4px 12px rgba(0, 0, 0, 0.1)"
          overflow="auto"
        >
          <Typography variant="h6" sx={{ mb: 2, fontWeight: "medium" }}>
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
                  p: 1,
                  borderRadius: "8px",
                  "&:hover": { backgroundColor: "#e0e0e0" },
                }}
              >
                <Avatar sx={{ mr: 2 }}>
                  <PersonIcon />
                </Avatar>
                <ListItemText
                  primary={
                    <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                      {user.name}
                    </Typography>
                  }
                  secondary={`מס׳ טלפון: ${user.phone_number}`}
                />
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Main Content */}
        <Box
          flex={1}
          p={3}
          ml={2}
          bgcolor="#ffffff"
          boxShadow="0px 4px 12px rgba(0, 0, 0, 0.1)"
        >
          {selectedUser ? (
            <Box>
              <Typography variant="h5" sx={{ mb: 2 }}>
                פרטי משתמש
              </Typography>
              <Typography variant="body1">
                <strong>שם:</strong> {selectedUser.name}
              </Typography>
              <Typography variant="body1">
                <strong>מס׳ טלפון:</strong> {selectedUser.phone_number}
              </Typography>
              <Typography variant="body1" sx={{ mt: 2 }}>
                <strong>שאלונים:</strong>
              </Typography>
              {Array.isArray(selectedUser.quiz_list) &&
              selectedUser.quiz_list.length > 0 ? (
                <List sx={{ mt: 1 }}>
                  {selectedUser.quiz_list.map((quiz) => (
                    <ListItem key={quiz.id} sx={{ padding: 0 }}>
                      <ListItemText primary={quiz.title} />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Typography variant="body2" color="textSecondary">
                  אין שאלונים למשתמש הזה.
                </Typography>
              )}
            </Box>
          ) : (
            <Typography variant="body2" color="textSecondary">
              בחר משתמש כדי לראות פרטים.
            </Typography>
          )}
        </Box>
      </Box>

      {/* Add User Dialog */}
      <Dialog open={addUserDialogOpen} onClose={() => setAddUserDialogOpen(false)}>
        <DialogTitle>הוסף משתמש</DialogTitle>
        <DialogContent>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <TextField
            label="שם"
            value={newUserName}
            onChange={(e) => setNewUserName(e.target.value)}
            fullWidth
            margin="dense"
          />
          <TextField
            label="מס׳ טלפון"
            value={newUserPhoneNumber}
            onChange={(e) => setNewUserPhoneNumber(e.target.value)}
            fullWidth
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddUserDialogOpen(false)} color="secondary">
            ביטול
          </Button>
          <Button onClick={handleAddUser} color="primary">
            הוסף
          </Button>
        </DialogActions>
      </Dialog>
    </MainContainer>
  );
};

export async function getServerSideProps() {
  try {
    const response = await fetch("http://localhost:8080/users/all");
    const result = await response.json();

    const users = Array.isArray(result.data) ? result.data : [];

    return {
      props: {
        users,
      },
    };
  } catch (error) {
    console.error("Error fetching users:", error);
    return {
      props: {
        users: [],
      },
    };
  }
}

export default Dashboard;
