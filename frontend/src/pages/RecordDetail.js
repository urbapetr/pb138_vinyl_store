import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import StoreList from '../components/StoreList';
import '../styles.css';
import no_cover from '../No_cover.jpg';

function RecordDetail({ searchResults }) {
  const { id } = useParams();
  const [filter, setFilter] = useState(false);
  const [filteredStores, setFilteredStores] = useState([]);
  const navigate = useNavigate();

  const handleFilterChange = (e) => {
    const isChecked = e.target.checked;
    setFilter(isChecked);

    if (isChecked) {
      const record = searchResults.find((record) => record.id === parseInt(id));
      const filteredStores = record?.stores
        ? record.stores.filter((store) => store.availability)
        : [];
      setFilteredStores(filteredStores);
    } else {
      setFilteredStores([]);
    }
  };

  const handleReturn = () => {
    navigate(-1);
  };

  const record = searchResults.find((record) => record.id === parseInt(id));

  return (
    <div className="record-detail">
      {record ? (
        <>
          <div className="record-info-left">
            {record.cover ? (
              <img src={record.cover} alt={record.title} className="album-cover" />
            ) : (
              <img src={no_cover} alt="no-cover" className="album-cover" />
            )}
          </div>
          <div className="record-info-right">
            <h2>{record.title}</h2>
            <p>Artist: {record.artist}</p>
            <p>Genre: {record.genre}</p>
            <p>Price: {record.price}</p>
            <p>Availability: {record.availability ? 'In Stock' : 'Out of Stock'}</p>
            <p>Availability Filter:</p>
            <label>
              <input type="checkbox" checked={filter} onChange={handleFilterChange} />
              Available
            </label>
            {filteredStores.length > 0 ? (
              <StoreList stores={filteredStores} />
            ) : (
              <p>No stores found.</p>
            )}
            <button onClick={handleReturn}>Return</button>
          </div>
        </>
      ) : (
        <p>Record not found.</p>
      )}
      <Link to="/">Back to Search</Link>
    </div>
  );
}

export default RecordDetail;
