/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-await-in-loop */
// import { getPagesCount, getProducts } from './crawlers/pages/ExperienceVinylPage';
import fs from 'fs';
import * as ExperienceVinyl from './crawlers/pages/ExperienceVinylPage';
import * as MusicStack from './crawlers/pages/MusicStack';
import * as VinylPursuit from './crawlers/pages/VinylPursuit';

const SAVE_JSON = false;

// @ts-ignore
export async function vinylpursuit(start: number, end: number) {
  const results = await VinylPursuit.getProducts(start, end);
  console.log(results);
  console.log(results.length);

  if (SAVE_JSON) {
    fs.writeFileSync(`vinyldata${start}-${end}.json`, JSON.stringify(results));
    console.log('JSON data saved to file.');
  }
}

// @ts-ignore
export async function experiencevinyl(start: number, end: number) {
  const results = await ExperienceVinyl.getProducts(start, end);
  console.log(results);
  console.log(results.length);

  if (SAVE_JSON) {
    fs.writeFileSync(
      `experiencevinyl${start}-${end}.json`,
      JSON.stringify(results)
    );

    console.log('JSON data saved to file.');
  }
}

// @ts-ignore
export async function musicstack(start: number, end: number) {
  const results = await MusicStack.getProducts(start, end);
  console.log(results);
  console.log(results.length);

  if (SAVE_JSON) {
    fs.writeFileSync(`musicstack${start}-${end}.json`, JSON.stringify(results));
    console.log('JSON data saved to file.');
  }
}

// experiencevinyl(1,400);
vinylpursuit(1, 200);
// musicstack(1,10);
