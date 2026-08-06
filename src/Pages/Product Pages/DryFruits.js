import React, { useState, useEffect } from 'react';
import {
    Card, CardContent, Typography, Grid, Box, Stack, Button,
    Skeleton, Chip, GlobalStyles
} from '@mui/material';
import { styled } from '@mui/system';
import StarIcon from '@mui/icons-material/Star';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import VerifiedIcon from '@mui/icons-material/Verified';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import SpaOutlinedIcon from '@mui/icons-material/SpaOutlined';
import { dryfruits } from "../../utils/data";
import Navbar from '../../Component/Navbar';
import Title from '../../Component/Title';
import ProductNavbar from '../../Component/ProductNavbar';
import Footer from '../../Component/Footer';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/cartSlice';
import { toast } from 'react-toastify';
import TopBar from '../../Component/TopBar';

/* ---------------------------------------------------------------------- */
/*  Design tokens                                                         */
/*  Background  #FBF3E6   Card        #FFFFFF                             */
/*  Brand brown #7A3E2E   Gold accent #C89B3C                             */
/*  Pistachio   #5B7553   Ink text    #2B1B12                             */
/*  Display face: Fraunces (warm, characterful serif)                     */
/*  Body face:    Manrope (clean, humanist sans)                          */
/*                                                                         */
/*  One card design, mobile-first, that scales up cleanly. On md+ every    */
/*  card in the grid is forced to the same width/height via a fixed-height */
/*  flex column, with the price/cart row pinned to the bottom.            */
/*  Product image now fills the ENTIRE media area (edge-to-edge cover).   */
/* ---------------------------------------------------------------------- */

const BRAND = '#7A3E2E';
const BRAND_DARK = '#4E2A1F';
const GOLD = '#C89B3C';
const PISTACHIO = '#5B7553';
const INK = '#2B1B12';

const gramOptions = [
    { value: '100g', label: '100g' },
    { value: '250g', label: '250g' },
    { value: '500g', label: '500g' },
    { value: '1kg', label: '1kg' },
];

/* Parses "₹1,250" / 1250 / "Rs 1250" into a plain number */
const parseNumericPrice = (val) => {
    if (typeof val === 'number') return val;
    const match = String(val ?? '').match(/[\d,]+(\.\d+)?/);
    return match ? parseFloat(match[0].replace(/,/g, '')) : 0;
};

const StyledCard = styled(Card)(({ theme }) => ({
    backgroundColor: '#fff',
    color: INK,
    boxShadow: '0 10px 22px -10px rgba(122, 62, 46, 0.30)',
    transition: 'transform 0.4s cubic-bezier(.22,1,.36,1), box-shadow 0.4s ease',
    borderRadius: 18,
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'stretch',
    height: '100%',
    width: '100%',
    border: '1px solid rgba(122, 62, 46, 0.08)',
    '&:active': {
        transform: 'scale(0.99)',
    },
    [theme.breakpoints.up('sm')]: {
        flexDirection: 'column',
    },
    [theme.breakpoints.up('md')]: {
        borderRadius: 22,
        boxShadow: '0 14px 30px -12px rgba(122, 62, 46, 0.35)',
        '&:hover': {
            transform: 'translateY(-6px)',
            boxShadow: '0 24px 40px -14px rgba(122, 62, 46, 0.45)',
        },
        '&:hover .product-media img': {
            transform: 'scale(1.08)',
        },
        '&:hover .glow-spot': {
            opacity: 1,
            transform: 'scale(1.15)',
        },
    },
}));

/* MediaWrap is the "half card" area — on mobile it's the left half (row
   layout), on sm+ it's the top block (column layout). The image below is
   sized to completely fill this box, with no inner padding box shrinking it. */
const MediaWrap = styled(Box)(({ theme }) => ({
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
    width: 118,
    height: 'auto',
    alignSelf: 'stretch',
    overflow: 'hidden',
    zIndex: 1,
    background: 'radial-gradient(circle at 50% 30%, rgba(200,155,60,0.12), rgba(200,155,60,0) 70%)',
    [theme.breakpoints.up('sm')]: {
        width: '100%',
        height: 220,
    },
    [theme.breakpoints.up('md')]: {
        height: 250,
    },
    [theme.breakpoints.up('lg')]: {
        height: 270,
    },
}));

const GlowSpot = styled(Box)({
    position: 'absolute',
    width: '70%',
    height: '70%',
    borderRadius: '50%',
    background: `radial-gradient(circle, ${GOLD}33 0%, transparent 70%)`,
    opacity: 0.6,
    transition: 'transform 0.5s ease, opacity 0.5s ease',
    pointerEvents: 'none',
    zIndex: 1,
});

/* Fills 100% of MediaWrap's width and height, cropping via objectFit:cover
   so there is no empty space around the product photo. */
const ProductImg = styled('img')({
    position: 'relative',
    zIndex: 2,
    width: '100%',
    height: '100%',
    display: 'block',
    objectFit: 'cover',
    objectPosition: 'center',
    transition: 'transform 0.5s cubic-bezier(.22,1,.36,1)',
});

