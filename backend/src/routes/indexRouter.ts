import { Router } from 'express';
import genre from '../controllers/genre';

const indexRouter = Router();

indexRouter.route('/genre').get(genre.readGenres);

// indexRouter.route('/record')
// .get()
// .post()
// .patch()
// .delete()

export default indexRouter;
