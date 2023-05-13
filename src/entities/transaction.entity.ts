import { AfterLoad, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Model from "./model.entity";
import { Product } from "./product.entity";
import { User } from "./user.entity";

@Entity('transactions')
export class Transaction extends Model {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne (() => Product, product => product.id)
  @JoinColumn({ name: 'product_id' })
  product!: Product;

  @ManyToOne (() => User, user => user.id)
  @JoinColumn({ name: 'customer_id' })
  customer!: User;
}