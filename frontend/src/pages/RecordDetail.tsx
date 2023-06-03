import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import StoreList from '../components/StoreList';
import no_cover from '../No_cover.jpg';
import arrow from '../arrow.png';

import { RecordItem } from '../types/types';

interface Store {
  id: number;
  name: string;
  availability: string;
  numCopies: number;
  price: number;
}

interface RecordDetailProps {
  searchResults: RecordItem[];
}

function RecordDetail({ searchResults }: RecordDetailProps) {
  const { id } = useParams<{ id: string }>();
  const [filter, setFilter] = useState(false);
  const [filteredStores, setFilteredStores] = useState<Store[]>([]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setFilter(isChecked);

    if (isChecked) {
      const filteredRecord = searchResults.find(
        (record) => record.id === parseInt(id || '', 10)
      );
      const updatedStores = filteredRecord?.stores
        ? filteredRecord.stores.filter(
            (store) => store.availability === 'available'
          )
        : [];
      setFilteredStores(updatedStores);
    } else {
      setFilteredStores([]);
    }
  };

  const record = searchResults.find(
    (result) => result.id === parseInt(id || '', 10)
  );

  return (
    <div className="record-detail">
      <Link to="/" className="backButton">
        <img src={arrow} alt="back arrow" />
      </Link>
      {record ? (
        <>
          <div className="record-info-container">
            <div className="record-info-left">
              {record.cover ? (
                <img
                  src={record.cover}
                  alt={record.title}
                  className="album-cover"
                />
              ) : (
                <img src={no_cover} alt="no-cover" className="album-cover" />
              )}
            </div>
            <div className="record-info-right">
              <h2>{record.title}</h2>
              <p>Artist: {record.artist}</p>
              <p>Genre: {record.genre}</p>
              <p>Price: {record.price}</p>
              <p>
                Availability:
                {record.availability ? 'In Stock' : 'Out of Stock'}
              </p>
            </div>
          </div>
          <p>Availability Filter:</p>
          <label htmlFor="availability">
            <input
              type="checkbox"
              checked={filter}
              onChange={handleFilterChange}
            />
            Available
          </label>
          {filteredStores.length > 0 ? (
            <StoreList stores={filteredStores} />
          ) : (
            <p>No stores found.</p>
          )}
        </>
      ) : (
        <p>Record not found.</p>
      )}
    </div>
  );
}

export default RecordDetail;
