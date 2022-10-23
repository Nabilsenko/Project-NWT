import { Logger, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import CpuController from './cpu.controller';
import { Cpu, CpuSchema } from './schema/cpu.schema';
import CpuService from './cpu.service';
import CpuDao from './dao/cpu.dao';
import CpuImageController from './cpu.image.controller';
import { Image, ImageSchema } from './schema/image.schema';
import CpuImageService from './cpu.image.service';
import ImageDao from './dao/image.dao';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Cpu.name, schema: CpuSchema }]),
        MongooseModule.forFeature([{ name: Image.name, schema: ImageSchema }]),
    ],
    controllers: [CpuController, CpuImageController],
    providers: [CpuService, CpuDao, CpuImageService, ImageDao, Logger],
})
export default class CpuModule {}
