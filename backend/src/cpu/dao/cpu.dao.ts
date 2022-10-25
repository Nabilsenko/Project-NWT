import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
    from, Observable, map,
} from 'rxjs';
import { Cpu } from '../schema/cpu.schema';
import CreateCpuDto from '../dto/create-cpu.dto';
import UpdateCpuDto from "../dto/update-cpu.dto";

@Injectable()
export default class CpuDao {
    // eslint-disable-next-line no-useless-constructor,no-empty-function
    constructor(@InjectModel(Cpu.name) private _cpuModel: Model<Cpu>) {}

    find(): Observable<Cpu[]> {
        return from(this._cpuModel.find({}).lean()).pipe(map((cpu) => ([] as Cpu[]).concat(cpu)));
    }

    /* findById(id: string): Observable<Cpu | void> {
        return from(this._cpuModel.findById(id).lean());
        //return from(this._cpuModel.findOne({_id: id}));
    } */

    findByIdAndRemove(id: string): Observable<any> {
        return from(this._cpuModel.findByIdAndRemove(id).lean());
    }

    save(cpuDto: CreateCpuDto) {
        return from(new this._cpuModel(cpuDto).save());
    }

    update(
        id: string,
        updateCpuDto: UpdateCpuDto,
    ): Observable<Cpu | void> {
        return from(
            this._cpuModel.findByIdAndUpdate(id, updateCpuDto, {
                new: true,
                runValidators: true,
            }),
        ) as Observable<Cpu | void>;
    }

    findOne(id: string): Observable<Cpu | void> {
        console.log(id)
        return from(
            this._cpuModel.findOne({ _id: id }).lean(),
        ) as Observable<Cpu | void>;
    }
}
