import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cpu } from '../schema/cpu.schema';
import CreateCpuDto from "../dto/create-cpu.dto";
import {from, Observable, map} from "rxjs";

@Injectable()
export default class CpuDao {
   
    constructor(@InjectModel(Cpu.name) private _cpuModel: Model<Cpu>) {
    }

    find(): Observable<Cpu[]> {
        return from(this._cpuModel.find({})).pipe(map((cpu) => ([] as Cpu[]).concat(cpu)));
    }
    
    save(cpuDto: CreateCpuDto) {
        // eslint-disable-next-line new-cap
        return from(new this._cpuModel(cpuDto).save());
    }
}
