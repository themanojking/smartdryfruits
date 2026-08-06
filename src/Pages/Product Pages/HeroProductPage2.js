import React, { useState, useRef, useEffect } from "react";
import { Box, Typography, Button, Stack, IconButton } from "@mui/material";
import { keyframes } from "@mui/system";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import SpaOutlinedIcon from "@mui/icons-material/SpaOutlined";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import Title from "../../Component/Title";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const ACCENT = "#92553D";
const BADGE_BG = "#E4B65B";
const BADGE_TEXT = "#5C3A12";

// ─── Static product data ──────────────────────────────────────────────────────
// Prices are stored as pre-formatted rupee strings per size. Update these
// directly once real per-weight prices are available.
export const dryFruitsData = [
  {
    id: 60,
    name: "Kimia Dates",
    rating: 5,
    prices: {
      "1 Box": {
        currentPrice: "₹180",
        originalPrice: "₹200",
      },
    },
    image: "Images/ProductsImages/dates/KimiaDates.png",
  },
  {
    id: 61,
    name: "Muscat Dates",
    rating: 5,
    prices: {
      "100g": { currentPrice: "₹38", originalPrice: "₹42" },
      "250g": { currentPrice: "₹95", originalPrice: "₹105" },
      "500g": { currentPrice: "₹190", originalPrice: "₹210" },
      "1kg": { currentPrice: "₹380", originalPrice: "₹420" },
    },
    image: "Images/ProductsImages/dates/MuscatDates.png",
  },
  {
    id: 62,
    name: "Kalima Dates",
    rating: 5,
    prices: {
      "100g": { currentPrice: "₹75", originalPrice: "₹82" },
      "250g": { currentPrice: "₹188", originalPrice: "₹205" },
      "500g": { currentPrice: "₹375", originalPrice: "₹410" },
      "1kg": { currentPrice: "₹750", originalPrice: "₹820" },
    },
    image: "Images/ProductsImages/dates/KalimaDates.png",
  },
  {
    id: 63,
    name: "Mabroom Dates",
    rating: 5,
    prices: {
      "100g": { currentPrice: "₹120", originalPrice: "₹130" },
      "250g": { currentPrice: "₹300", originalPrice: "₹325" },
      "500g": { currentPrice: "₹600", originalPrice: "₹650" },
      "1kg": { currentPrice: "₹1,200", originalPrice: "₹1,300" },
    },
    image: "Images/ProductsImages/dates/MabroomDates.png",
  },
  {
    id: 64,
    name: "Ajwa Bold Dates",
    rating: 5,
    prices: {
      "100g": { currentPrice: "₹120", originalPrice: "₹130" },
      "250g": { currentPrice: "₹300", originalPrice: "₹325" },
      "500g": { currentPrice: "₹600", originalPrice: "₹650" },
      "1kg": { currentPrice: "₹1,200", originalPrice: "₹1,300" },
    },
    image: "Images/ProductsImages/dates/AjwaBoldDates.png",
  },
  {
    id: 65,
    name: "Ajwa Regular",
    rating: 5,
    prices: {
      "100g": { currentPrice: "₹70", originalPrice: "₹80" },
      "250g": { currentPrice: "₹175", originalPrice: "₹190" },
      "500g": { currentPrice: "₹350", originalPrice: "₹380" },
      "1kg": { currentPrice: "₹700", originalPrice: "₹760" },
    },
    image: "Images/ProductsImages/dates/AjwaDates.png",
  },
  {
    id: 66,
    name: "Medjool Dates",
    rating: 5,
    prices: {
      "100g": { currentPrice: "₹160", originalPrice: "₹175" },
      "250g": { currentPrice: "₹400", originalPrice: "₹430" },
      "500g": { currentPrice: "₹800", originalPrice: "₹860" },
      "1kg": { currentPrice: "₹1,600", originalPrice: "₹1,750" },
    },
    image: "Images/ProductsImages/dates/MedjuolDates.png",
  },
  {
    id: 67,
    name: "Zahadi Dates",
    rating: 5,
    prices: {
      "100g": { currentPrice: "₹19", originalPrice: "₹22" },
      "250g": { currentPrice: "₹48", originalPrice: "₹55" },
      "500g": { currentPrice: "₹95", originalPrice: "₹105" },
      "1kg": { currentPrice: "₹190", originalPrice: "₹210" },
    },
    image: "Images/ProductsImages/dates/ZahadiDates.png",
  },
  {
    id: 68,
    name: "Tunisian Dates",
    rating: 5,
    prices: {
      "100g": { currentPrice: "₹40", originalPrice: "₹45" },
      "250g": { currentPrice: "₹100", originalPrice: "₹110" },
      "500g": { currentPrice: "₹200", originalPrice: "₹220" },
      "1kg": { currentPrice: "₹400", originalPrice: "₹440" },
    },
    image: "Images/ProductsImages/dates/TunisianDates.png",
  },
  {
    id: 69,
    name: "Barari Dates",
    rating: 5,
    prices: {
      "100g": { currentPrice: "₹23", originalPrice: "₹26" },
      "250g": { currentPrice: "₹58", originalPrice: "₹65" },
      "500g": { currentPrice: "₹115", originalPrice: "₹125" },
      "1kg": { currentPrice: "₹230", originalPrice: "₹250" },
    },
    image: "Images/ProductsImages/dates/BarariDates.png",
  },
  {
    id: 70,
    name: "Amber Dates",
    rating: 5,
    prices: {
      "100g": { currentPrice: "₹120", originalPrice: "₹130" },
      "250g": { currentPrice: "₹300", originalPrice: "₹325" },
      "500g": { currentPrice: "₹600", originalPrice: "₹650" },
      "1kg": { currentPrice: "₹1,200", originalPrice: "₹1,300" },
    },
    image: "Images/ProductsImages/dates/AmberDates.png",
  },
  {
    id: 71,
    name: "Smart Seedless Dates",
    rating: 5,
    prices: {
      "100g": { currentPrice: "₹120", originalPrice: "₹130" },
      "250g": { currentPrice: "₹300", originalPrice: "₹325" },
      "500g": { currentPrice: "₹600", originalPrice: "₹650" },
      "1kg": { currentPrice: "₹1,200", originalPrice: "₹1,300" },
    },
    image: "Images/ProductsImages/dates/SmartSeedlessDates.png",
  },
];

