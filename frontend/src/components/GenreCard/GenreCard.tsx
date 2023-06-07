import { Link } from 'react-router-dom';
import { CardImage } from '../shared/CardImage';

type GenreCardProps = {
  imageUrl: string;
  label: string;
  link: string;
};

export function GenreCard({ imageUrl, label, link }: GenreCardProps) {
  return (
    <Link to={`search${link}`} className="h-full flex flex-col">
      <div className="h-full bg-neutral-200 flex flex-col justify-center">
        <CardImage src={imageUrl} alt={label} />
      </div>
      <div className="text-center py-2 bg-neutral-800 font-bebas text-3xl text-white">
        <span>{label}</span>
      </div>
    </Link>
  );
}
