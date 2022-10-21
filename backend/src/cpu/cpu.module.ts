import { Logger, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import CpuController from './cpu.controller';
import { Cpu, CpuSchema } from './schema/cpu.schema';
import CpuService from './cpu.service';
import CpuDao from './dao/cpu.dao';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Cpu.name, schema: CpuSchema }]),
    ],
    controllers: [CpuController],
    providers: [CpuService, CpuDao, Logger],
})
export default class CpuModule {}
