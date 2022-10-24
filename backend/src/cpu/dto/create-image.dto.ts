import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export default class CreateImageDto {
    @ApiProperty({
        name: 'image',
        description: 'Cpu image in base64',
    })
    @IsOptional()
    @IsString() image: string | null;
}
