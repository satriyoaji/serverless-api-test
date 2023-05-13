import { DeepPartial, FindOperator, ILike } from 'typeorm';
import { Product } from '../entities/product.entity';
import { AppDataSource } from '../utils/data-source';
import { SortingColumn, SearchingColumn } from '../schemas/product.schema';

const productRepository = AppDataSource.getRepository(Product);

export const findProducts = async () => {
    return await productRepository.createQueryBuilder("products").getMany();
}

export const getById = async (productId: string) => {
    return productRepository.findOneBy({ id: productId });
}

export const deleteById = async (productId: string) => {
    return productRepository.delete({
        id: productId
    })
}

export const create = async (product: DeepPartial<Product>) => {
    return productRepository.insert(productRepository.create(product));
}

export const update = async (product: DeepPartial<Product>) => {
    return productRepository.update({id: product.id}, productRepository.create(product));
}

export const getPaged = async (
    page: number,
    sorting_column: SortingColumn,
    sorting_order: 'asc' | 'desc',
    keyword: string,
    searching_column: SearchingColumn[],
    pageSize: number = 10
    ) => {
    let normalized_sorting_column: string = `products.${sorting_column}`;
    const normalized_sorting_order = sorting_order === 'asc' ? 'ASC' : 'DESC';
    const search_clause: string[] = [];

    for (const column of searching_column) {
        let normalized_searching_column: string = `products.${column}`;
        search_clause.push(`${normalized_searching_column} ILIKE :keyword`);
    }

    const products = productRepository
        .createQueryBuilder('products')
        // .innerJoinAndSelect( 'products.category_id', categories_alias, `${categories_alias}.id = products.category_id`)
        .orderBy(`${normalized_sorting_column}`, normalized_sorting_order)
        .where(search_clause.join(" OR "), { keyword: `%${keyword}%` })

    const totalItems = await products.getCount();
    const totalPage = Math.ceil(totalItems / pageSize);
    const paginatedProducts = await products.skip((page - 1) * pageSize).take(pageSize).getMany();

    return {
        data: paginatedProducts,
        totalItems,
        pagination: {
            current_page: page,
            total_page: totalPage,
        }
    }
}
