import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    Box, Button, Stack, Typography, Divider, Dialog, IconButton,
    TextField, Grid, GlobalStyles, useMediaQuery, useTheme
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBackIosNew';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import ShoppingBasketOutlinedIcon from '@mui/icons-material/ShoppingBasketOutlined';
import CheckIcon from '@mui/icons-material/Check';
import Footer from '../Component/Footer';
import { removeFromCart, clearCart } from '../redux/cartSlice';
import CartItemCard from '../Pages/CartItemCard.js';
import Navbar from '../Component/Navbar';
import Title from '../Component/Title.jsx';
import TopBar from '../Component/TopBar.jsx';

/* ----------------------------- Design tokens ----------------------------- */
const BRAND = '#7A3E2E';
const BRAND_DARK = '#4E2A1F';
const GOLD = '#C89B3C';
const PISTACHIO = '#5B7553';
const INK = '#2B1B12';
const CREAM = '#FBF3E6';
const MUTED = '#8a7a6d';
const PAPER_LINE = 'rgba(122,62,46,0.18)';

const DELIVERY_ZONES = [
    { id: 'local', label: 'Kumbakonam & nearby areas', description: 'Town + surrounding villages & district', fee: 0, icon: 'home' },
    { id: 'other', label: 'Rest of Tamil Nadu & India', description: 'Flat delivery fee applied', fee: 0, icon: 'truck' },
];

const parseNumericPrice = (val) => {
    if (typeof val === 'number') return val;
    const match = String(val ?? '').match(/[\d,]+(\.\d+)?/);
    return match ? parseFloat(match[0].replace(/,/g, '')) : 0;
};

const formatINR = (amount) => `₹${Math.round(amount).toLocaleString('en-IN')}`;

const paperTexture = {
    backgroundColor: '#fff',
    backgroundImage: `radial-gradient(rgba(122,62,46,0.05) 1px, transparent 1px)`,
    backgroundSize: '16px 16px',
};

/* -------------------------------------------------------------------------- */
/*  Order Summary — styled as a shopkeeper's paper ticket, complete with a    */
/*  perforated tear-line and a torn bottom edge.                              */
/* -------------------------------------------------------------------------- */
const TicketDivider = () => (
    <Box sx={{ position: 'relative', my: 2.2, height: 0 }}>
        <Box sx={{
            position: 'absolute', left: -28, right: -28, top: 0,
            borderTop: `1.5px dashed ${PAPER_LINE}`,
        }} />
        <Box sx={{
            position: 'absolute', left: -34, top: -6, width: 12, height: 12,
            borderRadius: '50%', bgcolor: CREAM, border: `1.5px solid ${PAPER_LINE}`,
        }} />
        <Box sx={{
            position: 'absolute', right: -34, top: -6, width: 12, height: 12,
            borderRadius: '50%', bgcolor: CREAM, border: `1.5px solid ${PAPER_LINE}`,
        }} />
    </Box>
);

const ZoneIcon = ({ type, active }) => {
    const Icon = type === 'home' ? HomeOutlinedIcon : LocalShippingOutlinedIcon;
    return (
        <Box sx={{
            width: 34, height: 34, borderRadius: '10px', flexShrink: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            bgcolor: active ? PISTACHIO : 'rgba(122,62,46,0.07)',
            color: active ? '#fff' : BRAND,
            transition: 'all 0.15s ease',
        }}>
            <Icon sx={{ fontSize: '1.05rem' }} />
        </Box>
    );
};

