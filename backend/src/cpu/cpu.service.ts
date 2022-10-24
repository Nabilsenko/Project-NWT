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
                // eslint-disable-next-line no-underscore-dangle
                if (toReturn.image === '' || !toReturn.image) {
                    toReturn.image = 'https://randomuser.me/api/portraits/lego/6.jpg';
                }
                return toReturn;
            })),
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
                map((cpuCreated) => {
                    // eslint-disable-next-line no-underscore-dangle
                    const id = cpuCreated._id;
                    this.imageDao.save({
                        _id: id,
                        image: cpuCreated.image,
                    }).subscribe((updatedCpu) =>
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        // eslint-disable-next-line no-underscore-dangle,implicit-arrow-linebreak
                        this.update(updatedCpu._id, updatedCpu));
                    return new CpuEntity(cpuCreated);
                }),
            );
    }

    update(id: string, updateCpuDto: UpdateCpuDto): Observable<CpuEntity> {
        return of(updateCpuDto).pipe(
            mergeMap((cpuDto) => {
                if (cpuDto.image && cpuDto.image.startsWith('data:image/')) {
                    this.imageDao.update(id, cpuDto.image);
                    return this.cpuDao.update(id, {
                        ...cpuDto,
                        image: `http://${Config.get<string>('server.prodHost')}/image/${id}`,
                    });
                }
                return this.cpuDao.update(id, cpuDto);
            }),
            mergeMap((updatedCpu) => of(new CpuEntity(updatedCpu as Cpu))),
        );
    }
}
