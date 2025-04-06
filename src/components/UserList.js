import React from "react";
import {
    List,
    ListItem,
    ListItemText,
    Avatar,
    IconButton,
    Typography,
    Box,
    Divider
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
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
        <Box dir="rtl"> {/* ✅ Full RTL direction */}
            <Typography variant="h6" sx={{ mb: 2, textAlign: "right" }}>
                רשימת משתמשים
            </Typography>
            <Divider sx={{ my: 2 }} />

            <List>
                {userList.map((user) => (
                    <ListItem
                        key={user._id}
                        button
                        sx={{
                            mb: 1,
                            borderRadius: "8px",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            "&:hover": { backgroundColor: "#e0e0e0" },
                        }}
                    >
                        <Avatar sx={{ m: 2, bgcolor: "#1976d2" }}>
                            <PersonIcon />
                        </Avatar>

                        <ListItemText
                            primary={user.name}
                            secondary={`מס׳ טלפון: ${user.phone_number}`}
                            sx={{ textAlign: "right" }}
                        />

                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <IconButton color="primary" onClick={() => handleEditUser(user)}>
                                <EditIcon />
                            </IconButton>
                            <IconButton color="error" onClick={() => handleDeleteUser(user.id)}>
                                <DeleteIcon />
                            </IconButton>
                        </Box>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default UserList;
