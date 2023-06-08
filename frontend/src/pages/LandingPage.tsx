import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useMemo } from 'react';
import { GenreApi } from '../services';
import { GenreCard } from '../components/GenreCard/GenreCard';
import { LoadingIcon } from '../components/shared/LoadingIcon';

export function LandingPage() {
  const {
    data: genres,
    isFetching,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ['genres'],
    queryFn: async ({ pageParam = 1 }) => {
      return GenreApi.getGenres(pageParam);
    },
    getNextPageParam: (_lastGroup, groups) => groups.length + 1,
    keepPreviousData: true,
    staleTime: Infinity,
  });

  const flatData = useMemo(
    () => genres?.pages.flatMap((g) => g.data) ?? [],
    [genres]
  );

  const handleScroll = useCallback(() => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    const scrolledToBottom = scrollTop + clientHeight === scrollHeight;

    if (scrolledToBottom && !isFetching) {
      fetchNextPage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetching]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  if (!genres) return <LoadingIcon />;

  return (
    <div className="mb-8">
      <div className="mx-12 mt-12 grid gap-y-12 sm:grid-cols-2 sm:gap-x-12 lg:grid-cols-4 xl:mx-48">
        {flatData.map((genre) => {
          return (
            <div className="w-full bg-neutral-800" key={genre.id}>
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
