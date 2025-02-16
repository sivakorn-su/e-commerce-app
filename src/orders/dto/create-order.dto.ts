import { IsNotEmpty, IsArray, ArrayNotEmpty } from 'class-validator';
import { CreateOrderItemDto } from './create-order-item.dto';

export class CreateOrderDto {
  @IsNotEmpty()
  customerName: string;

  @IsNotEmpty()
  customerEmail: string;

  @IsArray()
  @ArrayNotEmpty()
  items: CreateOrderItemDto[];
}
