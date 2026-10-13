import React from 'react';
import HeroSection from '../components/HeroSection';
import FeaturedCafes from '../components/FeaturedCafes';
import UpcomingTournaments from '../components/UpcomingTournaments';
import HowItWorks from '../components/HowItWorks';
import LiveLeaderboard from '../components/LiveLeaderboard';
import StatsCounter from '../components/StatsCounter';
import BusinessCTA from '../components/BusinessCTA';
import Testimonials from '../components/Testimonials';
import SubmissionsSection from '../components/SubmissionsSection';

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <FeaturedCafes />
      <UpcomingTournaments />
      <HowItWorks />
      <LiveLeaderboard />
      <StatsCounter />
      <BusinessCTA />
      <Testimonials />
      <SubmissionsSection />
    </>
  );
};

export default HomePage;
