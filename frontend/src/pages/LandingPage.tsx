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
    <div className="mb-8">
      <div className="mx-12 sm:grid sm:grid-cols-2 sm:gap-x-12 lg:grid-cols-4 xl:mx-48">
        {genres.data.map((genre) => {
          return (
            <div className="w-full sm:inline-block" key={genre.id}>
              <GenreCard
                imageUrl={genre.records[0].record.imageUrl}
                label={genre.name}
                link={`?genre=${genre.name}`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
