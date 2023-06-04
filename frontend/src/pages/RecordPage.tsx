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
    <div>
      <div className="mb-8" />
      <DetailCard
        artist={record.data.artist}
        cover={record.data.cover}
        genres={record.data.genres}
        title={record.data.title}
      />
      <div className="bg-neutral-800 mt-8 pb-1 font-bebas">
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
                return a.name.localeCompare(b.name, 'en');
              }

              return a.price - b.price;
            })
            .map((store) => {
              if (availableFilter && !store.available) {
                return null;
              }
              return (
                <StorePanel
                  key={store.id}
                  name={store.name}
                  available={store.available}
                  link={store.link}
                  logo={store.logo}
                  price={store.price}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}
