import type { RecordSend } from './models/recordTypes';
import type { Vinyl } from './models/vinylTypes';
import { putRecord } from './services/recordApi';

export const send = async (vinyl: Vinyl, id: string) => {
  const recordData: RecordSend = {
    ...vinyl,
    image: vinyl.image ? vinyl.image : '',
    storeId: id,
  };

  // Avoid false positives
  if (
    vinyl.artist === 'N/A' ||
    vinyl.title === '' ||
    vinyl.image === '' ||
    Number.isNaN(vinyl.price)
  ) {
    return;
  }

  // Normalize genres
  if (recordData.genres && recordData.genres.length > 0) {
    recordData.genres = recordData.genres.map((genre) => {
      if (genre.length === 0) {
        return genre;
      }
      const firstLetter = genre.charAt(0).toUpperCase();
      const restOfLetters = genre.slice(1).toLowerCase();
      return firstLetter + restOfLetters;
    });
  }

  putRecord(recordData);
};

export default send;
