import { convertPrice } from '../../utils/price';
import { StoreButton } from './StoreButton';
import { StoreLogo } from './StoreLogo';

interface StorePanelProps {
  name: string;
  link: string;
  logo: string;
  price: number;
  available: boolean;
}

export function StorePanel({
  name,
  link,
  logo,
  price,
  available,
}: StorePanelProps) {
  return (
    <div className="font-aoboshi bg-white mx-8 mb-8 mt-4 p-4">
      <div className="flex flex-col">
        <div className="flex h-16">
          <div className="flex-1">
            <StoreLogo alt={name} src={logo} />
          </div>
          <span className="flex-auto text-xl my-auto">{name}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-lg my-auto">{convertPrice(price)}</span>
          <StoreButton available={available} link={link} />
        </div>
      </div>
    </div>
  );
}
