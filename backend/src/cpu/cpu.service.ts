import {
    ConflictException, Injectable, NotFoundException, UnprocessableEntityException,
} from '@nestjs/common';
import {
    catchError, map, mergeMap, Observable, of, throwError, find, filter, defaultIfEmpty, from, tap,
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

    findAll(): Observable<CpuEntity[] | void> {
        return this.cpuDao.find().pipe(
            filter(Boolean),
            map((cpu) => (cpu || []).map((cpu) => new CpuEntity(cpu))),
            tap((cpu) => console.log('hehey', cpu)),
            defaultIfEmpty(undefined),
        );
    }

    /* findById(id: string) {
            return this.cpuDao.findById(id);
        } */

    delete = (id: string): Observable<void> => this.cpuDao.findByIdAndRemove(id).pipe(
        catchError((e) => throwError(() => new UnprocessableEntityException(e.message))),
        mergeMap((personDeleted) => (personDeleted
            ? of(undefined)
            : throwError(
                () => new NotFoundException(`Person with id '${id}' not found`),
            ))),
    );

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

    /* Promises Versions
        findAll_Promise(): Promise<void | CpuEntity[]>{
            return this.cpuDao.find_Promise();
        } */
}
