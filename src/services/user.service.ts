import config from 'config';
import { DeepPartial } from 'typeorm';
import { User } from '../entities/user.entity';
import redisClient from '../utils/connectRedis';
import { AppDataSource } from '../utils/data-source';
import { signJwt } from '../utils/jwt';

const userRepository = AppDataSource.getRepository(User);

export const createUser = async (input: DeepPartial<User>) => {
    return userRepository.save(userRepository.create(input));
};

export const findUserByEmail = async ({ email }: { email: string }) => {
    return await userRepository.findOneBy({ email });
};

export const findUserById = async (userId: string) => {
    return await userRepository.findOneBy({ id: userId });
};

export const findUser = async (query: Object) => {
    return await userRepository.findOneBy(query);
};

export const findUserRoleExclude = async (role: string) => {
    return await userRepository.createQueryBuilder("user").where(" user.deleted_at IS NULL").getMany();
}

export const deleteUserById = async (userId: string) => {
    return await userRepository.createQueryBuilder().softDelete().where("id = :id", { id: userId }).execute();
}

export const restoreUserById = async (userId: string) => {
    return await userRepository.createQueryBuilder().restore().where("id = :id", { id: userId }).execute();
}

export const updateUserById = async (input: DeepPartial<User>) => {
    return await userRepository.update({ id: input.id }, userRepository.create(input));
}

export const signTokens = async (user: User) => {
    // 1. Create Session
    redisClient.set(user.id, JSON.stringify(user), {
        EX: config.get<number>('redisCacheExpiresIn') * 60,
    });

    // 2. Create Access and Refresh tokens
    const access_token = signJwt({ sub: user.id }, 'accessTokenPrivateKey', {
        expiresIn: `${config.get<number>('accessTokenExpiresIn')}h`,
    });

    const refresh_token = signJwt({ sub: user.id }, 'refreshTokenPrivateKey', {
        expiresIn: `${config.get<number>('refreshTokenExpiresIn')}h`,
    });

    return { access_token, refresh_token };
};
