import { Router } from 'express';
import genre from '../controllers/genre';
import record from '../controllers/record';

const indexRouter = Router();

indexRouter.route('/genre').get(genre.readGenres);

indexRouter.route('/record').get(record.readRecords);

indexRouter.route('/record/:id').get(record.readRecord);

export default indexRouter;
