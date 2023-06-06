import type Vinyl from '../../../types/vinyl';

const extractProduct = (obj: Element): Vinyl => {
  const vinyl:Vinyl = {
    title: 'xx',
    artist: 'xx',
    available: true,
    genre: 'cc',
    price: 120,
    image: 'xx',
  };
  console.log(obj);
  return vinyl;
};

const xx = () => {};

export { extractProduct, xx };
