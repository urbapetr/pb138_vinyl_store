import React from 'react';
import { Link } from 'react-router-dom';
import no_cover from '../No_cover.jpg';

/**
 * Component for record in RecordList page, if no cover is in record, insert 'no-cover' cover
 */
function Record({ record, onRecordSelect }) {
  const handleRecordClick = () => {
    onRecordSelect(record);
  };

  return (
    <div className="record" onClick={handleRecordClick}>
      {record.cover ? (
        <img src={record.cover} alt={record.title} className="album-cover" />
      ) : (
        <img src={no_cover} alt="no-cover" className="album-cover" />
      )}
      <Link to={`/record/${record.id}`}>
        <h3>{record.title}</h3>
      </Link>
      <p>Artist: {record.artist}</p>
      <p>Genre: {record.genre}</p>
      <p>Price: {record.price}</p>
      <p>Availability: {record.availability ? 'In Stock' : 'Out of Stock'}</p>
    </div>
  );
}

export default Record;
