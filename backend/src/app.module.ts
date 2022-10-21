import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as Config from 'config';
import CpuModule from './cpu/cpu.module';

@Module({
    imports: [
        CpuModule,
        MongooseModule.forRoot(Config.get<string>('mongodb.uri')),
    ],
})
export default class AppModule {}
