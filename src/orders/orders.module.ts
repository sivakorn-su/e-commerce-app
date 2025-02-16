import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderService } from './orders.service';
import { OrderController } from './orders.controller';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order_item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderItem])],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
