import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Button,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import MainContainer from "../../../components/mainContainer";
import AssignQuizDialog from "../../components/AssignQuizDialog";
import AddUserDialog from "../../components/AddUserDialog";
import { useUserContext } from "../../context/userContext";

const Dashboard = () => {
  const { userList, fetchUserList, isLoading } = useUserContext();
  const [selectedUser, setSelectedUser] = useState(null);
  const [assignQuizDialogOpen, setAssignQuizDialogOpen] = useState(false);
  const [addUserDialogOpen, setAddUserDialogOpen] = useState(false);

  useEffect(() => {
    fetchUserList();
  }, [fetchUserList]);

  if (isLoading) {
    return (
      <Box display="flex" alignItems="center" justifyContent="center" height="100vh">
        <Typography variant="h5">טוען משתמשים...</Typography>
      </Box>
    );
  }

  return (
    <MainContainer onAddUser={() => setAddUserDialogOpen(true)}>
      <Typography variant="h4" textAlign="center" sx={{ mb: 2 }}>
        דשבורד
      </Typography>
      <Box display="flex" height="100%">
        <Box width="30%" p={2} bgcolor="#f5f5f5" overflow="auto">
          <Typography variant="h6" sx={{ mb: 2 }}>
            רשימת משתמשים
          </Typography>
          <List>
            {userList.map((user) => (
              <ListItem
                key={user._id}
                button
                onClick={() => setSelectedUser(user)}
                sx={{ mb: 1 }}
              >
                <Avatar sx={{ mr: 2 }}>
                  <PersonIcon />
                </Avatar>
                <ListItemText
                  primary={user.name}
                  secondary={`מס׳ טלפון: ${user.phone_number}`}
                />
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => {
                    setSelectedUser(user);
                    setAssignQuizDialogOpen(true);
                  }}
                >
                  הוסף שאלון
                </Button>
              </ListItem>
            ))}
          </List>
        </Box>
        <Box flex={1} p={3}>
          {selectedUser ? (
            <>
              <Typography variant="h5">פרטי משתמש</Typography>
              <Typography>שם: {selectedUser.name}</Typography>
              <Typography>מס׳ טלפון: {selectedUser.phone_number}</Typography>
              <Typography>שאלונים:</Typography>
              <List>
                {selectedUser.quiz_list?.map((quiz) => (
                  <ListItem key={quiz.id}>
                    <ListItemText primary={quiz.title} />
                  </ListItem>
                ))}
              </List>
            </>
          ) : (
            <Typography>בחר משתמש כדי לראות פרטים.</Typography>
          )}
        </Box>
      </Box>
      <AssignQuizDialog
        open={assignQuizDialogOpen}
        onClose={() => setAssignQuizDialogOpen(false)}
        selectedUser={selectedUser}
      />
      <AddUserDialog
        open={addUserDialogOpen}
        onClose={() => setAddUserDialogOpen(false)}
      />
    </MainContainer>
  );
};

export default Dashboard;
