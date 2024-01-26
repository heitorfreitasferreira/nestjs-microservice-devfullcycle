import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { log } from 'console';
import { Repository } from 'typeorm';
import { CheckoutItemDto, CreateCheckoutDto } from './dto/create-checkout.dto';
import { UpdateCheckoutDto } from './dto/update-checkout.dto';
import { Checkout, CreateCheckoutInput } from './entities/checkout.entity';
import { CheckoutItem } from './entities/checkout_item.entity';
import { CheckoutProduct } from './entities/checkout_product.entity';

type Product = {
  id: number;
  name: string;
  description: string;
  image_url: string;
  product_id: number;
  price: number;
};

let idCounter = 1;

const PRODUCT_LIST: Product[] = Array.from({ length: 100 }, (i: number): Product => ({
  id: idCounter++,
  name: faker.commerce.productName(),
  description: faker.commerce.productDescription(),
  image_url: faker.image.url(),
  product_id: faker.number.int(100),
  price: Number(faker.commerce.price()),
}));

@Injectable()
export class CheckoutsService {
  constructor(
    @InjectRepository(Checkout) private checkoutRepo: Repository<Checkout>,
    @InjectRepository(CheckoutProduct) private checkoutProductRepository: Repository<CheckoutProduct>
  ) { }

  async create(createCheckoutDto: CreateCheckoutDto) {
    const productIds: number[] = createCheckoutDto.items
      .map(item => item.product_id);
    const products: Product[] = PRODUCT_LIST
      .filter(product => productIds.includes(product.id));


    const checkout = await this.processCreation({
      items: createCheckoutDto.items.map((item: CheckoutItemDto) => {
        const product = products.find(product => product.id === item.product_id);
        return {
          quantity: item.quantity,
          price: product.price,
          product: {
            name: product.name,
            description: product.description,
            image_url: product.image_url,
            product_id: product.product_id,
            price: product.price
          }
        }
      })
    });
    await this.checkoutRepo.save(checkout);
    return checkout;
  }

  async findAll(): Promise<Checkout[]> {
    return await this.checkoutRepo.find();
  }

  findOne(id: number): Promise<Checkout> {
    return this.checkoutRepo.findOneByOrFail({ id });
  }

  update(id: number, updateCheckoutDto: UpdateCheckoutDto) {
    new Error('Method not implemented yet.');
  }

  remove(id: number) {
    this.checkoutRepo.delete({ id });
  }

  async pay(id: number) {
    const checkout = await this.checkoutRepo.findOneByOrFail({ id });
    checkout.pay();
    return await this.checkoutRepo.save(checkout);
  }

  async fail(id: number) {
    const checkout = await this.checkoutRepo.findOneByOrFail({ id });
    checkout.cancel();
    return await this.checkoutRepo.save(checkout);
  }

  async findOneProduct(id: number) {
    return await this.checkoutProductRepository.findBy({ id });
  }

  private async processCreation(input: CreateCheckoutInput): Promise<Checkout> {
    const items = await Promise.all(input.items.map(async item => {
      const existingProduct = await this.checkoutProductRepository.findOneBy({ product_id: item.product.product_id });

      const product = existingProduct ?? new CheckoutProduct({
        name: item.product.name,
        description: item.product.description,
        image_url: item.product.image_url,
        product_id: item.product.product_id
      });


      const checkoutItem = new CheckoutItem({
        quantity: item.quantity,
        price: item.price,
        product
      });

      return checkoutItem;
    }));

    const total = items.reduce((acc, item) => acc + item.price, 0);
    const checkout = new Checkout({ items, total });

    return checkout;
  }
}
