import type { Request, Response } from 'express';
import { ValidationError } from 'yup';
import Record from '../../repositories/record';
import { newRecordScheme } from '../../models/recordModel';

export const createRecord = async (req: Request, res: Response) => {
  try {
    const data = await newRecordScheme.validate(req.body);

    // @ts-ignore
    const result = await Record.create(data, data.storeId);

    if (result.isErr) {
      res.status(500).send({ error: 'Something went wrong' });
      return;
    }

    res.status(201).send({ data: result.value });
  } catch (e) {
    if (e instanceof ValidationError) {
      res.status(400).send({ error: e.message });
    } else {
      res.status(500).send({ error: 'Something went wrong' });
    }
  }
};

export default createRecord;
