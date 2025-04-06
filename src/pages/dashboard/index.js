import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, CircularProgress } from "@mui/material";
import MainContainer from "../../mainContainer";
import AddQuizDialog from "../../components/AddQuizDialog";
import { useUserContext } from "../../context/userContext";
import { useQuizContext } from "../../context/quizContext";
import UserManagement from "@/components/UserManagement";
import QuizManagement from "@/components/QuizManagement";

const Dashboard = () => {
  const { userList, fetchUserList, isLoading: userLoading } = useUserContext();
  const { quizList, fetchQuizList, isLoading: quizLoading } = useQuizContext();


  const [addQuizDialogOpen, setAddQuizDialogOpen] = useState(false);


  useEffect(() => {
    fetchUserList();
    fetchQuizList();
  }, [fetchUserList, fetchQuizList]);

  // Display a single loading indicator while either list is loading
  if (userLoading || quizLoading) {
    return (
      <MainContainer>
        <Box display="flex" alignItems="center" justifyContent="center" height="80vh">
          <CircularProgress />
          <Typography variant="h6" sx={{ ml: 2 }}>טוען נתונים...</Typography>
        </Box>
      </MainContainer>
    );
  }

  const handleAddQuizClose = () => setAddQuizDialogOpen(false);

  return (
    <MainContainer>
      {/* 🚦 Grid Container for 3 Columns */}
      <Grid container spacing={3}> {/* Adjust spacing as needed */}
        {/* 3️⃣ Quiz Management Section */}
        <Grid item xs={12} md={4}>
          <QuizManagement fetchQuizList={fetchQuizList} quizList={quizList} />
        </Grid>



        {/* 2️⃣ User Management Section */}
        <Grid item xs={12} md={4}>
          <UserManagement
            fetchUserList={fetchUserList}
            userList={userList}
          />
        </Grid>


        {/* 1️⃣ Add Quiz Section (Button Only) */}
        <Grid item xs={12} md={4}>
          <AddQuizDialog
            open={addQuizDialogOpen}
            onClose={handleAddQuizClose}
            fetchQuizList={fetchQuizList}
          />
        </Grid>


      </Grid>



    </MainContainer>
  );
};

export default Dashboard;