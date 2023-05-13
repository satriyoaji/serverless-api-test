import { object, string, TypeOf, z } from 'zod';

export enum SortingColumn {
  CODE = 'code',
  NAME = 'name',
}

export enum SearchingColumn {
  CODE = 'code',
  NAME = 'name',
}

export const productSchema = object({
  body: object({
    code: string({
      required_error: 'Code is required',
    }),

    name: string({
      required_error: 'Name is required',
    }).max(100, 'Name must be less than 100 characters').min(3, 'Name must be at least 3 characters'),

    image_url: z.optional(z.array(z.string())),
    description: z.optional(z.string()),
    stock: z.number(),
  })
});

export const pagedSchema = object({
  query: object({
    page: z.optional(z.string()),
    size: z.optional(z.string()),
    sorting_column: z.optional(z.nativeEnum(SortingColumn, {
      invalid_type_error: 'Sorting column is one of the following: code, name',
    })),
    sorting_order: z.optional(z.enum(['asc', 'desc'])),
    keyword: z.optional(z.string()),
    searching_column: z.optional(z.array(z.nativeEnum(SearchingColumn, {
      invalid_type_error: 'Searching column is one of the following: code, name',
    }))),
    category_id: z.optional(z.string()),
  })
});


export type productInputSchema = TypeOf<typeof productSchema>['body'];
export type pagedInputSchema = TypeOf<typeof pagedSchema>['query'];