import { Box, Typography, IconButton, Stack } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useState, useEffect } from "react";

export default function TopBar() {
  // Static Messages
  const messages = [
    "🚚 Free Shipping on Orders Above ₹999",
    "🎉 Get 10% OFF on Your First Order",
    "🌿 100% Natural & Premium Quality Dry Fruits",
    "💳 Secure Payments",
  ];

  const [index, setIndex] = useState(0);

  // Auto Change Message Every 3 Seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev === messages.length - 1 ? 0 : prev + 1));
    }, 3000);

    return () => clearInterval(interval);
  });

  // Previous Message
  const prevMsg = () => {
    setIndex((prev) => (prev === 0 ? messages.length - 1 : prev - 1));
  };

  // Next Message
  const nextMsg = () => {
    setIndex((prev) => (prev === messages.length - 1 ? 0 : prev + 1));
  };

  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "#e6cfd4",
        py: 2,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      <Stack direction="row" alignItems="center" spacing={5}>
        {/* Left Button */}
        <IconButton size="small" onClick={prevMsg}>
          <ArrowBackIosNewIcon sx={{ fontSize: 12 }} />
        </IconButton>

        {/* Text */}
        <Box
          sx={{
            width: "300px",
            textAlign: "center",
            overflow: "hidden",
          }}
        >
          <Typography
            noWrap
            sx={{
              fontSize: 15,
              fontWeight: "bold",
              fontFamily: "math",
            }}
          >
            {messages[index]}
          </Typography>
        </Box>

        {/* Right Button */}
        <IconButton size="small" onClick={nextMsg}>
          <ArrowForwardIosIcon sx={{ fontSize: 12 }} />
        </IconButton>
      </Stack>
    </Box>
  );
}
