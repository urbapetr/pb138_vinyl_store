/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-await-in-loop */
// import { getPagesCount, getProducts } from './crawlers/pages/ExperienceVinylPage';
import fs from 'fs';
import * as ExperienceVinyl from './crawlers/pages/ExperienceVinylPage';
import * as MusicStack from './crawlers/pages/MusicStack';
import * as VinylPursuit from './crawlers/pages/VinylPursuit';
import { delay } from './crawlers/generic';

// @ts-ignore
export async function vinylpursuit() {
  const pageCount: number | null = await VinylPursuit.getPagesCount();
  console.log(pageCount);
  // const tmp = await MusicStack.getProductUlrs(`https://vinylpursuit.com/collections/all-vinyl?page=${progressItems}`);
  let allUrls: string[] = [];
  if (!pageCount) {
    throw new Error('No pageCount!');
  }
  // await delay(5000);
  // TODO pages count
  for (let i = 0; i < pageCount; i += 1) {
    const url = await VinylPursuit.getProductUlrs(
      `https://vinylpursuit.com/collections/all-vinyl?page=${i}`
    );
    allUrls = [...allUrls, ...url];
  }

  console.log(`Loaded ${allUrls.length} urls!`);

  for (let i = 1; i < allUrls.length; i += 1) {
    const url = allUrls[i];
    if (url) {
      console.log(`Doing product ${i} ${url}`);
      const data = await VinylPursuit.getProduct(
        `https://vinylpursuit.com${url}`
      );
      console.log(data);
      await delay(1000);
    }
  }
}
// @ts-ignore
async function main() {
  // console.log(await getPagesCount());
  // getProducts('https://experiencevinyl.com/collections/vinyl-record-lps?page=2');
  //
  //
  let allUrls: string[] = [];
  //let currentPage = 0;
  let isEnd = false;
  let progressItems = 0;
  while (!isEnd) {
    //console.log(`On page $currentPage`);

    const tmp = await MusicStack.getProductUlrs(
      `https://www.musicstack.com/seller.cgi?seller=64033&search_type=&genre=&media=&find=&next=${progressItems}`
    );

    console.log(`loaded ${tmp.length} items from ${progressItems}`);
    allUrls = [...allUrls, ...tmp];
    progressItems += 500;
    //currentPage += 1;
    if (tmp.length !== 500) {
      isEnd = true;
    }
  }

  console.log(allUrls);
  console.log(`Total loaded ${allUrls.length} urls.`);
  await delay(5000);
  for (let i = 0; i < allUrls.length; i += 1) {
    const url = allUrls[i];
    if (url) {
      const path = Buffer.from(url).toString('base64').replaceAll('/', '!');
      console.log(`doing BASE: ${path}.html`);
      await MusicStack.getProduct(url);
      console.log(`waiting for 1 sec (Detail no. ${i})`);
      await delay(1000);
    }
  }

  // allUrls.forEach((url) => {
  //   MusicStack.getProduct(url);
  //   await delay(1000);
  // })

  // console.log(await MusicStack.getProductUlrs("https://www.musicstack.com/seller.cgi?seller=64033&search_type=&genre=&media=&find=&next=0"));
}

// main();
// vinylpursuit();
// @ts-ignore
export async function vinylpursuit2() {
  const start = 50;
  const end = 100;

  const results = await VinylPursuit.getProducts(start, end);
  console.log(results);
  console.log(results.length);

  fs.writeFileSync(`vinyldata${start}-${end}.json`, JSON.stringify(results));

  console.log('JSON data saved to file.');
}

// @ts-ignore
export async function experiencevinyl() {
  const start = 1;
  const end = 50;

  const results = await ExperienceVinyl.getProducts(start, end);
  console.log(results);
  console.log(results.length);

  fs.writeFileSync(
    `experiencevinyl${start}-${end}.json`,
    JSON.stringify(results)
  );

  console.log('JSON data saved to file.');
}

// @ts-ignore
export async function musicstack() {
  const start = 1;
  const end = 2;

  const results = await MusicStack.getProducts(start, end);
  console.log(results);
  console.log(results.length);

  fs.writeFileSync(
    `experiencevinyl${start}-${end}.json`,
    JSON.stringify(results)
  );

  console.log('JSON data saved to file.');
}

experiencevinyl();
// vinylpursuit2();
// musicstack();