const OrderSummaryCard = ({
    itemCount, subtotal, savings, zones, selectedZone, onZoneChange,
    shippingFee, total, onPlaceOrder, sticky,
}) => (
    <Box sx={{
        position: sticky ? 'sticky' : 'static',
        top: sticky ? 96 : 'auto',
    }}>
        <Box sx={{
            position: 'relative',
            bgcolor: CREAM,
            borderRadius: '18px',
            border: `1px solid ${PAPER_LINE}`,
            boxShadow: '0 18px 40px -20px rgba(74,38,25,0.45)',
            px: 3.2,
            pt: 3,
            pb: 3.5,
            overflow: 'visible',
        }}>
            {shippingFee === 0 && (
                <Box sx={{
                    position: 'absolute', top: 14, right: -8,
                    bgcolor: GOLD, color: '#3a2a0e',
                    fontFamily: "'Manrope', sans-serif", fontWeight: 800, fontSize: '0.62rem',
                    letterSpacing: 0.6, textTransform: 'uppercase',
                    px: 1.4, py: 0.5, borderRadius: '4px 2px 2px 4px',
                    transform: 'rotate(4deg)',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.18)',
                    '&::after': {
                        content: '""', position: 'absolute', right: -6, top: '50%',
                        transform: 'translateY(-50%)', width: 0, height: 0,
                        borderTop: '7px solid transparent', borderBottom: '7px solid transparent',
                        borderLeft: `6px solid ${GOLD}`,
                    },
                }}>
                    Free delivery
                </Box>
            )}

            <Stack direction="row" alignItems="center" spacing={1}>
                <ShoppingBasketOutlinedIcon sx={{ color: BRAND, fontSize: '1.2rem' }} />
                <Typography sx={{ fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: '1.28rem', color: INK }}>
                    Your Order Ticket
                </Typography>
            </Stack>
            <Typography sx={{ fontFamily: "'Manrope', sans-serif", fontSize: '0.78rem', color: MUTED, mt: 0.3 }}>
                {itemCount} {itemCount === 1 ? 'item' : 'items'} · weighed & packed fresh
            </Typography>

            <TicketDivider />

            <Stack spacing={1.1}>
                <Stack direction="row" justifyContent="space-between">
                    <Typography sx={{ fontFamily: "'Manrope', sans-serif", fontSize: '0.86rem', color: '#5c4d40' }}>
                        Subtotal
                    </Typography>
                    <Typography sx={{ fontFamily: "'Manrope', sans-serif", fontSize: '0.86rem', fontWeight: 700, color: INK }}>
                        {formatINR(subtotal + savings)}
                    </Typography>
                </Stack>
                {savings > 0 && (
                    <Stack direction="row" justifyContent="space-between">
                        <Typography sx={{ fontFamily: "'Manrope', sans-serif", fontSize: '0.86rem', color: '#5c4d40' }}>
                            You saved
                        </Typography>
                        <Typography sx={{ fontFamily: "'Manrope', sans-serif", fontSize: '0.86rem', fontWeight: 700, color: PISTACHIO }}>
                            − {formatINR(savings)}
                        </Typography>
                    </Stack>
                )}
                <Stack direction="row" justifyContent="space-between">
                    <Typography sx={{ fontFamily: "'Manrope', sans-serif", fontSize: '0.86rem', color: '#5c4d40' }}>
                        Shipping
                    </Typography>
                    <Typography sx={{ fontFamily: "'Manrope', sans-serif", fontSize: '0.86rem', fontWeight: 700, color: PISTACHIO }}>
                        {shippingFee > 0 ? formatINR(shippingFee) : 'FREE'}
                    </Typography>
                </Stack>
            </Stack>

            <Box sx={{ mt: 2.4, mb: 1.1 }}>
                <Typography sx={{
                    fontFamily: "'Manrope', sans-serif", fontWeight: 700, fontSize: '0.7rem',
                    letterSpacing: 0.5, textTransform: 'uppercase', color: BRAND,
                }}>
                    Deliver to
                </Typography>
            </Box>

            <Stack spacing={1}>
                {zones.map((zone) => {
                    const selected = zone.id === selectedZone;
                    return (
                        <Box
                            key={zone.id}
                            onClick={() => onZoneChange(zone.id)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onZoneChange(zone.id); }}
                            sx={{
                                display: 'flex', alignItems: 'center', gap: 1.3,
                                p: 1.2, borderRadius: '12px',
                                border: `1.5px solid ${selected ? PISTACHIO : 'rgba(122,62,46,0.14)'}`,
                                bgcolor: selected ? 'rgba(91,117,83,0.08)' : 'rgba(255,255,255,0.4)',
                                cursor: 'pointer', transition: 'all 0.15s ease',
                                '&:focus-visible': { outline: `2px solid ${PISTACHIO}`, outlineOffset: 2 },
                            }}
                        >
                            <ZoneIcon type={zone.icon} active={selected} />
                            <Box sx={{ flex: 1, minWidth: 0 }}>
                                <Typography sx={{ fontFamily: "'Manrope', sans-serif", fontWeight: 700, fontSize: '0.82rem', color: INK }}>
                                    {zone.label}
                                </Typography>
                                <Typography sx={{ fontFamily: "'Manrope', sans-serif", fontSize: '0.7rem', color: MUTED, mt: 0.1 }}>
                                    {zone.description}
                                </Typography>
                            </Box>
                            <Box sx={{
                                width: 18, height: 18, borderRadius: '50%', flexShrink: 0,
                                border: `2px solid ${selected ? PISTACHIO : '#c9bcae'}`,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                            }}>
                                {selected && <Box sx={{ width: 9, height: 9, borderRadius: '50%', bgcolor: PISTACHIO }} />}
                            </Box>
                        </Box>
                    );
                })}
            </Stack>

            <TicketDivider />

            <Stack direction="row" justifyContent="space-between" alignItems="baseline">
                <Typography sx={{ fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: '1.1rem', color: INK }}>
                    Total
                </Typography>
                <Box sx={{ textAlign: 'right' }}>
                    <Typography sx={{ fontFamily: "'Manrope', sans-serif", fontWeight: 800, fontSize: '1.4rem', color: BRAND, lineHeight: 1.1 }}>
                        {formatINR(total)}
                    </Typography>
                    <Typography sx={{ fontFamily: "'Manrope', sans-serif", fontSize: '0.64rem', color: MUTED }}>
                        incl. all taxes
                    </Typography>
                </Box>
            </Stack>

            <Button
                fullWidth
                onClick={onPlaceOrder}
                startIcon={<WhatsAppIcon />}
                sx={{
                    mt: 2.6,
                    display: { xs: 'none', md: 'inline-flex' },
                    bgcolor: BRAND, color: '#fff', fontFamily: "'Manrope', sans-serif",
                    fontWeight: 700, fontSize: '0.92rem', textTransform: 'none',
                    borderRadius: '50px', py: 1.4, boxShadow: '0 10px 22px rgba(122,62,46,0.35)',
                    transition: 'transform 0.12s ease, background-color 0.15s ease',
                    '&:hover': { bgcolor: BRAND_DARK, transform: 'translateY(-1px)' },
                    '&:active': { transform: 'translateY(1px)' },
                }}
            >
                Place Order
            </Button>

            <Box sx={{
                position: 'absolute', left: 0, right: 0, bottom: -9, height: 18,
                backgroundImage: `linear-gradient(135deg, ${CREAM} 25%, transparent 25%), linear-gradient(225deg, ${CREAM} 25%, transparent 25%)`,
                backgroundSize: '18px 18px',
                backgroundPosition: 'left bottom',
                backgroundColor: 'transparent',
            }} />
        </Box>
    </Box>
);

