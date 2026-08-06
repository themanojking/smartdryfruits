import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const industryData = [
  {
    slug: "nuts",
    title: "Nuts",
    category_image: "Images/ProductsImages/nuts/Cashew.png",
  },
  {
    slug: "dryfruits",
    title: "Dry Fruits",
    category_image: "Images/ProductsImages/dryFruits/Apricot.png",
  },
  {
    slug: "seeds",
    title: "Seeds",
    category_image: "Images/ProductsImages/seeds/PumpkinSeeds.png",
  },
  {
    slug: "dates",
    title: "Dates",
    category_image: "Images/ProductsImages/dates/KimiadatesOI.png",
  },
];

const CategorySection = () => {
  return (
    // Outer wrapper: forces this whole section to behave inside any
    // flex/grid parent instead of expanding past it
    <Box
      sx={{
        width: "100%",
        minWidth: 0,
        maxWidth: "100%",
        overflow: "hidden", // clips so inner scroll container is the only scroller
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexWrap: "nowrap",
          justifyContent: { xs: "flex-start", lg: "center" },
          gap: { xs: 1.5, sm: 2, lg: 3 },
          overflowX: "auto",
          width: "100%",
          minWidth: 0,
          p: { xs: 2, sm: 3, lg: 5 },
          bgcolor: "#fff",
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        {industryData.map((item, index) => (
          <Box
            key={index}
            component={Link}
            to={`/${item.slug}`}
            sx={{
              minWidth: { xs: "38%", sm: "26%", md: "18%", lg: "13%" },
              height: { xs: "120px", sm: "160px", lg: "220px" },
              borderRadius: { xs: "14px", lg: "20px" },
              overflow: "hidden",
              position: "relative",
              cursor: "pointer",
              flexShrink: 0,
              bgcolor: "#ddd",
              textDecoration: "none",
              transition: "0.3s",
              scrollSnapAlign: "start",
              "&:hover": {
                transform: "scale(1.05)",
              },
            }}
          >
            {/* Image */}
            <img
              src={item.category_image}
              alt="category"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
            {/* Overlay */}
            <Box
              sx={{
                position: "absolute",
                top: { xs: 6, lg: 10 },
                left: { xs: 6, lg: 10 },
              }}
            >
              <Typography
                sx={{
                  fontWeight: "900",
                  color: "#fff",
                  letterSpacing: "0.5px",
                  fontSize: { xs: "0.8rem", sm: "0.95rem", lg: "1.1rem" },
                  lineHeight: 1.2,
                }}
              >
                {item.title}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default CategorySection;
