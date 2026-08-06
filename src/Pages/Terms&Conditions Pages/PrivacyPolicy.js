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
import SpaOutlinedIcon from '@mui/icons-material/SpaOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import CookieOutlinedIcon from '@mui/icons-material/CookieOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import GavelOutlinedIcon from '@mui/icons-material/GavelOutlined';
import ChildCareOutlinedIcon from '@mui/icons-material/ChildCareOutlined';
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
    icon: SpaOutlinedIcon,
    body: [
      `Smart Dry Fruits ("we", "us", "our") sells premium almonds, cashews, pistachios, dates, dried berries, and gift hampers through our website and retail counters. This policy explains what information we collect when you browse, order, subscribe, or write to us, and the choices you have over it.`,
      `By placing an order or creating an account with us, you agree to the practices described here. If anything is unclear, our team is a message away — see "Contact Us" below.`,
    ],
  },
  {
    id: 'information-we-collect',
    label: 'Information We Collect',
    icon: PersonOutlineOutlinedIcon,
    body: [
      `Account & order details: your name, phone number, email, delivery and billing address, and order history — including gifting notes and recipient addresses when you send a hamper to someone else.`,
      `Payment information: we do not store full card numbers. Payments are processed by our PCI-compliant payment partners, who share only a transaction reference and status with us.`,
      `Preferences: taste and allergen preferences you save to your profile, subscription box frequency, and wishlist items, so we can recommend the right pack sizes and roast styles.`,
      `Device & usage data: pages viewed, approximate location (city-level, from IP), browser type, and referring site — collected automatically to keep the store fast and secure.`,
    ],
  },
  {
    id: 'how-we-use-it',
    label: 'How We Use Your Information',
    icon: SettingsOutlinedIcon,
    body: [
      `To pack and ship your order, send delivery updates, and handle returns or quality complaints.`,
      `To personalise your experience — for example, reminding you when your favourite Mamra almonds are back in season, or suggesting a hamper size based on past festival orders.`,
      `To run our loyalty programme and apply the correct member pricing or bulk/wholesale rates.`,
      `To send order receipts and, only with your consent, festival offers and restock alerts. You can opt out of marketing messages at any time from your account or the unsubscribe link.`,
    ],
  },
  {
    id: 'cookies',
    label: 'Cookies & Tracking',
    icon: CookieOutlinedIcon,
    body: [
      `We use essential cookies to keep your cart and login session working, and analytics cookies to understand which products and pages perform well.`,
      `With your consent, we also use marketing cookies so that offers you see on other sites (for example, a reminder about the cart you left behind) are relevant rather than random.`,
      `You can manage cookie preferences from our cookie banner at any time, or through your browser settings. Turning off non-essential cookies won't affect your ability to browse or order.`,
    ],
  },
  {
    id: 'sharing',
    label: 'Sharing Your Information',
    icon: ShareOutlinedIcon,
    body: [
      `We share order details with our courier partners solely to deliver your package, and with payment processors solely to complete your transaction.`,
      `We do not sell your personal information to advertisers or data brokers.`,
      `Where a corporate gifting order is placed on behalf of a company, we may share delivery status with the ordering company's designated contact, not with individual recipients' personal details beyond what's needed for delivery.`,
    ],
  },
  {
    id: 'security',
    label: 'Payment & Data Security',
    icon: LockOutlinedIcon,
    body: [
      `All data in transit is encrypted (HTTPS/TLS). Card payments run through PCI-DSS certified gateways — our servers never see or store your full card number or CVV.`,
      `Access to customer data internally is limited to staff who need it to fulfil orders or support, and is logged.`,
    ],
  },
  {
    id: 'retention',
    label: 'Data Retention',
    icon: AccessTimeOutlinedIcon,
    body: [
      `We keep order records for as long as needed for warranty, tax, and accounting purposes (typically up to 8 years, as required by Indian tax law), and account data for as long as your account stays active.`,
      `If you delete your account, we remove personal data within 30 days except where we're legally required to retain it.`,
    ],
  },
  {
    id: 'your-rights',
    label: 'Your Rights & Choices',
    icon: GavelOutlinedIcon,
    body: [
      `You can access, correct, or download your data, and request deletion of your account, from your profile settings or by writing to us.`,
      `You can opt out of promotional emails and SMS at any time; transactional messages (order confirmations, delivery updates) will continue as they're necessary to fulfil your order.`,
    ],
  },
  {
    id: 'childrens-privacy',
    label: "Children's Privacy",
    icon: ChildCareOutlinedIcon,
    body: [
      `Our store is intended for users 18 and older. We don't knowingly collect personal information from children. If you believe a child has provided us information, contact us and we'll remove it promptly.`,
    ],
  },
  {
    id: 'changes',
    label: 'Changes to This Policy',
    icon: UpdateOutlinedIcon,
    body: [
      `As our catalogue and services grow, we may update this policy. Material changes will be announced on this page and, where appropriate, by email. The "last updated" date below always reflects the current version.`,
    ],
  },
  {
    id: 'contact',
    label: 'Contact Us',
    icon: MailOutlineOutlinedIcon,
    body: [
      `Questions about your data or this policy? Reach our privacy team at smartnutsheaven@gmail.com or call +91 90253 30197, Monday–Saturday, 10am–10pm IST.`,
    ],
  },
];

const LAST_UPDATED = 'August 4, 2026';

export default function PrivacyPolicyPage() {
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
     <Navbar  color="#000" />

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
            Privacy Policy
          </Typography>
          <Typography sx={{ maxWidth: 560, color: 'rgba(251,246,239,0.82)', fontSize: { xs: 15, md: 16.5 } }}>
            We select every almond and cashew by hand. We handle your personal
            information with the same care — sourced transparently, used
            deliberately, and never sold.
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