import React, { useEffect, useState, useCallback } from 'react';
import {
  ThemeProvider,
  GlobalStyles,
  CssBaseline,
  Box,
  Container,
  Typography,
  Chip,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  Link as MuiLink,
  Select,
  MenuItem,
  useMediaQuery,
} from '@mui/material';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import TrackChangesOutlinedIcon from '@mui/icons-material/TrackChangesOutlined';
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';
import CardGiftcardOutlinedIcon from '@mui/icons-material/CardGiftcardOutlined';
import EventBusyOutlinedIcon from '@mui/icons-material/EventBusyOutlined';
import UpdateOutlinedIcon from '@mui/icons-material/UpdateOutlined';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import theme, { brand } from './Theme';
import Navbar from '../../Component/Navbar';
import TopBar from '../../Component/TopBar';
import Footer from '../../Component/Footer';

/* -------------------------------------------------------------- */
/*  Signature element: a scattered "almond" divider. Stands in    */
/*  for the generic hairline <Divider/> at moments that deserve   */
/*  a little more warmth, without ever becoming decoration for    */
/*  its own sake.                                                 */
/* -------------------------------------------------------------- */
const AlmondDivider = ({ align = 'left' }) => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: align === 'center' ? 'center' : 'flex-start',
      my: { xs: 3, md: 4 },
    }}
    aria-hidden="true"
  >
    <svg width="120" height="14" viewBox="0 0 120 14" fill="none">
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <ellipse
          key={i}
          cx={8 + i * 20}
          cy="7"
          rx="6"
          ry="3.4"
          transform={`rotate(-25 ${8 + i * 20} 7)`}
          fill={i % 2 === 0 ? brand.brown : brand.gold}
          opacity={1 - i * 0.13}
        />
      ))}
    </svg>
  </Box>
);

/* -------------------------------------------------------------- */
/*  Content — written for a dry-fruits & nuts e-commerce brand,   */
/*  not generic boilerplate.                                      */
/* -------------------------------------------------------------- */
const SECTIONS = [
  {
    id: 'introduction',
    label: 'Introduction',
    icon: LocalShippingOutlinedIcon,
    body: [
      `This Shipping Policy explains how we pack, dispatch, and deliver your Smart Dry Fruits order — from processing time to what happens if something goes missing along the way.`,
      `It applies to every order placed on our website, including gift hampers sent directly to a recipient other than you.`,
    ],
  },
  {
    id: 'coverage',
    label: 'Where We Deliver',
    icon: MapOutlinedIcon,
    body: [
      `We currently ship across India, to serviceable pin codes covered by our courier partners. You can check whether your pin code is serviceable by entering it on the product or cart page before checkout.`,
      `A small number of remote or restricted pin codes may not be serviceable, or may only be served by certain couriers with longer transit times — we'll flag this at checkout rather than after you've paid.`,
      `We don't currently offer international shipping. If that changes, this policy will be updated to reflect it.`,
    ],
  },
  {
    id: 'processing',
    label: 'Order Processing Time',
    icon: Inventory2OutlinedIcon,
    body: [
      `Orders placed before 1pm IST on a business day are typically packed and handed to our courier partner within 24–48 hours. Orders placed later, or on Sundays and public holidays, are processed the next business day.`,
      `Custom or large-quantity gift hampers, and corporate/bulk orders, may need 2–4 extra business days for careful packing — we'll confirm the exact timeline when you order.`,
      `During festival seasons (e.g. Diwali, Raksha Bandhan), processing times can extend due to order volume; we'll display any expected delay on the site during these periods.`,
    ],
  },
  {
    id: 'delivery-timelines',
    label: 'Delivery Timelines',
    icon: AccessTimeOutlinedIcon,
    body: [
      `Once dispatched, standard delivery typically takes 2–5 business days for metro and major cities, and 4–8 business days for other locations, depending on courier serviceability.`,
      `These are estimates, not guarantees — weather, courier network disruptions, and regional holidays can affect actual delivery time. We'll always share the courier's tracking link so you can follow progress in real time.`,
    ],
  },
  {
    id: 'shipping-charges',
    label: 'Shipping Charges',
    icon: PaidOutlinedIcon,
    body: [
      `Shipping charges, if any, are calculated at checkout based on order weight, value, and delivery location, and shown before you pay.`,
      `We periodically run free-shipping thresholds or promotions on select order values — any applicable offer is shown on the cart page automatically.`,
    ],
  },
  {
    id: 'tracking',
    label: 'Order Tracking',
    icon: TrackChangesOutlinedIcon,
    body: [
      `You'll receive a shipping confirmation by email/SMS with a tracking number and courier link as soon as your order is dispatched.`,
      `You can also check order status anytime from the "My Orders" section of your account.`,
    ],
  },
  {
    id: 'packaging',
    label: 'Packaging & Freshness',
    icon: CardGiftcardOutlinedIcon,
    body: [
      `Nuts and dried fruit are sealed in food-grade, tamper-evident packaging to protect freshness in transit. Gift hampers are additionally boxed and cushioned to arrive presentation-ready.`,
      `Please inspect your package on arrival. If the outer packaging looks tampered with or damaged, note it with the courier before accepting delivery where possible, and let us know within 48 hours with photos.`,
    ],
  },
  {
    id: 'delays-issues',
    label: 'Delays, Damage & Lost Shipments',
    icon: ReportProblemOutlinedIcon,
    body: [
      `If your order hasn't arrived within the estimated window, check the courier tracking link first — most delays resolve within a day or two. If it's still stuck, contact us and we'll chase it up with the courier on your behalf.`,
      `For orders damaged in transit or lost by the courier, we'll arrange a free replacement or full refund once the claim is verified — no cost to you.`,
      `We're not responsible for delays caused by an incorrect or incomplete address provided at checkout; please double-check delivery details before placing your order.`,
    ],
  },
  {
    id: 'failed-delivery',
    label: 'Failed Delivery Attempts',
    icon: EventBusyOutlinedIcon,
    body: [
      `Couriers typically make up to 2–3 delivery attempts. If all attempts fail (recipient unavailable, wrong address, refused delivery), the order is returned to us.`,
      `Once a returned order reaches us, we'll get in touch to arrange re-shipment (additional shipping charges may apply) or a refund minus original shipping and handling costs.`,
    ],
  },
  {
    id: 'changes',
    label: 'Changes to This Policy',
    icon: UpdateOutlinedIcon,
    body: [
      `As our courier network and service areas grow, we may update this policy. Material changes will be announced on this page. The "last updated" date below always reflects the current version.`,
    ],
  },
  {
    id: 'contact',
    label: 'Contact Us',
    icon: MailOutlineOutlinedIcon,
    body: [
      `Questions about a shipment or this policy? Reach our team at smartnutsheaven@gmail.com or call +91 90253 30197, Monday–Saturday, 10am–10pm IST.`,
    ],
  },
];

