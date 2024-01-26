import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Checkout } from "./checkout.entity"
import { CheckoutProduct } from "./checkout_product.entity"

@Entity()
export class CheckoutItem {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  quantity: number

  @Column(/*{ type: 'decimal', precision: 2, scale: 2 }*/)
  price: number

  @ManyToOne(() => Checkout)
  checkout: Checkout

  @ManyToOne(() => CheckoutProduct, { eager: true, cascade: ['insert'], })
  product: CheckoutProduct

  constructor(partial: Partial<CheckoutItem>) {
    Object.assign(this, partial)
  }
}
