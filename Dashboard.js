import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { fetchUserBookings, fetchUserReviews } from '../api/users';
import BookingCard from '../components/BookingCard';
import ReviewCard from '../components/ReviewCard';
import EditProfileModal from '../components/EditProfileModal';

const Dashboard = () => {
  const { currentUser } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('upcoming');
  const [bookings, setBookings] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        setLoading(true);
        const bookingsData = await fetchUserBookings(currentUser.uid);
        const reviewsData = await fetchUserReviews(currentUser.uid);
        
        setBookings(bookingsData);
        setReviews(reviewsData);
        setLoading(false);
      } catch (error) {
        console.error('Error loading user data:', error);
        setLoading(false);
      }
    };
    
    if (currentUser) {
      loadUserData();
    }
  }, [currentUser]);

  const upcomingTrips = bookings.filter(booking => 
    new Date(booking.startDate) > new Date()
  );
  
  const pastTrips = bookings.filter(booking => 
    new Date(booking.startDate) <= new Date()
  );

  if (loading) return <div className="loading-spinner">Loading your dashboard...</div>;

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1>Welcome back, {currentUser.displayName || 'Traveler'}!</h1>
        <button 
          className="edit-profile-button"
          onClick={() => setShowEditModal(true)}
        >
          Edit Profile
        </button>
      </div>

      <div className="dashboard-tabs">
        <button
          className={activeTab === 'upcoming' ? 'active' : ''}
          onClick={() => setActiveTab('upcoming')}
        >
          Upcoming Trips
        </button>
        <button
          className={activeTab === 'past' ? 'active' : ''}
          onClick={() => setActiveTab('past')}
        >
          Past Trips
        </button>
        <button
          className={activeTab === 'reviews' ? 'active' : ''}
          onClick={() => setActiveTab('reviews')}
        >
          Your Reviews
        </button>
        <button
          className={activeTab === 'wishlist' ? 'active' : ''}
          onClick={() => setActiveTab('wishlist')}
        >
          Wishlist
        </button>
      </div>

      <div className="dashboard-content">
        {activeTab === 'upcoming' && (
          <div className="upcoming-trips">
            {upcomingTrips.length > 0 ? (
              upcomingTrips.map(booking => (
                <BookingCard 
                  key={booking.id} 
                  booking={booking} 
                  isUpcoming={true}
                />
              ))
            ) : (
              <div className="empty-state">
                <h3>No upcoming trips</h3>
                <p>Start planning your next adventure!</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'past' && (
          <div className="past-trips">
            {pastTrips.length > 0 ? (
              pastTrips.map(booking => (
                <BookingCard 
                  key={booking.id} 
                  booking={booking} 
                  isUpcoming={false}
                />
              ))
            ) : (
              <div className="empty-state">
                <h3>No past trips</h3>
                <p>Your travel history will appear here</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="user-reviews">
            {reviews.length > 0 ? (
              reviews.map(review => (
                <ReviewCard 
                  key={review.id} 
                  review={review} 
                  editable={true}
                />
              ))
            ) : (
              <div className="empty-state">
                <h3>No reviews yet</h3>
                <p>Share your experiences to help other travelers</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'wishlist' && (
          <div className="wishlist">
            <div className="empty-state">
              <h3>Your wishlist is empty</h3>
              <p>Save destinations you'd like to visit</p>
            </div>
          </div>
        )}
      </div>

      {showEditModal && (
        <EditProfileModal 
          user={currentUser} 
          onClose={() => setShowEditModal(false)} 
        />
      )}
    </div>
  );
};

export default Dashboard;