import React, { useState } from "react";
import { Box, Paper, Typography, Button, Divider, Stack } from "@mui/material";
import UserList from "./UserList";
import AddUserDialog from "./AddUserDialog";
import EditUserDialog from "./EditUserDialog";



const UserManagement = ({ fetchUserList, userList }) => {

    const [addUserDialogOpen, setAddUserDialogOpen] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [editUserDialogOpen, setEditUserDialogOpen] = useState(false);

    const handleAddUserClose = () => setAddUserDialogOpen(false);
    const handleEditUserClose = () => {
        setEditUserDialogOpen(false);
        setEditingUser(null);
    };

    return (
        <Box>
            <Paper elevation={3} sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Stack spacing={2} sx={{ flexGrow: 1 }}>
                    <Typography variant="h5" component="h2">
                        ניהול משתמשים
                    </Typography>
                    <Divider />
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => setAddUserDialogOpen(true)}
                        fullWidth
                        size="small"
                    >
                        הוסף משתמש חדש
                    </Button>
                    
                    {/* Make UserList expand and potentially scroll */}
                    <Box sx={{ flexGrow: 1, overflowY: 'auto', minHeight: 250 }}> {/* Adjusted minHeight */}
                        <UserList
                            userList={userList}
                            setEditUserDialogOpen={setEditUserDialogOpen}
                            setEditingUser={setEditingUser}
                            fetchUserList={fetchUserList}
                        />
                    </Box>
                </Stack>

                {/* 🛠 Dialogs - Rendered conditionally, OUTSIDE the Grid */}
                <AddUserDialog
                    open={addUserDialogOpen}
                    onClose={handleAddUserClose}
                    fetchUserList={fetchUserList}
                />
                {editingUser && (
                    <EditUserDialog
                        open={editUserDialogOpen}
                        onClose={handleEditUserClose}
                        user={editingUser}
                        fetchUserList={fetchUserList}
                    />
                )}
            </Paper>
        </Box>
    )
};

export default UserManagement;