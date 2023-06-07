import { useState, useEffect, useCallback } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { LoadingIcon } from '../components/shared/LoadingIcon';
import { RecordApi } from '../services';
import { ProductCard } from '../components/ProductCard/ProductCard';
import { OrderBySelect } from '../components/OrderBySelect/OrderBySelect';
import { Filter } from '../components/Filter/Filter';

export function GenrePage() {
  const [page, setPage] = useState(1); // Track the current page number
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  const {
    data: records,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ['records', page],
    queryFn: () => {
      return RecordApi.getRecords(`${searchParams.toString()}&page=${page}`);
    },
  });

  const fetchNextPage = useCallback(async () => {
    const nextPage = page + 1;
    const nextPageData = await RecordApi.getRecords(
      `${searchParams.toString()}&page=${nextPage}`
    );

    queryClient.setQueryData(['records', nextPage], nextPageData);
    setPage(nextPage);
  }, [queryClient, page, searchParams]);

  const handleScroll = useCallback(() => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    const scrolledToBottom = scrollTop + clientHeight === scrollHeight;

    if (scrolledToBottom && !isFetching) {
      fetchNextPage();
    }
  }, [isFetching, fetchNextPage]);

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

  if (records.data.length === 0) {
    return (
      <div className="font-aoboshi mt-8 text-center text-xl">No results :(</div>
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
          {records.data.map((record) => {
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
