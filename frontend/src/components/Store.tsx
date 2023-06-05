import React from 'react';

interface StoreProps {
  store: {
    name: string;
    availability: string;
    numCopies: number;
    price: number;
  };
}

function Store({ store }: StoreProps) {
  return (
    <div className="store">
      <h3>{store.name}</h3>
      <p>Availability: {store.availability}</p>
      <p>Number of Copies: {store.numCopies}</p>
      <p>Price: {store.price}</p>
    </div>
  );
}

export default Store;
