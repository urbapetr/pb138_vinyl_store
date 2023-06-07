import { Link } from 'react-router-dom';
import { CardImage } from '../shared/CardImage';

type GenreCardProps = {
  imageUrl: string;
  label: string;
  link: string;
};

export function GenreCard({ imageUrl, label, link }: GenreCardProps) {
  return (
    <Link to={`search${link}`}>
      <div className="text-center mt-12">
        <div>
          <CardImage src={imageUrl} alt={label} />
        </div>
        <div className="py-2 bg-neutral-800 font-bebas text-3xl text-white">
          <span>{label}</span>
        </div>
      </div>
    </Link>
  );
}
