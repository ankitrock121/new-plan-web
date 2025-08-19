import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPlaceDetails } from '../api/destinations';
import Gallery from '../components/Gallery';
import Map from '../components/Map';
import WeatherWidget from '../components/WeatherWidget';
import ReviewsSection from '../components/ReviewsSection';
import BookingWidget from '../components/BookingWidget';

const PlaceDetails = () => {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const loadPlaceDetails = async () => {
      try {
        const data = await fetchPlaceDetails(id);
        setPlace(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    loadPlaceDetails();
  }, [id]);

  if (loading) return <div className="loading-spinner">Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!place) return <div className="not-found">Destination not found</div>;

  return (
    <div className="place-details-page">
      <div className="place-header">
        <h1>{place.name}</h1>
        <div className="location-badge">
          <span>{place.region}, {place.country}</span>
        </div>
        <div className="price-badge">
          From ${place.price} per person
        </div>
      </div>

      <Gallery images={place.images} />

      <div className="details-container">
        <div className="details-main">
          <div className="tabs">
            <button 
              className={activeTab === 'overview' ? 'active' : ''}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button 
              className={activeTab === 'activities' ? 'active' : ''}
              onClick={() => setActiveTab('activities')}
            >
              Activities
            </button>
            <button 
              className={activeTab === 'culture' ? 'active' : ''}
              onClick={() => setActiveTab('culture')}
            >
              Culture
            </button>
            <button 
              className={activeTab === 'reviews' ? 'active' : ''}
              onClick={() => setActiveTab('reviews')}
            >
              Reviews
            </button>
          </div>

          <div className="tab-content">
            {activeTab === 'overview' && (
              <div className="overview-section">
                <h2>About {place.name}</h2>
                <p>{place.description}</p>
                <div className="highlights">
                  <h3>Highlights</h3>
                  <ul>
                    {place.highlights.map((highlight, index) => (
                      <li key={index}>{highlight}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'activities' && (
              <div className="activities-section">
                <h2>Things to Do</h2>
                <div className="activities-grid">
                  {place.activities.map(activity => (
                    <div key={activity.id} className="activity-card">
                      <h4>{activity.name}</h4>
                      <p>{activity.description}</p>
                      {activity.price && <span>From ${activity.price}</span>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'culture' && (
              <div className="culture-section">
                <h2>Cultural Information</h2>
                <div className="culture-grid">
                  <div className="culture-card">
                    <h4>Language</h4>
                    <p>{place.culture.language}</p>
                  </div>
                  <div className="culture-card">
                    <h4>Currency</h4>
                    <p>{place.culture.currency}</p>
                  </div>
                  <div className="culture-card">
                    <h4>Local Customs</h4>
                    <p>{place.culture.customs}</p>
                  </div>
                  <div className="culture-card">
                    <h4>Best Time to Visit</h4>
                    <p>{place.culture.bestTime}</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <ReviewsSection reviews={place.reviews} />
            )}
          </div>
        </div>

        <div className="details-sidebar">
          <div className="booking-widget-container">
            <BookingWidget place={place} />
          </div>
          
          <div className="map-container">
            <h3>Location</h3>
            <Map coordinates={place.coordinates} name={place.name} />
          </div>
          
          <div className="weather-container">
            <h3>Current Weather</h3>
            <WeatherWidget location={place.name} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceDetails;