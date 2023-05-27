import React from 'react';
import Record from '../components/Record';
import '../styles.css';

function RecordList({ searchResults, onRecordSelect }) {
  return (
    <div className="record-list">
      {searchResults.length > 0 ? (
        searchResults.map((record) => (
          <Record key={record.id} record={record} onRecordSelect={onRecordSelect} />
        ))
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
}

export default RecordList;
