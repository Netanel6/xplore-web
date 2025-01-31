import React from "react";
import { Box, Button, Typography } from "@mui/material";

const MainContainer = ({ children }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      height="100vh"
      overflow="hidden"
      bgcolor="#f0f0f0"
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bgcolor="#1976d2"
        color="#fff"
        p={2}
      >
        <Typography variant="h5">ניהול מערכת</Typography>
      </Box>
      <Box flex={1} overflow="auto" p={2}>
        {children}
      </Box>
    </Box>
  );
};

export default MainContainer;
