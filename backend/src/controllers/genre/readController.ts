import type { Request, Response } from 'express';
import type { ApiResponse } from '../types';
import genre from '../../repositories/genre';
import { pageSchema } from '../../models/pageModel';

export const readGenres = async (req: Request, res: Response) => {
  try {
    const data = await pageSchema.validate(req.query);

    if (!data.page) {
      data.page = 1;
    }

    const genresWithRecordImage = await genre.readPage(data.page);

    if (!genresWithRecordImage.isOk) {
      return res.status(500).send({ error: 'Something went wrong' });
    }

    const response: ApiResponse<{}> = {
      status: 'success',
      data: genresWithRecordImage.value,
      message: `Listed ${genresWithRecordImage.value.length} genres.`,
    };

    return res.status(200).send(response);
  } catch (e) {
    return res.status(500).send({ error: 'Something went wrong' });
  }
};

export default readGenres;
