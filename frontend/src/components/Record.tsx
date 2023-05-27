import React from 'react';
import { Link } from 'react-router-dom';
import no_cover from '../No_cover.jpg';

import { RecordItem } from '../types/types';

interface RecordProps {
  record: RecordItem;
  onRecordSelect: (record: RecordItem) => void;
}

/**
 * Component for record in RecordList page, if no cover is in record, insert 'no-cover' cover
 */
function Record({ record, onRecordSelect }: RecordProps) {
  const handleRecordClick = () => {
    onRecordSelect(record);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      handleRecordClick();
    }
  };

  return (
    <div
      className="record"
      onClick={handleRecordClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
    >
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
