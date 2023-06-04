import { Link } from 'react-router-dom';
import { convertPrice } from '../../utils/price';

interface ProductButtonProps {
  price: number | null;
  navigationUrl: string | null | undefined;
}

export function ProductButton({ price, navigationUrl }: ProductButtonProps) {
  if (!navigationUrl) {
    return (
      <button type="button" data-theme="custom" className="btn mt-4" disabled>
        {convertPrice(price)}
      </button>
    );
  }

  return (
    <Link to={navigationUrl}>
      <button type="button" className="btn bg-stone-200 mt-4 text-neutral-800">
        {convertPrice(price)}
      </button>
    </Link>
  );
}
