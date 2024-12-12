// pages/index.js
import React from "react";
import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";
import MainContainer from "../../components/mainContainer";

const Dashboard = ({ users }) => {
  return (
    <MainContainer>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Box width="100%" maxWidth="800px" mt={4}>
        <Typography variant="h6" gutterBottom>
          User List:
        </Typography>
        <List>
          {Array.isArray(users) && users.length > 0 ? (
            users.map((user) => (
              <ListItem
                key={user._id}
                sx={{
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  mb: 2,
                  padding: 2,
                  "&:hover": { backgroundColor: "#f9f9f9" },
                }}
              >
                <ListItemText
                  primary={<Typography variant="h6">{user.name}</Typography>}
                  secondary={
                    <Box>
                      <Typography variant="body2" color="textSecondary">
                        Phone: {user.phone_number}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" mt={1}>
                        Quizzes:
                      </Typography>
                      <List>
                        {user.quiz_list.map((quiz) => (
                          <ListItem
                            key={quiz.id}
                            sx={{
                              padding: 0,
                              ml: 2,
                              listStyleType: "disc",
                              display: "list-item",
                            }}
                          >
                            <ListItemText primary={quiz.title} />
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                  }
                />
              </ListItem>
            ))
          ) : (
            <Typography variant="body2" color="textSecondary">
              No users available.
            </Typography>
          )}
        </List>
      </Box>
    </MainContainer>
  );
};

export async function getServerSideProps() {
  try {
    // Fetch users data from your API
    const response = await fetch("http://localhost:8080/users/all");
    const result = await response.json();

    // Ensure result.data is an array
    const users = Array.isArray(result.data) ? result.data : [];

    return {
      props: {
        users,
      },
    };
  } catch (error) {
    console.error("Error fetching users:", error);
    return {
      props: {
        users: [], // Fallback to an empty array on error
      },
    };
  }
}

export default Dashboard;
