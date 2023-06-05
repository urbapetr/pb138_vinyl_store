import { existsSync, mkdirSync } from 'fs';
import { readFile, writeFile } from 'fs/promises';
import { resolve } from 'path';
import axios, { AxiosError } from 'axios';

const config = {
  headers: {
    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/113.0',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
    'Accept-Language': 'en',
    'Accept-Encoding': 'gzip, deflate, br',
    'Referer': 'https://www.musicstack.com/seller.cgi',
    'DNT': '1',
    'Sec-GPC': '1',
    'Connection': 'keep-alive',
    'Cookie': '__uzma=b8bbd219-311a-453c-9f5b-59e124d76430; __uzmb=1685891286; __uzmc=388326778812; __uzmd=1685894728; sid=16858912536232875; currency=USD; zone=; payment_type=PayPal; per_page=500',
    'Upgrade-Insecure-Requests': '1',
    'Sec-Fetch-Dest': 'document',
    'Sec-Fetch-Mode': 'navigate',
    'Sec-Fetch-Site': 'same-origin',
    'Pragma': 'no-cache',
    'Cache-Control': 'no-cache',
    'TE': 'trailers'
  },
};
// const config = {
//     headers: {
//       'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/113.0',
//     },
//   };



const fetchPage = (url: string): Promise<string | undefined> => {
  const HTMLData = axios
    .get(url, config)
    .then((res) => res.data)
    .catch((error: AxiosError) => {
      console.error(`There was an error with ${error.config?.url}.`);
      console.error(error.toJSON());
    });

  return HTMLData;
};

const fetchFromWebOrCache = async (url: string, ignoreCache = false) => {
  // If the cache folder doesn't exist, create it
  if (!existsSync(resolve(__dirname, '.cache'))) {
    mkdirSync(resolve(__dirname, '.cache'));
  }
  console.log(`Getting data for ${url}...`);
  const path = Buffer.from(url).toString('base64').replaceAll('/', '!');
  if (
    !ignoreCache
    && existsSync(
      resolve(__dirname, `.cache/${path}.html`),
    )
  ) {
    console.log(`I read ${url} from cache`);
    const HTMLData = await readFile(
      resolve(__dirname, `.cache/${path}.html`),
      { encoding: 'utf8' },
    );
    return HTMLData;
  }

  console.log(`I fetched ${url} fresh`);
  const HTMLData = await fetchPage(url);
  if (!ignoreCache && HTMLData) {
    writeFile(
      resolve(
        __dirname,
        `.cache/${path}.html`,
      ),
      HTMLData,
      { encoding: 'utf8' },
    );
  }
  return HTMLData;
};

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export { fetchPage, fetchFromWebOrCache, delay };
