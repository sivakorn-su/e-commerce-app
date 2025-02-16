import {
  IsEmail,
  IsNotEmpty,
  MinLength,
  IsOptional,
  IsString,
} from 'class-validator';

export class RegisterDTO {
  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Email is required' })
  readonly email: string;

  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  readonly password: string;

  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  readonly name: string;

  @IsOptional()
  @IsString()
  readonly tel?: string;
}
