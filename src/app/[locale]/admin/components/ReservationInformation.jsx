"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  CircularProgress,
  Button,
  Grid,
  Divider,
  Fade,
} from "@mui/material";
import { useAppContext } from "@/context/AppContext";
import { useTheme } from "@mui/material/styles";
import EmailIcon from "@mui/icons-material/Email";
import RateReviewIcon from "@mui/icons-material/RateReview";
import PaymentIcon from "@mui/icons-material/Payment";

const ReservationInformation = () => {
  const {
    users,
    loading,
    selectedUser,
    selectedType,
    fetchUserActivities,
    handleShowDetails,
    activeUsers,
  } = useAppContext();

  const muiTheme = useTheme();
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    setVisibleCount(6);
  }, [selectedUser, selectedType]);

  useEffect(() => {
    if (users?.id) fetchUserActivities(users.id);
  }, [users]);

  return (
    <Box sx={{ p: 4, width: "100%" }}>
      <Typography
        variant="h5"
        fontWeight="bold"
        mb={3}
        sx={{
          color: muiTheme.palette.secondary.main,
          fontFamily: "Cairo, sans-serif",
        }}
      >
        🧾 Users with Activities
      </Typography>

      {loading ? (
        <CircularProgress color="secondary" />
      ) : (
        <>
          <TableContainer
            component={Paper}
            sx={{
              borderRadius: 3,
              backgroundColor: muiTheme.palette.background.paper,
              boxShadow: muiTheme.shadows[3],
            }}
          >
            <Table>
              <TableHead
                sx={{
                  backgroundColor: muiTheme.palette.action.hover,
                  width: "100%",
                }}
              >
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold", color: muiTheme.palette.text.secondary }}>
                    👤 Name
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: muiTheme.palette.text.secondary }}>
                    📧 Email
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: muiTheme.palette.text.secondary }}>
                    💬 Messages
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: muiTheme.palette.text.secondary }}>
                    ⭐ Reviews
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: muiTheme.palette.text.secondary }}>
                    💳 Payments
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {activeUsers.map((user) => (
                  <TableRow
                    key={user.id}
                    sx={{
                      "&:hover": {
                        backgroundColor: muiTheme.palette.action.hover,
                      },
                    }}
                  >
                    <TableCell sx={{ color: muiTheme.palette.text.primary }}>
                      {user.name}
                    </TableCell>
                    <TableCell sx={{ color: muiTheme.palette.text.primary }}>
                      {user.email}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={`${user.messages?.length || 0} Messages`}
                        color="primary"
                        size="small"
                        onClick={() => handleShowDetails(user, "messages")}
                        sx={{ cursor: "pointer" }}
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={`${user.reviews?.length || 0} Reviews`}
                        color="success"
                        size="small"
                        onClick={() => handleShowDetails(user, "reviews")}
                        sx={{ cursor: "pointer" }}
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={`${user.payments?.length || 0} Payments`}
                        color="warning"
                        size="small"
                        onClick={() => handleShowDetails(user, "payments")}
                        sx={{ cursor: "pointer" }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {selectedUser && selectedType && (
            <Box sx={{ mt: 4 }}>
              <Typography
                variant="h6"
                fontWeight="bold"
                mb={2}
                sx={{
                  color: muiTheme.palette.secondary.main,
                  borderBottom: `2px solid ${muiTheme.palette.secondary.main}`,
                  pb: 1,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                {selectedType === "messages" && <EmailIcon color="secondary" />}
                {selectedType === "reviews" && <RateReviewIcon color="secondary" />}
                {selectedType === "payments" && <PaymentIcon color="secondary" />}
                Details of{" "}
                {selectedType === "messages"
                  ? "Messages"
                  : selectedType === "reviews"
                  ? "Reviews"
                  : "Payments"}{" "}
                for User: {selectedUser.name}
              </Typography>

              {selectedUser[selectedType]?.slice(0, visibleCount).map((item, index) => (
                <Fade in={true} timeout={600} key={item.id || index}>
                  <Paper
                    elevation={4}
                    sx={{
                      mb: 3,
                      p: 3,
                      borderRadius: 3,
                      backgroundColor: muiTheme.palette.background.paper,
                    }}
                  >
                    <Grid container spacing={2}>
                      {selectedType === "messages" && (
                        <>
                          <Grid item xs={6}>
                            <Typography><EmailIcon fontSize="small" /> Subject: {item.subject}</Typography>
                            <Typography>📱 Phone: {item.phone}</Typography>
                            <Typography>📝 Message: {item.message}</Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography><EmailIcon fontSize="small" /> Email: {item.email}</Typography>
                            <Typography>👤 Name: {item.name}</Typography>
                            <Typography>📅 Created At: {item.created_at}</Typography>
                          </Grid>
                        </>
                      )}

                      {selectedType === "reviews" && (
                        <>
                          <Grid item xs={6}>
                            <Typography><RateReviewIcon fontSize="small" /> Tour: {item.tourTitle}</Typography>
                            <Typography>⭐ Rating: {item.rating}</Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography>💬 Comment: {item.comment}</Typography>
                            <Typography>👤 Name: {item.name}</Typography>
                            <Typography>📅 Created At: {item.created_at}</Typography>
                          </Grid>
                        </>
                      )}

                      {selectedType === "payments" && (
                        <>
                          <Grid item xs={6}>
                            <Typography><PaymentIcon fontSize="small" /> Adults: {item.adults}</Typography>
                            <Typography>Children: {item.children || "null"}</Typography>
                            <Typography>💳 Amount: {item.amount_cents}</Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography>Email: {item.email || "null"}</Typography>
                            <Typography>Tour: {item.tourTitle || "null"}</Typography>
                            <Typography>Date: {item.tourDate || "null"}</Typography>
                          </Grid>
                        </>
                      )}
                    </Grid>

                    <Divider sx={{ my: 2 }} />

                    <Typography
                      sx={{
                        fontSize: "12px",
                        color: muiTheme.palette.text.secondary,
                        textAlign: "right",
                      }}
                    >
                      📅 Date: {new Date(item.created_at).toLocaleDateString("en-US")}
                    </Typography>
                  </Paper>
                </Fade>
              ))}

              {selectedUser[selectedType]?.length > visibleCount && (
                <Box sx={{ mt: 2, textAlign: "center" }}>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => setVisibleCount((prev) => prev + 6)}
                    sx={{ fontWeight: "bold", px: 4 }}
                  >
                    Show More ({selectedUser[selectedType].length - visibleCount})
                  </Button>
                </Box>
              )}
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default ReservationInformation;
