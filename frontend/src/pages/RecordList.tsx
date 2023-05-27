import React from 'react';
import Record from '../components/Record';
import '../styles.css';

import { RecordItem } from '../types/types';

interface RecordListProps {
  searchResults: RecordItem[];
  onRecordSelect: (record: RecordItem) => void;
}

function RecordList({ searchResults, onRecordSelect }: RecordListProps) {
  return (
    <div className="record-list">
      {searchResults.length > 0 ? (
        searchResults.map((record) => (
          <Record
            key={record.id}
            record={record}
            onRecordSelect={onRecordSelect}
          />
        ))
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
}

export default RecordList;
