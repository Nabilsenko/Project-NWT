import {
    ApiParam,
    ApiTags,
} from '@nestjs/swagger';
import {
    ClassSerializerInterceptor, Controller, Get, Param, UseInterceptors,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Buffer } from 'buffer';
import { HttpInterceptor } from '../interceptors/http.interceptor';
import { HandlerParams } from '../validators/handler-params';
import CpuImageService from './cpu.image.service';

@ApiTags('image')
@Controller('image')
@UseInterceptors(ClassSerializerInterceptor)
@UseInterceptors(HttpInterceptor)
export default class CpuImageController {
    private readonly imageService: CpuImageService;

    constructor(_imageService: CpuImageService) {
        this.imageService = _imageService;
    }

    @ApiParam({
        name: 'id',
        description: 'Cpu id',
        type: String,
        allowEmptyValue: false,
    })
    @Get(':id')
    find(@Param() params: HandlerParams): Observable<Buffer> {
        return this.imageService.find(params.id).pipe(
            map((image) => {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                const matches = image?.image.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/) as string[];
                return Buffer.from(matches[2], 'base64');
            }),
        );
    }
}
