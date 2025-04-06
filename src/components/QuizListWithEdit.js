import React, { useState } from "react";
import {
  List,
  ListItem,
  IconButton,
  Switch,
  ListItemText,
  ListItemSecondaryAction,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import EditQuizForm from "./EditQuizForm";
import { useQuizContext } from "../context/quizContext";

const QuizListWithEdit = ({ quizList, onQuizClick }) => {
  const [editQuizId, setEditQuizId] = useState(null);
  const { editQuiz } = useQuizContext();

  const handleEditClick = (quizId) => {
    setEditQuizId(quizId);
  };

  const handleCloseEditDialog = () => {
    setEditQuizId(null);
  };

  return (
    <>
      <List>
        {quizList.map((quiz) => (
          <ListItem
            key={quiz._id}
            button
            onClick={() => onQuizClick(quiz)}
            sx={{
              mb: 1,
              borderRadius: "8px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              "&:hover": { backgroundColor: "#f0f0f0" },
            }}
          >

            <ListItemText
              primary={
                quiz.title
              }
              secondary={
                quiz.description?.length > 20
                  ? `${quiz.description.substring(0, 20)}...`
                  : quiz.description
              }
              sx={{ textAlign: "right", flex: 1, whiteSpace: "nowrap" }}
            />

          
              <IconButton edge="end" onClick={() => handleEditClick(quiz._id)}>
                <EditIcon />
              </IconButton>
        
          </ListItem>
        ))}
      </List>

      {editQuizId && (
        <EditQuizForm
          open={true}
          onClose={handleCloseEditDialog}
          quiz={quizList.find((quiz) => quiz._id === editQuizId)}
        />
      )}
    </>
  );
};

export default QuizListWithEdit;