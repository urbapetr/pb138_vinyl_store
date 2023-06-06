/* eslint-disable no-await-in-loop */
import cheerio from 'cheerio';
import { delay, fetchFromWebOrCache } from '../generic';
// import { extractProduct } from '../products/ExperienceVinylProduct';
import type Vinyl from '../../../types/vinyl';

const URL = 'https://experiencevinyl.com/collections/vinyl-record-lps';
const defaultDelay = 1000;

const getProductsFromPage = async (pageUrl: string): Promise<Array<Vinyl>> => {
  const contents = await fetchFromWebOrCache(pageUrl);
  const vinyls: Array<Vinyl> = [];

  if (contents == null) {
    return vinyls;
  }

  const $ = cheerio.load(contents);

  // TODO: cost when sale has weird string
  $('#product-grid .card').each((i, data) => {
    // const url = $(data).find('.card__inner .full-unstyled-link').attr('href'); // product url
    const text = $(data)
      .find('.card__inner .full-unstyled-link')
      .text()
      .trim()
      .split('-');
    const artist = text[0] ? text[0].trim() : '';
    const title = text.slice(1).join('-').trim();
    let image = $(data).find('.motion-reduce').attr('src');
    if (image) {
      image = image.replace(/^\/\//, '');
    }
    // const price = parseFloat($(data).find('.price-item--regular').text().trim().replace(/[^0-9.]/g, ''));
    // price regular is not the current price...
    const price = parseFloat(
      $(data)
        .find('.price-item--sale')
        .text()
        .trim()
        .replace(/[^0-9.]/g, '')
    );
    const availableText = $(data)
      .find('.quick-add__submit span:eq(0)')
      .text()
      .trim(); // === "Add to Cart";
    // "Pre-Order" and "Add to Cart" mean available; if quick-add__submit is not found, the cannot be bought
    // const sale = $(data).find('.price-item--sale').text().trim();
    console.log(`This is ${i} children`);
    console.log(availableText);
    const available = !!availableText;
    const res: Vinyl = { image, price, artist, title, genres: [], available };
    console.log(res);
    vinyls.push(res);
  });

  return vinyls;
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
  let vinyls: Array<Vinyl> = [];

  const pageCount: number | null = await getPagesCount();
  console.log(pageCount);
  await delay(defaultDelay);

  if (!pageCount) {
    throw new Error('No pageCount!');
  }
  // await delay(5000);
  // TODO pages count
  for (let i = pageStart ?? 1; i < (pageLimit ?? pageCount); i += 1) {
    const data = await getProductsFromPage(
      `https://experiencevinyl.com/collections/vinyl-record-lps?page=${i}`
    );
    console.log('PARSED: ');
    console.log(data);
    vinyls = [...vinyls, ...data];
    await delay(defaultDelay);
  }

  return vinyls;
};

export { getProducts, getPagesCount };
