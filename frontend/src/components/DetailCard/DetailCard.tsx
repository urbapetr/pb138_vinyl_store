import { CardImage } from '../shared/CardImage';
import { joinArray } from '../../utils/string';

interface DetailCardProps {
  title: string;
  artist: string;
  genres: { name: string }[];
  cover: string;
}

export function DetailCard({ title, artist, genres, cover }: DetailCardProps) {
  return (
    <div className="mx-12 mt-12 lg:mr-0">
      <div>
        <CardImage src={cover} alt={`${title}-${artist}`} />
      </div>
      <div className="py-2 font-monomaniac text-xl text-neutral-800">
        <div>
          {title} - {artist}
        </div>
        <div>{joinArray(genres)}</div>
      </div>
    </div>
  );
}
