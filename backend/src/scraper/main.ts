import { getPagesCount, getProducts } from './crawlers/pages/ExperienceVinylPage';

getPagesCount();
getProducts('https://experiencevinyl.com/collections/vinyl-record-lps?page=1');