/* -------------------------------------------------------------------------- */
/*  Checkout — a genuine two-step flow (contact, then delivery), so a         */
/*  numbered step indicator is honest here rather than decorative.            */
/* -------------------------------------------------------------------------- */
const StepDots = ({ step }) => (
    <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 1.6 }}>
        {[1, 2].map((n) => (
            <React.Fragment key={n}>
                <Stack direction="row" alignItems="center" spacing={0.7}>
                    <Box sx={{
                        width: 22, height: 22, borderRadius: '50%',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        bgcolor: step >= n ? '#fff' : 'rgba(255,255,255,0.18)',
                        color: step >= n ? BRAND : 'rgba(255,255,255,0.7)',
                        fontFamily: "'Manrope', sans-serif", fontWeight: 800, fontSize: '0.72rem',
                        transition: 'all 0.2s ease',
                    }}>
                        {step > n ? <CheckIcon sx={{ fontSize: '0.9rem' }} /> : n}
                    </Box>
                    <Typography sx={{
                        fontFamily: "'Manrope', sans-serif", fontSize: '0.74rem', fontWeight: 700,
                        color: step >= n ? '#fff' : 'rgba(255,255,255,0.65)',
                    }}>
                        {n === 1 ? 'Contact' : 'Delivery'}
                    </Typography>
                </Stack>
                {n === 1 && <Box sx={{ width: 20, height: 1.5, bgcolor: 'rgba(255,255,255,0.35)' }} />}
            </React.Fragment>
        ))}
    </Stack>
);

