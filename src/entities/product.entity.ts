import {Entity, Column, Index, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany} from 'typeorm';
import Model from './model.entity';
import { User } from './user.entity';

@Entity('products')
export class Product extends Model {
    @PrimaryGeneratedColumn('uuid')
    id!: string;
    
    @Index('product_code_index')
    @Column({
        unique: true,
    })
    code!: string;
    
    @Column()
    name!: string;
    
    @Column({
        default: [],
        array: true,
        type: 'text'
    })
    image_url: string[];
    
    @Column({
        nullable: true,
    })
    description: string;

    @Column()
    stock!: number;

}
