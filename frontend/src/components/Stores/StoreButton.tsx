import { Link } from 'react-router-dom';

interface StoreButtonProps {
  link: string;
  available: boolean;
}

export function StoreButton({ link, available }: StoreButtonProps) {
  return (
    <Link to={link} className="xl:flex xl:flex-col xl:justify-center">
      <button type="button" className="btn btn-primary font-aoboshi">
        {available ? 'Buy' : 'Out of Stock'}
      </button>
    </Link>
  );
}
