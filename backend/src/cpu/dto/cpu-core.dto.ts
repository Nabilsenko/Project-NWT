import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export default class CpuCoreDto {
    @ApiProperty({
        name: 'physical',
        description: 'Cpu core count',
    })
    @IsNotEmpty()
    @IsNumber() physical: number;

    @ApiProperty({
        name: 'thread',
        description: 'Cpu thread count',
    })
    @IsNotEmpty()
    @IsNumber() thread: number | null;
}
