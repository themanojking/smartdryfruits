import { Box, List, ListItem, ListItemText } from "@mui/material";
import React from "react";
import { Link, useLocation } from "react-router-dom";

const ProductNavbar = () => {
  const location = useLocation();
  const items = [
    { link: "/dates", name: "Dates" },
    { link: "/dryfruits", name: "Dry Fruits" },
    { link: "/seeds", name: "Seeds" },
    { link: "/nuts", name: "Nuts" },
    { link: "/combo", name: "Offer Zone" },
  ];
  const ScrollToTop = () => {
    window.scrollTo(0, 0);
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        overflowX: { xs: "auto", sm: "hidden" }, // Enable horizontal scroll on mobile
        whiteSpace: "nowrap", // Prevent wrapping of items
        width: "100%", // Full width for container
        height: { xs: "auto", sm: "auto" }, // Ensure proper height on mobile
      }}
    >
      <List
        sx={{
          display: "flex",
          flexDirection: "row", // Horizontal layout
          padding: 0,
          overflowX: "auto", // Allow horizontal scrolling
          flexWrap: "nowrap", // Prevent items from wrapping
        }}
      >
        {items.map((item, index) => {
          const isActive = location.pathname === item.link;
          return (
            <Link
              key={index}
              to={item.link}
              onClick={ScrollToTop}
              style={{ textDecoration: "none", color: "#000" }}
            >
              <ListItem
                onClick={ScrollToTop}
                sx={{
                  width: "auto",
                  py: 0,
                  px: { xs: "1rem", sm: "2.3rem" },
                  borderBottom: isActive ? "2px solid black" : "none",
                  fontSize: { xs: "0.75rem", sm: "1rem" },
                }}
              >
                <ListItemText
                  primary={item.name}
                  sx={{
                    color: isActive ? "#92553D" : "inherit",
                    fontSize: { xs: "0.75rem", sm: "1rem" },
                  }}
                />
              </ListItem>
            </Link>
          );
        })}
      </List>
    </Box>
  );
};

export default ProductNavbar;
