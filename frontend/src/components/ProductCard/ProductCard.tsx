import { Link } from 'react-router-dom';
import { RecordCheapest } from '../../models';
import { CardImage } from '../shared/CardImage';
import { ProductButton } from './ProductButton';
import { joinArray } from '../../utils/string';

export function ProductCard({
  id,
  title,
  artist,
  genres,
  price,
  priceUrl,
  cover,
}: RecordCheapest) {
  return (
    <div className="h-full bg-neutral-800 flex flex-col">
      <Link to={`/records/${id}`}>
        <div>
          <CardImage src={cover} alt={`${title}-${artist}`} />
        </div>
      </Link>
      <div className="py-2 px-4 font-monomaniac text-xl text-white">
        <Link to={`/records/${id}`}>
          <div>
            {title} - {artist}
          </div>
          <div>{joinArray(genres)}</div>
        </Link>
      </div>
      <div className="py-2 text-center font-aoboshi mt-auto">
        <ProductButton price={price} navigationUrl={priceUrl} />
      </div>
    </div>
  );
}
