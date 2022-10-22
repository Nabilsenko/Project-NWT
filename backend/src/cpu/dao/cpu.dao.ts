import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Cpu } from '../schema/cpu.schema';
import CreateCpuDto from "../dto/create-cpu.dto";
import {from, Observable, map, of} from "rxjs";
import CpuEntity from '../entities/cpu.entity';

@Injectable()
export default class CpuDao {
    private cpuArray: CpuEntity[];
   
    constructor(@InjectModel(Cpu.name) private _cpuModel: Model<Cpu>) {
        this.cpuArray = [];
    }
    
    find(): Observable<Cpu[]> {
        return from(this._cpuModel.find({}).lean()).pipe(map((cpu) => ([] as Cpu[]).concat(cpu)));
    }

    /*findById(id: string): Observable<Cpu | void> {
        return from(this._cpuModel.findById(id).lean());
        //return from(this._cpuModel.findOne({_id: id}));
    }*/
    
    save(cpuDto: CreateCpuDto) {
        return from(new this._cpuModel(cpuDto).save());
    }
    
    /*Promises Versions  
    async find_Promise() : Promise<void | CpuEntity[]>{
        this.cpuArray = []
        return this._cpuModel.find({}).lean()
        .then((cpu)=>{
            cpu.forEach(item => {
                this.cpuArray.push(new CpuEntity(item));
            });
            return this.cpuArray;
        })
        .catch((err)=> console.log(err));
    }
    async findOne(id : string): Promise<void | CpuEntity>{
        return this._cpuModel.findOne({_id : id}).lean()
        .then((cpu)=>{
            return new CpuEntity(cpu);
        })
        .catch((err)=> console.log(err));
    }*/
    
}