import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cpu } from '../schema/cpu.schema';
import CreateCpuDto from "../dto/create-cpu.dto";
import {from} from "rxjs";

@Injectable()
export default class CpuDao {
    private readonly cpuModel: Model<Cpu>;

    constructor(@InjectModel(Cpu.name) _cpuModel: Model<Cpu>) {
        this.cpuModel = _cpuModel;
    }

    save(cpuDto: CreateCpuDto) {
        // eslint-disable-next-line new-cap
        return from(new this.cpuModel(cpuDto).save());
    }
}
