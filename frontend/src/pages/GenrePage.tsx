import { useQuery } from '@tanstack/react-query';
import { LoadingIcon } from '../components/shared/LoadingIcon';
import { RecordApi } from '../services';
import { ProductCard } from '../components/ProductCard/ProductCard';
import { OrderBySelect } from '../components/OrderBySelect/OrderBySelect';
import { Filter } from '../components/Filter/Filter';

export function GenrePage() {
  const { data: records } = useQuery({
    queryKey: ['records'],
    queryFn: () => RecordApi.getRecords(),
  });

  if (!records) return <LoadingIcon />;

  return (
    <div>
      <div className="mx-12 -my-4">
        <div className="m-8 gap-x-4 flex justify-center">
          <Filter />
          <OrderBySelect />
        </div>
      </div>
      <div className="mb-8">
        <div className="mx-12 sm:grid sm:grid-cols-2 sm:gap-x-12 lg:grid-cols-4 xl:mx-48">
          {records.data.map((record) => {
            return (
              <div key={record.id}>
                <ProductCard
                  artist={record.artist}
                  cover={record.cover}
                  genres={record.genres}
                  id={record.id}
                  price={record.price}
                  priceUrl={record.priceUrl}
                  title={record.title}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
