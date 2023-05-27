import React, { useState, useEffect } from 'react';
import SearchForm from './components/SearchForm';
import RecordList from './pages/RecordList';
import RecordDetail from './pages/RecordDetail';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles.css';

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [originalSearchResults, setOriginalSearchResults] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const handleSearch = (searchCriteria) => {
    const filteredResults = originalSearchResults.filter((record) =>
      record.title.toLowerCase().includes(searchCriteria.title.toLowerCase()) &&
      record.artist.toLowerCase().includes(searchCriteria.artist.toLowerCase()) &&
      record.genre.toLowerCase().includes(searchCriteria.genre.toLowerCase()) &&
      (record.availability || (!record.availability && !searchCriteria.availability)) &&
      (searchCriteria.minPrice === '' || record.price >= parseFloat(searchCriteria.minPrice)) &&
      (searchCriteria.maxPrice === '' || record.price <= parseFloat(searchCriteria.maxPrice))
    );
  
    setSearchResults(filteredResults);
  };
  

  const handleRecordSelect = (record) => {
    setSelectedRecord(record);
  };

  useEffect(() => {
    const fetchRecordData = async () => {
      const store1Data = await fetchStore1Data();
      const store2Data = await fetchStore2Data();
      const aggregatedData = [...store1Data, ...store2Data];
      setSearchResults(aggregatedData);
      setOriginalSearchResults(aggregatedData);
    };

    fetchRecordData();
  }, []);

  const fetchStore1Data = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: 1, title: 'Album 1 (Store 1)', artist: 'Artist 1', genre: 'Genre 1', price: 10.99, availability: true, stores: [], cover: 'https://example.com/album1-cover.jpg' },
          { id: 2, title: 'Album 2 (Store 1)', artist: 'Artist 2', genre: 'Genre 2', price: 12.99, availability: false, stores: [], cover: '' },
          // Add more records from Store 1...
        ]);
      }, 1000);
    });
  };
  
  const fetchStore2Data = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: 3, title: 'Album 3 (Store 2)', artist: 'Artist 3', genre: 'Genre 3', price: 14.99, availability: true, stores: [], cover: 'https://example.com/album3-cover.jpg' },
          { id: 4, title: 'Album 4 (Store 2)', artist: 'Artist 4', genre: 'Genre 4', price: 9.99, availability: true, stores: [], cover: 'https://example.com/album4-cover.jpg' },
          { id: 5, title: 'Album 1 (Store 2)', artist: 'Artist 4', genre: 'Genre 4', price: 11.99, availability: true, stores: [], cover: 'https://example.com/album5-cover.jpg' },
          // Add more records from Store 2...
        ]);
      }, 1500);
    });
  };
   
  
  return (
    <Router>
      <div className="app">
        <h1>Vinyl Store</h1>
        <SearchForm onSearch={handleSearch} />
        <Routes>
          <Route path="/" element={<RecordList searchResults={searchResults} onRecordSelect={handleRecordSelect} />} />
          <Route path="/record/:id" element={<RecordDetail searchResults={searchResults} />} />
        </Routes>
      </div>
    </Router>
  );
  
}

export default App;
