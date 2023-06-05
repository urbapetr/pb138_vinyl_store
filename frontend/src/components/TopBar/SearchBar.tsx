export function SearchBar() {
  return (
    <form className="flex items-center justify-center">
      <div className="join">
        <div>
          <div>
            <input className="input join-item" placeholder="Search..." />
          </div>
        </div>
        <button type="submit" className="btn join-item">
          Search
        </button>
      </div>
    </form>
  );
}
