import React, { useState, useEffect } from 'react';
import { fetchBlogPosts } from '../api/blog';
import BlogCard from '../components/BlogCard';
import SearchFilters from '../components/BlogFilters';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await fetchBlogPosts();
        setPosts(data);
        setFilteredPosts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error loading blog posts:', error);
        setLoading(false);
      }
    };
    loadPosts();
  }, []);

  useEffect(() => {
    let results = posts;
    
    // Apply search term filter
    if (searchTerm) {
      results = results.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    // Apply category filter
    if (categoryFilter !== 'all') {
      results = results.filter(post => 
        post.categories.includes(categoryFilter)
      );
    }
    
    setFilteredPosts(results);
  }, [searchTerm, categoryFilter, posts]);

  if (loading) return <div className="loading-spinner">Loading posts...</div>;

  return (
    <div className="blog-page">
      <div className="blog-header">
        <h1>Travel Guides & Tips</h1>
        <p>Expert advice and inspiration for your next adventure</p>
      </div>

      <div className="blog-container">
        <SearchFilters 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
        />

        <div className="featured-post">
          {filteredPosts.length > 0 && (
            <BlogCard 
              post={filteredPosts[0]} 
              featured={true} 
            />
          )}
        </div>

        <div className="posts-grid">
          {filteredPosts.slice(1).map(post => (
            <BlogCard 
              key={post.id} 
              post={post} 
              featured={false} 
            />
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="no-results">
            <h3>No posts match your search criteria</h3>
            <p>Try adjusting your filters or search term</p>
          </div>
        )}
      </div>

      <div className="categories-section">
        <h2>Popular Categories</h2>
        <div className="categories-grid">
          <button onClick={() => setCategoryFilter('destinations')}>
            <i className="fas fa-map-marker-alt"></i>
            <span>Destinations</span>
          </button>
          <button onClick={() => setCategoryFilter('tips')}>
            <i className="fas fa-lightbulb"></i>
            <span>Travel Tips</span>
          </button>
          <button onClick={() => setCategoryFilter('food')}>
            <i className="fas fa-utensils"></i>
            <span>Food & Drink</span>
          </button>
          <button onClick={() => setCategoryFilter('culture')}>
            <i className="fas fa-landmark"></i>
            <span>Culture</span>
          </button>
          <button onClick={() => setCategoryFilter('budget')}>
            <i className="fas fa-wallet"></i>
            <span>Budget Travel</span>
          </button>
          <button onClick={() => setCategoryFilter('adventure')}>
            <i className="fas fa-hiking"></i>
            <span>Adventure</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Blog;