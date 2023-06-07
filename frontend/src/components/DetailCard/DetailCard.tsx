import { CardImage } from '../shared/CardImage';
import { joinArray } from '../../utils/string';

interface DetailCardProps {
  title: string;
  artist: string;
  genres: { name: string }[];
  imageUrl: string;
}

export function DetailCard({
  title,
  artist,
  genres,
  imageUrl,
}: DetailCardProps) {
  return (
    <div className="mx-12 mt-12 lg:mr-0">
      <div>
        <CardImage src={imageUrl} alt={`${title}-${artist}`} />
      </div>
      <div className="py-2 font-monomaniac text-xl text-neutral-800">
        <div>
          {title} - {artist}
        </div>
        {genres.length > 0 && <div>{joinArray(genres)}</div>}
      </div>
    </div>
  );
}
