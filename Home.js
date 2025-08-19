import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeroVideo from '../assets/videos/travel-hero.mp4';
import TopDestinations from '../components/TopDestinations';

const Home = () => {
  const [searchParams, setSearchParams] = useState({
    destination: '',
    checkIn: '',
    checkOut: '',
    guests: 1
  });
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/destinations?search=${searchParams.destination}`);
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <div className="hero-section">
        <video autoPlay loop muted className="hero-video">
          <source src={HeroVideo} type="video/mp4" />
        </video>
        <div className="hero-content">
          <h1>Explore the World with Us</h1>
          <p>Discover breathtaking destinations and create unforgettable memories</p>
          
          {/* Search Form */}
          <form onSubmit={handleSearch} className="search-form">
            <div className="form-group">
              <input 
                type="text" 
                placeholder="Where to?" 
                value={searchParams.destination}
                onChange={(e) => setSearchParams({...searchParams, destination: e.target.value})}
              />
            </div>
            <div className="form-group">
              <input 
                type="date" 
                placeholder="Check In" 
                value={searchParams.checkIn}
                onChange={(e) => setSearchParams({...searchParams, checkIn: e.target.value})}
              />
            </div>
            <div className="form-group">
              <input 
                type="date" 
                placeholder="Check Out" 
                value={searchParams.checkOut}
                onChange={(e) => setSearchParams({...searchParams, checkOut: e.target.value})}
              />
            </div>
            <div className="form-group">
              <select 
                value={searchParams.guests}
                onChange={(e) => setSearchParams({...searchParams, guests: e.target.value})}
              >
                {[1,2,3,4,5,6].map(num => (
                  <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                ))}
              </select>
            </div>
            <button type="submit" className="cta-button">Explore</button>
          </form>
        </div>
      </div>

      {/* Top Destinations */}
      <TopDestinations />

      {/* Call to Action */}
      <div className="cta-section">
        <h2>Ready for Your Next Adventure?</h2>
        <button className="cta-button" onClick={() => navigate('/destinations')}>Book Now</button>
      </div>
    </div>
  );
};

export default Home;