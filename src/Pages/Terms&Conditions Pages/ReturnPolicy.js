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
import ReplayOutlinedIcon from '@mui/icons-material/ReplayOutlined';
import RuleOutlinedIcon from '@mui/icons-material/RuleOutlined';
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import SwapHorizOutlinedIcon from '@mui/icons-material/SwapHorizOutlined';
import CurrencyRupeeOutlinedIcon from '@mui/icons-material/CurrencyRupeeOutlined';
import CardGiftcardOutlinedIcon from '@mui/icons-material/CardGiftcardOutlined';
import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
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
    icon: ReplayOutlinedIcon,
    body: [
      `This Return Policy explains when and how you can return or exchange a Smart Dry Fruits order, and how refunds are processed.`,
      `Because we sell perishable food items, our return window and conditions are narrower than a typical retail policy — please read the eligibility rules below before requesting a return.`,
    ],
  },
  {
    id: 'eligibility',
    label: 'Return Eligibility',
    icon: RuleOutlinedIcon,
    body: [
      `We accept returns only for items that arrive damaged, spoiled, expired, incorrect, or materially different from what you ordered (e.g. wrong product or short quantity).`,
      `Because nuts and dried fruit are perishable and sealed for freshness, we can't accept returns for change of mind, incorrect taste preference, or opened packaging that isn't defective.`,
      `To be eligible, the item must be unused (for non-food gifting add-ons) or unconsumed beyond what's needed to identify the issue, in its original packaging, with the invoice or order number available.`,
    ],
  },
  {
    id: 'window',
    label: 'Return Window',
    icon: EventAvailableOutlinedIcon,
    body: [
      `You have 48 hours from delivery to report a damaged, spoiled, or incorrect item — this short window helps us investigate freshness issues while they're still verifiable with the courier and our packing records.`,
      `Requests raised after 48 hours will be reviewed case by case, but we can't guarantee a resolution once that window has passed.`,
    ],
  },
  {
    id: 'how-to-request',
    label: 'How to Request a Return',
    icon: CameraAltOutlinedIcon,
    body: [
      `Email smartnutsheaven@gmail.com or call +91 90253 30197 with your order number, a short description of the issue, and clear photos (or a short video) of the product and its packaging.`,
      `Our team will review the evidence, usually within 1–2 business days, and confirm whether the item qualifies for a replacement or refund. Please don't discard the product or packaging until we've confirmed next steps.`,
    ],
  },
  {
    id: 'replacement-refund',
    label: 'Replacements & Refunds',
    icon: SwapHorizOutlinedIcon,
    body: [
      `For verified damaged, spoiled, or incorrect orders, we'll offer a free replacement where stock allows, or a full refund — your choice.`,
      `If you'd prefer a refund instead of a replacement, or the item is out of stock, we'll process the refund once the claim is approved.`,
    ],
  },
  {
    id: 'refund-timelines',
    label: 'Refund Timelines',
    icon: CurrencyRupeeOutlinedIcon,
    body: [
      `Approved refunds are initiated within 3–5 business days of approval and credited to your original payment method. Depending on your bank or payment provider, it can take an additional 5–7 business days to reflect in your account.`,
      `For prepaid orders, refunds go back to the original card, UPI ID, or wallet used. For Cash on Delivery orders, we'll arrange a bank transfer and may ask for your account details to process it.`,
    ],
  },
  {
    id: 'gift-orders',
    label: 'Gift Hampers & Gifted Orders',
    icon: CardGiftcardOutlinedIcon,
    body: [
      `If a hamper was sent as a gift to someone else, either the sender or the recipient can report an issue, but refunds are always issued to the original paying account.`,
      `Custom or personalised hampers (engraved, monogrammed, or made to a custom list) can only be returned if they arrive damaged or incorrect — we can't accept returns simply because a custom selection didn't suit the recipient.`,
    ],
  },
  {
    id: 'non-returnable',
    label: 'Non-Returnable Situations',
    icon: BlockOutlinedIcon,
    body: [
      `We can't accept returns for products that have been substantially consumed, stored improperly after delivery (e.g. left unsealed or in humid/hot conditions), or damaged after delivery due to mishandling.`,
      `We also can't accept returns based on natural variation in nut size, colour, or moisture content — these are normal characteristics of raw, minimally processed food and not defects.`,
    ],
  },
  {
    id: 'pickup-shipping',
    label: 'Return Pickup & Shipping',
    icon: LocalShippingOutlinedIcon,
    body: [
      `For approved returns, we'll arrange a reverse pickup through our courier partner at no cost to you where serviceable; otherwise we'll guide you on shipping the item back and reimburse reasonable shipping costs.`,
      `Please don't ship an item back before we've confirmed the return is approved — unapproved returns may not be eligible for reimbursement of shipping costs.`,
    ],
  },
  {
    id: 'changes',
    label: 'Changes to This Policy',
    icon: UpdateOutlinedIcon,
    body: [
      `As our product range and courier network evolve, we may update this policy. Material changes will be announced on this page. The "last updated" date below always reflects the current version.`,
    ],
  },
  {
    id: 'contact',
    label: 'Contact Us',
    icon: MailOutlineOutlinedIcon,
    body: [
      `Questions about a return or this policy? Reach our team at smartnutsheaven@gmail.com or call +91 90253 30197, Monday–Saturday, 10am–10pm IST.`,
    ],
  },
];

const LAST_UPDATED = 'August 4, 2026';

export default function ReturnPolicyPage() {
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
            Return Policy
          </Typography>
          <Typography sx={{ maxWidth: 560, color: 'rgba(251,246,239,0.82)', fontSize: { xs: 15, md: 16.5 } }}>
            Freshness is the whole point — here's how we make it right if
            something isn't as it should be.
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