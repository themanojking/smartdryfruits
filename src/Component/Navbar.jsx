import * as React from "react";
import { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import {
  Button,
  Drawer,
  ImageListItem,
  List,
  ListItemButton,
  ListItemText,
  Divider,
  Stack,
  useScrollTrigger,
  Slide,
  CssBaseline,
  Menu,
  MenuItem,
  Badge,
} from "@mui/material";
import CusAccordion from "./CusAccordion"; // Import your CusAccordion component
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
const drawerWidth = 320;

function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}
const ScrollToTop = () => {
  window.scrollTo(0, 0);
};//
const ACTIVE_COLOR = "#92553D";
export default function Navbar(props) {
  const cartItems = useSelector((state) => state.cart.items);
  const { color } = props;
  const [isDown, setIsDown] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const location = useLocation();

  const isActive = (link) => location.pathname === link;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 90) {
        setIsDown(true);
      } else {
        setIsDown(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleDropdownClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDropdownClose = () => {
    setAnchorEl(null);
  };

  const navItems = [
    {
      link: "/",
      name: "Home",
    },
    { link: "/dates", name: "Dates" },
    { link: "/dryfruits", name: "Dry Fruits" },
    { link: "/seeds", name: "Seeds" },
    { link: "/nuts", name: "Nuts" },
    { link: "/combo", name: "Offer Zone" },
  ];

  const productMenuItems = [
    { link: "/dates", name: "Dates" },
    { link: "/dryfruits", name: "Dry Fruits" },
    { link: "/seeds", name: "Seeds" },
    { link: "/nuts", name: "Nuts" },
    { link: "/combo", name: "Offer Zone" },
  ];

  const isProductSectionActive = productMenuItems.some((menuItem) =>
    isActive(menuItem.link),
  );

  const drawer = (
    <Stack direction="column" sx={{ height: "100%" }}>
      {/* Drawer header: logo + close, gives the panel an anchor instead of a floating X */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 2,
          py: 1.5,
          borderBottom: "1px solid rgba(255,255,255,0.12)",
        }}
      >
        <Link to="/" onClick={() => setMobileOpen(false)}>
          <Box
            component="img"
            src="Images/logo.png"
            alt="logo"
            sx={{ width: "2.6rem", height: "2.6rem", borderRadius: "100%" }}
          />
        </Link>
        <IconButton
          onClick={() => setMobileOpen(false)}
          aria-label="close menu"
          sx={{
            color: "#fff",
            width: 44,
            height: 44,
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      <List
        sx={{
          flex: 1,
          overflowY: "auto",
          py: 1,
          px: 1,
        }}
      >
        {navItems.map((item, index) =>
          item.name === "Product" ? (
            <React.Fragment key={item.name}>
              <Box sx={{ px: 1 }}>
                <CusAccordion
                  head={
                    <Box
                      sx={{
                        minHeight: 48,
                        display: "flex",
                        alignItems: "center",
                        pl: isProductSectionActive ? 1.25 : 0,
                        borderLeft: isProductSectionActive
                          ? `3px solid ${ACTIVE_COLOR}`
                          : "3px solid transparent",
                      }}
                    >
                      <Typography
                        sx={{
                          fontWeight: isProductSectionActive ? 600 : 500,
                          fontSize: "1rem",
                          textAlign: "left",
                          color: isProductSectionActive ? "#fff" : "#fff",
                        }}
                      >
                        {item.name}
                      </Typography>
                      {isProductSectionActive && (
                        <Box
                          sx={{
                            width: 6,
                            height: 6,
                            borderRadius: "50%",
                            bgcolor: ACTIVE_COLOR,
                            ml: 1,
                          }}
                        />
                      )}
                    </Box>
                  }
                  body={
                    <>
                      {productMenuItems.map((menuItem) => {
                        const active = isActive(menuItem.link);
                        return (
                          <Link
                            to={menuItem.link}
                            style={{ textDecoration: "none" }}
                            key={menuItem.link}
                            onClick={() => {
                              ScrollToTop();
                              setMobileOpen(false);
                            }}
                          >
                            <Typography
                              sx={{
                                fontSize: "0.95rem",
                                fontWeight: active ? 600 : 400,
                                letterSpacing: 0.3,
                                py: 1.25,
                                pl: active ? 1.25 : 0.5,
                                minHeight: 48,
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                                borderLeft: active
                                  ? `3px solid ${ACTIVE_COLOR}`
                                  : "3px solid transparent",
                                color: active
                                  ? "#fff"
                                  : "rgba(255,255,255,0.85)",
                              }}
                            >
                              {menuItem.name}
                              {active && (
                                <Box
                                  sx={{
                                    width: 5,
                                    height: 5,
                                    borderRadius: "50%",
                                    bgcolor: ACTIVE_COLOR,
                                  }}
                                />
                              )}
                            </Typography>
                          </Link>
                        );
                      })}
                    </>
                  }
                />
              </Box>
              <Divider
                sx={{ borderColor: "rgba(255,255,255,0.12)", my: 0.5 }}
              />
            </React.Fragment>
          ) : (
            <React.Fragment key={item.link}>
              <Link
                to={item.link}
                style={{ textDecoration: "none" }}
                onClick={() => {
                  ScrollToTop();
                  setMobileOpen(false);
                }}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    borderRadius: "8px",
                    pl: isActive(item.link) ? 1.5 : 1.75,
                    pr: 1.5,
                    bgcolor: isActive(item.link)
                      ? "rgba(146,85,61,0.18)"
                      : "transparent",
                    borderLeft: isActive(item.link)
                      ? `3px solid ${ACTIVE_COLOR}`
                      : "3px solid transparent",
                  }}
                >
                  <ListItemText
                    disableTypography
                    primary={
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                        }}
                      >
                        <Typography
                          sx={{
                            fontWeight: isActive(item.link) ? 600 : 500,
                            fontSize: "1rem",
                            textAlign: "left",
                            color: "#fff",
                          }}
                        >
                          {item.name}
                        </Typography>
                        {isActive(item.link) && (
                          <Box
                            sx={{
                              width: 6,
                              height: 6,
                              borderRadius: "50%",
                              bgcolor: ACTIVE_COLOR,
                            }}
                          />
                        )}
                      </Box>
                    }
                  />
                </ListItemButton>
              </Link>
              <Divider sx={{ borderColor: "rgba(255,255,255,0.08)" }} />
            </React.Fragment>
          ),
        )}
      </List>

      {/* Sticky cart CTA so checkout is always one tap away, mirrors desktop */}
      <Box
        sx={{
          p: 2,
          borderTop: "1px solid rgba(255,255,255,0.12)",
        }}
      >
        <Button
          href="/cart"
          fullWidth
          variant="contained"
          onClick={() => setMobileOpen(false)}
          startIcon={
            <Badge badgeContent={cartItems.length} color="error">
              <ShoppingCartOutlinedIcon />
            </Badge>
          }
          sx={{
            bgcolor: "#92553D",
            textTransform: "none",
            borderRadius: "50px",
            py: 1.3,
            fontSize: "1rem",
            "&:hover": { bgcolor: "#282828" },
          }}
        >
          Go To Cart
        </Button>
      </Box>
    </Stack>
  );

  return (
    <>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar
          sx={{
            backgroundColor: "transparent",
            px: [1.5, 1, 3],
            py: isDown ? 0 : 7,
            boxShadow: 0,
            transition: "all 0.3s ease",
          }}
        >
          <Toolbar
            sx={{
              backgroundColor: "transparent",
              py: [1, 1.5, 3],
              color: isDown ? "#000" : color, // Use the color prop here
              bgcolor: isDown ? "rgba(255,255,255,.6)" : null,
              backdropFilter: isDown ? "blur(25px)" : null,
              borderRadius: isDown
                ? ["0 0 .7rem .7rem", "0 0 1.5rem 1.5rem"]
                : null,
              boxShadow: isDown ? 3 : null,
              justifyContent: "space-between",
            }}
          >
            <Stack
              direction={"row"}
              width={"100%"}
              alignItems="center"
              sx={{
                display: ["flex", "flex", "none"],
                justifyContent: "space-between",
              }}
            >
              <Link color={"inherit"} underline="none" to="/">
                <Box
                  component="img"
                  src="Images/logo.png"
                  alt="logo"
                  sx={{
                    width: ["3.4rem", "5rem"],
                    height: ["3.4rem", "5rem"],
                    borderRadius: "100%",
                    p: 0.6,
                  }}
                />
              </Link>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <IconButton
                  href="/cart"
                  aria-label="view cart"
                  sx={{ color: "inherit", width: 44, height: 44 }}
                >
                  <Badge
                    badgeContent={cartItems.length}
                    color="error"
                    sx={{ "& .MuiBadge-dot": { backgroundColor: "#92553D" } }}
                  >
                    <ShoppingCartOutlinedIcon />
                  </Badge>
                </IconButton>
                <IconButton
                  onClick={handleDrawerToggle}
                  aria-label="open menu"
                  sx={{ color: "inherit", width: 44, height: 44 }}
                >
                  <MenuIcon />
                </IconButton>
              </Box>
            </Stack>

            <Link color={"inherit"} underline="none" to="/">
              <ImageListItem
                sx={{ my: -5, display: { xs: "none", md: "block" } }}
              >
                <Box
                  component="img"
                  src="Images/logo.png"
                  sx={{
                    width: ["4rem", "5rem", "6rem"],
                    height: ["4rem", "5rem", "6rem"],
                    borderRadius: "100%",
                    bgcolor: "transparent",
                    p: 2,
                  }}
                  alt="logo"
                />
              </ImageListItem>
            </Link>
            <Box sx={{ display: { xs: "none", md: "flex", gap: "2rem" } }}>
              {navItems.map((item, index) =>
                item.name === "Product" ? (
                  <Box key={index}>
                    <Button
                      onClick={handleDropdownClick}
                      sx={{
                        fontSize: [17],
                        fontWeight: "600",
                        color: isProductSectionActive
                          ? ACTIVE_COLOR
                          : isDown
                            ? "#000"
                            : color, // Use the color prop here
                        textTransform: "none",
                        textDecoration: "none",
                        position: "relative",
                        "&:hover": {
                          backgroundColor: "rgba(255,255,255,0.1)",
                        },
                        "&::after": isProductSectionActive
                          ? {
                              content: '""',
                              position: "absolute",
                              left: "10%",
                              right: "10%",
                              bottom: 2,
                              height: "2px",
                              borderRadius: "2px",
                              backgroundColor: ACTIVE_COLOR,
                            }
                          : undefined,
                      }}
                    >
                      {item.name}
                    </Button>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleDropdownClose}
                      PaperProps={{
                        sx: {
                          mt: 1,
                          borderRadius: "10px",
                          background: "#fff",
                          p: 0.5,
                          fontSize: [17],
                          fontWeight: "600",
                          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                          width: "13rem",
                          border: "3.5px solid #92553D",
                        },
                      }}
                    >
                      {productMenuItems.map((menuItem) => {
                        const active = isActive(menuItem.link);
                        return (
                          <Link
                            key={menuItem.link}
                            to={menuItem.link}
                            color="inherit"
                            underline="none"
                            onClick={ScrollToTop}
                            style={{ textDecoration: "none" }}
                          >
                            <MenuItem
                              onClick={handleDropdownClose}
                              sx={{
                                fontSize: [18],
                                fontWeight: active ? "700" : "600",
                                color: active ? ACTIVE_COLOR : "#000",
                                bgcolor: active
                                  ? "rgba(146,85,61,0.1)"
                                  : "transparent",
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                              }}
                            >
                              {menuItem.name}
                              {active && (
                                <Box
                                  sx={{
                                    width: 6,
                                    height: 6,
                                    borderRadius: "50%",
                                    bgcolor: ACTIVE_COLOR,
                                  }}
                                />
                              )}
                            </MenuItem>
                          </Link>
                        );
                      })}
                    </Menu>
                  </Box>
                ) : (
                  <Button
                    key={index}
                    href={item.link}
                    sx={{
                      fontSize: [17],
                      fontWeight: "600",
                      color: isActive(item.link)
                        ? ACTIVE_COLOR
                        : isDown
                          ? "#000"
                          : color, // Use the color prop here
                      textTransform: "none",
                      textDecoration: "none",
                      position: "relative",
                      "&:hover": {
                        backgroundColor: "rgba(255,255,255,0.1)",
                      },
                      "&::after": isActive(item.link)
                        ? {
                            content: '""',
                            position: "absolute",
                            left: "10%",
                            right: "10%",
                            bottom: 2,
                            height: "2px",
                            borderRadius: "2px",
                            backgroundColor: ACTIVE_COLOR,
                          }
                        : undefined,
                    }}
                    onClick={ScrollToTop}
                  >
                    {item.name}
                  </Button>
                ),
              )}
              <Button
                href="/cart"
                variant="contained"
                startIcon={
                  <Badge
                    badgeContent={cartItems.length}
                    color="error"
                    sx={{ "& .MuiBadge-dot": { backgroundColor: "#92553D" } }} // Customize badge color if needed
                  >
                    <ShoppingCartOutlinedIcon />
                  </Badge>
                }
                sx={{
                  bgcolor: "#92553D",
                  textTransform: "none",
                  borderRadius: "50px",
                  px: [2.5],
                  "&:hover": {
                    bgcolor: "#282828",
                  },
                }}
              >
                Go To Cart
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
      <Box
        display={{ xs: "block", md: "none" }}
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          anchor="right"
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: "min(85%, 320px)",
              background:
                "linear-gradient(180.83deg, #181818 0%, #181818 100%)",
              transition: "width 0.3s ease-in-out",
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </>
  );
}