const DiscountTag = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 3,
    background: `linear-gradient(135deg, ${GOLD}, #A97A28)`,
    color: '#2B1B12',
    fontFamily: "'Manrope', sans-serif",
    fontWeight: 800,
    fontSize: '0.7rem',
    letterSpacing: 0.3,
    padding: '5px 11px',
    borderRadius: 999,
    boxShadow: '0 4px 10px rgba(43,27,18,0.22)',
    [theme.breakpoints.up('md')]: {
        top: 14,
        left: 14,
        fontSize: '0.78rem',
        padding: '6px 12px',
    },
}));

const GramChip = styled(Chip)(({ selected, theme }) => ({
    fontFamily: "'Manrope', sans-serif",
    fontWeight: 700,
    fontSize: '0.7rem',
    borderRadius: 9,
    cursor: 'pointer',
    border: `1.5px solid ${selected ? BRAND : 'rgba(122,62,46,0.25)'}`,
    backgroundColor: selected ? BRAND : 'transparent',
    color: selected ? '#fff' : BRAND,
    transition: 'all 0.2s ease',
    height: 26,
    '&:hover': {
        backgroundColor: selected ? BRAND_DARK : 'rgba(122,62,46,0.08)',
    },
    [theme.breakpoints.up('md')]: {
        fontSize: '0.75rem',
        height: 28,
        borderRadius: 10,
    },
}));

const RatingStars = ({ rating, size }) => (
    <Box display="flex" alignItems="center" sx={{ gap: 0.2 }}>
        {[...Array(5)].map((_, index) => (
            <StarIcon
                key={index}
                sx={{ color: index < rating ? GOLD : 'rgba(200,155,60,0.3)', fontSize: size }}
            />
        ))}
    </Box>
);

