import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order_item.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { DataSource } from 'typeorm';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private orderItemRepository: Repository<OrderItem>,
    private dataSource: DataSource,
  ) {}

  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.startTransaction();
    try {
      const order = queryRunner.manager.create(Order, {
        customerName: createOrderDto.customerName,
        customerEmail: createOrderDto.customerEmail,
        totalAmount: 0,
      });

      await queryRunner.manager.save(order);

      let totalAmount = 0;
      const orderItems: OrderItem[] = [];
      for (const item of createOrderDto.items) {
        const orderItem = queryRunner.manager.create(OrderItem, {
          productName: item.productName,
          quantity: item.quantity,
          price: item.price,
          order: order,
        });

        totalAmount += item.quantity * item.price;
        orderItems.push(orderItem);
      }

      await queryRunner.manager.save(OrderItem, orderItems);

      order.totalAmount = totalAmount;
      await queryRunner.manager.save(order);

      await queryRunner.commitTransaction();
      return order;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async getOrders(): Promise<Order[]> {
    return this.orderRepository.find({ relations: ['items'] });
  }
}
