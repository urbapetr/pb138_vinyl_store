import cheerio from 'cheerio';
import { fetchFromWebOrCache } from '../generic';
// import { extractProduct } from '../products/ExperienceVinylProduct';
import type Vinyl from '../../../types/vinyl';

const URL = 'https://experiencevinyl.com/collections/vinyl-record-lps';

const getProducts = async (pageUrl: string): Promise<Array<Vinyl>> => {
  const contents = await fetchFromWebOrCache(pageUrl);
  const vinyls: Array<Vinyl> = [];

  if (contents == null) {
    return vinyls;
  }

  const $ = cheerio.load(contents);
  const products = $(
    '#product-grid',
  );

  const children = products.children();
  for (let i = 0; i < children.length; i += 1) {
    // console.log(children[i]);
    // vinyls.push(extractProduct(children[i]));
  }
  return vinyls;
};

const getPagesCount = async (): Promise<number | null> => {
  const contents = await fetchFromWebOrCache(URL);

  if (contents == null) {
    return null;
  }

  const $ = cheerio.load(contents);
  const pages = $(
    '.pagination-wrapper .pagination .pagination__list li',
  );

  const end = pages.children()[pages.children().length - 2];

  // @ts-ignore
  return end.children[0].data;
};

export { getProducts, getPagesCount };
