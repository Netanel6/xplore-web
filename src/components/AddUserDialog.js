import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import { useUserContext } from "../context/userContext";
import { addUser } from "../services/userService";

const AddUserDialog = ({ open, onClose }) => {
  const [newUserName, setNewUserName] = useState("");
  const [newUserPhoneNumber, setNewUserPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const { fetchUserList } = useUserContext();

  const handleAddUser = async () => {
    if (!newUserName || !newUserPhoneNumber) {
      setError("נא למלא את כל השדות.");
      return;
    }

    try {
      await addUser({ name: newUserName, phone_number: newUserPhoneNumber });
      fetchUserList(); // Refresh the user list
      onClose();
      setNewUserName("");
      setNewUserPhoneNumber("");
      setError("");
    } catch (err) {
      setError("לא ניתן להוסיף משתמש.");
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>הוסף משתמש</DialogTitle>
      <DialogContent>
        {error && <Alert severity="error">{error}</Alert>}
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
        <Button onClick={onClose} color="secondary">
          ביטול
        </Button>
        <Button onClick={handleAddUser} color="primary">
          שמור
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddUserDialog;
