import { SearchBar } from './SearchBar';
import { StoreName } from './StoreName';

export function TopBar() {
  return (
    <header className="flex flex-col sd:flex-row md:justify-around my-4 md:mx-16 gap-y-4">
      <div className="flex justify-center">
        <StoreName name="Vinyl Store" />
      </div>
      <SearchBar />
    </header>
  );
}
