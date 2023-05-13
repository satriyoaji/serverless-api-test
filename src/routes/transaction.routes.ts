import express from 'express';
import {
    enrollHandler
} from '../controllers/transaction.controller';
import { deserializeUser } from '../middleware/deserializeUser';
import { requireUser } from '../middleware/requireUser';
import { validate } from '../middleware/validate';
import { transactionProductSchema, pagedSchema } from '../schemas/transaction.schema';

const router = express.Router();

router.use(deserializeUser, requireUser);

// router.get('/', getProductListHandler);
// router.get('/:trasanction_id', getByIdHandler);
router.post('/enroll', validate(transactionProductSchema), enrollHandler);

export default router;
