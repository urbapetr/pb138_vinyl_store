import type { Request, Response } from 'express';
import Record from '../../repositories/record';
import type { ApiResponse } from '../types';
import { idScheme } from '../../models/recordModel';
import { NonexistentRecordError } from '../../repositories/errors';

export const readRecord = async (req: Request, res: Response) => {
  try {
    const data = await idScheme.validate(req.params);
    const result = await Record.readById(data.id);

    if (result.isErr) {
      res.status(500).send({ error: 'Something went wrong' });
      return;
    }

    res.status(200).send({ data: result.value });
  } catch (e) {
    if (e instanceof NonexistentRecordError) {
      res.status(404).send({ error: e.message });
    } else {
      res.status(500).send({ error: 'Something went wrong' });
    }
  }
};

export const readRecords = async (req: Request, res: Response) => {
  try {
    // set default page to 1
    let page = 1;

    // if page is specified in query, use it
    if (typeof req.query.page === 'string') {
      page = parseInt(req.query.page, 10);
    }

    // if page is not a number or is less than 1, set it to 1
    if (Number.isNaN(page) || page < 1) {
      res.status(400).send({ error: 'Page must be more than 0.' });
      return;
    }

    // get 10 records from database according to page, including imageUrl of the first record in each genre
    const genresWithRecordImage = await Record.readPage(page);

    if (!genresWithRecordImage.isOk) {
      res.status(500).send({ error: 'Something went wrong' });
      return;
    }

    const response: ApiResponse<{}> = {
      status: 'success',
      data: genresWithRecordImage.value,
      message: `Listed ${genresWithRecordImage.value.length} records.`,
    };

    res.status(200).send(response);
  } catch (e) {
    res.status(500).send({ error: 'Something went wrong' });
  }
};