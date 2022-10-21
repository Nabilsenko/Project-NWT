import {
    Body, ClassSerializerInterceptor, Controller, Post, UseInterceptors,
} from '@nestjs/common';
import {
    ApiBadRequestResponse, ApiBody, ApiConflictResponse, ApiCreatedResponse, ApiTags,
} from '@nestjs/swagger';
import { Observable } from 'rxjs';
import CpuService from './cpu.service';
import CreateCpuDto from './dto/create-cpu.dto';
import CpuEntity from './entities/cpu.entity';

@ApiTags('cpu')
@Controller('cpu')
@UseInterceptors(ClassSerializerInterceptor)
export default class CpuController {
    private readonly cpuService: CpuService;

    constructor(_cpuService: CpuService) {
        this.cpuService = _cpuService;
    }

    @ApiCreatedResponse({
        description: 'The cpu specification has been successfully created',
        type: CpuEntity,
    })
    @ApiConflictResponse({
        description: 'The cpu specification already exists in the database',
    })
    @ApiBadRequestResponse({
        description: 'Payload provided is not good',
    })
    @ApiBody({
        description: 'Payload to create a new cpu specification',
        type: CreateCpuDto,
    })
    @Post()
    create(@Body() createCpuDto: CreateCpuDto): Observable<CpuEntity> {
        return this.cpuService.create(createCpuDto);
    }
}
