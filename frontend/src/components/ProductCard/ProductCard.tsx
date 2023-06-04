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
    <div className="mx-12 mt-12">
      <Link to={`/records/${id}`}>
        <div>
          <CardImage src={cover} alt={`${title}-${artist}`} />
        </div>
      </Link>
      <div className="py-2 px-4 bg-neutral-800 font-monomaniac text-xl text-white">
        <Link to={`/records/${id}`}>
          <div>
            {title} - {artist}
          </div>
          <div>{joinArray(genres)}</div>
        </Link>
        <div className="text-center font-aoboshi">
          <ProductButton price={price} navigationUrl={priceUrl} />
        </div>
      </div>
    </div>
  );
}
