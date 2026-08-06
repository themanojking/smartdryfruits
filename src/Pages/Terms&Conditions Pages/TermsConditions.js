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
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import ReplayOutlinedIcon from '@mui/icons-material/ReplayOutlined';
import Grain from '@mui/icons-material/Grain';
import CopyrightOutlinedIcon from '@mui/icons-material/CopyrightOutlined';
import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined';
import GavelOutlinedIcon from '@mui/icons-material/GavelOutlined';
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
    icon: DescriptionOutlinedIcon,
    body: [
      `These Terms & Conditions ("Terms") govern your use of the Smart Dry Fruits website and your purchase of almonds, cashews, pistachios, dates, dried berries, and gift hampers from us ("we", "us", "our").`,
      `By browsing our site, creating an account, or placing an order, you agree to these Terms. Please read them alongside our Privacy Policy. If you don't agree with any part, we'd ask that you not use the site or place an order.`,
    ],
  },
  {
    id: 'eligibility',
    label: 'Eligibility & Accounts',
    icon: HowToRegOutlinedIcon,
    body: [
      `You must be at least 18 years old and able to enter into a binding contract to place an order with us.`,
      `You're responsible for keeping your account credentials confidential and for all activity under your account. Let us know right away if you suspect unauthorised use.`,
      `Information you give us at checkout — name, address, phone number — must be accurate and current, so your order actually reaches you.`,
    ],
  },
  {
    id: 'orders-pricing',
    label: 'Orders & Pricing',
    icon: ShoppingBagOutlinedIcon,
    body: [
      `Placing an order is an offer to buy; a confirmation email or SMS from us marks our acceptance. We may decline or cancel an order — for example if a product is out of stock, priced incorrectly, or the order looks fraudulent — and will notify you and refund any amount already charged.`,
      `Prices are listed in Indian Rupees (INR) and include applicable taxes unless stated otherwise. Prices, weights, and pack sizes may change without notice, but changes won't affect an order you've already placed and had confirmed.`,
      `Product photos are for illustration; natural variation in colour, size, and shape of nuts and dried fruit is normal and not a defect.`,
    ],
  },
  {
    id: 'payments',
    label: 'Payments',
    icon: PaymentsOutlinedIcon,
    body: [
      `We accept payment through the methods shown at checkout (cards, UPI, net banking, and cash on delivery where available). Payments are processed by PCI-DSS certified third-party gateways; we never see or store your full card details.`,
      `Orders are processed only after payment is successfully confirmed, except for cash-on-delivery orders where payment is collected at delivery.`,
    ],
  },
  {
    id: 'shipping',
    label: 'Shipping & Delivery',
    icon: LocalShippingOutlinedIcon,
    body: [
      `We ship across India through our courier partners. Estimated delivery timelines shown at checkout are our best estimate, not a guarantee — festival periods and remote pin codes can add delays.`,
      `Risk in the goods passes to you on delivery to the address provided. Please inspect your package on arrival and let us know within 48 hours of any damage or shortage so we can make it right.`,
      `Undeliverable orders returned to us due to an incorrect address or repeated failed delivery attempts may be refunded minus shipping and handling costs.`,
    ],
  },
  {
    id: 'cancellations-returns',
    label: 'Cancellations, Returns & Refunds',
    icon: ReplayOutlinedIcon,
    body: [
      `You can cancel an order free of charge before it's dispatched. Once dispatched, cancellation isn't possible, but our returns process still applies.`,
      `Because our products are perishable food items, we can only accept returns for genuine quality issues — wrong item received, damaged packaging, or spoiled product — reported with photos within 48 hours of delivery.`,
      `Approved refunds are issued to your original payment method, typically within 7–10 business days. We don't offer returns for change of mind on opened food products, for hygiene and safety reasons.`,
    ],
  },
  {
    id: 'product-info',
    label: 'Product Information & Allergens',
    icon: Grain,
    body: [
      `We describe our products, ingredients, and any tree-nut cross-contact risk to the best of our knowledge, but our facility handles multiple nut varieties. If you have a nut allergy or other food sensitivity, please check product labels carefully or contact us before ordering.`,
      `Store products as instructed on the pack (typically cool and dry) to preserve freshness; we're not responsible for quality issues arising from improper storage after delivery.`,
    ],
  },
  {
    id: 'intellectual-property',
    label: 'Intellectual Property',
    icon: CopyrightOutlinedIcon,
    body: [
      `All content on this site — logos, product photography, packaging design, and text — belongs to Smart Dry Fruits or our licensors and is protected by applicable intellectual property laws.`,
      `You may not copy, reproduce, or use our content commercially without our prior written consent.`,
    ],
  },
  {
    id: 'acceptable-use',
    label: 'Acceptable Use',
    icon: BlockOutlinedIcon,
    body: [
      `You agree not to misuse the site — including attempting unauthorised access, submitting false order or payment information, scraping content, or interfering with the site's normal operation.`,
      `We may suspend or terminate accounts that violate these Terms or that we reasonably believe are being used fraudulently.`,
    ],
  },
  {
    id: 'liability-law',
    label: 'Liability & Governing Law',
    icon: GavelOutlinedIcon,
    body: [
      `We aim to describe our products accurately, but to the extent permitted by law, we're not liable for indirect or consequential losses arising from your use of the site or your order, beyond the value of the order itself.`,
      `Nothing in these Terms limits any right you have under Indian consumer protection law.`,
      `These Terms are governed by the laws of India, and any dispute will be subject to the exclusive jurisdiction of the courts where our business is registered.`,
    ],
  },
  {
    id: 'changes',
    label: 'Changes to These Terms',
    icon: UpdateOutlinedIcon,
    body: [
      `We may update these Terms as our catalogue and services grow. Material changes will be announced on this page, and continued use of the site after an update means you accept the revised Terms. The "last updated" date below always reflects the current version.`,
    ],
  },
  {
    id: 'contact',
    label: 'Contact Us',
    icon: MailOutlineOutlinedIcon,
    body: [
      `Questions about these Terms? Reach our team at smartnutsheaven@gmail.com or call +91 90253 30197, Monday–Saturday, 10am–10pm IST.`,
    ],
  },
];

const LAST_UPDATED = 'August 4, 2026';

export default function TermsAndConditionsPage() {
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
            Terms & Conditions
          </Typography>
          <Typography sx={{ maxWidth: 560, color: 'rgba(251,246,239,0.82)', fontSize: { xs: 15, md: 16.5 } }}>
            The ground rules for shopping with us — written plainly, so you
            know exactly what to expect from order to doorstep.
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