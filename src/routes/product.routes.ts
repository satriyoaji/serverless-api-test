import express from 'express';
import {
    getByIdHandler,
    deleteHandler,
    createHandler,
    updateHandler,
    getPagedHandler,
    getProductListHandler
} from '../controllers/product.controller';
import { deserializeUser } from '../middleware/deserializeUser';
import { requireUser } from '../middleware/requireUser';
import { validate } from '../middleware/validate';
import { productSchema, pagedSchema } from '../schemas/product.schema';

const router = express.Router();

router.use(deserializeUser, requireUser);

router.get('/', getProductListHandler);
router.get('/paged/', validate(pagedSchema), getPagedHandler);
router.post('/', validate(productSchema), createHandler);
router.get('/:product_id', getByIdHandler);
router.delete('/:product_id', deleteHandler);
router.put('/:product_id', validate(productSchema), updateHandler);

export default router;
