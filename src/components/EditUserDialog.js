import React, { useState, useEffect } from "react";
import {
    Grid,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Button,
} from "@mui/material";
import { editUser } from "../services/userService";
import UserDetails from "../../src/components/UserDetails";
const EditUserDialog = ({ open, onClose, user, fetchUserList }) => {
    // 🏗 State Management
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [error, setError] = useState({ name: "", phoneNumber: "" });

    // 🔄 Populate fields when dialog opens
    useEffect(() => {
        if (user && open) {
            setName(user.name || "");
            setPhoneNumber(user.phone_number || "");
            setError({ name: "", phoneNumber: "" }); // Reset errors
        }
    }, [user, open]);

    // ✅ Validation Logic
    const validateFields = () => {
        let errors = { name: "", phoneNumber: "" };
        let valid = true;

        if (!name.trim()) {
            errors.name = "נא להזין שם";
            valid = false;
        }
        if (!phoneNumber.trim()) {
            errors.phoneNumber = "נא להזין מספר טלפון";
            valid = false;
        }

        setError(errors);
        return valid;
    };

    // 🛠 Handle Save
    const handleSave = async () => {
        if (!validateFields()) return;

        try {
            await editUser(user.id, { name, phone_number: phoneNumber });
            fetchUserList();
            onClose();
        } catch (error) {
            console.error("Error updating user:", error);
            alert("שגיאה בעדכון המשתמש");
        }
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth>
            <DialogTitle>ערוך משתמש</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="שם"
                    fullWidth
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    error={!!error.name}
                    helperText={error.name}
                />
                <TextField
                    margin="dense"
                    label="מספר טלפון"
                    fullWidth
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    error={!!error.phoneNumber}
                    helperText={error.phoneNumber}
                />
            </DialogContent>

            <Grid item xs={4}>
                <UserDetails user={user} fetchUserList={fetchUserList} />
            </Grid>

            <DialogActions>
                <Button onClick={onClose} color="secondary">ביטול</Button>
                <Button onClick={handleSave} color="primary" variant="contained">שמור</Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditUserDialog;
