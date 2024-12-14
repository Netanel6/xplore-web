// pages/login.js
import React, { useState } from "react";
import { Box, TextField, Button, Typography, Alert } from "@mui/material";
import { useRouter } from "next/router";

const LoginScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    setError("");
    setSuccessMessage("");
  
    if (!phoneNumber) {
      setError("Please enter a valid phone number.");
      return;
    }
  
    try {
      // Make the API call with the phone number query
      const response = await fetch(`http://localhost:8080/users/${phoneNumber}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.ok) {
        const result = await response.json(); // Parse the API response
        console.log("API Response:", result); // Debug log to inspect the response
  
        if (result.status === "success" && result.data) {
          const user = result.data; // Extract the user data
          setSuccessMessage(`ברוכים הבאים, ${user.name}!`);
          setTimeout(() => router.push("/dashboard"), 2000); // Navigate to dashboard after 2 seconds
        } else {
          setError(result.message || "User not found. Please check your phone number.");
        }
      } else {
        setError("Failed to fetch user. Please try again later.");
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
        Xplore ברוכים הבאים
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      {successMessage && <Alert severity="success">{successMessage}</Alert>}
      <TextField
        label="מס׳ טלפון"
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
        התחברות
      </Button>
    </Box>
  );
};

export default LoginScreen;
