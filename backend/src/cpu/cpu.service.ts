import {
    ConflictException, Injectable, NotFoundException, UnprocessableEntityException,
} from '@nestjs/common';
import {
    catchError, map, mergeMap, Observable, of, throwError, filter, defaultIfEmpty, tap,
} from 'rxjs';
import * as Config from 'config';
import CpuDao from './dao/cpu.dao';
import CreateCpuDto from './dto/create-cpu.dto';
import CpuEntity from './entities/cpu.entity';
import ImageDao from './dao/image.dao';
import UpdateCpuDto from './dto/update-cpu.dto';
import { Cpu } from './schema/cpu.schema';

@Injectable()
export default class CpuService {
    private readonly cpuDao: CpuDao;

    private readonly imageDao: ImageDao;

    constructor(_cpuDao: CpuDao, _imageDao: ImageDao) {
        this.cpuDao = _cpuDao;
        this.imageDao = _imageDao;
    }

    findAll(): Observable<CpuEntity[] | void> {
        return this.cpuDao.find().pipe(
            filter(Boolean),
            map((cpus) => (cpus || []).map((cpu) => {
                const toReturn = new CpuEntity(cpu);
                if (toReturn.image === '' || !toReturn.image) {
                    toReturn.image = 'https://randomuser.me/api/portraits/lego/6.jpg';
                }
                return toReturn;
            })),
            tap((cpu) => console.log('hehey', cpu)),
            defaultIfEmpty(undefined),
        );
    }

    delete = (id: string): Observable<void> => this.cpuDao.findByIdAndRemove(id).pipe(
        catchError((e) => throwError(() => new UnprocessableEntityException(e.message))),
        mergeMap((personDeleted) => (personDeleted
            ? of(undefined)
            : throwError(
                () => new NotFoundException(`CPU with id '${id}' not found`),
            ))),
    );

    create(createCpuDto: CreateCpuDto): Observable<CpuEntity> {
        return of(createCpuDto)
            .pipe(
                mergeMap((cpuDto) => this.imageDao.save({ image: cpuDto.image }).pipe(
                    mergeMap((savedImage) => this.cpuDao.save({
                        ...cpuDto,
                        image: `http://${Config.get<string>('server.prodHost')}/image/${savedImage._id}`,
                    })),
                )),
                catchError((err) => {
                    if (err.code === 11000) {
                        return throwError(() => new ConflictException(`Cpu with the name '${createCpuDto.name}' already exists`));
                    }
                    return throwError(() => new UnprocessableEntityException(err.message));
                }),
                map((cpuCreated) => new CpuEntity(cpuCreated)),
            );
    }

    update(id: string, updateCpuDto: UpdateCpuDto): Observable<CpuEntity> {
        return of(updateCpuDto).pipe(
            mergeMap((cpuDto) => {
                if (cpuDto.image && cpuDto.image.startsWith('data:image/')) {
                    return this.imageDao.update(id, cpuDto.image).pipe(
                        mergeMap((updatedImage) => this.cpuDao.update(id, {
                            ...cpuDto,
                            image: `http://${Config.get<string>('server.prodHost')}/image/${updatedImage?._id}`,
                        })),
                    );
                }
                return this.cpuDao.update(id, cpuDto);
            }),
            mergeMap((updatedCpu) => of(new CpuEntity(updatedCpu as Cpu))),
        );
    }

    findOne(id: string): Observable<CpuEntity> {
        return this.cpuDao.findOne(id).pipe(
            map((cpu) => new CpuEntity(cpu as Cpu)),
        );
    }
}
