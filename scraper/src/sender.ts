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
      const letters = genre.split('');
      return letters
        .map((val, i) => {
          if (i !== 0) {
            return val.toLowerCase();
          }
          return val.toUpperCase();
        })
        .toString();
    });
  }

  putRecord(recordData);
};

export default send;