const ProductCard = ({ product, isLoading }) => {
    const dispatch = useDispatch();
    const [selectedGram, setSelectedGram] = useState('100g');
    const [price, setPrice] = useState(product.prices[selectedGram].currentPrice);
    const [originalPrice, setOriginalPrice] = useState(product.prices[selectedGram].originalPrice);

    const numericPrice = parseNumericPrice(price);
    const numericOriginal = parseNumericPrice(originalPrice);
    const discountPct = numericOriginal > numericPrice && numericOriginal > 0
        ? Math.round((1 - numericPrice / numericOriginal) * 100)
        : 0;

    const handleAddToCart = () => {
        dispatch(addToCart({
            id: product.id,
            name: product.name,
            image: product.image,
            price,
            originalPrice,
            selectedGram
        }));
        toast.success('Successfully added to cart!', {
            position: 'bottom-left',
            autoClose: 3000,
        });
    };

    const handleGramSelect = (gramValue) => {
        setSelectedGram(gramValue);
        setPrice(product.prices[gramValue].currentPrice);
        setOriginalPrice(product.prices[gramValue].originalPrice);
    };

    return (
        <StyledCard>
            <MediaWrap className="product-media">
                {isLoading ? (
                    <Skeleton variant="rectangular" animation="wave" sx={{ width: '100%', height: '100%' }} />
                ) : (
                    <>
                        <GlowSpot className="glow-spot" />
                        {discountPct > 0 && <DiscountTag>{discountPct}% OFF</DiscountTag>}
                        <ProductImg src={product.image} alt={product.name} />
                    </>
                )}
            </MediaWrap>

            <CardContent sx={{
                px: [1.75, 2.25, 2.5], pb: '16px !important', pt: [1, 1.25, 1.5], width: '100%',
                flexGrow: 1, display: 'flex', flexDirection: 'column', minWidth: 0,
            }}>
                {isLoading ? (
                    <>
                        <Skeleton variant="text" animation="wave" width="80%" />
                        <Skeleton variant="text" animation="wave" width="60%" />
                        <Skeleton variant="text" animation="wave" width="40%" />
                        <Skeleton variant="rectangular" width="100%" height={40} sx={{ mt: 1, borderRadius: 2 }} />
                    </>
                ) : (
                    <>
                        <Stack direction="row" alignItems="center" spacing={0.5} sx={{ color: PISTACHIO, mb: 0.4 }}>
                            <VerifiedIcon sx={{ fontSize: '0.8rem' }} />
                            <Typography sx={{
                                fontFamily: "'Manrope', sans-serif", fontWeight: 700,
                                fontSize: '0.6rem', letterSpacing: 0.6, textTransform: 'uppercase'
                            }}>
                                Smart Dry Fruits
                            </Typography>
                        </Stack>

                        <Typography component="div" sx={{
                            fontFamily: "'Fraunces', serif",
                            textAlign: 'start',
                            fontWeight: 600,
                            letterSpacing: 0.1,
                            fontSize: ['0.92rem', '1.1rem', '1.3rem'],
                            color: INK,
                            lineHeight: 1.25,
                            mb: 0.4,
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                        }}>
                            {product.name}
                        </Typography>

                        <Stack direction="row" alignItems="center" spacing={0.6} sx={{ mb: 0.9 }}>
                            <RatingStars rating={product.rating} size="0.85rem" />
                            <Typography sx={{ fontFamily: "'Manrope', sans-serif", fontSize: '0.68rem', color: '#8a7a6d', fontWeight: 600 }}>
                                {product.rating?.toFixed ? product.rating.toFixed(1) : product.rating}
                            </Typography>
                        </Stack>

                        <Stack direction="row" spacing={0.6} flexWrap="wrap" sx={{ mb: 1.2, rowGap: 0.6 }}>
                            {gramOptions.map((option) => (
                                <GramChip
                                    key={option.value}
                                    label={option.label}
                                    size="small"
                                    selected={selectedGram === option.value}
                                    onClick={() => handleGramSelect(option.value)}
                                />
                            ))}
                        </Stack>

                        <Box sx={{ mt: 'auto', pt: 0.5 }}>
                            <Stack direction="row" alignItems="baseline" spacing={0.7}>
                                <Typography sx={{
                                    fontFamily: "'Manrope', sans-serif",
                                    color: BRAND, fontWeight: 800, fontSize: ['0.95rem', '1.05rem', '1.15rem'],
                                    display: 'flex', alignItems: 'center', gap: 0.3,
                                }}>
                                    <LocalOfferOutlinedIcon sx={{ fontSize: '0.85rem' }} />
                                    {price}
                                </Typography>
                                {discountPct > 0 && (
                                    <Typography sx={{
                                        fontFamily: "'Manrope', sans-serif",
                                        color: '#b3a596', fontWeight: 600, fontSize: '0.78rem',
                                        textDecoration: 'line-through',
                                    }}>
                                        {originalPrice}
                                    </Typography>
                                )}
                            </Stack>
                            <Stack direction="row" alignItems="center" spacing={0.4} sx={{ color: PISTACHIO, mt: 0.3, mb: 1 }}>
                                <SpaOutlinedIcon sx={{ fontSize: '0.75rem' }} />
                                <Typography sx={{ fontFamily: "'Manrope', sans-serif", fontSize: '0.62rem', fontWeight: 600 }}>
                                    100% Natural
                                </Typography>
                            </Stack>

                            <Button
                                fullWidth
                                variant="contained"
                                startIcon={<ShoppingCartOutlinedIcon />}
                                onClick={handleAddToCart}
                                sx={{
                                    bgcolor: BRAND,
                                    fontFamily: "'Manrope', sans-serif",
                                    fontWeight: 700,
                                    fontSize: ['0.8rem', '0.85rem'],
                                    textTransform: 'none',
                                    borderRadius: '50px',
                                    py: [0.8, 0.9],
                                    boxShadow: '0 8px 16px rgba(122,62,46,0.3)',
                                    '&:hover': {
                                        bgcolor: BRAND_DARK,
                                        boxShadow: '0 10px 20px rgba(122,62,46,0.4)',
                                    }
                                }}>
                                Add to cart
                            </Button>
                        </Box>
                    </>
                )}
            </CardContent>
        </StyledCard>
    );
};

const Dryfruits = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 1400);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        document.title = "Dry Fruits";
    }, []);

    return (
        <>
            <GlobalStyles styles={`
                @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Manrope:wght@400;500;600;700;800&display=swap');
            `} />
            <TopBar />
            <Navbar color="#000" />
            <Box sx={{ bgcolor: "#fff", pt: [1, 2] }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', px: [2, 5, 4] }}>
                    <Title color={INK}>Dry Fruits</Title>
                    <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 0.5, mb: [1, 2] }}>
                        <Box sx={{ width: 28, height: 2, bgcolor: GOLD, borderRadius: 2 }} />
                        <Typography sx={{
                            fontFamily: "'Manrope', sans-serif",
                            fontSize: ['0.75rem', '0.95rem'],
                            color: '#8a7a6d',
                            fontWeight: 600,
                            letterSpacing: 0.3,
                        }}>
                            Handpicked &bull; Naturally dried &bull; Delivered fresh
                        </Typography>
                    </Stack>
                </Box>

                <Box sx={{ display: ['none', 'block'] }}>
                    <ProductNavbar />
                </Box>

                <Box sx={{ textAlign: 'center', px: [2, 3, 3], py: [3, 5, 6], zIndex: 30 }}>
                    <Grid container spacing={{ xs: 2, sm: 3, md: 5 }} justifyContent="center" alignItems="stretch">
                        {dryfruits.map((dryfruit) => (
                            <Grid item key={dryfruit.id} xs={12} sm={6} md={4} lg={3} sx={{ display: 'flex', flexDirection: 'column' }}>
                                <ProductCard product={dryfruit} isLoading={isLoading} />
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Box>

            <Box sx={{ bgcolor: 'black', mt: [8, 12, 16], px: 2 }}>
                <Footer />
            </Box>
        </>
    );
};

export default Dryfruits;