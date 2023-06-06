import { existsSync, mkdirSync } from 'fs';
import { readFile, writeFile } from 'fs/promises';
import { resolve } from 'path';
import axios, { AxiosError } from 'axios';

const fetchPage = (url: string): Promise<string | undefined> => {
  const HTMLData = axios
    .get(url)
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

export { fetchPage, fetchFromWebOrCache };
