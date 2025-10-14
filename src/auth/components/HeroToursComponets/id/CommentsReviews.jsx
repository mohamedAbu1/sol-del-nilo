"use client";
import React, { useState } from "react";
import { Box, Typography, Button, TextField } from "@mui/material";
import Rating from "@mui/material/Rating";
import { toast } from "react-toastify";
import Image from "next/image";

const CommentsReviews = ({ comments = [], tour, user ,userName}) => {
  const [page, setPage] = useState(0);
  const [name, setName] = useState(userName);
  const [commentText, setCommentText] = useState("");
  const [rating, setRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ✅ حالة قابلة للتحديث للتعليقات
  const [commentsState, setComments] = useState(comments);

  const commentsPerPage = 5;
  const totalPages = Math.ceil(commentsState.length / commentsPerPage);
  const currentComments = commentsState.slice(
    page * commentsPerPage,
    (page + 1) * commentsPerPage
  );

  const filterInput = (value) => {
    // يسمح فقط بالأحرف اللاتينية والأرقام والمسافات
    return value.replace(/[^a-zA-Z0-9 ]/g, "");
  };
  const avatarImages = [
    "icons8-crook-and-flail-64.png",
    "icons8-egypt-64.png",
    "icons8-pharaoh-64.png",
    "icons8-egyptian-64.png",
    "icons8-pharaoh-96.png",
    "icons8-ancient-64.png",
    "icons8-egyptology-64.png",
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
          created_at: new Date().toISOString(), // ✅ الوقت الحالي بصيغة ISO
          avatar: randomAvatar, // ✅ أضف الصورة العشوائية هنا
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

        // ✅ أضف التعليق الجديد مباشرة إلى الحالة
        setComments([
          {
            name,
            rating,
            comment: commentText,
            avatar: randomAvatar, // ✅ الصورة العشوائية
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
      <Typography variant="h5" sx={{ color: "#ff9800", mb: 2 }}>
        Comments & Reviews
      </Typography>

      {currentComments.map((comment, index) => (
        <Box
          key={index}
          sx={{
            // backgroundColor: "#fff",
            p: 2,
            borderRadius: 6,
            mb: 2,
            border: "1px solid gray",
            display: "flex",
            flexDirection: "row",
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
              alt="Iron Man"
              style={{ objectFit: "cover", objectPosition: "center" }}
            />{" "}
          </div>
          <div>
            <Typography
              sx={{
                color: "#d4a85f",
                fontWeight: "bold",
                textTransform: "capitalize",
              }}
            >
              {comment.name || "User"}
            </Typography>
            <Rating value={comment.rating} readOnly />
            <Typography
              sx={{ color: "#666", mt: 1, textTransform: "capitalize" }}
            >
              {comment.comment}
            </Typography>
          </div>
        </Box>
      ))}

      {/* ✅ نفيجيشن بالأرقام */}
      <Box
        sx={{ display: "flex", justifyContent: "center", gap: 1, mt: 2, mb: 2 }}
      >
        {Array.from({ length: totalPages }).map((_, index) => (
          <Button
            key={index}
            variant={page === index ? "contained" : "outlined"}
            onClick={() => setPage(index)}
            sx={{
              backgroundColor: page === index ? "#ff9800" : "transparent",
              color: page === index ? "#fff" : "#ff9800",
              borderColor: "#ff9800",
              fontWeight: "bold",
              minWidth: "40px",
              padding: "6px 12px",
              borderRadius: "8px",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "#ff9800",
                color: "#fff",
              },
            }}
          >
            {index + 1}
          </Button>
        ))}
      </Box>

      {/* ✅ نموذج إضافة تعليق */}
      <Box sx={{  p: 2, borderRadius: 2 }}>
        <Typography sx={{ color: "#ff9800", mb: 1 }}>Add Your Comment</Typography>

        <TextField
          fullWidth
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(filterInput(e.target.value))}
          variant="outlined"
          sx={{
            mb: 1,
            input: {
              color: "#d4a85f",
              fontSize: "14px",
              fontWeight: "bold",
              fontFamily: "Cairo, sans-serif",
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#d4a85f" },
              "&:hover fieldset": { borderColor: "#ff9800" },
              "&.Mui-focused fieldset": {
                borderColor: "#ff9800",
                borderWidth: "2px",
              },
            },
          }}
        />

        <Rating
          value={rating}
          onChange={(e, newValue) => setRating(newValue)}
          sx={{ mb: 1, backgroundColor:"#444444", borderRadius:"20px"}}
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
              color: "#d4a85f",
              fontSize: "14px",
              fontWeight: "bold",
              fontFamily: "Cairo, sans-serif",
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#d4a85f" },
              "&:hover fieldset": { borderColor: "#ff9800" },
              "&.Mui-focused fieldset": {
                borderColor: "#ff9800",
                borderWidth: "2px",
              },
            },
          }}
        />

        <Button
          variant="contained"
          sx={{ backgroundColor: "#ff9800" }}
          onClick={() => handleSubmit({ user, tour })}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Sending..." : "send"}
        </Button>
      </Box>
    </Box>
  );
};

export default CommentsReviews;
