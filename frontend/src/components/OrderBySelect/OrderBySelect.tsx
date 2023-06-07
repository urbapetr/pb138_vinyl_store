import { useSearchParams } from 'react-router-dom';

export function OrderBySelect() {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <select
      defaultValue="Order by"
      className="select select-bordered w-full max-w-xs"
      onChange={(e) => {
        const newSearchParams: URLSearchParams = { ...searchParams };
        newSearchParams.set('orderby', e.target.value.toLowerCase());
        newSearchParams.set('genre', 'All');
        setSearchParams(newSearchParams.toString());
      }}
    >
      <option disabled>Order by</option>
      <option>Newest</option>
      <option>Oldest</option>
      <option>Cheapest</option>
      <option>Most expensive</option>
    </select>
  );
}
