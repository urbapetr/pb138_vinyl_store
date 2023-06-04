export function OrderBySelect() {
  return (
    <select
      defaultValue="Order by"
      className="select select-bordered w-full max-w-xs"
    >
      <option disabled>Order by</option>
      <option>Newest</option>
      <option>Oldest</option>
      <option>Cheapest</option>
      <option>Most expensive</option>
    </select>
  );
}
