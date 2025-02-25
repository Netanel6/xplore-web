import React from "react";
import {
    List,
    ListItem,
    ListItemText,
    Avatar,
    IconButton,
    Typography,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useUserContext } from "../context/userContext";
import { deleteUser } from "../services/userService";

const UserList = ({ userList, setSelectedUser, setEditUserDialogOpen, setEditingUser, fetchUserList }) => {

    const handleDeleteUser = async (userId) => {
        if (window.confirm("האם אתה בטוח שברצונך למחוק את המשתמש?")) {
            try {
                await deleteUser(userId);
                fetchUserList();
                setSelectedUser(null);
            } catch (error) {
                console.error("Error deleting user:", error);
            }
        }
    };

    const handleEditUser = (user) => {
        setEditingUser(user);
        setEditUserDialogOpen(true);
    };

    return (
        <>
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
        </>
    );
};

export default UserList;
