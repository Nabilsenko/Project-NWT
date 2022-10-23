import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import CpuCoreDto from '../dto/cpu-core.dto';
import { Cpu } from '../schema/cpu.schema';
import { Core, Frequency } from '../../types/cpu.types';
import CpuFrequencyDto from '../dto/cpu-frequency.dto';

@Exclude()
export default class CpuEntity {
   
    @ApiProperty({
        name: '_id',
        description: 'Cpu id',
    })
    @Type(() => String)
    @Expose() _id: string;

    @ApiProperty({
        name: 'name',
        description: 'Cpu name',
    })
    @Type(() => String)
    @Expose() name: string;

    @ApiProperty({
        name: 'brand',
        description: 'Cpu brand',
    })
    @Type(() => String)
    @Expose() brand: string | null;

    @ApiProperty({
        name: 'architecture',
        description: 'Cpu architecture',
    })
    @Type(() => String)
    @Expose() architecture?: string[];

    @ApiProperty({
        name: 'image',
        description: 'Cpu image in base64',
    })
    @Type(() => String)
    @Expose() image: string | null;

    @ApiProperty({
        name: 'core',
        description: 'Cpu core count',
    })
    @Type(() => CpuCoreDto)
    @Expose() core: Core;

    @ApiProperty({
        name: 'frequency',
        description: 'Cpu core frequency',
    })
    @Type(() => CpuFrequencyDto)
    @Expose() frequency: Frequency;

    @ApiProperty({
        name: 'cache',
        description: 'Cpu cache',
    })
    @Type(() => Number)
    @Expose() cache: number[];

    constructor(partial: Partial<Cpu>) {
        Object.assign(this, partial);
    }
}
