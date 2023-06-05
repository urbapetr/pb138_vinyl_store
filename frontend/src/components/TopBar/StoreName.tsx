import { Link } from 'react-router-dom';

type StoreNameProps = {
  name: string;
};

export function StoreName({ name }: StoreNameProps) {
  return (
    <Link to="/">
      <h1 className="font-bebas text-6xl">{name}</h1>
    </Link>
  );
}
