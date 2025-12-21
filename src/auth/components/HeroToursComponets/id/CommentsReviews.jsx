"use client";
import React, { useState } from "react";
import { Box, Typography, Button, TextField } from "@mui/material";
import Rating from "@mui/material/Rating";
import { toast } from "react-toastify";
import Image from "next/image";
import { useTheme } from "@mui/material/styles"; // ✅ استدعاء الثيم

const CommentsReviews = ({ comments = [], tour, user, userName }) => {
  const muiTheme = useTheme(); // ✅ يجيب الثيم الحالي

  const [page, setPage] = useState(0);
  const [name, setName] = useState(userName);
  const [commentText, setCommentText] = useState("");
  const [rating, setRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [commentsState, setComments] = useState(comments);

  const commentsPerPage = 5;
  const totalPages = Math.ceil(commentsState.length / commentsPerPage);
  const currentComments = commentsState.slice(
    page * commentsPerPage,
    (page + 1) * commentsPerPage
  );

  const filterInput = (value) => value.replace(/[^a-zA-Z0-9 ]/g, "");

  const avatarImages = [
    "icons8-crook-and-flail-64.webp",
    "icons8-egypt-64.webp",
    "icons8-pharaoh-64.webp",
    "icons8-egyptian-64.webp",
    "icons8-pharaoh-96.webp",
    "icons8-ancient-64.webp",
    "icons8-egyptology-64.webp",
  ];
  const randomAvatar =
    avatarImages[Math.floor(Math.random() * avatarImages.length)];

  const handleSubmit = async ({ user, tour }) => {
    if (!name || !commentText || rating <= 0) {
      toast.error("Please fill in all fields and select the rating.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tourId: tour,
          rating,
          comment: commentText,
          userId: user,
          name,
          created_at: new Date().toISOString(),
          avatar: randomAvatar,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        toast.error(result.error || "Failed to submit comment");
      } else {
        toast.success("Comment sent successfully ✅");
        setName("");
        setCommentText("");
        setRating(0);

        setComments([
          {
            name,
            rating,
            comment: commentText,
            avatar: randomAvatar,
          },
          ...commentsState,
        ]);
      }
    } catch (err) {
      toast.error("An error occurred while sending. ❌");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography
        variant="h5"
        sx={{ color: muiTheme.palette.primary.main, mb: 2 }}
      >
        Comments & Reviews
      </Typography>

      {currentComments.map((comment, index) => (
        <Box
          key={index}
          sx={{
            p: 2,
            borderRadius: 2,
            border: `1px solid ${muiTheme.palette.divider}`,
            display: "flex",
            flexDirection: "row",
            backgroundColor: muiTheme.palette.background.paper,
          }}
        >
          <div className="w-[15%] flex items-start justify-center">
            <Image
              src={
                comment.avatar
                  ? `/assets/${comment.avatar}`
                  : "/assets/default.jpg"
              }
              width={80}
              height={40}
              alt="User Avatar"
              style={{ objectFit: "cover", objectPosition: "center" }}
            />
          </div>
          <div>
            <Typography
              sx={{
                color: muiTheme.palette.secondary.main,
                fontWeight: "bold",
                textTransform: "capitalize",
              }}
            >
              {comment.name || "User"}
            </Typography>
            <Rating value={comment.rating} readOnly />
            <Typography
              sx={{
                color: muiTheme.palette.text.secondary,
                mt: 1,
                textTransform: "capitalize",
              }}
            >
              {comment.comment}
            </Typography>
          </div>
        </Box>
      ))}

      {/* ✅ Pagination */}
      <Box
        sx={{ display: "flex", justifyContent: "center", gap: 1, mt: 2, mb: 2 }}
      >
        {Array.from({ length: totalPages }).map((_, index) => (
          <Button
            key={index}
            variant={page === index ? "contained" : "outlined"}
            onClick={() => setPage(index)}
            sx={{
              backgroundColor:
                page === index ? muiTheme.palette.primary.main : "transparent",
              color:
                page === index
                  ? muiTheme.palette.common.white
                  : muiTheme.palette.primary.main,
              borderColor: muiTheme.palette.primary.main,
              fontWeight: "bold",
              minWidth: "40px",
              padding: "6px 12px",
              borderRadius: "8px",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: muiTheme.palette.primary.main,
                color: muiTheme.palette.common.white,
              },
            }}
          >
            {index + 1}
          </Button>
        ))}
      </Box>

      {/* ✅ Add Comment Form */}
      <Box sx={{ p: 2, borderRadius: 2 }}>
        <Typography sx={{ color: muiTheme.palette.primary.main, mb: 1 }}>
          Add Your Comment
        </Typography>

        <TextField
          fullWidth
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(filterInput(e.target.value))}
          variant="outlined"
          sx={{
            mb: 1,
            input: {
              color: muiTheme.palette.secondary.main,
              fontSize: "14px",
              fontWeight: "bold",
              fontFamily: "Cairo, sans-serif",
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: muiTheme.palette.secondary.main },
              "&:hover fieldset": { borderColor: muiTheme.palette.primary.main },
              "&.Mui-focused fieldset": {
                borderColor: muiTheme.palette.primary.main,
                borderWidth: "2px",
              },
            },
          }}
        />

        <Rating
          value={rating}
          onChange={(e, newValue) => setRating(newValue)}
          sx={{
            mb: 1,
            backgroundColor: muiTheme.palette.action.hover,
            borderRadius: "20px",
            p: 1,
          }}
        />

        <TextField
          fullWidth
          multiline
          rows={3}
          placeholder="Write your comment here..."
          value={commentText}
          onChange={(e) => setCommentText(filterInput(e.target.value))}
          variant="outlined"
          sx={{
            mb: 2,
            textarea: {
              color: muiTheme.palette.secondary.main,
              fontSize: "14px",
              fontWeight: "bold",
              fontFamily: "Cairo, sans-serif",
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: muiTheme.palette.secondary.main },
              "&:hover fieldset": { borderColor: muiTheme.palette.primary.main },
              "&.Mui-focused fieldset": {
                borderColor: muiTheme.palette.primary.main,
                borderWidth: "2px",
              },
            },
          }}
        />

        <Button
          variant="contained"
          sx={{
            backgroundColor: muiTheme.palette.primary.main,
            color: muiTheme.palette.getContrastText(
              muiTheme.palette.primary.main
            ),
          }}
          onClick={() => handleSubmit({ user, tour })}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Sending..." : "Send"}
        </Button>
      </Box>
    </Box>
  );
};

export default CommentsReviews;
