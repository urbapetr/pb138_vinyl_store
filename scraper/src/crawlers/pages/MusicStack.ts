/* eslint-disable no-await-in-loop */
import cheerio from 'cheerio';
import { delay, fetchFromWebOrCache } from '../generic';
import { send } from '../../sender';
import type { Vinyl } from '../../models/vinylTypes';
// import { extractProduct } from '../products/ExperienceVinylProduct';

// const URL = 'https://experiencevinyl.com/collections/vinyl-record-lps';
const UUID = '4a0b0b4a-047e-11ee-be56-0242ac120002';

const URL =
  'https://www.musicstack.com/seller.cgi?seller=64033&search_type=&genre=&media=4&find=&next=';
const defaultDelay = 1;

const getContents = async (url: string) => {
  const contents = await fetchFromWebOrCache(url);
  if (contents == null) {
    throw new Error(`could not get contents: ${url}`);
  }

  let $ = cheerio.load(contents);
  const captcha = $('.captcha-mid');
  if (captcha.length === 0) {
    return contents;
  }
  console.log('CAPTCHA!!!!!');
  const contents2 = await fetchFromWebOrCache(url, true);
  if (contents2 == null) {
    throw new Error(`could not get contents: ${url}`);
  }

  $ = cheerio.load(contents2);
  const captcha2 = $('.captcha-mid');
  console.log(captcha2.html());

  if (captcha2.length === 0) {
    return contents2;
  }
  throw new Error('CAPTCHA REQUIRED!!! Ending');
};
const getProductUlrs = async (
  pageUrl: string
): Promise<{ isEnd: boolean; urls: string[] }> => {
  const contents = await getContents(pageUrl);
  const urls: string[] = [];
  if (contents == null) {
    return { isEnd: true, urls };
  }
  const $ = cheerio.load(contents);
  // loading 75 entries, ends with "next page link"
  $('form > table:gt(3)').each((i, data) => {
    // console.log(`###########################Element ${i}`);
    const url = $(data).find('a').attr('href');
    if (url) {
      if (url.startsWith(URL)) {
        console.log(`bottom! Loaded ${i} urls.`);
      } else {
        urls.push(url);
      }
    }
  });

  const nextbutton = $('form > table a.blue_button > font > b');
  const isEnd = nextbutton.length === 0;

  return { isEnd, urls };
};

const getProduct = async (detailUrl: string): Promise<Vinyl> => {
  // const contents = await fetchFromWebOrCache(detailUrl);
  const contents = await getContents(detailUrl);
  if (contents == null) {
    throw new Error('Invalid data. Unable to create Vinyl object.');
  }
  const $ = cheerio.load(contents);
  const text = $('.titlehead').text().split('‐');
  const artist = text[0] ? text[0].trim() : 'N/A';
  const title = text.slice(1).join('-').trim();
  const quantityText = $('span[itemprop="eligibleQuantity"]').attr('content');
  const quantity = quantityText ? parseInt(quantityText, 10) : NaN;
  // const available = $('span[itemprop="availability"]').attr('content');
  const available = quantity ? quantity >= 1 : false;
  const price = parseFloat(
    $('font[face="arial"][size="+2"][color="black"] > b')
      .text()
      .replace(/[^0-9.]/g, '')
  );
  const image = $('.fancybox > img').attr('src');
  if (image === undefined) {
    throw new Error('Image not found');
  }

  // const genres = [$('td.t:contains("Genre:") + td.t').text()];
  // TODO: really only one genre?
  const genre = $('td.t b:contains("Genre:")')
    .parent()
    .parent()
    .find('td:eq(2)'); // .next('td.t');
  const genres = [genre.text()];
  const result = {
    artist,
    title,
    available,
    image,
    quantity,
    price,
    genres,
    productUrl: detailUrl,
  };
  return result;
};

const getPagesCount = async (): Promise<number | null> => {
  const contents = await fetchFromWebOrCache(URL);

  if (contents == null) {
    return null;
  }

  const $ = cheerio.load(contents);
  const pages = $('.pagination-wrapper .pagination .pagination__list li');

  const end = pages.children()[pages.children().length - 2];

  if (end === undefined) {
    throw new Error('Undefined page cound end');
  }
  if ('children' in end && end.children[0] !== undefined) {
    return end.children[0].data ? parseInt(end.children[0].data, 10) : null;
  }
  throw new Error('Page end is not an element!');
};

const getProducts = async (
  pageStart?: number,
  pageLimit?: number
): Promise<Array<Vinyl>> => {
  const vinyls: Array<Vinyl> = [];

  let allUrls: string[] = [];
  let currentPage = pageStart ? pageStart - 1 : 0;
  let isEnd = false;
  let progressItems = pageStart ? currentPage * 500 : 0;
  while (!isEnd && (pageLimit ? currentPage < pageLimit : true)) {
    // while (pageLimit ? currentPage < pageLimit : true) {
    console.log(`On page ${currentPage}`);

    const result = await getProductUlrs(
      `${URL}${progressItems}`
    );
    isEnd = result.isEnd;

    console.log(`loaded ${result.urls.length} items from ${progressItems}`);
    allUrls = [...allUrls, ...result.urls];
    progressItems += 500;
    currentPage += 1;
  }

  /// /
  // const pageCount: number | null = await getPagesCount();
  // console.log(pageCount);
  // await delay(defaultDelay);
  // let allUrls: string[] = [];
  // if (!pageCount) {
  //   throw new Error("No pageCount!");
  // }
  // await delay(5000);
  // TODO pages count
  // for (let i = (pageStart ?? 1); i < (pageLimit ?? pageCount); i++) {
  //   const url = await getProductUlrs(`https://vinylpursuit.com/collections/all-vinyl?page=${i}`)
  //   allUrls = [...allUrls, ...url];

  // }

  console.log(`Loaded ${allUrls.length} urls!`);
  await delay(defaultDelay);

  for (let i = 1; i < allUrls.length; i += 1) {
    const url = allUrls[i];
    if (url) {
      console.log(`Doing product ${i} ${url}`);
      const data = await getProduct(url);
      console.log(data);
      vinyls.push(data);
      await send(data, UUID);
      await delay(defaultDelay);
    }
  }

  return vinyls;
};

export { getProducts, getProduct, getPagesCount, getProductUlrs };
