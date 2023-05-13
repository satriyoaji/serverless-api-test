import { NextFunction, Request, Response } from 'express';
import {
    findUserRoleExclude,
    deleteUserById,
    restoreUserById,
    updateUserById,
    findUserById, createUser
} from '../services/user.service';
import { CreateUserInput } from '../schemas/user.schema';
import AppError from '../utils/appError';
import { validate } from 'uuid';

export const getMeHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = res.locals.user;

        res.status(200).status(200).json({
            status: 'success',
            data: {
                user,
            },
        });
    } catch (err: any) {
        next(err);
    }
};

export const createUserHandler = async (
    req: Request<{}, {}, CreateUserInput>,
    res: Response,
    next: NextFunction
) => {
    try {
        const { name, password, email } = req.body;

        const user = await createUser({
            name,
            email: email.toLowerCase(),
            password,
        });

        res.status(201).json({
            status: 'success',
            data: {
                user,
            },
        });
    } catch (err: any) {
        if (err.code === '23505') {
            return res.status(409).json({
                status: 'fail',
                message: 'User with that email already exist',
            });
        }
        next(err);
    }
};

export const getUserListHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const user = await findUserRoleExclude('Admin');

    console.log("user: ", user)
    if (user.length === 0) {
        return next(new AppError(404, 'No users found'));
    }

    try {
        res.status(200).status(200).json({
            status: 'success',
            data: {
                user
            },
        });
    } catch (err: any) {
        next(err);
    }
};

export const getUserByIdHandler = async (
    req: Request<{
        user_id: string;
    }>,
    res: Response,
    next: NextFunction
) => {
    const { user_id } = req.params;

    if (!validate(user_id)) {
        return next(new AppError(400, `User id ${user_id} is not valid`));
    }

    const user = await findUserById(user_id);
    if (!user) {
        return next(new AppError(404, `User with id ${user_id} not found`));
    }

    try {
        res.status(200).status(200).json({
            status: 'success',
            data: {
                user
            },
        });
    } catch (err: any) {
        next(err);
    }
};

export const deleteUserByIdHandler = async (
    req: Request<{
        user_id: string;
    }>,
    res: Response,
    next: NextFunction
) => {
    const { user_id } = req.params;

    if (!validate(user_id)) {
        return next(new AppError(400, `User id ${user_id} is not valid`));
    }

    const user = await deleteUserById(user_id);
    if (!user.affected) {
        return next(new AppError(404, `User with id ${user_id} not found`));
    }

    try {
        res.status(200).status(200).json({
            status: 'success',
            data: {
                user
            },
        });
    } catch (err: any) {
        next(err);
    }
};

export const restoreUserByIdHandler = async (
    req: Request<{
        user_id: string;
    }>,
    res: Response,
    next: NextFunction
) => {
    const { user_id } = req.params;

    if (!validate(user_id)) {
        return next(new AppError(400, `User id ${user_id} is not valid`));
    }

    const user = await restoreUserById(user_id);
    if (!user.affected) {
        return next(new AppError(404, `User with id ${user_id} not found`));
    }

    try {
        res.status(200).status(200).json({
            status: 'success',
            data: {
                user
            },
        });
    } catch (err: any) {
        next(err);
    }
};

export const updateUserByIdHandler = async (
    req: Request<{
        user_id: string;
    }, {}, CreateUserInput, {}>,
    res: Response,
    next: NextFunction
) => {
    try {
        const { user_id } = req.params;

        if (!validate(user_id)) {
            return next(new AppError(400, `User id ${user_id} is not valid`));
        }

        const { name, password, email } = req.body;

        const user = await updateUserById({
            id: user_id,
            name,
            email: email.toLowerCase(),
            password,
        });

        if (!user.affected) {
            return next(new AppError(404, `User with id ${user_id} not found`));
        }

        res.status(200).json({
            status: 'success',
            data: {
                user,
            },
        });
    } catch (err: any) {
        if (err.code === '23505') {
            return res.status(409).json({
                status: 'fail',
                message: 'User with that email already exist',
            });
        }
        next(err);
    }
};