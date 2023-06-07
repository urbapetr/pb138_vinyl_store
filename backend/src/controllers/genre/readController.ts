import type { Request, Response } from 'express';
import type { ApiResponse } from '../types';
import genre from '../../repositories/genre';

export const readGenres = async (_req: Request, res: Response) => {
  try {
    const genresWithRecordImage = await genre.readAll();

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
