import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { CheckoutItem } from "./checkout_item.entity"
import { CheckoutProduct } from "./checkout_product.entity"

export enum CheckoutStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  REJECTED = 'REJECTED'
}

export type CreateCheckoutInput = {
  items: {
    quantity: number,
    price: number,
    product: {
      name: string,
      description: string,
      price: number
      image_url: string,
      product_id: number
    }
  }[]
}

@Entity()
export class Checkout {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  total: number

  @Column()
  status: CheckoutStatus = CheckoutStatus.PENDING

  @CreateDateColumn()
  createdAt: Date

  @OneToMany(() => CheckoutItem, item => item.checkout, { cascade: ['insert', 'remove'], eager: true })
  items: CheckoutItem[]

  constructor(partial: Partial<Checkout>) {
    Object.assign(this, partial)
  }

  pay() {
    if (this.status === CheckoutStatus.PAID) throw new Error('Checkout already paid')
    if (this.status === CheckoutStatus.REJECTED) throw new Error('Checkout already rejected')
    this.status = CheckoutStatus.PAID
  }
  cancel() {
    if (this.status === CheckoutStatus.PAID) throw new Error('Checkout already paid')
    if (this.status === CheckoutStatus.REJECTED) throw new Error('Checkout already rejected')
    this.status = CheckoutStatus.REJECTED
  }
}
