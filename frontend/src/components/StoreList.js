import React from 'react';

function StoreList({ stores }) {
  return (
    <div className="store-list">
      <h3>Available Stores:</h3>
      <ul>
        {stores.map((store) => (
          <li key={store.id}>{store.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default StoreList;
