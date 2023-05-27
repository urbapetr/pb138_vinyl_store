import React from 'react';

interface Store {
  id: number;
  name: string;
}

interface StoreListProps {
  stores: Store[];
}

function StoreList({ stores }: StoreListProps) {
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
