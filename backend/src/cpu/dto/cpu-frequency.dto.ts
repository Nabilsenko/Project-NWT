import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export default class CpuFrequencyDto {
    @ApiProperty({
        name: 'base',
        description: 'Cpu base frequency in MHz',
    })
    @IsNotEmpty()
    @IsNumber() base: number;

    @ApiProperty({
        name: 'turbo',
        description: 'Cpu turbo frequency in MHz',
    })
    @IsOptional()
    @IsNumber() turbo: number | null;
}
