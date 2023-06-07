import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function SearchBar() {
  const navigate = useNavigate();
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
        <button
          type="button"
          className="btn join-item"
          onClick={() => {
            navigate(`/search?needle=${encodeURIComponent(searchInput)}`);
          }}
        >
          Search
        </button>
      </div>
    </form>
  );
}
