import React, { } from "react";
import { Box, Typography, Paper, Stack, Divider } from "@mui/material";
import QuizList from "@/components/QuizList";

const QuizManagement = ({ fetchQuizList, quizList }) => {

    return (
        <Paper elevation={3} sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Stack spacing={2} sx={{ flexGrow: 1 }}>
                <Typography variant="h5" component="h2">
                    רשימת חידונים
                </Typography>
                <Divider />
                {/* Make QuizList expand and potentially scroll */}
                <Box sx={{ flexGrow: 1, overflowY: 'auto', minHeight: 300 }}> {/* Adjusted minHeight */}
                    {quizList.length > 0 ? (
                        <QuizList quizList={quizList} fetchQuizList={fetchQuizList} />
                    ) : (
                        <Typography sx={{ textAlign: 'center', py: 5 }}>אין חידונים זמינים.</Typography>
                    )}
                </Box>
            </Stack>
        </Paper>
    )
};

export default QuizManagement;