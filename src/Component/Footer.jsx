import { Box, Stack, Typography, Divider, Grid, Fab } from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import PhoneCallback from "@mui/icons-material/PhoneCallback";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import InstagramIcon from "@mui/icons-material/Instagram";
import CusAccordion from "./CusAccordion";
import { Link } from "react-router-dom";
function Footer() {
  const overview = [
    {
      path: "/",
      name: "Home",
    },
    {
      path: "/about",
      name: "About",
    },
    {
      path: "/dates",
      name: "Product",
    },
    {
      path: "/contact",
      name: "Contact Us",
    },
  ];
  const nuts = [
    {
      path: "/nuts",
      name: "Almond",
    },
    {
      path: "/nuts",
      name: "Anjeer Figs",
    },
    {
      path: "/nuts",
      name: "Cashew",
    },
    {
      path: "/nuts",
      name: "Pistachios",
    },
  ];
  const dryfruits = [
    {
      path: "/dryfruits",
      name: "Black Current",
    },
    {
      path: "/dryfruits",
      name: "Dry Amla",
    },
    {
      path: "/dryfruits",
      name: "Ginger Cubes",
    },
    {
      path: "/dryfruits",
      name: "Honey Amla",
    },
  ];
  const seeds = [
    {
      path: "/seeds",
      name: "Sunflower Seeds",
    },
    {
      path: "/seeds",
      name: "Sabja Seeds",
    },
    {
      path: "/seeds",
      name: "Watermelon Seeds",
    },
    {
      path: "/seeds",
      name: "Vellari Seeds",
    },
  ];
  const dates = [
    {
      path: "/dates",
      name: "Ajwa Dates",
    },
    {
      path: "/dates",
      name: "Khimiya Dates",
    },
    {
      path: "/dates",
      name: "Medjoul Dates",
    },
    {
      path: "/dates",
      name: "Kimia Dates",
    },
  ];
  const terms = [
    {
      path: "/privacy-policy",
      name: "Privacy & Policy",
    },
    {
      path: "/terms-conditions",
      name: "Terms & Conditions",
    },
    {
      path: "/shipping-policy",
      name: "Shipping Policy",
    },
    {
      path: "/return-policy",
      name: "Return Policy",
    },
  ];

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <>
      <Box
        data-aos="fade-up"
        data-aos-duration="3000"
        sx={{ display: ["none", "none", "block"] }}
      >
        <Box sx={{ display: ["none", "none", "block"] }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              my: ["2.5rem", "3.5rem"],
            }}
          >
            <Box
              sx={{
                bgcolor: "black",
                width: ["8rem", "7rem", "11rem"],
                height: ["8rem", "7rem", "11rem"],
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "100%",
                my: [-6, -9],
              }}
            >
              <Box
                component="img"
                src="Images/logo.png"
                alt="customer"
                sx={{
                  width: ["6rem", "8rem", "8rem"],
                  height: ["6rem", "8rem", "8rem"],
                  borderRadius: "100%",
                }}
              />
            </Box>
          </Box>
          <Box sx={{ textAlign: "center" }}>
            <Typography
              sx={{
                fontSize: "18px",
                fontFamily: "sans-serif",
                fontWeight: "600",
                color: "white",
                letterSpacing: 1.2,
                textTransform: "uppercase",
                mx: 4,
                my: 0.1,
              }}
            >
              Smart
            </Typography>
            <Typography
              sx={{
                fontSize: "15px",
                fontFamily: "sans-serif",
                fontWeight: "600",
                color: "white",
                letterSpacing: 5,
                textTransform: "uppercase",
              }}
            >
              dry fruits
            </Typography>
          </Box>
        </Box>
        {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#FF6B6B" fillOpacity="1" d="M0,32L80,53.3C160,75,320,117,480,112C640,107,800,53,960,42.7C1120,32,1280,64,1360,80L1440,96L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path></svg> */}
        <Box sx={{ mx: [2.5, 2], mt: 8 }}>
          <Grid
            container
            spacing={8}
            justifyContent={{ xs: "flex-start", md: "center" }}
          >
            <Grid item xs={12} sm={6} lg={3}>
              <Box>
                <Typography
                  sx={{
                    fontSize: "18px",
                    fontFamily: "sans-serif",
                    fontWeight: "500",
                    color: "white",
                    letterSpacing: 1,
                  }}
                >
                  Address
                </Typography>
                <Typography
                  sx={{
                    fontSize: "17px",
                    fontFamily: "sans-serif",
                    color: "white",
                    mt: 1,
                    letterSpacing: 1,
                  }}
                >
                  31,Sarangapani East Street,
                </Typography>
                <Typography
                  sx={{
                    fontSize: "17px",
                    fontFamily: "sans-serif",
                    color: "white",
                    letterSpacing: 1,
                  }}
                >
                  Utchi Pillaiyar Kovil,
                </Typography>
                <Typography
                  sx={{
                    fontSize: "17px",
                    fontFamily: "sans-serif",
                    color: "white",
                    letterSpacing: 1,
                  }}
                >
                  Kumbakonam, Tamil Nadu 612001, India.
                </Typography>
                <Typography
                  sx={{
                    fontSize: "18px",
                    fontFamily: "sans-serif",
                    fontWeight: "500",
                    color: "white",
                    letterSpacing: 1,
                    mt: 5,
                  }}
                >
                  Contact Us
                </Typography>
                <Typography
                  sx={{
                    fontSize: "15px",
                    fontFamily: "sans-serif",
                    color: "white",
                    mt: 1,
                    letterSpacing: 1,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <MailIcon />
                  smartnutsheaven@gmail.com
                </Typography>
                <Typography
                  sx={{
                    fontSize: "15px",
                    fontFamily: "sans-serif",
                    color: "white",
                    mt: 1,
                    letterSpacing: 1,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <PhoneCallback />
                  +91 9025330197
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <Box>
                <Typography
                  sx={{
                    fontSize: "18px",
                    fontFamily: "sans-serif",
                    fontWeight: "500",
                    color: "white",
                    letterSpacing: 1.2,
                  }}
                >
                  Products
                </Typography>
                <CusAccordion
                  head={
                    <Typography
                      sx={{
                        fontSize: ["0.8rem"],
                        fontWeight: 600,
                        color: "#fff",
                        letterSpacing: 2,
                        textTransform: "uppercase",
                      }}
                    >
                      Nuts
                    </Typography>
                  }
                  body={
                    <Box sx={{ mt: -2 }}>
                      {nuts.map((item, index) => (
                        <Link
                          to={item.path}
                          style={{ textDecoration: "none" }}
                          color="#fff"
                          onClick={scrollToTop}
                        >
                          <Typography
                            key={index}
                            color="#fff"
                            underline="hover"
                            sx={{
                              fontSize: [
                                ".85rem",
                                ".85rem",
                                "12px",
                                "12px",
                                ".85rem",
                              ],
                              letterSpacing: 1,
                              cursor: "pointer",
                              py: 1,
                              ":hover": {
                                color: "gray",
                                textDecoration: "none",
                              },
                            }}
                          >
                            {item.name}
                          </Typography>
                        </Link>
                      ))}
                    </Box>
                  }
                />
                <CusAccordion
                  head={
                    <Typography
                      sx={{
                        fontSize: ["0.8rem"],
                        fontWeight: 600,
                        color: "#fff",
                        letterSpacing: 2,
                        textTransform: "uppercase",
                      }}
                    >
                      Seeds
                    </Typography>
                  }
                  body={
                    <Box sx={{ mt: -2 }}>
                      {seeds.map((item, index) => (
                        <Link
                          to={item.path}
                          style={{ textDecoration: "none" }}
                          color="#fff"
                          onClick={scrollToTop}
                        >
                          <Typography
                            key={index}
                            color="#fff"
                            underline="hover"
                            sx={{
                              fontSize: [
                                ".85rem",
                                ".85rem",
                                "12px",
                                "12px",
                                ".85rem",
                              ],
                              letterSpacing: 1,
                              cursor: "pointer",
                              py: 1,
                              ":hover": {
                                color: "gray",
                                textDecoration: "none",
                              },
                            }}
                          >
                            {item.name}
                          </Typography>
                        </Link>
                      ))}
                    </Box>
                  }
                />
                <CusAccordion
                  head={
                    <Typography
                      sx={{
                        fontSize: ["0.8rem"],
                        fontWeight: 600,
                        color: "#fff",
                        letterSpacing: 2,
                        textTransform: "uppercase",
                      }}
                    >
                      Dry Fruits
                    </Typography>
                  }
                  body={
                    <Box sx={{ mt: -2 }}>
                      {dryfruits.map((item, index) => (
                        <Link
                          to={item.path}
                          style={{ textDecoration: "none" }}
                          color="#fff"
                          onClick={scrollToTop}
                        >
                          <Typography
                            key={index}
                            color="#fff"
                            underline="hover"
                            sx={{
                              fontSize: [
                                ".85rem",
                                ".85rem",
                                "12px",
                                "12px",
                                ".85rem",
                              ],
                              letterSpacing: 1,
                              cursor: "pointer",
                              py: 1,
                              ":hover": {
                                color: "gray",
                                textDecoration: "none",
                              },
                            }}
                          >
                            {item.name}
                          </Typography>
                        </Link>
                      ))}
                    </Box>
                  }
                />
                <CusAccordion
                  head={
                    <Typography
                      sx={{
                        fontSize: ["0.8rem"],
                        fontWeight: 600,
                        color: "#fff",
                        letterSpacing: 2,
                        textTransform: "uppercase",
                      }}
                    >
                      Dates
                    </Typography>
                  }
                  body={
                    <Box sx={{ mt: -2 }}>
                      {dates.map((item, index) => (
                        <Link
                          to={item.path}
                          style={{ textDecoration: "none" }}
                          color="#fff"
                          onClick={scrollToTop}
                        >
                          <Typography
                            key={index}
                            color="#fff"
                            underline="hover"
                            sx={{
                              fontSize: [
                                ".85rem",
                                ".85rem",
                                "12px",
                                "12px",
                                ".85rem",
                              ],
                              letterSpacing: 1,
                              cursor: "pointer",
                              py: 1,
                              ":hover": {
                                color: "gray",
                                textDecoration: "none",
                              },
                            }}
                          >
                            {item.name}
                          </Typography>
                        </Link>
                      ))}
                    </Box>
                  }
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} lg={2}>
              <Box>
                <Typography
                  sx={{
                    fontSize: "18px",
                    fontFamily: "sans-serif",
                    fontWeight: "500",
                    color: "white",
                    letterSpacing: 1,
                  }}
                >
                  Overview
                </Typography>
                <Link
                  to="/"
                  onClick={scrollToTop}
                  style={{ textDecoration: "none" }}
                >
                  <Typography
                    sx={{
                      fontSize: "15px",
                      fontFamily: "sans-serif",
                      color: "white",
                      letterSpacing: 1,
                      mt: 1,
                      "&:hover": { color: "lightgray" },
                    }}
                  >
                    Home
                  </Typography>
                </Link>
                <Link
                  to="/about"
                  onClick={scrollToTop}
                  style={{ textDecoration: "none" }}
                >
                  <Typography
                    sx={{
                      fontSize: "15px",
                      fontFamily: "sans-serif",
                      color: "white",
                      letterSpacing: 1,
                      mt: 1,
                      "&:hover": { color: "lightgray" },
                    }}
                  >
                    About
                  </Typography>
                </Link>
                <Link
                  to="/dates"
                  onClick={scrollToTop}
                  style={{ textDecoration: "none" }}
                >
                  <Typography
                    sx={{
                      fontSize: "15px",
                      fontFamily: "sans-serif",
                      color: "white",
                      letterSpacing: 1,
                      mt: 1,
                      "&:hover": { color: "lightgray" },
                    }}
                  >
                    Product
                  </Typography>
                </Link>
                <Link
                  to="/contact"
                  onClick={scrollToTop}
                  style={{ textDecoration: "none" }}
                >
                  <Typography
                    sx={{
                      fontSize: "15px",
                      fontFamily: "sans-serif",
                      color: "white",
                      letterSpacing: 1,
                      mt: 1,
                      "&:hover": { color: "lightgray" },
                    }}
                  >
                    Contact Us
                  </Typography>
                </Link>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} lg={2}>
              <Box>
                <Typography
                  sx={{
                    fontSize: "18px",
                    fontFamily: "sans-serif",
                    fontWeight: "500",
                    color: "white",
                    letterSpacing: 1,
                  }}
                >
                  Policies & Help
                </Typography>
                <Link
                  to="/privacy-policy"
                  onClick={scrollToTop}
                  style={{ textDecoration: "none" }}
                >
                  <Typography
                    sx={{
                      fontSize: "15px",
                      fontFamily: "sans-serif",
                      color: "white",
                      letterSpacing: 1,
                      mt: 1,
                      "&:hover": { color: "lightgray" },
                    }}
                  >
                    Privacy & Policy
                  </Typography>
                </Link>
                <Link
                  to="/terms-conditions"
                  onClick={scrollToTop}
                  style={{ textDecoration: "none" }}
                >
                  <Typography
                    sx={{
                      fontSize: "15px",
                      fontFamily: "sans-serif",
                      color: "white",
                      letterSpacing: 1,
                      mt: 1,
                      "&:hover": { color: "lightgray" },
                    }}
                  >
                    Terms & Conditions
                  </Typography>
                </Link>
                <Link
                  to="/shipping"
                  onClick={scrollToTop}
                  style={{ textDecoration: "none" }}
                >
                  <Typography
                    sx={{
                      fontSize: "15px",
                      fontFamily: "sans-serif",
                      color: "white",
                      letterSpacing: 1,
                      mt: 1,
                      "&:hover": { color: "lightgray" },
                    }}
                  >
                    Shipping Policy
                  </Typography>
                </Link>
                <Link
                  to="/return-policy"
                  onClick={scrollToTop}
                  style={{ textDecoration: "none" }}
                >
                  <Typography
                    sx={{
                      fontSize: "15px",
                      fontFamily: "sans-serif",
                      color: "white",
                      letterSpacing: 1,
                      mt: 1,
                      "&:hover": { color: "lightgray" },
                    }}
                  >
                    Return Policy
                  </Typography>
                </Link>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} lg={2}>
              <Box>
                <Typography
                  sx={{
                    fontSize: "18px",
                    fontFamily: "sans-serif",
                    fontWeight: "500",
                    color: "white",
                    letterSpacing: 1,
                  }}
                >
                  Follow Us
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Fab
                    component="a"
                    href="https://wa.me/9025330197"
                    sx={{
                      backgroundColor: "white",
                      mx: 0.5,
                      color: "#282828",
                      "&:hover": { backgroundColor: "gray" },
                    }}
                  >
                    <WhatsAppIcon />
                  </Fab>
                  <Fab
                    component="a"
                    href="https://www.instagram.com/sdfkumbakonam?igsh=MTJ3Y2d5eTlrNmttMw%3D%3D"
                    sx={{
                      backgroundColor: "white",
                      mx: 0.5,
                      color: "#282828",
                      "&:hover": { backgroundColor: "gray" },
                    }}
                  >
                    <InstagramIcon />
                  </Fab>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Box sx={{ display: ["block", "block", "none"] }}>
        <Box sx={{ display: ["block", "block", "none"] }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              my: ["2.5rem", "3rem"],
            }}
          >
            <Box
              sx={{
                bgcolor: "black",
                width: ["8rem", "11rem", "9rem"],
                height: ["8rem", "11rem", "9rem"],
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "100%",
                my: [-6, -8],
              }}
            >
              <Box
                component="img"
                src="Images/logo.png"
                alt="customer"
                sx={{
                  width: ["6rem", "8rem", "10.5rem"],
                  height: ["6rem", "8rem", "10.5rem"],
                  borderRadius: "100%",
                }}
              />
            </Box>
          </Box>
          <Box sx={{ textAlign: "center" }}>
            <Typography
              sx={{
                fontSize: "18px",
                fontFamily: "sans-serif",
                fontWeight: "600",
                color: "white",
                letterSpacing: 1.2,
                textTransform: "uppercase",
                mx: 4,
                my: 0.1,
              }}
            >
              Smart
            </Typography>
            <Typography
              sx={{
                fontSize: "15px",
                fontFamily: "sans-serif",
                fontWeight: "600",
                color: "white",
                letterSpacing: 5,
                textTransform: "uppercase",
              }}
            >
              dry fruits
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            width: "100%",
            zIndex: 25,
            display: "flex",
            flexDirection: "column",
            gap: ["1rem", "1.2rem", "1.8rem", "2rem", "3rem"],
            py: ["1rem", "1.2rem", "1.8rem", "2rem"],
            pt: [3, 3, 7, 6],
            px: ["0", "2.2rem", "0"],
            color: "#fff",
          }}
        >
          <Stack
            sx={{
              columnGap: ["2rem", "2rem", "2rem", "2rem", "6rem"],
              gap: "0rem",
            }}
            direction={{ xs: "column", sm: "row" }}
            gap={{ xs: 2, sm: 3, md: 1 }}
            flexWrap={{ sm: "wrap" }}
            justifyContent={{
              xs: "space-between",
              sm: "center",
              md: "center",
              lg: "space-around",
            }}
          >
            <CusAccordion
              display={["flex", "flex", "none"]}
              head={
                <Typography
                  sx={{
                    fontSize: ["0.9rem"],
                    fontWeight: 600,
                    color: "#fff",
                    letterSpacing: 2,
                    textTransform: "uppercase",
                  }}
                >
                  Products
                </Typography>
              }
              body={
                <>
                  <CusAccordion
                    head={
                      <Typography
                        sx={{
                          fontSize: ["0.8rem"],
                          fontWeight: 600,
                          color: "#fff",
                          letterSpacing: 2,
                          textTransform: "uppercase",
                        }}
                      >
                        Nuts
                      </Typography>
                    }
                    body={
                      <Box sx={{ mt: -2 }}>
                        {nuts.map((item, index) => (
                          <Link
                            to={item.path}
                            style={{ textDecoration: "none" }}
                            color="#fff"
                            onClick={scrollToTop}
                          >
                            <Typography
                              key={index}
                              color="#fff"
                              underline="hover"
                              sx={{
                                fontSize: [
                                  ".85rem",
                                  ".85rem",
                                  "12px",
                                  "12px",
                                  ".85rem",
                                ],
                                letterSpacing: 1,
                                cursor: "pointer",
                                py: 1,
                                ":hover": {
                                  color: "gray",
                                  textDecoration: "none",
                                },
                              }}
                            >
                              {item.name}
                            </Typography>
                          </Link>
                        ))}
                      </Box>
                    }
                  />
                  <CusAccordion
                    head={
                      <Typography
                        sx={{
                          fontSize: ["0.8rem"],
                          fontWeight: 600,
                          color: "#fff",
                          letterSpacing: 2,
                          textTransform: "uppercase",
                        }}
                      >
                        Seeds
                      </Typography>
                    }
                    body={
                      <Box sx={{ mt: -2 }}>
                        {seeds.map((item, index) => (
                          <Link
                            to={item.path}
                            style={{ textDecoration: "none" }}
                            color="#fff"
                            onClick={scrollToTop}
                          >
                            <Typography
                              key={index}
                              color="#fff"
                              underline="hover"
                              sx={{
                                fontSize: [
                                  ".85rem",
                                  ".85rem",
                                  "12px",
                                  "12px",
                                  ".85rem",
                                ],
                                letterSpacing: 1,
                                cursor: "pointer",
                                py: 1,
                                ":hover": {
                                  color: "gray",
                                  textDecoration: "none",
                                },
                              }}
                            >
                              {item.name}
                            </Typography>
                          </Link>
                        ))}
                      </Box>
                    }
                  />
                  <CusAccordion
                    head={
                      <Typography
                        sx={{
                          fontSize: ["0.8rem"],
                          fontWeight: 600,
                          color: "#fff",
                          letterSpacing: 2,
                          textTransform: "uppercase",
                        }}
                      >
                        Dry Fruits
                      </Typography>
                    }
                    body={
                      <Box sx={{ mt: -2 }}>
                        {dryfruits.map((item, index) => (
                          <Link
                            to={item.path}
                            style={{ textDecoration: "none" }}
                            color="#fff"
                            onClick={scrollToTop}
                          >
                            <Typography
                              key={index}
                              color="#fff"
                              underline="hover"
                              sx={{
                                fontSize: [
                                  ".85rem",
                                  ".85rem",
                                  "12px",
                                  "12px",
                                  ".85rem",
                                ],
                                letterSpacing: 1,
                                cursor: "pointer",
                                py: 1,
                                ":hover": {
                                  color: "gray",
                                  textDecoration: "none",
                                },
                              }}
                            >
                              {item.name}
                            </Typography>
                          </Link>
                        ))}
                      </Box>
                    }
                  />
                  <CusAccordion
                    head={
                      <Typography
                        sx={{
                          fontSize: ["0.8rem"],
                          fontWeight: 600,
                          color: "#fff",
                          letterSpacing: 2,
                          textTransform: "uppercase",
                        }}
                      >
                        Nuts
                      </Typography>
                    }
                    body={
                      <Box sx={{ mt: -2 }}>
                        {nuts.map((item, index) => (
                          <Link
                            to={item.path}
                            style={{ textDecoration: "none" }}
                            color="#fff"
                            onClick={scrollToTop}
                          >
                            <Typography
                              key={index}
                              color="#fff"
                              underline="hover"
                              sx={{
                                fontSize: [
                                  ".85rem",
                                  ".85rem",
                                  "12px",
                                  "12px",
                                  ".85rem",
                                ],
                                letterSpacing: 1,
                                cursor: "pointer",
                                py: 1,
                                ":hover": {
                                  color: "gray",
                                  textDecoration: "none",
                                },
                              }}
                            >
                              {item.name}
                            </Typography>
                          </Link>
                        ))}
                      </Box>
                    }
                  />
                  <CusAccordion
                    head={
                      <Typography
                        sx={{
                          fontSize: ["0.8rem"],
                          fontWeight: 600,
                          color: "#fff",
                          letterSpacing: 2,
                          textTransform: "uppercase",
                        }}
                      >
                        Dates
                      </Typography>
                    }
                    body={
                      <Box sx={{ mt: -2 }}>
                        {dates.map((item, index) => (
                          <Link
                            to={item.path}
                            style={{ textDecoration: "none" }}
                            color="#fff"
                            onClick={scrollToTop}
                          >
                            <Typography
                              key={index}
                              color="#fff"
                              underline="hover"
                              sx={{
                                fontSize: [
                                  ".85rem",
                                  ".85rem",
                                  "12px",
                                  "12px",
                                  ".85rem",
                                ],
                                letterSpacing: 1,
                                cursor: "pointer",
                                py: 1,
                                ":hover": {
                                  color: "gray",
                                  textDecoration: "none",
                                },
                              }}
                            >
                              {item.name}
                            </Typography>
                          </Link>
                        ))}
                      </Box>
                    }
                  />
                </>
              }
            />

            <CusAccordion
              display={["flex", "flex", "none"]}
              head={
                <Typography
                  sx={{
                    fontSize: ["0.9rem"],
                    fontWeight: 600,
                    color: "#fff",
                    letterSpacing: 2,
                    textTransform: "uppercase",
                  }}
                >
                  Address
                </Typography>
              }
              body={
                <Box sx={{}}>
                  <Typography
                    sx={{
                      fontSize: "15px",
                      fontFamily: "sans-serif",
                      color: "white",
                      mt: 1,
                      letterSpacing: 1,
                      lineHeight: 2,
                    }}
                  >
                    31 , Sarangapani East Street,
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "15px",
                      fontFamily: "sans-serif",
                      color: "white",
                      letterSpacing: 1,
                      lineHeight: 2,
                    }}
                  >
                    Utchi Pillaiyar Kovil,
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "15px",
                      fontFamily: "sans-serif",
                      color: "white",
                      letterSpacing: 1,
                      lineHeight: 2,
                    }}
                  >
                    Kumbakonam, Tamil Nadu 612001, India.
                  </Typography>
                </Box>
              }
            />

            <CusAccordion
              display={["flex", "flex", "none"]}
              head={
                <Typography
                  sx={{
                    fontSize: ["0.9rem"],
                    fontWeight: 600,
                    color: "#fff",
                    letterSpacing: 2,
                    textTransform: "uppercase",
                  }}
                >
                  Contact US
                </Typography>
              }
              body={
                <Box>
                  <Typography
                    sx={{
                      fontSize: "15px",
                      fontFamily: "sans-serif",
                      color: "white",
                      mt: 1,
                      letterSpacing: 1,
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      pb: 1,
                    }}
                  >
                    <MailIcon />
                    smartnutsheaven@gmail.com
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "15px",
                      fontFamily: "sans-serif",
                      color: "white",
                      mt: 1,
                      letterSpacing: 1,
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <PhoneCallback /> +91 90253 30197
                  </Typography>
                </Box>
              }
            />
            <CusAccordion
              display={["flex", "flex", "none"]}
              lastChild
              head={
                <Typography
                  sx={{
                    fontSize: ["0.9rem"],
                    fontWeight: 600,
                    color: "#fff",
                    letterSpacing: 2,
                    textTransform: "uppercase",
                  }}
                >
                  Overview
                </Typography>
              }
              body={
                <Stack direction={{ xs: "column" }} gap={{ xs: 1.2, sm: 2 }}>
                  {overview.slice(0, 10).map((item, index) => (
                    <Link
                      to={item.path}
                      style={{ textDecoration: "none" }}
                      color="#fff"
                      onClick={scrollToTop}
                    >
                      <Typography
                        key={index}
                        style={{ textDecoration: "none" }}
                        color={"inherit"}
                        sx={{
                          fontSize: [
                            ".85rem",
                            ".85rem",
                            "12px",
                            "12px",
                            ".85rem",
                          ],
                          color: "#fff",
                          ":hover": {
                            color: "gray",
                            textDecoration: "none",
                          },
                        }}
                      >
                        {item.name}
                      </Typography>
                    </Link>
                  ))}
                </Stack>
              }
            />
            <CusAccordion
              display={["flex", "flex", "none"]}
              lastChild
              head={
                <Typography
                  sx={{
                    fontSize: ["0.9rem"],
                    fontWeight: 600,
                    color: "#fff",
                    letterSpacing: 2,
                    textTransform: "uppercase",
                  }}
                >
                  Policies & Help
                </Typography>
              }
              body={
                <Stack direction={{ xs: "column" }} gap={{ xs: 1.2, sm: 2 }}>
                  {terms.slice(0, 10).map((item, index) => (
                    <Link
                      to={item.path}
                      style={{ textDecoration: "none" }}
                      color="#fff"
                      onClick={scrollToTop}
                    >
                      <Typography
                        key={index}
                        style={{ textDecoration: "none" }}
                        color={"inherit"}
                        sx={{
                          fontSize: [
                            ".85rem",
                            ".85rem",
                            "12px",
                            "12px",
                            ".85rem",
                          ],
                          color: "#fff",
                          ":hover": {
                            color: "gray",
                            textDecoration: "none",
                          },
                        }}
                      >
                        {item.name}
                      </Typography>
                    </Link>
                  ))}
                </Stack>
              }
            />
            <CusAccordion
              display={["flex", "flex", "none"]}
              lastChild
              head={
                <Typography
                  sx={{
                    fontSize: ["0.9rem"],
                    fontWeight: 600,
                    color: "#fff",
                    letterSpacing: 2,
                    textTransform: "uppercase",
                  }}
                >
                  Follows US
                </Typography>
              }
              body={
                <Box sx={{ mt: 2 }}>
                  <Fab
                    component="a"
                    href="https://wa.me/90253 30197"
                    sx={{
                      backgroundColor: "white",
                      mx: 0.5,
                      color: "#282828",
                      "&:hover": { backgroundColor: "gray" },
                    }}
                  >
                    <WhatsAppIcon />
                  </Fab>
                  <Fab
                    component="a"
                    href="https://www.instagram.com/sdfkumbakonam?igsh=MTJ3Y2d5eTlrNmttMw=="
                    sx={{
                      backgroundColor: "white",
                      mx: 0.5,
                      color: "#282828",
                      "&:hover": { backgroundColor: "gray" },
                    }}
                  >
                    <InstagramIcon />
                  </Fab>
                </Box>
              }
            />
          </Stack>
          <Divider />
        </Box>
      </Box>
      <Stack
        sx={{
          width: "100%",
          gap: 3,
          pt: 8,
          pb: 3,
        }}
      >
        <Stack
          direction={"column"}
          sx={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            color={"inherit"}
            underline="hover"
            sx={{
              fontSize: ["1rem", ".75rem", "12px", "15px", "1.3rem"],
              color: "#f6f6f6",
              textAlign: "center",
            }}
          >
            © {new Date().getFullYear()},Smart Dry Fruits. All Rights Reserved.
          </Typography>
          <Typography
            variant="body2"
            color="GrayText"
            style={{ marginTop: "1rem" }}
          >
            Designed & Developed by{"  "}
            <a
              href="https://kudanthaiinfotech.in/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "white", textDecoration: "none" }}
            >
              Kudanthai Infotech
            </a>
          </Typography>
        </Stack>
      </Stack>
    </>
  );
}

export default Footer;
