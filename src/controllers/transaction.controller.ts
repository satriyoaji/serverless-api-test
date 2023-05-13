import {NextFunction, Request, Response } from 'express';
import { getById, create, } from '../services/transaction.service';
import { TransactionInputSchema, PagedInputSchema } from '../schemas/transaction.schema';
import AppError from '../utils/appError';
import { validate } from 'uuid';

export const enrollHandler = async (
	req: Request < {}, {}, TransactionInputSchema > ,
	res: Response,
	next: NextFunction
) => {
	try {
		const {
			product_id,
			customer_id
		} = req.body;

		const new_transaction = await create({
			product_id,
			customer_id
		});

		res.status(201).json({
			status: 'success',
			data: {
				new_transaction,
			},
		});
	} catch (err: any) {
		next(err);
	}
};
