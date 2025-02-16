import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateOrderItemDto {
  @IsNotEmpty()
  productName: string;

  @IsNumber()
  quantity: number;

  @IsNumber()
  price: number;
}
