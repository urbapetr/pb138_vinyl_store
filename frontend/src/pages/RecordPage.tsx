import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { RecordApi } from '../services';
import { LoadingIcon } from '../components/shared/LoadingIcon';
import { DetailCard } from '../components/DetailCard/DetailCard';
import { StoresHeader } from '../components/Stores/StoresHeader';
import { StorePanel } from '../components/Stores/StorePanel';
import { OrderByRecordFilter } from '../types/OrderByRecordFilter';

export function RecordPage() {
  const { recordId } = useParams();
  const [availableFilter, setAvailableFilter] = useState<boolean>(false);
  const [orderByRecordFilter, setOrderByRecordFilter] =
    useState<OrderByRecordFilter>('price');

  const { data: record } = useQuery({
    queryKey: ['record', recordId],
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    queryFn: () => RecordApi.getOne(recordId!),
    enabled: !!recordId,
  });

  if (!record) return <LoadingIcon />;

  return (
    <div className="lg:flex lg:flex-row lg:mb-8 xl:mx-12 2xl:mx-48">
      <div className="mb-8 lg:w-1/2">
        <DetailCard
          artist={record.data.artist}
          imageUrl={record.data.imageUrl}
          genres={record.data.genres}
          title={record.data.title}
        />
      </div>
      <div className="divider divider-horizontal" />
      <div className="bg-neutral-800 mt-8 pb-1 font-bebas lg:w-1/2 lg:mr-8">
        <StoresHeader
          availableCallback={(available) => {
            setAvailableFilter(available);
          }}
          orderByCallback={(orderBy) => {
            if (orderBy === 'price' || orderBy === 'name') {
              setOrderByRecordFilter(orderBy);
            }
          }}
        />
        <div>
          {record.data.stores
            .sort((a, b) => {
              if (orderByRecordFilter === 'name') {
                return a.store.name.localeCompare(b.store.name, 'en');
              }

              return a.price - b.price;
            })
            .map((store) => {
              if (availableFilter && !store.available) {
                return null;
              }
              return (
                <StorePanel
                  key={store.store.id}
                  name={store.store.name}
                  available={store.available}
                  link={store.productUrl}
                  logo={store.store.imageUrl}
                  price={store.price}
                  storeUrl={store.store.url}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}
