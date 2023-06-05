import React, { useState, ChangeEvent, FormEvent } from 'react';

interface SearchCriteria {
  title: string;
  artist: string;
  genre: string;
  minPrice: string;
  maxPrice: string;
  availability: boolean;
}

interface SearchFormProps {
  onSearch: (searchCriteria: SearchCriteria) => void;
}

/**
 * Form for album filter
 */
function SearchForm({ onSearch }: SearchFormProps) {
  const [searchCriteria, setSearchCriteria] = useState<SearchCriteria>({
    title: '',
    artist: '',
    genre: '',
    minPrice: '',
    maxPrice: '',
    availability: false,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    setSearchCriteria((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Validate minimum and maximum prices
    if (
      (searchCriteria.minPrice !== '' && searchCriteria.minPrice < '0') ||
      (searchCriteria.maxPrice !== '' && searchCriteria.maxPrice < '0')
    ) {
      alert('Prices cannot be less than 0');
      return;
    }

    onSearch(searchCriteria);
  };

  return (
    <div className="search-form">
      <h2>Search Vinyl Records</h2>
      <form className="search-container" onSubmit={handleSubmit}>
        <label htmlFor="title">
          <span className="label-text">Title:</span>
          <input
            type="text"
            name="title"
            value={searchCriteria.title}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="artist">
          <span className="label-text">Artist:</span>
          <input
            type="text"
            name="artist"
            value={searchCriteria.artist}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="genre">
          <span className="label-text">Genre:</span>
          <input
            type="text"
            name="genre"
            value={searchCriteria.genre}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="minPrice">
          <span className="label-text">Min Price:</span>
          <input
            type="number"
            name="minPrice"
            value={searchCriteria.minPrice}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="maxPrice">
          <span className="label-text">Max Price:</span>
          <input
            type="number"
            name="maxPrice"
            value={searchCriteria.maxPrice}
            onChange={handleChange}
          />
        </label>
        <label className="availability" htmlFor="availability">
          <span className="label-text">Availability:</span>
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
