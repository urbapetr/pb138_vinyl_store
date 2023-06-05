import cheerio from 'cheerio';
import { fetchFromWebOrCache } from '../generic';
// import { extractProduct } from '../products/ExperienceVinylProduct';
import type Vinyl from '../../../types/vinyl';

const defaultDelay = 1000;

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const URL = 'https://vinylpursuit.com/collections/all-vinyl?page=1'

const getProductUlrs = async (pageUrl: string): Promise<Array<string>> => {
  const contents = await fetchFromWebOrCache(pageUrl);
  const urls: string[] = [];
  if (contents == null) {
    return urls;
  }
  const $ = cheerio.load(contents);
  // loading 75 entries, ends with "next page link"
  $('.products-grid  .product-title').each((_i, data) => {
    const url = $(data).attr("href");
    if (url) {
      urls.push(url);
    }
  });

  return urls;
};


const getProduct = async (detailUrl: string): Promise<Vinyl> => {
  const contents = await fetchFromWebOrCache(detailUrl);
  if (contents == null) {
    throw new Error('Invalid data. Unable to create Vinyl object.');
  }
  const $ = cheerio.load(contents);
  const text = $('h1[itemprop="name"]').text().split('–');
  const artist = text[0] ? text[0].trim() : "";
  const title = text.slice(1).join('-').trim();
  // const availability = $('span[itemprop="availability"]').attr('content');
  const available = true; // they don't list sold out i think
  const price = parseFloat($('.price[itemprop="price"] .money').text().replace(/[^0-9.]/g, ''));
  let image = $('#product-featured-image').attr('src');
  if (image) {
    image = image.replace(/^\/\//, '');
  }

  // they use various formatting on description T.T
  // const description = $('.panel > p.p1 ').html() ?? "";
  // const description = $('.panel p.p1 ').html() ?? "";
  const description = $('.panel ').html() ?? "";


  // Extract the list of genres
  const match = description.match(/Genre:([^<]+)/i);

  const genres = match && match[1] ? match[1].split(',').map(genre => genre.trim()) : [];

  if (genres.length === 0) {
    const path = Buffer.from(detailUrl).toString('base64').replaceAll('/', '!');
    console.error(`ERROR INVESTIGATE: '${path}.html'`)
  }

  const result = { artist, title, available, price, image, genres };

  return result;
}

const getProducts = async (pageStart?: number, pageLimit?: number): Promise<Array<Vinyl>> => {
  const vinyls: Array<Vinyl> = [];


  const pageCount: number | null = await getPagesCount();
  console.log(pageCount);
  await delay(defaultDelay);
  let allUrls: string[] = [];
  if (!pageCount) {
    throw new Error("No pageCount!");
  }
  // await delay(5000);
  // TODO pages count
  for (let i = (pageStart ?? 1); i < (pageLimit ?? pageCount); i++) {
    const url = await getProductUlrs(`https://vinylpursuit.com/collections/all-vinyl?page=${i}`)
    allUrls = [...allUrls, ...url];

  }

  console.log(`Loaded ${allUrls.length} urls!`);
  await delay(defaultDelay);

  for (let i = 1; i < allUrls.length; i++) {
    const url = allUrls[i];
    if (!url) {
      continue;
    }
    console.log(`Doing product ${i} ${url}`)
    const data = await getProduct(`https://vinylpursuit.com${url}`);
    console.log(data);
    vinyls.push(data);
    await delay(defaultDelay);
  }

  return vinyls;
};

const getPagesCount = async (): Promise<number | null> => {
  const contents = await fetchFromWebOrCache(URL);

  const path = Buffer.from(URL).toString('base64').replaceAll('/', '!');
  console.log(`path is ${path}`)

  if (contents == null) {
    return null;
  }
  const $ = cheerio.load(contents);
  const pages = $('ul.pagination-page > li:eq(-2) > a',).text();

  // @ts-ignore
  return pages
};


export { getProducts, getProduct, getPagesCount, getProductUlrs };
