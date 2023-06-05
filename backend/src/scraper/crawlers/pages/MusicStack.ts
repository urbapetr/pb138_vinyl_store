import cheerio from 'cheerio';
import { delay, fetchFromWebOrCache } from '../generic';
// import { extractProduct } from '../products/ExperienceVinylProduct';
import type Vinyl from '../../../types/vinyl';

// const URL = 'https://experiencevinyl.com/collections/vinyl-record-lps';
const URL = 'https://www.musicstack.com/seller.cgi?seller=64033&search_type=&genre=&media=&find=&next='
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
  console.log("CAPTCHA!!!!!");
  const contents2 = await fetchFromWebOrCache(url, true);
  if (contents2 == null) {
    throw new Error(`could not get contents: ${url}`);
  }

  $ = cheerio.load(contents2);
  const captcha2 = $('.captcha-mid');
  console.log(captcha2.html());

  if(captcha2.length === 0) {
    return contents2;
  }
  throw new Error("CAPTCHA REQUIRED!!! Ending");

}
// /html/body/center/table/tbody/tr/td/form/table[4]
const getProductUlrs = async (pageUrl: string): Promise<Array<string>> => {
  const contents = await fetchFromWebOrCache(pageUrl);
  const urls: string[] = [];
  if (contents == null) {
    return urls;
  }
  const $ = cheerio.load(contents);
  // loading 75 entries, ends with "next page link"
  $('form > table:gt(3)').each( (i, data) => {
    // console.log(`###########################Element ${i}`);
    const url = $(data).find("a").attr("href");
    if (url) {
      if (url.startsWith("https://www.musicstack.com/seller.cgi?seller=64033&search_type=&genre=&media=&find=&next=")) {
        console.log(`bottom! Loaded ${i} urls.`)
      } else {
        urls.push(url);
      }
    }
  });

  return urls;
};


const getProduct = async (detailUrl: string): Promise<Vinyl> => {
  // const contents = await fetchFromWebOrCache(detailUrl);
  const contents = await getContents(detailUrl);
  if (contents == null) {
    throw new Error('Invalid data. Unable to create Vinyl object.');
  }
  const $ = cheerio.load(contents);
  const text = $('.titlehead').text().split('‐');
  const artist = text[0] ? text[0].trim() : "N/A";
  const title = text.slice(1).join('-').trim();
  const quantityText = $('span[itemprop="eligibleQuantity"]').attr('content');
  const quantity = quantityText ? parseInt(quantityText) : NaN;
  // const available = $('span[itemprop="availability"]').attr('content');
  const available = quantity ? quantity >= 1 : false;
  const price = parseFloat($('font[face="arial"][size="+2"][color="black"] > b').text().replace(/[^0-9.]/g, ''));
  const image = $('.fancybox > img').attr('src');


  // const genres = [$('td.t:contains("Genre:") + td.t').text()];
  // TODO: really only one genre?
  const genre = $('td.t b:contains("Genre:")').parent().parent().find("td:eq(2)"); //.next('td.t');
  const genres = [genre.text()];
  const result = {artist, title, available, image, quantity, price, genres};
  return result;

  


}

const getProducts = async (pageStart?: number, pageLimit?: number): Promise<Array<Vinyl>> => {
  const vinyls: Array<Vinyl> = [];

  let allUrls: string[] = [];
  let currentPage = pageStart ? pageStart -1 : 0;
  let isEnd = false;
  let progressItems = pageStart ? pageStart*500 : 0;
  while (!isEnd && (pageLimit ? currentPage < pageLimit: true)) {
    console.log(`On page $currentPage`);

    const tmp = await getProductUlrs(`https://www.musicstack.com/seller.cgi?seller=64033&search_type=&genre=&media=&find=&next=${progressItems}`)

    console.log(`loaded ${tmp.length} items from ${progressItems}`);
    allUrls = [...allUrls, ...tmp];
    progressItems += 500;
    currentPage += 1;
    if (tmp.length != 500) {
      isEnd = true;
    }

  }

  ////
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

  for (let i = 1; i < allUrls.length; i++) {
    const url = allUrls[i];
    if (!url) {
      continue;
    }
    console.log(`Doing product ${i} ${url}`)
    const data = await getProduct(url);
    console.log(data);
    vinyls.push(data);
    await delay(defaultDelay);
  }

  return vinyls;

  ////////////////////////
  // const contents = await fetchFromWebOrCache(pageUrl);
  // const vinyls: Array<Vinyl> = [];


  // if (contents == null) {
  //   return vinyls;
  // }

  // const $ = cheerio.load(contents);
  // // const products = $(
  // //   '#product-grid',
  // // );

  // // const children = products.children();
  //   // const url = $(data).find('.full-unstyled-link').attr('href');
  //   // const text = $(data).find('.full-unstyled-link').text();
  //   // const picture = $(data).find('.motion-reduce').attr('src');
  //   // const cost = $(data).find('.price-item--regular').text();

  // // TODO: cost when sale has weird string
  // $('#product-grid .card').each( (i, data) => {
  //   const url = $(data).find('.card__inner .full-unstyled-link').attr('href');
  //   const text = $(data).find('.card__inner .full-unstyled-link').text().trim().split(" - ");
  //   const picture = $(data).find('.motion-reduce').attr('src');
  //   const cost = $(data).find('.price-item--regular').text().trim();
  //   const sale = $(data).find('.price-item--sale').text().trim();
  //   console.log(`This is ${i} children`);
  //   console.log({url, text, picture, cost, sale});
  //   if (url === undefined) {
  //     console.error("Error scraping url from listings!");
  //   } else {
  //     // urls.push(url);
  //   }
  // });

  // return vinyls;
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

export { getProducts, getProduct, getPagesCount, getProductUlrs };
