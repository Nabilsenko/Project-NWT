import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';

@Exclude()
export default class CpuFrequencyDto {
    @ApiProperty({
        name: 'base',
        description: 'Cpu base frequency in MHz',
    })
    @Type(() => Number)
    @Expose() base: number | null;

    @ApiProperty({
        name: 'turbo',
        description: 'Cpu turbo frequency in MHz',
    })
    @Type(() => Number)
    @Expose() turbo: number | null;
}
