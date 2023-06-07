import { useSearchParams } from 'react-router-dom';

const map = new Map([
  ['title', 'title_asc'],
  ['title inverse', 'title_desc'],
  ['artist', 'artist_asc'],
  ['artist inverse', 'artist_desc'],
  ['newest', 'updatedAt_desc'],
  ['oldest', 'updatedAt_asc'],
]);

export function OrderBySelect() {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <select
      defaultValue="Order by"
      className="select select-bordered w-full max-w-xs"
      onChange={(e) => {
        const value = e.target.value.toLowerCase();
        if (map.has(value)) {
          const converted = map.get(value);
          if (converted) {
            const newSearchParams: URLSearchParams = new URLSearchParams(
              searchParams
            );
            newSearchParams.set('orderby', converted);
            setSearchParams(newSearchParams.toString());
          }
        }
      }}
    >
      <option disabled>Order by</option>
      <option>Title</option>
      <option>Title Inverse</option>
      <option>Artist</option>
      <option>Artist Inverse</option>
      <option>Newest</option>
      <option>Oldest</option>
    </select>
  );
}
