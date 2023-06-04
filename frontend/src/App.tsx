import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchForm from './components/SearchForm';
import RecordList from './pages/RecordList';
import RecordDetail from './pages/RecordDetail';

import { TopBar } from './components/TopBar/TopBar';
import { GenrePage } from './pages/GenrePage';
import { LandingPage } from './pages/LandingPage';
import { RecordPage } from './pages/RecordPage';

function App(): JSX.Element {
  // const [searchResults, setSearchResults] = useState<RecordItem[]>([]);
  // const [originalSearchResults, setOriginalSearchResults] = useState<
  // RecordItem[]
  // >([]);

  // const [selectedRecord, setSelectedRecord] = useState<RecordItem | null>(null);

  // const handleSearch = (searchCriteria: any): void => {
  // const filteredResults = originalSearchResults.filter(
  // (record) =>
  // record.title
  // .toLowerCase()
  // .includes(searchCriteria.title.toLowerCase()) &&
  // record.artist
  // .toLowerCase()
  // .includes(searchCriteria.artist.toLowerCase()) &&
  // record.genre
  // .toLowerCase()
  // .includes(searchCriteria.genre.toLowerCase()) &&
  // (record.availability ||
  // (!record.availability && !searchCriteria.availability)) &&
  // (searchCriteria.minPrice === '' ||
  // record.price >= parseFloat(searchCriteria.minPrice)) &&
  // (searchCriteria.maxPrice === '' ||
  // record.price <= parseFloat(searchCriteria.maxPrice))
  // );

  // setSearchResults(filteredResults);
  // };

  // const handleRecordSelect = (record: RecordItem): void => {
  // setSelectedRecord(record);
  // };

  /// / These are just test data
  // const fetchStore1Data = (): Promise<RecordItem[]> => {
  // return new Promise((resolve) => {
  // setTimeout(() => {
  // resolve([
  // {
  // id: 1,
  // title: 'Album 1 (Store 1)',
  // artist: 'Artist 1',
  // genre: 'Genre 1',
  // price: 10.99,
  // availability: true,
  // stores: [],
  // cover: '',
  // },
  // {
  // id: 2,
  // title: 'Album 2 (Store 1)',
  // artist: 'Artist 2',
  // genre: 'Genre 2',
  // price: 12.99,
  // availability: false,
  // stores: [],
  // cover: '',
  // },
  /// / Add more records from Store 1...
  // ]);
  // }, 1000);
  // });
  // };

  /// / These are just test data
  // const fetchStore2Data = (): Promise<RecordItem[]> => {
  // return new Promise((resolve) => {
  // setTimeout(() => {
  // resolve([
  // {
  // id: 3,
  // title: 'Album 3 (Store 2)',
  // artist: 'Artist 3',
  // genre: 'Genre 3',
  // price: 14.99,
  // availability: true,
  // stores: [],
  // cover: '',
  // },
  // {
  // id: 4,
  // title: 'Album 4 (Store 2)',
  // artist: 'Artist 4',
  // genre: 'Genre 4',
  // price: 9.99,
  // availability: true,
  // stores: [],
  // cover: '',
  // },
  // {
  // id: 5,
  // title: 'Album 1 (Store 2)',
  // artist: 'Artist 4',
  // genre: 'Genre 4',
  // price: 11.99,
  // availability: true,
  // stores: [],
  // cover: '',
  // },
  /// / Add more records from Store 2...
  // ]);
  // }, 1500);
  // });
  // };

  // useEffect(() => {
  // const fetchRecordData = async (): Promise<void> => {
  // const store1Data = await fetchStore1Data();
  // const store2Data = await fetchStore2Data();
  // const aggregatedData = [...store1Data, ...store2Data];
  // setSearchResults(aggregatedData);
  // setOriginalSearchResults(aggregatedData);
  // };

  // fetchRecordData();
  // }, []);

  return (
    <div>
      <TopBar />
      <Routes>
        <Route index element={<LandingPage />} />
        <Route path="search/:genre" element={<GenrePage />} />
        <Route path="records/:recordId" element={<RecordPage />} />
      </Routes>
    </div>
  );
}

export default App;
