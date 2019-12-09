import { IsDate, IsNotEmpty } from 'class-validator';

export class CreateTaskDTO {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  image: string;

  @IsNotEmpty()
  body: string;

  @IsDate()
  datePosted: Date;
}