const CheckoutModal = ({ open, onClose, cartItems, zone, total, onSubmit }) => {
    const theme = useTheme();
    const fullScreenMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const [step, setStep] = useState(1);
    const [form, setForm] = useState({ fullName: '', email: '', phone: '', address: '', city: '', pincode: '' });
    const [errors, setErrors] = useState({});

    const handleChange = (field) => (e) => {
        setForm((prev) => ({ ...prev, [field]: e.target.value }));
        if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

    const validateStep1 = () => {
        const next = {};
        if (!form.fullName.trim()) next.fullName = 'Enter your full name';
        if (!form.phone.trim()) next.phone = 'Enter a phone number';
        else if (!/^\d{10}$/.test(form.phone.trim())) next.phone = 'Enter a valid 10-digit number';
        if (form.email.trim() && !/^\S+@\S+\.\S+$/.test(form.email.trim())) next.email = 'Enter a valid email';
        setErrors((prev) => ({ ...prev, ...next, address: undefined, city: undefined, pincode: undefined }));
        return Object.keys(next).length === 0;
    };

    const validateStep2 = () => {
        const next = {};
        if (!form.address.trim()) next.address = 'Enter your delivery address';
        if (!form.city.trim()) next.city = 'Enter your city';
        if (!form.pincode.trim()) next.pincode = 'Enter your pincode';
        else if (!/^\d{6}$/.test(form.pincode.trim())) next.pincode = 'Enter a valid 6-digit pincode';
        setErrors((prev) => ({ ...prev, ...next }));
        return Object.keys(next).length === 0;
    };

    const handleNext = () => { if (validateStep1()) setStep(2); };
    const handleBack = () => setStep(1);
    const handleSubmit = () => { if (validateStep2()) onSubmit(form); };
    const handleClose = () => { setStep(1); onClose(); };

    const fieldSx = {
        '& .MuiOutlinedInput-root': {
            borderRadius: 2.5,
            fontFamily: "'Manrope', sans-serif",
            fontSize: '0.88rem',
            bgcolor: '#fff',
            '& fieldset': { borderColor: 'rgba(122,62,46,0.2)' },
            '&:hover fieldset': { borderColor: BRAND },
            '&.Mui-focused fieldset': { borderColor: BRAND },
        },
        '& .MuiInputLabel-root': { fontFamily: "'Manrope', sans-serif", fontSize: '0.85rem' },
        '& .MuiInputLabel-root.Mui-focused': { color: BRAND },
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullScreen={fullScreenMobile}
            fullWidth
            maxWidth="sm"
            PaperProps={{ sx: { borderRadius: fullScreenMobile ? 0 : 4, overflow: 'hidden', ...paperTexture } }}
        >
            <Box sx={{
                background: `linear-gradient(135deg, ${BRAND}, ${BRAND_DARK})`,
                color: '#fff', px: 3, py: 2.5, position: 'relative',
            }}>
                {step === 2 && (
                    <IconButton onClick={handleBack} sx={{ position: 'absolute', top: 16, left: 10, color: '#fff' }} aria-label="Back">
                        <ArrowBackIcon sx={{ fontSize: '0.95rem' }} />
                    </IconButton>
                )}
                <Box sx={{ pl: step === 2 ? 3.5 : 0 }}>
                    <Typography sx={{ fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: '1.3rem' }}>
                        {step === 1 ? 'Who\u2019s this order for?' : 'Where should we deliver?'}
                    </Typography>
                    <Typography sx={{ fontFamily: "'Manrope', sans-serif", fontSize: '0.82rem', opacity: 0.85, mt: 0.3 }}>
                        {step === 1 ? 'A couple of details so we can reach you' : 'We\u2019ll pack it fresh and send it your way'}
                    </Typography>
                </Box>
                <StepDots step={step} />
                <IconButton onClick={handleClose} sx={{ position: 'absolute', top: 14, right: 14, color: '#fff' }} aria-label="Close">
                    <CloseIcon />
                </IconButton>
            </Box>

            <Box sx={{ px: [2.5, 3.5], py: 3, maxHeight: '72vh', overflowY: 'auto' }}>
                <Box sx={{ bgcolor: 'rgba(200,155,60,0.12)', border: `1px dashed ${PAPER_LINE}`, borderRadius: 3, p: 2, mb: 3 }}>
                    <Stack direction="row" alignItems="center" spacing={0.7} sx={{ mb: 1.2 }}>
                        <ShoppingBasketOutlinedIcon sx={{ fontSize: '0.95rem', color: BRAND }} />
                        <Typography sx={{ fontFamily: "'Manrope', sans-serif", fontWeight: 800, fontSize: '0.72rem', letterSpacing: 0.4, textTransform: 'uppercase', color: BRAND }}>
                            {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} on this ticket
                        </Typography>
                    </Stack>
                    <Stack spacing={0.7}>
                        {cartItems.map((item) => (
                            <Stack key={item.cartItemId} direction="row" justifyContent="space-between" spacing={1}>
                                <Typography sx={{ fontFamily: "'Manrope', sans-serif", fontSize: '0.8rem', color: INK, minWidth: 0 }} noWrap>
                                    {item.name} <Box component="span" sx={{ color: MUTED }}>({item.selectedGram})</Box>
                                </Typography>
                                <Typography sx={{ fontFamily: "'Manrope', sans-serif", fontSize: '0.8rem', fontWeight: 700, color: INK, whiteSpace: 'nowrap' }}>
                                    ×{item.quantity || 1} · {formatINR(parseNumericPrice(item.price) * (item.quantity || 1))}
                                </Typography>
                            </Stack>
                        ))}
                    </Stack>
                    <Divider sx={{ my: 1.2, borderColor: 'rgba(122,62,46,0.15)' }} />
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Stack direction="row" alignItems="center" spacing={0.5}>
                            <LocationOnOutlinedIcon sx={{ fontSize: '0.85rem', color: PISTACHIO }} />
                            <Typography sx={{ fontFamily: "'Manrope', sans-serif", fontSize: '0.75rem', color: PISTACHIO, fontWeight: 700 }}>
                                {zone.label}
                            </Typography>
                        </Stack>
                        <Typography sx={{ fontFamily: "'Manrope', sans-serif", fontWeight: 800, fontSize: '0.95rem', color: BRAND }}>
                            Total: {formatINR(total)}
                        </Typography>
                    </Stack>
                </Box>

                {step === 1 ? (
                    <Stack spacing={2}>
                        <TextField
                            label="Full Name" fullWidth value={form.fullName} onChange={handleChange('fullName')}
                            error={!!errors.fullName} helperText={errors.fullName} autoFocus
                            InputProps={{ startAdornment: <PersonOutlineIcon sx={{ fontSize: '1.1rem', color: MUTED, mr: 1 }} /> }}
                            sx={fieldSx}
                        />
                        <TextField
                            label="Phone Number" fullWidth value={form.phone} onChange={handleChange('phone')}
                            error={!!errors.phone} helperText={errors.phone}
                            InputProps={{ startAdornment: <PhoneOutlinedIcon sx={{ fontSize: '1.1rem', color: MUTED, mr: 1 }} /> }}
                            sx={fieldSx}
                        />
                        <TextField
                            label="Email Address (optional)" fullWidth value={form.email} onChange={handleChange('email')}
                            error={!!errors.email} helperText={errors.email}
                            InputProps={{ startAdornment: <EmailOutlinedIcon sx={{ fontSize: '1.1rem', color: MUTED, mr: 1 }} /> }}
                            sx={fieldSx}
                        />
                        <Button
                            fullWidth
                            onClick={handleNext}
                            sx={{
                                bgcolor: BRAND, color: '#fff', fontFamily: "'Manrope', sans-serif",
                                fontWeight: 700, fontSize: '0.92rem', textTransform: 'none',
                                borderRadius: '50px', py: 1.4, mt: 1,
                                boxShadow: '0 10px 20px rgba(122,62,46,0.28)',
                                '&:hover': { bgcolor: BRAND_DARK },
                            }}
                        >
                            Continue to delivery address
                        </Button>
                    </Stack>
                ) : (
                    <Stack spacing={2}>
                        <TextField
                            label="Full Address" placeholder="House/Flat No., Street, Landmark" fullWidth multiline minRows={2}
                            value={form.address} onChange={handleChange('address')} autoFocus
                            error={!!errors.address} helperText={errors.address}
                            InputProps={{ startAdornment: <HomeOutlinedIcon sx={{ fontSize: '1.1rem', color: MUTED, mr: 1, mt: 0.3, alignSelf: 'flex-start' }} /> }}
                            sx={fieldSx}
                        />
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="City" fullWidth value={form.city} onChange={handleChange('city')}
                                    error={!!errors.city} helperText={errors.city}
                                    InputProps={{ startAdornment: <LocationOnOutlinedIcon sx={{ fontSize: '1.1rem', color: MUTED, mr: 1 }} /> }}
                                    sx={fieldSx}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Pincode" fullWidth value={form.pincode} onChange={handleChange('pincode')}
                                    error={!!errors.pincode} helperText={errors.pincode}
                                    InputProps={{ startAdornment: <LocationOnOutlinedIcon sx={{ fontSize: '1.1rem', color: MUTED, mr: 1 }} /> }}
                                    sx={fieldSx}
                                />
                            </Grid>
                        </Grid>

                        <Button
                            fullWidth
                            onClick={handleSubmit}
                            startIcon={<WhatsAppIcon />}
                            sx={{
                                bgcolor: BRAND, color: '#fff', fontFamily: "'Manrope', sans-serif",
                                fontWeight: 700, fontSize: '0.95rem', textTransform: 'none',
                                borderRadius: '50px', py: 1.5, mt: 1,
                                boxShadow: '0 10px 20px rgba(122,62,46,0.32)',
                                '&:hover': { bgcolor: BRAND_DARK },
                            }}
                        >
                            Send Order on WhatsApp
                        </Button>
                        <Typography sx={{ fontFamily: "'Manrope', sans-serif", fontSize: '0.7rem', color: MUTED, textAlign: 'center' }}>
                            🔒 Your details are only used for order processing
                        </Typography>
                    </Stack>
                )}
            </Box>
        </Dialog>
    );
};

/* -------------------------------------------------------------------------- */
/*  Empty state                                                               */
/* -------------------------------------------------------------------------- */
const EmptyCart = () => (
    <Box sx={{ textAlign: 'center', py: [8, 12] }}>
        <Box sx={{
            width: 84, height: 84, borderRadius: '50%', mx: 'auto', mb: 2.5,
            bgcolor: 'rgba(122,62,46,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
            <ShoppingBasketOutlinedIcon sx={{ fontSize: '2.2rem', color: 'rgba(122,62,46,0.4)' }} />
        </Box>
        <Typography sx={{ fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: '1.35rem', color: INK }}>
            Your basket is empty
        </Typography>
        <Typography sx={{ fontFamily: "'Manrope', sans-serif", fontSize: '0.88rem', color: MUTED, mt: 0.6, mb: 3 }}>
            Fill it up with a few of our fresh-roasted dry fruits.
        </Typography>
        <Button
            onClick={() => window.history.back()}
            sx={{
                bgcolor: BRAND, color: '#fff', fontFamily: "'Manrope', sans-serif",
                fontWeight: 700, textTransform: 'none', borderRadius: '50px', px: 4, py: 1.2,
                boxShadow: '0 10px 20px rgba(122,62,46,0.28)',
                '&:hover': { bgcolor: BRAND_DARK },
            }}
        >
            Continue Shopping
        </Button>
    </Box>
);

/* -------------------------------------------------------------------------- */
/*  Cart page                                                                  */
/* -------------------------------------------------------------------------- */
const Cart = () => {
    const cartItems = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

    const [selectedZoneId, setSelectedZoneId] = useState(DELIVERY_ZONES[0].id);
    const [checkoutOpen, setCheckoutOpen] = useState(false);
    const [showScrollTop, setShowScrollTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => setShowScrollTop(window.scrollY > 420);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    const selectedZone = DELIVERY_ZONES.find((z) => z.id === selectedZoneId) || DELIVERY_ZONES[0];

    const totalItemCount = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
    const subtotal = cartItems.reduce((sum, item) => sum + parseNumericPrice(item.price) * (item.quantity || 1), 0);
    const originalTotal = cartItems.reduce(
        (sum, item) => sum + parseNumericPrice(item.originalPrice ?? item.price) * (item.quantity || 1), 0
    );
    const savings = Math.max(0, originalTotal - subtotal);
    const shippingFee = selectedZone.fee;
    const total = subtotal + shippingFee;

    const handleRemoveFromCart = (cartItemId) => dispatch(removeFromCart(cartItemId));
    const handleClearCart = () => dispatch(clearCart());

    const handlePlaceOrder = () => {
        if (cartItems.length === 0) return;
        setCheckoutOpen(true);
    };

    const handleCheckoutSubmit = (details) => {
        const itemLines = cartItems
            .map((item) => `• ${item.name} (${item.selectedGram}) ×${item.quantity || 1} — ${formatINR(parseNumericPrice(item.price) * (item.quantity || 1))}`)
            .join('\n');

        const message =
            `Hi! I'd like to place an order 🌰\n\n` +
            `*Order Summary*\n${itemLines}\n\n` +
            `*Delivery Zone:* ${selectedZone.label}\n` +
            `*Total:* ${formatINR(total)} (incl. all taxes)\n\n` +
            `*Delivery Details*\n` +
            `Name: ${details.fullName}\n` +
            (details.email.trim() ? `Email: ${details.email}\n` : '') +
            `Phone: ${details.phone}\n` +
            `Address: ${details.address}, ${details.city} - ${details.pincode}`;

        const encodedMessage = encodeURIComponent(message);
        const whatsappNumber = '919025330197';
        const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

        const whatsappUrl = isMobile
            ? `https://wa.me/${whatsappNumber}?text=${encodedMessage}`
            : `https://web.whatsapp.com/send?phone=${whatsappNumber}&text=${encodedMessage}`;

        window.open(whatsappUrl, '_blank');
        setCheckoutOpen(false);
        // Order has been sent — empty the cart so it doesn't persist after checkout.
        dispatch(clearCart());
    };

    return (
        <>
            <GlobalStyles styles={`
                @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Manrope:wght@400;500;600;700;800&display=swap');
            `} />
            <TopBar />
            <Navbar color="#000" />

            <Box sx={{ overflowX: 'hidden', position: 'relative', pb: { xs: cartItems.length ? 11 : 0, md: 0 }, ...paperTexture }}>
                <Box component='img'
                    src='Images/leaf3.avif'
                    alt=''
                    sx={{
                        width: ["70%", "50%", "25%", "25%", "25%"],
                        zIndex: -2,
                        ml: [-12],
                        mt: [0, 20, -2, -2, -2],
                        position: 'absolute',
                        opacity: 0.9,
                    }}
                />

                <Box sx={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
                    px: [2, 5, 4], pt: [2, 3],
                }}>
                    <Box>
                        <Title color={INK}>Your Cart</Title>
                        {cartItems.length > 0 && (
                            <Typography sx={{ fontFamily: "'Manrope', sans-serif", fontSize: '0.82rem', color: MUTED, mt: -1 }}>
                                {totalItemCount} {totalItemCount === 1 ? 'item' : 'items'} ready to be packed
                            </Typography>
                        )}
                    </Box>
                    {cartItems.length > 0 && (
                        <Typography
                            onClick={handleClearCart}
                            sx={{
                                fontFamily: "'Manrope', sans-serif", fontSize: '0.8rem', fontWeight: 700,
                                color: MUTED, textDecoration: 'underline', textUnderlineOffset: '3px',
                                cursor: 'pointer', flexShrink: 0, '&:hover': { color: BRAND },
                            }}
                        >
                            Clear cart
                        </Typography>
                    )}
                </Box>

                <Box sx={{ px: [2, 3, 4], py: [3, 4, 5], zIndex: 30, position: 'relative' }}>
                    {cartItems.length === 0 ? (
                        <EmptyCart />
                    ) : (
                        <Grid container spacing={{ xs: 3, md: 4 }}>
                            <Grid item xs={12} md={7} lg={8}>
                                <Box sx={{
                                    display: 'grid',
                                    gridTemplateColumns: {
                                        xs: '1fr',
                                        sm: 'repeat(2, 1fr)',
                                        lg: 'repeat(3, 1fr)',
                                    },
                                    gap: { xs: 1.5, sm: 2, lg: 2.5 },
                                    alignItems: 'stretch',
                                    justifyItems: 'stretch',
                                }}>
                                    {cartItems.map((item) => (
                                        <Box
                                            key={item.cartItemId}
                                            sx={{
                                                display: 'flex',
                                                height: '100%',
                                                borderRadius: '16px',
                                                transition: 'transform 0.18s ease, box-shadow 0.18s ease',
                                                '&:hover': {
                                                    transform: 'translateY(-3px)',
                                                    boxShadow: '0 14px 28px -16px rgba(74,38,25,0.35)',
                                                },
                                                '& > *': { width: '100%' },
                                            }}
                                        >
                                            <CartItemCard
                                                product={item}
                                                isLoading={false}
                                                onRemove={() => handleRemoveFromCart(item.cartItemId)}
                                            />
                                        </Box>
                                    ))}
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={5} lg={4} sx={{ order: { xs: -1, md: 0 } }}>
                                <OrderSummaryCard
                                    itemCount={cartItems.length}
                                    subtotal={subtotal}
                                    savings={savings}
                                    zones={DELIVERY_ZONES}
                                    selectedZone={selectedZoneId}
                                    onZoneChange={setSelectedZoneId}
                                    shippingFee={shippingFee}
                                    total={total}
                                    onPlaceOrder={handlePlaceOrder}
                                    sticky={isDesktop}
                                />
                            </Grid>
                        </Grid>
                    )}
                </Box>
            </Box>

            {cartItems.length > 0 && (
                <Box sx={{
                    display: { xs: 'flex', md: 'none' },
                    position: 'fixed', left: 0, right: 0, bottom: 0, zIndex: 1150,
                    alignItems: 'center', justifyContent: 'space-between', gap: 1.5,
                    bgcolor: CREAM,
                    borderTop: `1px solid ${PAPER_LINE}`,
                    boxShadow: '0 -8px 24px rgba(74,38,25,0.16)',
                    px: 2, py: 1.4,
                }}>
                    <Box sx={{ minWidth: 0 }}>
                        <Typography sx={{ fontFamily: "'Manrope', sans-serif", fontSize: '0.66rem', color: MUTED, textTransform: 'uppercase', letterSpacing: 0.4 }}>
                            {totalItemCount} {totalItemCount === 1 ? 'item' : 'items'} {shippingFee === 0 ? '· Free delivery' : ''}
                        </Typography>
                        <Typography sx={{ fontFamily: "'Manrope', sans-serif", fontWeight: 800, fontSize: '1.15rem', color: BRAND, lineHeight: 1.2 }}>
                            {formatINR(total)}
                        </Typography>
                    </Box>
                    <Button
                        onClick={handlePlaceOrder}
                        startIcon={<WhatsAppIcon />}
                        sx={{
                            bgcolor: BRAND, color: '#fff', fontFamily: "'Manrope', sans-serif",
                            fontWeight: 700, fontSize: '0.86rem', textTransform: 'none',
                            borderRadius: '50px', px: 3, py: 1.1, flexShrink: 0,
                            boxShadow: '0 8px 18px rgba(122,62,46,0.32)',
                            '&:hover': { bgcolor: BRAND_DARK },
                        }}
                    >
                        Place Order
                    </Button>
                </Box>
            )}

            <CheckoutModal
                open={checkoutOpen}
                onClose={() => setCheckoutOpen(false)}
                cartItems={cartItems}
                zone={selectedZone}
                total={total}
                onSubmit={handleCheckoutSubmit}
            />

            <Box sx={{ bgcolor: 'black', mt: [10, 16, 20], px: 2 }}>
                <Footer />
            </Box>

            <IconButton
                onClick={scrollToTop}
                aria-label="Scroll to top"
                sx={{
                    display: { xs: 'flex', md: 'none' },
                    position: 'fixed',
                    right: 16,
                    bottom: cartItems.length ? 96 : 20,
                    zIndex: 1200,
                    width: 46, height: 46,
                    bgcolor: BRAND,
                    color: '#fff',
                    boxShadow: '0 10px 24px rgba(74,38,25,0.45)',
                    opacity: showScrollTop ? 1 : 0,
                    transform: showScrollTop ? 'translateY(0) scale(1)' : 'translateY(12px) scale(0.85)',
                    pointerEvents: showScrollTop ? 'auto' : 'none',
                    transition: 'opacity 0.2s ease, transform 0.2s ease',
                    '&:hover': { bgcolor: BRAND_DARK },
                }}
            >
                <KeyboardArrowUpIcon />
            </IconButton>
        </>
    );
};

export default Cart;