// ─── Price helpers ─────────────────────────────────────────────────────────────
// Prices are stored as rupee-prefixed strings (e.g. "₹90"). These helpers
// parse them back to numbers where math is needed (discount %, formatting).
const parseRupee = (str) => Number(String(str).replace(/[^0-9.]/g, "")) || 0;



const getDiscountPercent = (currentPrice, originalPrice) => {
  const current = parseRupee(currentPrice);
  const original = parseRupee(originalPrice);
  if (!original || original <= current) return 0;
  return Math.round(((original - current) / original) * 100);
};

// ─── Keyframes ────────────────────────────────────────────────────────────────
const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(20px) scale(0.97); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
`;
const rippleOut = keyframes`
  from { transform: scale(0); opacity: 0.45; }
  to   { transform: scale(4.5); opacity: 0; }
`;
const cartJump = keyframes`
  0%   { transform: translateY(0) rotate(0); }
  30%  { transform: translateY(-7px) rotate(-10deg); }
  60%  { transform: translateY(2px) rotate(5deg); }
  100% { transform: translateY(0) rotate(0); }
`;

// ─── Star rating (matches the filled/outline star look in the design) ────────
const StarRating = ({ value }) => {
  const stars = [1, 2, 3, 4, 5];
  return (
    <Stack direction="row" alignItems="center" spacing={0.5}>
      <Stack direction="row" spacing={0.1}>
        {stars.map((s) => (
          <Box
            key={s}
            sx={{
              fontSize: "1rem",
              color: s <= Math.round(value) ? "#E4A93B" : "#e0d8cf",
              display: "flex",
            }}
          >
            {s <= Math.round(value) ? (
              <StarIcon fontSize="inherit" />
            ) : (
              <StarBorderIcon fontSize="inherit" />
            )}
          </Box>
        ))}
      </Stack>
      <Typography
        sx={{ fontSize: "0.78rem", color: "#8a8378", fontWeight: 500 }}
      >
        {value.toFixed(1)}
      </Typography>
    </Stack>
  );
};

// ─── Product Card ─────────────────────────────────────────────────────────────
const ArrivalCard = ({ item, index, onAddToCart }) => {
  const [cartAnim, setCartAnim] = useState(false);
  const [rippling, setRippling] = useState(false);
  const [added, setAdded] = useState(false);

  const sizeLabels = Object.keys(item.prices);
  const [selectedSize, setSelectedSize] = useState(sizeLabels[0]);

  const { currentPrice, originalPrice } = item.prices[selectedSize];
  const discount = getDiscountPercent(currentPrice, originalPrice);

  const handleCart = () => {
    setCartAnim(true);
    setRippling(true);
    setAdded(true);
    setTimeout(() => setCartAnim(false), 650);
    setTimeout(() => setRippling(false), 600);
    setTimeout(() => setAdded(false), 1800);
    onAddToCart(item, selectedSize);
  };

  return (
    <Box
      sx={{
        minWidth: { xs: 260, sm: 260, md: 280 },
        maxWidth: { xs: 260, sm: 260, md: 280 },
        borderRadius: "18px",
        overflow: "hidden",
        bgcolor: "#fff",
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        border: "1px solid #f0ece6",
        boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
        animation: `${fadeUp} 0.5s cubic-bezier(.34,1.56,.64,1) both`,
        animationDelay: `${index * 0.06}s`,
        transition: "transform 0.28s ease, box-shadow 0.28s ease",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: "0 16px 34px rgba(0,0,0,0.09)",
        },
        "&:hover .product-img": {
          transform: "scale(1.06)",
        },
      }}
    >
      {/* ── Image area ── */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          aspectRatio: "4 / 3",
          overflow: "hidden",
          bgcolor: "#f4efe8",
        }}
      >
        <Box
          component="img"
          className="product-img"
          src={item.image || "/no-image.png"}
          alt={item.name}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            display: "block",
            transition: "transform 0.45s ease",
          }}
        />
        {discount > 0 && (
          <Box
            sx={{
              position: "absolute",
              top: 12,
              left: 12,
              bgcolor: BADGE_BG,
              color: BADGE_TEXT,
              fontWeight: 800,
              fontSize: "0.72rem",
              letterSpacing: 0.3,
              px: 1.4,
              py: 0.4,
              borderRadius: "50px",
            }}
          >
            {discount}% OFF
          </Box>
        )}
      </Box>

      {/* ── Card body ── */}
      <Box
        sx={{
          px: 2,
          pt: 1.5,
          pb: 2,
          display: "flex",
          flexDirection: "column",
          gap: 0.9,
        }}
      >
        <Stack direction="row" alignItems="center" spacing={0.5}>
          <CheckCircleIcon sx={{ fontSize: "0.85rem", color: "#3b9c5f" }} />
          <Typography
            sx={{
              fontSize: "0.68rem",
              color: "#9a9186",
              fontWeight: 600,
              letterSpacing: 0.6,
              textTransform: "uppercase",
            }}
          >
            Smart Dry Fruits
          </Typography>
        </Stack>

        <Typography
          sx={{
            fontWeight: 700,
            fontSize: "1.3rem",
            color: "#241a12",
            lineHeight: 1.2,
          }}
        >
          {item.name}
        </Typography>

        <StarRating value={item.rating} />

        {/* Size selector */}
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          {sizeLabels.map((label) => {
            const selected = label === selectedSize;
            return (
              <Box
                key={label}
                onClick={() => setSelectedSize(label)}
                sx={{
                  px: 1.4,
                  py: 0.5,
                  borderRadius: "8px",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  border: `1.5px solid ${selected ? ACCENT : "#e2ddd6"}`,
                  bgcolor: selected ? ACCENT : "#fff",
                  color: selected ? "#fff" : "#3a3229",
                  transition: "all 0.15s ease",
                }}
              >
                {label}
              </Box>
            );
          })}
        </Stack>

        {/* Price row */}
        <Stack direction="row" alignItems="center" spacing={0.8}>
          <LocalOfferOutlinedIcon sx={{ fontSize: "1rem", color: "#a39a8d" }} />
          <Typography
            sx={{ fontWeight: 800, fontSize: "1.15rem", color: ACCENT }}
          >
            {currentPrice}
          </Typography>
          {parseRupee(originalPrice) > parseRupee(currentPrice) && (
            <Typography
              sx={{
                fontSize: "0.85rem",
                color: "#b7afa4",
                textDecoration: "line-through",
                fontWeight: 500,
              }}
            >
              {originalPrice}
            </Typography>
          )}
        </Stack>

        {/* Natural tag */}
        <Stack direction="row" alignItems="center" spacing={0.6}>
          <SpaOutlinedIcon sx={{ fontSize: "0.9rem", color: "#5aa06a" }} />
          <Typography
            sx={{ fontSize: "0.78rem", color: "#9a9186", fontWeight: 500 }}
          >
            100% Natural
          </Typography>
        </Stack>

        {/* Add to cart */}
        <Button
          fullWidth
          onClick={handleCart}
          startIcon={
            <ShoppingCartOutlinedIcon
              sx={{
                fontSize: "1.05rem !important",
                animation: cartAnim ? `${cartJump} 0.6s ease` : "none",
              }}
            />
          }
          sx={{
            mt: 0.5,
            borderRadius: "10px",
            bgcolor: added ? "#3b8f52" : ACCENT,
            color: "#fff",
            textTransform: "none",
            fontWeight: 700,
            fontSize: "0.9rem",
            py: 1.1,
            position: "relative",
            overflow: "hidden",
            transition: "background-color 0.35s ease, transform 0.15s",
            "&:hover": {
              bgcolor: added ? "#2f7443" : "#7a4531",
            },
            "&:active": { transform: "scale(0.98)" },
          }}
        >
          {rippling && (
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                borderRadius: "10px",
                bgcolor: "rgba(255,255,255,0.25)",
                animation: `${rippleOut} 0.55s ease-out`,
              }}
            />
          )}
          {added ? "Added!" : "Add to cart"}
        </Button>
      </Box>
    </Box>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
const HeroProductPage2 = () => {
  const dispatch = useDispatch();
  const scrollRef = useRef(null);

  const products = dryFruitsData;

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, offsetWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - offsetWidth - 10);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener("scroll", updateScrollState, { passive: true });
      updateScrollState();
      return () => el.removeEventListener("scroll", updateScrollState);
    }
  }, []);

  const scroll = (dir) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir * 520, behavior: "smooth" });
  };

  const handleAddToCart = (item, sizeLabel) => {
    const { currentPrice, originalPrice } = item.prices[sizeLabel];
    dispatch(
      addToCart({
        // Unique per product + size, so different sizes of the same
        // product become separate cart lines instead of overwriting
        // each other.
        id: `${item.id}_${sizeLabel}`,
        cartItemId: `${item.id}-${sizeLabel}`,
        name: item.name,
        image: item.image,
        price: parseRupee(currentPrice),
        originalPrice: parseRupee(originalPrice),
        // cartSlice.js keys off `selectedGram` when building cartItemId,
        // and the Cart/CartItemCard UI may read either `selectedGram` or
        // `size` — send both so the gram value always shows correctly.
        selectedGram: sizeLabel,
        size: sizeLabel,
        qty: 1,
      }),
    );
    toast.success(`${item.name} (${sizeLabel}) added to cart 🛒`, {
      autoClose: 2000,
    });
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          mb: 3,
        }}
      >
        <Box>
          <Title
            title="Dry Fruits"
            subtitle="Handpicked Quality, Naturally Wholesome"
          />
        </Box>
        <Stack direction="row" alignItems="center" spacing={1}>
          {(canScrollLeft || canScrollRight) && (
            <Stack
              direction="row"
              spacing={0.6}
              sx={{ display: { xs: "none", sm: "flex" } }}
            >
              <IconButton
                onClick={() => scroll(-1)}
                disabled={!canScrollLeft}
                size="small"
                sx={{
                  width: 32,
                  height: 32,
                  border: "1.5px solid",
                  borderColor: canScrollLeft ? ACCENT : "rgba(0,0,0,0.1)",
                  color: canScrollLeft ? ACCENT : "#c4c4c4",
                  transition: "all 0.2s",
                  "&:hover": {
                    bgcolor: ACCENT,
                    color: "#fff",
                    borderColor: ACCENT,
                  },
                  "&:disabled": { borderColor: "rgba(0,0,0,0.08)" },
                }}
              >
                <ArrowBackIosNewIcon sx={{ fontSize: "0.75rem" }} />
              </IconButton>
              <IconButton
                onClick={() => scroll(1)}
                disabled={!canScrollRight}
                size="small"
                sx={{
                  width: 32,
                  height: 32,
                  border: "1.5px solid",
                  borderColor: canScrollRight ? ACCENT : "rgba(0,0,0,0.1)",
                  color: canScrollRight ? ACCENT : "#c4c4c4",
                  transition: "all 0.2s",
                  "&:hover": {
                    bgcolor: ACCENT,
                    color: "#fff",
                    borderColor: ACCENT,
                  },
                  "&:disabled": { borderColor: "rgba(0,0,0,0.08)" },
                }}
              >
                <ArrowForwardIosIcon sx={{ fontSize: "0.75rem" }} />
              </IconButton>
            </Stack>
          )}
          <Link to="/dates" style={{ textDecoration: "none" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.3,
                color: ACCENT,
                fontSize: "0.8rem",
                fontWeight: 700,
                letterSpacing: 0.3,
                px: 1.5,
                py: 0.6,
                borderRadius: "50px",
                border: `1.5px solid ${ACCENT}`,
                transition: "all 0.22s ease",
                "&:hover": {
                  bgcolor: ACCENT,
                  color: "#fff",
                  boxShadow: "0 4px 14px rgba(146,85,61,0.35)",
                  transform: "translateY(-1px)",
                },
              }}
            >
              View all <ChevronRightIcon sx={{ fontSize: "1rem" }} />
            </Box>
          </Link>
        </Stack>
      </Box>

      <Box sx={{ position: "relative" }}>
        {canScrollLeft && (
          <Box
            sx={{
              display: { xs: "none", sm: "block" },
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: 60,
              zIndex: 5,
              background:
                "linear-gradient(to right, rgba(255,255,255,1), transparent)",
              pointerEvents: "none",
            }}
          />
        )}
        {canScrollRight && (
          <Box
            sx={{
              display: { xs: "none", sm: "block" },
              position: "absolute",
              right: 0,
              top: 0,
              bottom: 0,
              width: 60,
              zIndex: 5,
              background:
                "linear-gradient(to left, rgba(255,255,255,1), transparent)",
              pointerEvents: "none",
            }}
          />
        )}
        <Box
          ref={scrollRef}
          sx={{
            display: "flex",
            gap: { xs: 1.5, sm: 2 },
            overflowX: "auto",
            pb: 1.5,
            pt: 0.5,
            px: 0.5,
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": { display: "none" },
            scrollBehavior: "smooth",
          }}
        >
          {products.length === 0 && (
            <Box sx={{ py: 6, textAlign: "center", width: "100%" }}>
              <Typography
                sx={{ fontSize: "1rem", color: "#9ca3af", fontWeight: 700 }}
              >
                No products found
              </Typography>
              <Typography
                sx={{ fontSize: "0.8rem", color: "#d1d5db", mt: 0.5 }}
              >
                Check back soon — new stock drops weekly!
              </Typography>
            </Box>
          )}
          {products.map((item, index) => (
            <ArrivalCard
              key={item.id}
              item={item}
              index={index}
              onAddToCart={handleAddToCart}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default HeroProductPage2;