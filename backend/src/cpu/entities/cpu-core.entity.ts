import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';

@Exclude()
export default class CpuCoreEntity {
    @ApiProperty({
        name: 'physical',
        description: 'Cpu core count',
    })
    @Type(() => Number)
    @Expose() physical: number;

    @ApiProperty({
        name: 'thread',
        description: 'Cpu thread count',
    })
    @Type(() => Number)
    @Expose() thread: number | null;
}
