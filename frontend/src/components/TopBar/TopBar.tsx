import { SearchBar } from './SearchBar';
import { StoreName } from './StoreName';

export function TopBar() {
  return (
    <header className="flex flex-col my-3 gap-y-4 sm:mt-12 sm:flex-row sm:justify-around md:mx-16 xl:mx-48">
      <div className="flex justify-center">
        <StoreName name="Vinyl Store" />
      </div>
      <SearchBar />
    </header>
  );
}
