import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import FeaturedCafes from './components/FeaturedCafes'
import UpcomingTournaments from './components/UpcomingTournaments'
import HowItWorks from './components/HowItWorks'
import LiveLeaderboard from './components/LiveLeaderboard'
import StatsCounter from './components/StatsCounter'
import BusinessCTA from './components/BusinessCTA'
import Testimonials from './components/Testimonials'
import Footer from './components/Footer'

function App() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturedCafes />
        <UpcomingTournaments />
        <HowItWorks />
        <LiveLeaderboard />
        <StatsCounter />
        <BusinessCTA />
        <Testimonials />
      </main>
      <Footer />
    </div>
  )
}

export default App
