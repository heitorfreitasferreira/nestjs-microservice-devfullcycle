import { Module } from '@nestjs/common';
import { CheckoutsService } from './checkouts.service';
import { CheckoutsController } from './checkouts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Checkout } from './entities/checkout.entity';
import { CheckoutProduct } from './entities/checkout_product.entity';
import { CheckoutItem } from './entities/checkout_item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Checkout, CheckoutProduct, CheckoutItem])],// Cria repositories para os models definidos aqui
  controllers: [CheckoutsController],
  providers: [CheckoutsService],
})
export class CheckoutsModule { }
