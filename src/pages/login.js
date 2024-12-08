import React, { useState } from "react";
import { Box, TextField, Button, Typography, Alert } from "@mui/material";
import { useRouter } from "next/router"; // Import useRouter

const LoginScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter(); // Use useRouter from Next.js

  const handleLogin = async () => {
    setError("");
    setSuccessMessage("");

    if (!phoneNumber) {
      setError("Please enter a valid phone number.");
      return;
    }

    try {
      const response = await fetch(`/api/users?phoneNumber=${phoneNumber}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const user = await response.json();
        setSuccessMessage(`Welcome, ${user.name}!`);
        setTimeout(() => router.push("/dashboard"), 2000); // Navigate to dashboard after 2 seconds
      } else {
        setError("User not found. Please check your phone number.");
      }
    } catch (err) {
      console.error("Error during login:", err);
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      bgcolor="#f9f9f9"
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Login
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      {successMessage && <Alert severity="success">{successMessage}</Alert>}
      <TextField
        label="Phone Number"
        variant="outlined"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        fullWidth
        sx={{ maxWidth: "400px", marginTop: 2 }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleLogin}
        sx={{ marginTop: 2, maxWidth: "400px", width: "100%" }}
      >
        Login
      </Button>
    </Box>
  );
};

export default LoginScreen;