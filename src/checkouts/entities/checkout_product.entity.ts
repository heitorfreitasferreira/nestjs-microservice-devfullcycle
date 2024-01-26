import { Column, Entity, OneToMany, PrimaryGeneratedColumn, getRepository } from "typeorm"
import { Checkout } from "./checkout.entity"
import { CheckoutItem } from "./checkout_item.entity"
import { fa, tr } from "@faker-js/faker"

@Entity()
export class CheckoutProduct {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  description: string

  @Column()
  image_url: string

  @Column(/*TODO: Remover quando houver um microserviço que realmente crie os produtos no banco dele{ unique: true }*/)
  product_id: number // ID do produto no outro microserviço

  @OneToMany(() => CheckoutItem, item => item.product, { cascade: ['insert'] })
  items: CheckoutItem[]

  constructor(partial: Partial<CheckoutProduct>) {
    Object.assign(this, partial)
  }

}