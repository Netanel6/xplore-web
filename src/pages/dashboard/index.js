import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  TextField,
  Alert,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import MainContainer from "../../../components/mainContainer";

const Dashboard = () => {
  const [userList, setUserList] = useState([]);
  const [addUserDialogOpen, setAddUserDialogOpen] = useState(false);
  const [newUserName, setNewUserName] = useState("");
  const [newUserPhoneNumber, setNewUserPhoneNumber] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Helper function to get the token
  const getToken = () => {
    return localStorage.getItem("authToken") || ""; // Replace with your token retrieval logic
  };

  // Fetch users dynamically on page load
  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      setError("");

      try {
        const response = await fetch("http://localhost:8080/users/all", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`, // Add token to the header
          },
        });

        if (response.ok) {
          const result = await response.json();
          setUserList(result.data || []);
        } else {
          console.error("Failed to fetch users.");
          setError("שגיאה בטעינת משתמשים.");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        setError("שגיאה בטעינת משתמשים.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleAddUser = async () => {
    if (!newUserName || !newUserPhoneNumber) {
      setError("נא למלא את כל השדות.");
      return;
    }

    const newUser = { name: newUserName, phone_number: newUserPhoneNumber, quiz_list: [] };
    try {
      const response = await fetch("http://localhost:8080/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`, // Add token to the header
        },
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

  if (isLoading) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="100vh"
        bgcolor="#f9f9f9"
      >
        <Typography variant="h5">טוען משתמשים...</Typography>
      </Box>
    );
  }

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
        <Box
          width="30%"
          bgcolor="#f5f5f5"
          p={2}
          boxShadow="0px 4px 12px rgba(0, 0, 0, 0.1)"
          overflow="auto"
          sx={{ direction: "rtl" }}
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
                  textAlign: "right",
                }}
              >
                <ListItemText
                  primary={
                    <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                      {user.name}
                    </Typography>
                  }
                  secondary={`מס׳ טלפון: ${user.phone_number}`}
                />
                <Avatar sx={{ ml: 2 }}>
                  <PersonIcon />
                </Avatar>
              </ListItem>
            ))}
          </List>
        </Box>
        <Box
          flex={1}
          p={3}
          ml={2}
          bgcolor="#ffffff"
          boxShadow="0px 4px 12px rgba(0, 0, 0, 0.1)"
          sx={{ direction: "rtl" }}
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
      <Dialog
        open={addUserDialogOpen}
        onClose={() => setAddUserDialogOpen(false)}
        sx={{ direction: "rtl" }}
      >
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

export default Dashboard;
