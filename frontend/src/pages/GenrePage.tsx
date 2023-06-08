import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { LoadingIcon } from '../components/shared/LoadingIcon';
import { RecordApi } from '../services';
import { ProductCard } from '../components/ProductCard/ProductCard';
import { OrderBySelect } from '../components/OrderBySelect/OrderBySelect';
import { Filter } from '../components/Filter/Filter';

export function GenrePage() {
  const [searchParams] = useSearchParams();

  const {
    data: records,
    isFetching,
    refetch,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ['records', searchParams],
    queryFn: async ({ pageParam = 1 }) => {
      return RecordApi.getRecords(
        `${searchParams.toString()}&page=${pageParam}`
      );
    },
    getNextPageParam: (_lastGroup, groups) => groups.length + 1,
    keepPreviousData: true,
    staleTime: Infinity,
  });

  const flatData = useMemo(
    () => records?.pages.flatMap((p) => p.data) ?? [],
    [records]
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

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  if (!records) return <LoadingIcon />;

  if (flatData.length === 0) {
    return (
      <div>
        <div className="mx-12 -my-4">
          <div className="m-8 gap-x-4 flex justify-center">
            <Filter />
            <OrderBySelect />
          </div>
        </div>
        <div className="mb-8">
          <div className="font-aoboshi mt-8 text-center text-xl">
            No results :(
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mx-12 -my-4">
        <div className="m-8 gap-x-4 flex justify-center">
          <Filter />
          <OrderBySelect />
        </div>
      </div>
      <div className="mb-8">
        <div className="mx-12 mt-12 grid gap-y-12 sm:grid-cols-2 sm:gap-x-12 lg:grid-cols-4 xl:mx-48">
          {flatData.map((record) => {
            return (
              <ProductCard
                key={record.id}
                id={record.id}
                stores={record.stores}
                title={record.title}
                artist={record.artist}
                genres={record.genres}
                imageUrl={record.imageUrl}
              />
            );
          })}
        </div>
      </div>
      {isFetching && <LoadingIcon />}
    </div>
  );
}