const LAST_UPDATED = 'August 4, 2026';

export default function ShippingPolicyPage() {
  const isDesktop = useMediaQuery('(min-width:960px)');
  const [active, setActive] = useState(SECTIONS[0].id);

  // Load brand fonts once.
  useEffect(() => {
    const id = 'shahi-df-fonts';
    if (document.getElementById(id)) return;
    const link = document.createElement('link');
    link.id = id;
    link.rel = 'stylesheet';
    link.href =
      'https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600&display=swap';
    document.head.appendChild(link);
  }, []);

  const scrollTo = useCallback((id) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 88;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setActive(id);
    }
  }, []);

  // Track which section is in view (desktop TOC highlight).
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          '::selection': { background: brand.gold, color: brand.brownDark },
          html: { scrollBehavior: 'smooth' },
        }}
      />

      {/* ---------------- Header ---------------- */}
      <TopBar />
      <Navbar color="#000" />

      {/* ---------------- Hero ---------------- */}
      <Box sx={{ mt: 5, bgcolor: 'primary.dark', color: brand.cream, position: 'relative', overflow: 'hidden' }}>
        <Box
          aria-hidden
          sx={{
            position: 'absolute',
            inset: 0,
            opacity: 0.5,
            backgroundImage: `radial-gradient(circle at 15% 30%, ${brand.brown} 0%, transparent 45%), radial-gradient(circle at 85% 70%, ${brand.brownLight} 0%, transparent 40%)`,
          }}
        />
        <Container maxWidth="lg" sx={{ position: 'relative', py: { xs: 6, md: 9 } }}>
          <Chip
            label="Policies"
            size="small"
            sx={{
              bgcolor: 'rgba(251,246,239,0.14)',
              color: brand.cream,
              fontWeight: 600,
              letterSpacing: 1,
              mb: 2.5,
              textTransform: 'uppercase',
              fontSize: 11,
            }}
          />
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: 34, sm: 44, md: 54 },
              lineHeight: 1.1,
              maxWidth: 640,
              mb: 2,
            }}
          >
            Shipping Policy
          </Typography>
          <Typography sx={{ maxWidth: 560, color: 'rgba(251,246,239,0.82)', fontSize: { xs: 15, md: 16.5 } }}>
            From our packing table to your doorstep — how we get your nuts
            and dried fruit to you fresh, on time, and intact.
          </Typography>
          <Typography sx={{ mt: 3, fontSize: 13, color: 'rgba(251,246,239,0.6)' }}>
            Last updated: {LAST_UPDATED}
          </Typography>
        </Container>
      </Box>

      {/* ---------------- Mobile section jump ---------------- */}
      {!isDesktop && (
        <Box sx={{ bgcolor: 'background.paper', borderBottom: `1px solid ${brand.line}`, py: 1.5, position: 'sticky', top: 65, zIndex: 9 }}>
          <Container maxWidth="lg">
            <Select
              fullWidth
              size="small"
              value={active}
              onChange={(e) => scrollTo(e.target.value)}
              sx={{
                bgcolor: brand.cream,
                fontWeight: 600,
                '& .MuiOutlinedInput-notchedOutline': { borderColor: brand.line },
              }}
            >
              {SECTIONS.map((s) => (
                <MenuItem key={s.id} value={s.id}>
                  {s.label}
                </MenuItem>
              ))}
            </Select>
          </Container>
        </Box>
      )}

      {/* ---------------- Body ---------------- */}
      <Container maxWidth="lg" sx={{ py: { xs: 5, md: 8 } }}>
        <Box sx={{ display: 'flex', gap: 6, alignItems: 'flex-start' }}>
          {/* Sticky TOC — desktop only */}
          {isDesktop && (
            <Box
              component="nav"
              aria-label="Table of contents"
              sx={{ width: 260, flexShrink: 0, position: 'sticky', top: 100 }}
            >
              <Typography
                variant="overline"
                sx={{ color: 'text.secondary', fontWeight: 700, letterSpacing: 1.2 }}
              >
                On this page
              </Typography>
              <List dense sx={{ mt: 0.5 }}>
                {SECTIONS.map((s) => {
                  const Icon = s.icon;
                  const isActive = active === s.id;
                  return (
                    <ListItemButton
                      key={s.id}
                      selected={isActive}
                      onClick={() => scrollTo(s.id)}
                      sx={{
                        borderRadius: 2,
                        mb: 0.25,
                        borderLeft: '3px solid transparent',
                        '&.Mui-selected': {
                          bgcolor: 'rgba(122,69,49,0.08)',
                          borderLeft: `3px solid ${brand.brown}`,
                        },
                        '&.Mui-selected:hover': { bgcolor: 'rgba(122,69,49,0.12)' },
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 34, color: isActive ? 'primary.main' : 'text.secondary' }}>
                        <Icon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText
                        primaryTypographyProps={{
                          fontSize: 13.5,
                          fontWeight: isActive ? 600 : 500,
                          color: isActive ? 'primary.dark' : 'text.secondary',
                        }}
                      >
                        {s.label}
                      </ListItemText>
                    </ListItemButton>
                  );
                })}
              </List>
            </Box>
          )}

          {/* Sections */}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            {SECTIONS.map((s, idx) => {
              const Icon = s.icon;
              return (
                <Box key={s.id} id={s.id} sx={{ scrollMarginTop: 100, mb: { xs: 5, md: 6 } }}>
                  <Stack direction="row" alignItems="center" spacing={1.25} sx={{ mb: 1.5 }}>
                    <Box
                      sx={{
                        width: 38,
                        height: 38,
                        borderRadius: '50%',
                        bgcolor: 'rgba(122,69,49,0.08)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'primary.main',
                        flexShrink: 0,
                      }}
                    >
                      <Icon fontSize="small" />
                    </Box>
                    <Typography variant="h4" sx={{ fontSize: { xs: 20, md: 23 }, color: 'primary.dark' }}>
                      {s.label}
                    </Typography>
                  </Stack>
                  <Stack spacing={1.5}>
                    {s.body.map((p, i) => (
                      <Typography
                        key={i}
                        sx={{ color: 'text.primary', lineHeight: 1.75, fontSize: 15.5 }}
                      >
                        {p}
                      </Typography>
                    ))}
                  </Stack>
                  {idx < SECTIONS.length - 1 && <AlmondDivider />}
                </Box>
              );
            })}

            <Paper
              elevation={0}
              sx={{
                mt: 2,
                p: { xs: 3, md: 4 },
                bgcolor: 'rgba(122,69,49,0.06)',
                border: `1px solid ${brand.line}`,
                borderRadius: 3,
              }}
            >
              <Typography sx={{ fontWeight: 600, color: 'primary.dark', mb: 0.5 }}>
                Still have questions?
              </Typography>
              <Typography sx={{ color: 'text.secondary', fontSize: 14.5, mb: 2 }}>
                Our team replies within one business day.
              </Typography>
              <MuiLink
                href="mailto:smartnutsheaven@gmail.com"
                underline="hover"
                sx={{ fontWeight: 600, color: 'primary.main' }}
              >
                smartnutsheaven@gmail.com
              </MuiLink>
            </Paper>
          </Box>
        </Box>
      </Container>

      <Divider sx={{ borderColor: brand.line }} />

      {/* ---------------- Footer ---------------- */}
      <Box sx={{ bgcolor: 'black', mt: [8, 12, 16], px: 2 }}>
        <Footer />
      </Box>
    </ThemeProvider>
  );
}