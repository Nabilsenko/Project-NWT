import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export default class CreateImageDto {
    @ApiProperty({
        name: '_id',
        description: 'Cpu id',
    })
    @IsNotEmpty()
    @IsString() _id: string;

    @ApiProperty({
        name: 'image',
        description: 'Cpu image in base64',
    })
    @IsOptional()
    @IsString() image: string | null;
}
