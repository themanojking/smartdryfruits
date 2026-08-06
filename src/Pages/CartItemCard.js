// src/Components/CartItemCard.js
import React from "react";
import {
  Card,
  CardMedia,
  Typography,
  Button,
  Box,
  Stack,
  Rating,
} from "@mui/material";
import { styled } from "@mui/system";
import VerifiedIcon from "@mui/icons-material/Verified";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import SpaOutlinedIcon from "@mui/icons-material/SpaOutlined";

const BRAND = "#92553D";
const BRAND_DARK = "#282828";
const GOLD = "#C89B3C";

const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: "#fff",
  borderRadius: 20,
  border: "1px solid rgba(146,85,61,0.18)",
  boxShadow: "0 10px 24px -14px rgba(40,20,10,0.35)",
  position: "relative",
  overflow: "hidden",
  display: "flex",
  flexDirection: "row",
  alignItems: "stretch",
}));

const parseNumericPrice = (val) => {
  if (typeof val === "number") return val;
  const match = String(val ?? "").match(/[\d,]+(\.\d+)?/);
  return match ? parseFloat(match[0].replace(/,/g, "")) : 0;
};

const CartItemCard = ({ product, onRemove }) => {
  const price = parseNumericPrice(product.price);
  const originalPrice = parseNumericPrice(
    product.originalPrice ?? product.price,
  );
  const discountPct =
    originalPrice > price && originalPrice > 0
      ? Math.round(((originalPrice - price) / originalPrice) * 100)
      : 0;

  return (
    <StyledCard>
      {/* ---------------- Image column ---------------- */}
      <Box
        sx={{
          position: "relative",
          width: "9rem",
          flexShrink: 0,
          bgcolor: "#f4ece2",
        }}
      >
        {discountPct > 0 && (
          <Box
            sx={{
              position: "absolute",
              top: 10,
              left: 10,
              zIndex: 2,
              bgcolor: GOLD,
              color: "#3a2a0e",
              fontFamily: "'Manrope', sans-serif",
              fontWeight: 800,
              fontSize: "0.66rem",
              letterSpacing: 0.3,
              px: 1,
              py: 0.4,
              borderRadius: "999px",
              boxShadow: "0 3px 8px rgba(0,0,0,0.18)",
            }}
          >
            {discountPct}% OFF
          </Box>
        )}
        <CardMedia
          component="img"
          image={product.image}
          alt={product.name}
          sx={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      </Box>
      {/* ---------------- Details column ---------------- */}
      <Box
        sx={{
          flex: "1 1 auto",
          display: "flex",
          flexDirection: "column",
          p: 2,
          minWidth: 0,
        }}
      >
        <Stack direction="row" alignItems="center" spacing={0.6}>
          <VerifiedIcon sx={{ fontSize: "0.85rem", color: "#4a9d5f" }} />
          <Typography
            sx={{
              fontFamily: "'Manrope', sans-serif",
              fontWeight: 700,
              fontSize: "0.68rem",
              letterSpacing: 0.4,
              textTransform: "uppercase",
              color: "#4a9d5f",
            }}
          >
            {product.brandName || "Smart Dry Fruits"}
          </Typography>
        </Stack>

        <Typography
          sx={{
            fontFamily: "'Manrope', sans-serif",
            fontWeight: 800,
            fontSize: "1.02rem",
            color: BRAND,
            mt: 0.4,
            lineHeight: 1.25,
          }}
        >
          {product.name}
        </Typography>

        {product.rating && (
          <Stack
            direction="row"
            alignItems="center"
            spacing={0.6}
            sx={{ mt: 0.5 }}
          >
            <Rating
              value={Number(product.rating)}
              precision={0.5}
              readOnly
              size="small"
              sx={{ color: GOLD, fontSize: "0.95rem" }}
            />
            <Typography
              sx={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: "0.72rem",
                color: "#8a7a6d",
              }}
            >
              {Number(product.rating).toFixed(1)}
            </Typography>
          </Stack>
        )}

        <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
          <Box
            sx={{
              border: `1.5px solid ${BRAND}`,
              color: BRAND,
              borderRadius: "999px",
              px: 1.2,
              py: 0.25,
              fontFamily: "'Manrope', sans-serif",
              fontWeight: 700,
              fontSize: "0.72rem",
            }}
          >
            {product.selectedGram}
          </Box>
          {product.quantity > 1 && (
            <Box
              sx={{
                border: "1.5px solid rgba(146,85,61,0.3)",
                color: "#8a7a6d",
                borderRadius: "999px",
                px: 1.2,
                py: 0.25,
                fontFamily: "'Manrope', sans-serif",
                fontWeight: 700,
                fontSize: "0.72rem",
              }}
            >
              Qty: {product.quantity}
            </Box>
          )}
        </Stack>

        <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 1.2 }}>
          <Typography
            sx={{
              fontFamily: "'Manrope', sans-serif",
              fontWeight: 800,
              fontSize: "1.05rem",
              color: BRAND,
            }}
          >
            ₹{price}
          </Typography>
          {originalPrice > price && (
            <Typography
              sx={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: "0.82rem",
                color: "#a89a8c",
                textDecoration: "line-through",
              }}
            >
              ₹{originalPrice}
            </Typography>
          )}
        </Stack>

        <Stack
          direction="row"
          alignItems="center"
          spacing={0.5}
          sx={{ mt: 0.4 }}
        >
          <SpaOutlinedIcon sx={{ fontSize: "0.8rem", color: "#4a9d5f" }} />
          <Typography
            sx={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: "0.68rem",
              color: "#8a7a6d",
            }}
          >
            100% Natural
          </Typography>
        </Stack>

        <Box sx={{ flex: 1 }} />

        <Button
          fullWidth
          variant="contained"
          startIcon={<DeleteOutlineIcon sx={{ fontSize: "1.05rem" }} />}
          onClick={() => onRemove(product.cartItemId)}
          sx={{
            mt: 1.5,
            bgcolor: BRAND,
            color: "#fff",
            fontFamily: "'Manrope', sans-serif",
            fontWeight: 700,
            fontSize: "0.82rem",
            textTransform: "none",
            borderRadius: "999px",
            py: 0.9,
            boxShadow: "0 8px 16px -6px rgba(146,85,61,0.5)",
            "&:hover": { bgcolor: BRAND_DARK },
          }}
        >
          Remove
        </Button>
      </Box>
    </StyledCard>
  );
};

export default CartItemCard;