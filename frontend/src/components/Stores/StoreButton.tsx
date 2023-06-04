import { Link } from 'react-router-dom';

interface StoreButtonProps {
  link: string;
  available: boolean;
}

export function StoreButton({ link, available }: StoreButtonProps) {
  return (
    <Link to={link}>
      <button type="button" className="btn btn-primary font-aoboshi">
        {available ? 'Buy' : 'Out of Stock'}
      </button>
    </Link>
  );
}
