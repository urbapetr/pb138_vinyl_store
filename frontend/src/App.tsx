import { Routes, Route } from 'react-router-dom';

import { TopBar } from './components/TopBar/TopBar';
import { GenrePage } from './pages/GenrePage';
import { LandingPage } from './pages/LandingPage';
import { RecordPage } from './pages/RecordPage';

function App(): JSX.Element {
  return (
    <div>
      <TopBar />
      <Routes>
        <Route index element={<LandingPage />} />
        <Route path="search" element={<GenrePage />} />
        <Route path="records/:recordId" element={<RecordPage />} />
      </Routes>
    </div>
  );
}

export default App;
