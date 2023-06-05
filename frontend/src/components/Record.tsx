import React from 'react';
import { Link } from 'react-router-dom';

import { RecordItem } from '../models/recordTypes';

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
    <Link to={`/record/${record.id}`} className="link-styles">
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
          <img alt="no-cover" className="album-cover" />
        )}
        <h3>{record.title}</h3>
        <p>Artist: {record.artist}</p>
        <p>Genre: {record.genre}</p>
        <p>Price: {record.price}</p>
        <p>Availability: {record.availability ? 'In Stock' : 'Out of Stock'}</p>
      </div>
    </Link>
  );
}

export default Record;