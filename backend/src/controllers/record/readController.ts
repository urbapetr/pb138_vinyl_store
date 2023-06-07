import type { Request, Response } from 'express';
import { ValidationError } from 'yup';
import Record from '../../repositories/record';
import type { ApiResponse } from '../types';
import { idScheme } from '../../models/recordModel';
import { NonexistentRecordError } from '../../repositories/errors';
import { recordSchema } from '../../models/recordsModel';

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
    if (e instanceof ValidationError) {
      res.status(400).send({ error: e.message });
    } else if (e instanceof NonexistentRecordError) {
      res.status(404).send({ error: e.message });
    } else {
      res.status(500).send({ error: 'Something went wrong' });
    }
  }
};

export const readRecords = async (req: Request, res: Response) => {
  try {
    const data = await recordSchema.validate(req.query);

    if (!data.page) {
      data.page = 1;
    }

    // get 10 records from database according to page, including imageUrl of the first record in each genre
    const genresWithRecordImage = await Record.readPage(data.page, data);

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
    if (e instanceof ValidationError) {
      res.status(400).send({ error: e.message });
    } else {
      res.status(500).send({ error: 'Something went wrong' });
    }
  }
};
