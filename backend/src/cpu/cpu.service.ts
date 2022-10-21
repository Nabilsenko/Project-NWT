import { ConflictException, Injectable, UnprocessableEntityException } from '@nestjs/common';
import {
    catchError, map, mergeMap, Observable, of, throwError,
} from 'rxjs';
import CpuDao from './dao/cpu.dao';
import CreateCpuDto from './dto/create-cpu.dto';
import CpuEntity from './entities/cpu.entity';

@Injectable()
export default class CpuService {
    private readonly cpuDao: CpuDao;

    constructor(_cpuDao: CpuDao) {
        this.cpuDao = _cpuDao;
    }

    create(createCpuDto: CreateCpuDto): Observable<CpuEntity> {
        return of(createCpuDto)
            .pipe(
                mergeMap((cpuDto) => this.cpuDao.save(cpuDto)),
                catchError((err) => {
                    if (err.code === 11000) {
                        return throwError(() => new ConflictException(`Cpu with the name '${createCpuDto.name}' already exists`));
                    }
                    return throwError(() => new UnprocessableEntityException(err.message));
                }),
                map((cpuCreated) => new CpuEntity(cpuCreated)),
            );
    }
}
