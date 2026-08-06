import { Box, Grid, Typography } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import { animateHero } from '../gsapAnimations';
import Navbar from '../Component/Navbar';
import StickyWhatsapp from '../Component/StickyWhatsapp';
import CustomerReview from '../Component/CustomerReview';
import Title from '../Component/Title';
import IndustryCarousel from '../Component/ProductSlide';
import Faq from '../Component/Faq';
import Footer from '../Component/Footer';
import CategorySection from '../Component/CategorySection';
import TopBar from '../Component/TopBar';
import HeroProductPage1 from './Product Pages/HeroProductPage1';
import HeroProductPage2 from './Product Pages/HeroProductPage2';
import { Player } from '@lordicon/react';
import LOCK from './lock.json';
import TRUCk from './truck.json';
import QUALITY from './quality.json';
import COINS from './coins.json';
import { styled } from '@mui/material/styles';
import MainProductSlide1 from '../Component/MainProductSlide1';

// Hoisted outside the component: styled() must not be called on every render,
// and it needs MUI's `styled` (not styled-components') so `theme.spacing` /
// `theme.breakpoints` resolve from the MUI ThemeProvider instead of being
// undefined.
const FeatureContainer = styled(Box)(({ theme }) => ({
    backgroundColor: '#000',
    padding: theme.spacing(2),
    boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.19), 0px 6px 6px rgba(0, 0, 0, 0.23)',
    borderRadius: theme.spacing(1),
    color: '#fff',
    [theme.breakpoints.up('md')]: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
}));

const FeatureItem = styled(Grid)(({ theme }) => ({
    textAlign: 'center',
    padding: theme.spacing(2),
    borderColor: 'rgba(255, 255, 255, 0.2)',
    '& svg': {
        color: '#7A4531',
        transition: 'transform 0.3s, color 0.3s',
    },
    '&:hover svg': {
        transform: 'scale(1.2)',
        color: '#fff',
    },
    '&:hover p': {
        color: '#fff',
    },
    [theme.breakpoints.down('md')]: {
        '&:nth-of-type(1), &:nth-of-type(2)': {
            borderBottom: '2px solid rgba(255, 255, 255, 0.2)',
        },
        '&:nth-of-type(1), &:nth-of-type(3)': {
            borderRight: '2px solid rgba(255, 255, 255, 0.2)',
        },
    },
    [theme.breakpoints.up('md')]: {
        '&:nth-of-type(1), &:nth-of-type(3)': {
            borderRight: '2px solid rgba(255, 255, 255, 0.2)',
        },
        '&:not(:nth-of-type(4))': {
            borderRight: '2px solid rgba(255, 255, 255, 0.2)',
        },
    },
}));

const Hero = () => {
    useEffect(() => {
        animateHero();
        ScrollToTop();
    }, []);

    const lockRef = useRef(null);
    const truckRef = useRef(null);
    const qualityRef = useRef(null);
    const coinsRef = useRef(null);

    useEffect(() => {
        lockRef.current?.playFromBeginning();
        truckRef.current?.playFromBeginning();
        qualityRef.current?.playFromBeginning();
        coinsRef.current?.playFromBeginning();
    }, []);

    const ScrollToTop = () => {
        window.scrollTo(0, 0)
    }
    return (
        <Box>
            <StickyWhatsapp link={"https://wa.me/9025330197"} />
            <Box sx={{}} >
                <TopBar />
                <MainProductSlide1 />
                <Navbar />
            </Box>
            <Box sx={{ bgcolor: '#fff', mt: [-15] }}>
                <Navbar color="#fff" />
                <Box sx={{ display: 'flex', justifyContent: 'start', color: 'black', px: [2, 5] }}>
                    <Title color="#282828">Products</Title>
                </Box>
                <Box sx={{ px: [2, 5] }}>
                    <CategorySection />
                </Box>
                <Box sx={{ px: [2, 5] }}>
                    <Box sx={{ display: 'flex', justifyContent: 'start', color: 'black' }}>
                        <Title color="#282828">Varieties of cashew</Title>
                    </Box>
                    <HeroProductPage1 />
                </Box>
                <Box sx={{ px: [2, 5] }}>
                    <Box sx={{ display: 'flex', justifyContent: 'start', color: 'black' }}>
                        <Title color="#282828">Dates</Title>
                    </Box>
                    <HeroProductPage2 />
                </Box>
                <Box sx={{ px: [2, 5], py: [0, 10] }}>
                    <FeatureContainer>
                        <Grid container spacing={0} justifyContent="center">
                            <FeatureItem item xs={6} md={3}>
                                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <Player
                                        ref={truckRef}
                                        trigger="loop"
                                        size={window.innerWidth < 600 ? 70 : 96}
                                        icon={TRUCk}
                                        colors='primary:#7A4531,secondary:white'
                                        onComplete={() => truckRef.current?.playFromBeginning()}
                                    />
                                </Box>
                                <Typography>Free Shiping Purchase Upto ₹1000 </Typography>
                            </FeatureItem>
                            <FeatureItem item xs={6} md={3}>
                                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <Player
                                        ref={lockRef}
                                        trigger="loop"

                                        size={window.innerWidth < 600 ? 70 : 96}
                                        icon={LOCK}
                                        colors='primary:#7A4531,secondary:white'
                                        onComplete={() => lockRef.current?.playFromBeginning()}
                                    />
                                </Box>
                                <Typography>Pay On Delivery</Typography>
                            </FeatureItem>
                            <FeatureItem item xs={6} md={3}>
                                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <Player
                                        ref={qualityRef}
                                        trigger="loop"

                                        size={window.innerWidth < 600 ? 70 : 96}
                                        icon={QUALITY}
                                        colors='primary:#7A4531,secondary:white'
                                        onComplete={() => qualityRef.current?.playFromBeginning()}
                                    />
                                </Box>
                                <Typography>100% Quality Guaranteed</Typography>
                            </FeatureItem>
                            <FeatureItem item xs={6} md={3}>
                                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <Player
                                        ref={coinsRef}
                                        trigger="loop"

                                        size={window.innerWidth < 600 ? 70 : 96}
                                        icon={COINS}
                                        colors='primary:#7A4531,secondary:white'
                                        onComplete={() => coinsRef.current?.playFromBeginning()}
                                    />
                                </Box>
                                <Typography>Reward Points On Every Purchase</Typography>
                            </FeatureItem>
                        </Grid>
                    </FeatureContainer>
                </Box>

                <IndustryCarousel />
            </Box>
            <Box sx={{ bgcolor: '#282828', }}>
                <Box sx={{ display: 'flex', justifyContent: 'start', px: [2, 5], pb: [0, 0, 3], pt: 5 }}>
                    <Title color="#fff" >Read our customers say</Title>
                </Box>
                <CustomerReview />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'start', color: 'black', px: [2, 5], pb: 5 }}>
                <Title color="#282828">Frequently Asked Question</Title>
            </Box>
            <Box sx={{ px: [2, 5] }}>
                <Faq />
            </Box>
            <Box sx={{ bgcolor: 'black', mt: 20, px: 2 }}>
                <Footer />
            </Box>
        </Box >
    );
}

export default Hero;