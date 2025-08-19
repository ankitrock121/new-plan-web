import React from 'react';
import TestimonialCarousel from '../components/TestimonialCarousel';
import AwardBadge from '../components/AwardBadge';

const About = () => {
  return (
    <div className="about-page">
      <section className="about-hero">
        <h1>Our Story</h1>
      </section>

      <section className="mission-section">
        <div className="container">
          <h2>Who We Are</h2>
          <p>
            ExploreVista is a team of passionate travelers dedicated to creating unforgettable 
            experiences. Founded in 2015, we've helped over 50,000 travelers discover the world's 
            most beautiful destinations.
          </p>
          
          <div className="mission-vision">
            <div className="mission">
              <h3>Our Mission</h3>
              <p>
                To inspire and enable people to explore the world through authentic, sustainable, 
                and personalized travel experiences.
              </p>
            </div>
            <div className="vision">
              <h3>Our Vision</h3>
              <p>
                A world where travel breaks down barriers, fosters understanding, and creates 
                lifelong memories for everyone.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="testimonials-section">
        <h2>What Our Travelers Say</h2>
        <TestimonialCarousel />
      </section>

      <section className="awards-section">
        <h2>Our Achievements</h2>
        <div className="awards-grid">
          <AwardBadge 
            title="Best Travel Agency 2023" 
            issuer="Travel & Leisure" 
            year="2023" 
          />
          <AwardBadge 
            title="Sustainable Tourism Award" 
            issuer="Green Travel Foundation" 
            year="2022" 
          />
          <AwardBadge 
            title="Customer Excellence" 
            issuer="TripAdvisor" 
            year="2021-2023" 
          />
        </div>
      </section>
    </div>
  );
};

export default About;