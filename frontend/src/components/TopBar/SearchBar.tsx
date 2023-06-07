import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export function SearchBar() {
  const [searchInput, setSearchInput] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  return (
    <form className="flex items-center justify-center">
      <div className="join">
        <div>
          <div>
            <input
              className="input join-item"
              placeholder="Search..."
              value={searchInput}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <Link
          to={`/search?needle=${encodeURIComponent(searchInput)}`}
          className="btn join-item"
        >
          Search
        </Link>
      </div>
    </form>
  );
}
