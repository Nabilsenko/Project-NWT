import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Injectable } from '@nestjs/common';
import ImageDao from './dao/image.dao';
import CpuImageEntity from './entities/cpu-image.entity';
import { Image } from './schema/image.schema';

@Injectable()
export default class CpuImageService {
    private readonly imageDao: ImageDao;

    constructor(_imageDao: ImageDao) {
        this.imageDao = _imageDao;
    }

    find(id: string): Observable<CpuImageEntity> {
        return this.imageDao.findById(id).pipe(
            filter((value) => !!value),
            map((image) => new CpuImageEntity(image as Image)),
        );
    }
}
