import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import { Link } from "react-router-dom";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// ✅ Static banners — replace image_url / link with your actual assets.
// is_active: true  → shown on mobile
// is_active: false → shown on desktop
const BANNERS = [
  {
    id: 1,
    image_url: "Images/BannerImages/Laptop9.jpeg",
    link: "/combo",
    is_active: false,
  },
  {
    id: 2,
    image_url: "Images/BannerImages/Home2.png",
    link: "/nuts",
    is_active: false,
  },
  {
    id: 3,
    image_url: "Images/BannerImages/Home1.png",
    link: "/nuts",
    is_active: false,
  },
  {
    id: 4,
    image_url: "Images/BannerImages/Home3.png",
    link: "/dates",
    is_active: false,
  },
  {
    id: 5,
    image_url: "Images/BannerImages/Mobile.png",
    link: "/combo",
    is_active: true,
  },
  {
    id: 6,
    image_url: "Images/BannerImages/Mobile3.png",
    link: "/dryfruits",
    is_active: true,
  },
  {
    id: 7,
    image_url: "Images/BannerImages/Mobile2.png",
    link: "/dryfruits",
    is_active: true,
  },
  {
    id: 8,
    image_url: "Images/BannerImages/Mobile1.png",
    link: "/dates",
    is_active: true,
  },
];

const MainProductSlide1 = () => {
  const [isMobile, setIsMobile] = useState(
    window.matchMedia("(max-width: 768px)").matches,
  );

  // ✅ Detect mobile/desktop on resize
  useEffect(() => {
    const media = window.matchMedia("(max-width: 768px)");
    const handleResize = () => setIsMobile(media.matches);
    media.addEventListener("change", handleResize);
    return () => media.removeEventListener("change", handleResize);
  }, []);

  // ✅ is_active = true  → mobile banners
  // ✅ is_active = false → desktop banners
  const filteredBanners = BANNERS.filter((b) =>
    isMobile ? b.is_active : !b.is_active,
  );

  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: {
            xs: "550px",
            sm: "550px",
            md: "400px",
            lg: "600px",
            xl: "600px",
          },
          overflow: "hidden",
        }}
      >
        <Swiper
          slidesPerView={1}
          spaceBetween={0}
          modules={[Navigation, Autoplay, Pagination]}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          loop={filteredBanners.length > 1}
          navigation={true}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
        >
          {filteredBanners.map((banner) => {
            const isExternal = banner.link?.startsWith("http");

            return (
              <SwiperSlide key={banner.id}>
                <Box sx={{ width: "100%", height: "100%" }}>
                  {/* 🔗 INTERNAL LINK */}
                  {!isExternal ? (
                    <Link
                      to={banner.link}
                      style={{
                        display: "block",
                        width: "100%",
                        height: "100%",
                      }}
                    >
                      <img
                        src={banner.image_url}
                        alt="Banner"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          cursor: "pointer",
                        }}
                      />
                    </Link>
                  ) : (
                    /* 🔗 EXTERNAL LINK */
                    <a
                      href={banner.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "block",
                        width: "100%",
                        height: "100%",
                      }}
                    >
                      <img
                        src={banner.image_url}
                        alt="Banner"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                          cursor: "pointer",
                        }}
                      />
                    </a>
                  )}
                </Box>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </Box>

      {/* 🎨 STYLES */}
      <style>
        {`
          .swiper {
            width: 100%;
            height: 100%;
          }

          .swiper-slide {
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .swiper-button-next,
          .swiper-button-prev {
            color: #000;
            background: rgba(255,255,255,0.7);
            border-radius: 50%;
            width: 40px;
            height: 40px;
          }

          .swiper-button-next::after,
          .swiper-button-prev::after {
            font-size: 18px;
            font-weight: bold;
          }

          .swiper-pagination {
            bottom: 20px !important;
          }

          .swiper-pagination-bullet {
            width: 20px;
            height: 20px;
            background: #bbb;
            opacity: 1;
            margin: 0 5px !important;
            transition: all 0.4s ease;
          }

          .swiper-pagination-bullet-active {
            background: #92553D;
            transform: scale(1.6);
          }

          .swiper-pagination-bullet-active-main {
            transform: scale(1.8);
          }

          .swiper-pagination-bullet-active-prev,
          .swiper-pagination-bullet-active-next {
            transform: scale(1.3);
          }
        `}
      </style>
    </>
  );
};

export default MainProductSlide1;
