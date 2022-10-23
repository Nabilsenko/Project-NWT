import { Exclude, Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { Cpu } from '../schema/cpu.schema';

@Exclude()
export default class CpuImageEntity {
    @ApiProperty({
        name: '_id',
        description: 'Cpu id',
    })
    @Type(() => String)
    @Expose() _id: string;

    @ApiProperty({
        name: 'image',
        description: 'Cpu image in base64',
    })
    @Type(() => String)
    @Expose() image: string | null;

    constructor(partial: Partial<Cpu>) {
        Object.assign(this, partial);
    }
}
