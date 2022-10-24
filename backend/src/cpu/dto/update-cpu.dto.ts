import { ApiProperty } from '@nestjs/swagger';
import {
    IsArray, IsInstance, IsNotEmpty, IsOptional, IsString, ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import CpuCoreDto from './cpu-core.dto';
import { Core, Frequency } from '../../types/cpu.types';
import CpuFrequencyDto from './cpu-frequency.dto';

export default class UpdateCpuDto {
    @ApiProperty({
        name: 'name',
        description: 'Cpu name',
    })
    @IsNotEmpty()
    @IsString() name: string;

    @ApiProperty({
        name: 'brand',
        description: 'Cpu brand',
    })
    @IsOptional()
    @IsString() brand: string | null;

    @ApiProperty({
        name: 'architecture',
        description: 'Cpu architecture',
    })
    @IsOptional()
    @IsArray() architecture?: string[];

    @ApiProperty({
        name: 'image',
        description: 'Cpu image in base64',
    })
    @IsOptional()
    @IsString() image: string | null;

    @ApiProperty({
        name: 'core',
        description: 'Cpu core count',
    })
    @IsInstance(CpuCoreDto)
    @ValidateNested()
    @Type(() => CpuCoreDto) core: Core;

    @ApiProperty({
        name: 'frequency',
        description: 'Cpu core frequency',
    })
    @IsInstance(CpuFrequencyDto)
    @ValidateNested()
    @Type(() => CpuFrequencyDto) frequency: Frequency;

    @ApiProperty({
        name: 'cache',
        description: 'Cpu cache',
    })
    @IsOptional()
    @IsArray() cache: number[];
}
