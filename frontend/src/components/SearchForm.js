import React, { useState } from 'react';

/**
 * Form for album filter
 */
function SearchForm({ onSearch }) {
  const [searchCriteria, setSearchCriteria] = useState({
    title: '',
    artist: '',
    genre: '',
    minPrice: '',
    maxPrice: '',
    availability: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    setSearchCriteria((prevState) => ({
      ...prevState,
      [name]: newValue
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate minimum and maximum prices
    if (searchCriteria.minPrice < 0 || searchCriteria.maxPrice < 0) {
      alert('Prices cannot be less than 0');
      return;
    }

    onSearch(searchCriteria);
  };

  return (
    <div className="search-form">
      <h2>Search Vinyl Records</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" name="title" value={searchCriteria.title} onChange={handleChange} />
        </label>
        <label>
          Artist:
          <input type="text" name="artist" value={searchCriteria.artist} onChange={handleChange} />
        </label>
        <label>
          Genre:
          <input type="text" name="genre" value={searchCriteria.genre} onChange={handleChange} />
        </label>
        <label>
          Min Price:
          <input type="number" name="minPrice" value={searchCriteria.minPrice} onChange={handleChange} />
        </label>
        <label>
          Max Price:
          <input type="number" name="maxPrice" value={searchCriteria.maxPrice} onChange={handleChange} />
        </label>
        <label>
          Availability:
          <input
            type="checkbox"
            name="availability"
            checked={searchCriteria.availability}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Search</button>
      </form>
    </div>
  );
}

export default SearchForm;
