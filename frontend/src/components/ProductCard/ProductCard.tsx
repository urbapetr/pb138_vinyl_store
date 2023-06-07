import { Link } from 'react-router-dom';
import { CardImage } from '../shared/CardImage';
import { ProductButton } from './ProductButton';
import { joinArray } from '../../utils/string';
import { Record } from '../../models';

export function ProductCard({
  id,
  title,
  artist,
  genres,
  stores,
  imageUrl,
}: Record) {
  return (
    <div className="h-full bg-neutral-800 flex flex-col">
      <Link to={`/records/${id}`} className="h-full">
        <div className="h-full bg-neutral-200">
          <CardImage src={imageUrl} alt={`${title}-${artist}`} />
        </div>
      </Link>
      <div className="py-2 px-4 font-monomaniac text-xl text-white">
        <Link to={`/records/${id}`}>
          <div>
            {title} - {artist}
          </div>
          {genres.length > 0 && <div>{joinArray(genres)}</div>}
        </Link>
      </div>
      <div className="py-2 text-center font-aoboshi mt-auto">
        <ProductButton
          available={stores[0].available}
          price={stores[0].price}
          navigationUrl={stores[0].productUrl}
        />
      </div>
    </div>
  );
}
