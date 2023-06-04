import { useQuery } from '@tanstack/react-query';
import { GenreApi } from '../services';
import { GenreCard } from '../components/GenreCard/GenreCard';
import { LoadingIcon } from '../components/shared/LoadingIcon';

export function LandingPage() {
  const { data: genres } = useQuery({
    queryKey: ['genres'],
    queryFn: () => GenreApi.getAll(),
  });

  if (!genres) return <LoadingIcon />;

  return (
    <div>
      <div className="mb-8">
        {genres.data.map((genre) => {
          return (
            <GenreCard
              key={genre.id}
              imageUrl={genre.imageUrl}
              label={genre.name}
              link={genre.id}
            />
          );
        })}
      </div>
    </div>
  );
}
