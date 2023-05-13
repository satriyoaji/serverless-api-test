import { DeepPartial, FindOperator, ILike } from 'typeorm';
import { Transaction } from '../entities/transaction.entity';
import { AppDataSource } from '../utils/data-source';
import {Product} from "../entities/product.entity";
import {User} from "../entities/user.entity";

const transactionRepository = AppDataSource.getRepository(Transaction);
const productRepository =  AppDataSource.getRepository(Product);
const customerRepository =  AppDataSource.getRepository(User);

export const findTransactions = async () => {
    return await transactionRepository.createQueryBuilder("transactions").getMany();
}

export const getById = async (transactionId: string) => {
    return transactionRepository.findOneBy({ id: transactionId });
}

export const create = async (input: DeepPartial<Transaction>) => {
    const product = await productRepository.findOneBy({id: input.product_id});
    if (!product) {
        throw new Error(`Product with id ${input.product_id} not found`);
    }
    input.product = {
        ...product
    }
    const customer = await customerRepository.findOneBy({id: input.customer_id});
    if (!customer) {
        throw new Error(`Transaction with id ${input.customer_id} not found`);
    }
    input.customer = {
        ...customer
    }

    await productRepository.update({id: input.product_id}, {stock: product.stock - 1});
    return transactionRepository.save(transactionRepository.create(input));
    // return transactionRepository.insert(transactionRepository.create(transaction));
}
