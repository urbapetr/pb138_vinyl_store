/* eslint-disable no-await-in-loop */
import cheerio from 'cheerio';
import { delay, fetchFromWebOrCache } from '../generic';
import { send } from '../../sender';
import type { Vinyl } from '../../models/vinylTypes';

const UUID = '3ca22494-047e-11ee-be56-0242ac120002';
const defaultDelay = 1000;

const URL = 'https://vinylpursuit.com/collections/all-vinyl?page=1';
const baseUrl = 'https://vinylpursuit.com/collections/all-vinyl?page=';

const getProductUlrs = async (pageUrl: string): Promise<Array<string>> => {
  const contents = await fetchFromWebOrCache(pageUrl);
  const urls: string[] = [];
  if (contents == null) {
    return urls;
  }
  const $ = cheerio.load(contents);
  // loading 75 entries, ends with "next page link"
  $('.products-grid  .product-title').each((_i, data) => {
    const url = $(data).attr('href');
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
  const text = $('h1[itemprop="name"]')
    .text()
    .replace(/\u200E/g, '')
    .split(/[-–—(]/);
  const artist = text[0] ? text[0].trim() : '';
  const title = text[1] ? text[1].trim() : '';

  const available = true; // they don't list sold out
  const price = parseFloat(
    $('.price[itemprop="price"] .money')
      .text()
      .replace(/[^0-9.]/g, '')
  );

  let image = $('#product-featured-image').attr('src');
  if (image) {
    image = `http:${image}`;
  }

  // Extract the list of genres
  const description = $('.panel').html() ?? '';
  const match = description.match(/Genre:([^<]+)/i);
  let genres =
    match && match[1] ? match[1].split(',').map((genre) => genre.trim()) : [];

  genres = genres.flatMap((genre) => {
    if (genre.includes(' / ')) {
      return genre.split(' / ');
    }
    return genre;
  });

  genres = genres.map((genre) => {
    return genre.replace(/^&amp; /, '').replace(/ &amp; /, ' & ');
  });

  const result = {
    artist,
    title,
    available,
    price,
    image,
    genres,
    productUrl: detailUrl,
  };

  return result;
};

const getPagesCount = async (): Promise<number> => {
  const contents = await fetchFromWebOrCache(URL);

  const path = Buffer.from(URL).toString('base64').replaceAll('/', '!');
  console.log(`path is ${path}`);

  if (contents == null) {
    throw new Error('getPagesCount: Could not get contents!');
  }
  const $ = cheerio.load(contents);
  const pages = $('ul.pagination-page > li:eq(-2) > a').text();

  return parseInt(pages, 10);
};

const getProducts = async (
  pageStart?: number,
  pageLimit?: number
): Promise<Array<Vinyl>> => {
  const vinyls: Array<Vinyl> = [];
  const pageCount: number = await getPagesCount();
  const maxPage = pageLimit ? Math.min(pageCount, pageLimit) : pageCount;

  console.log(pageCount);
  await delay(defaultDelay);
  let allUrls: string[] = [];
  if (!pageCount) {
    throw new Error('No pageCount!');
  }
  for (let i = pageStart ?? 1; i < maxPage; i += 1) {
    const url = await getProductUlrs(`${baseUrl}${i}`);
    allUrls = [...allUrls, ...url];
  }

  console.log(`Loaded ${allUrls.length} urls!`);
  await delay(defaultDelay);

  for (let i = 1; i < allUrls.length; i += 1) {
    const url = allUrls[i];
    if (url) {
      try {
        console.log(`Doing product ${i} ${url}`);
        const data = await getProduct(`https://vinylpursuit.com${url}`);
        console.log(data);
        await send(data, UUID);
        vinyls.push(data);
        await delay(defaultDelay);
      } catch (e) {
        console.log(`Unable to catch getProduct for ${url}`);
      }
    }
  }

  return vinyls;
};

export { getProducts, getProduct, getPagesCount, getProductUlrs };
