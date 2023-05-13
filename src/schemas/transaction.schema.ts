import { object, string, TypeOf, z, number } from 'zod';


export const transactionProductSchema = object({
  body: object({
    customer_id: string({
      required_error: 'Customer ID is required',
    }),
    product_id: string({
      required_error: 'Product ID is required',
    }),
  })
})

export const pagedSchema = object({
  query: object({
    page: z.optional(z.string()),
    size: z.optional(z.string()),
    sorting_column: z.optional(z.enum(['customer_id', 'product_id'])),
    sorting_order: z.optional(z.enum(['ASC', 'DESC'])),
    keyword: z.optional(z.string()),
  })
});




export type TransactionInputSchema = TypeOf<typeof transactionProductSchema>['body'];
export type PagedInputSchema = TypeOf<typeof pagedSchema>['query'];
