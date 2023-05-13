import {NextFunction, Request, Response } from 'express';
import {getById, create, deleteById, update, getPaged, findProducts} from '../services/product.service';
import { productInputSchema, pagedInputSchema, SortingColumn } from '../schemas/product.schema';
import AppError from '../utils/appError';
import { validate } from 'uuid';

export const getProductListHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const product = await findProducts();

    if (product.length === 0) {
        return next(new AppError(404, 'No products found'));
    }

    try {
        res.status(200).status(200).json({
            status: 'success',
            data: {
                product
            },
        });
    } catch (err: any) {
        next(err);
    }
};

export const getByIdHandler = async (
    req: Request<{
        product_id: string;
    }>,
    res: Response,
    next: NextFunction
  ) => {
    try {
        const product_id = req.params.product_id;

        if(!validate(product_id)) {
            return next(new AppError(400, `Product id ${product_id} is not valid`));
        }
    
        const product_detail = await getById(product_id);

        if (!product_detail) {
            return next(new AppError(404, `Product with id ${product_id} not found`));
        }
    
        res.status(200).json({
            status: 'success',
            data: {
            product_detail,
            },
        });
    } catch (err: any) {
        next(err);
    }
};

export const getPagedHandler = async (
    req: Request<{}, {}, {}, pagedInputSchema>,
    res: Response,
    next: NextFunction
    ) => {
        try {
            const page = req.query.page || "1";
            const size = req.query.size || "10";
            const sorting_column = req.query.sorting_column || SortingColumn.NAME;
            const sorting_order = req.query.sorting_order || 'asc';
            const keyword = req.query.keyword || '';
            const searching_column = req.query.searching_column || [];

            if(keyword.length > 0 && searching_column.length == 0){
                return next(new AppError(400, `Searching column shouldn't is empty`));
            }

            if(keyword.length == 0 && searching_column.length > 0){
                return next(new AppError(400, `Keyword shouldn't is empty`));
            }
            
            const products = await getPaged(
                parseInt(page),
                sorting_column,
                sorting_order,
                keyword,
                searching_column,
                parseInt(size)
            );

            res.status(200).json({
                status: 'success',
                data: {
                    products: products.data,
                },
                total_items: products.totalItems,
                pagination: products.pagination
            });
        } catch (err: any) {
            next(err);
        }
    };
            

export const deleteHandler = async (
    req: Request<{
        product_id: string;
    }>,
    res: Response,
    next: NextFunction
    ) => {
        try {
            const product_id = req.params.product_id;
            
            if(!validate(product_id)) {
                return next(new AppError(400, `Product id ${product_id} is not valid`));
            }

            const deleted_product = await deleteById(product_id);
            if (!deleted_product.affected) {
                return next(new AppError(404, `Product with id ${product_id} not found`));
            }
            res.status(200).json({
                status: 'success',
                data: {
                    deleted_product,
                },
            });
        } catch (err: any) {
            next(err);
        }
    };

export const createHandler = async (
    req: Request<{}, {}, productInputSchema>,
    res: Response,
    next: NextFunction
    ) => {
        try {
            const { 
                code,
                name,
                image_url,
                description,
                stock,
            } = req.body;
            // const modified_by: string = res.locals.user.id
            const created_product = await create({
                code,
                name,
                image_url,
                description,
                stock
            });
            res.status(201).json({
                status: 'success',
                data: {
                    created_product,
                },
            });
        } catch (err: any) {
            next(err);
        }
    };


export const updateHandler = async (
    req: Request<{
        product_id: string;
    }, {}, productInputSchema, {}>,
    res: Response,
    next: NextFunction
    ) => {
        try {
            const { 
                code,
                name,
                image_url,
                description,
                stock
            } = req.body;
            // const modified_by: string = res.locals.user.id
            const id = req.params.product_id;
            const updated_at = new Date();
            const updated_product = await update({
                id,
                code,
                name,
                image_url,
                description,
                stock,
                updated_at
            });
            if (!updated_product.affected) {
                return next(new AppError(404, `Product with id ${id} not found`));
            }
            res.status(200).json({
                status: 'success',
                data: {
                    updated_product,
                },
            });
        } catch (err: any) {
            next(err);
        }
    };
