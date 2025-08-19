import React, { useState, useEffect } from 'react';
import DestinationCard from '../components/DestinationCard';
import SearchFilters from '../components/SearchFilters';
import { fetchDestinations } from '../api/destinations';

const Destinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [filteredDestinations, setFilteredDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    country: '',
    region: '',
    type: '',
    priceRange: [0, 5000]
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchDestinations();
        setDestinations(data);
        setFilteredDestinations(data);
        setLoading(false);
      } catch (error) {
        console.error('Error loading destinations:', error);
        setLoading(false);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    let results = destinations;
    
    // Apply search term filter
    if (searchTerm) {
      results = results.filter(dest => 
        dest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dest.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply other filters
    if (filters.country) {
      results = results.filter(dest => dest.country === filters.country);
    }
    
    if (filters.region) {
      results = results.filter(dest => dest.region === filters.region);
    }
    
    if (filters.type) {
      results = results.filter(dest => dest.tags.includes(filters.type));
    }
    
    // Apply price range filter
    results = results.filter(dest => 
      dest.price >= filters.priceRange[0] && dest.price <= filters.priceRange[1]
    );
    
    setFilteredDestinations(results);
  }, [searchTerm, filters, destinations]);

  if (loading) return <div className="loading-spinner">Loading...</div>;

  return (
    <div className="destinations-page">
      <div className="destinations-header">
        <h1>Discover Your Next Adventure</h1>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search destinations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="destinations-container">
        <SearchFilters 
          destinations={destinations} 
          filters={filters} 
          setFilters={setFilters} 
        />
        
        <div className="destinations-grid">
          {filteredDestinations.length > 0 ? (
            filteredDestinations.map(destination => (
              <DestinationCard 
                key={destination.id} 
                destination={destination} 
              />
            ))
          ) : (
            <div className="no-results">
              <h3>No destinations match your search criteria</h3>
              <p>Try adjusting your filters or search term</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Destinations;