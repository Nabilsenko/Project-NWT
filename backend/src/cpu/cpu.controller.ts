import {
    Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, Put, UseInterceptors,
} from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiBody,
    ApiConflictResponse,
    ApiCreatedResponse,
    ApiNoContentResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiParam,
    ApiTags,
    ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { HttpInterceptor } from 'src/interceptors/http.interceptor';
import { HandlerParams } from 'src/validators/handler-params';
import CpuService from './cpu.service';
import CreateCpuDto from './dto/create-cpu.dto';
import CpuEntity from './entities/cpu.entity';
import UpdateCpuDto from "./dto/update-cpu.dto";

@ApiTags('cpu')
@Controller('cpu')
@UseInterceptors(ClassSerializerInterceptor)
@UseInterceptors(HttpInterceptor)
export default class CpuController {
    private readonly cpuService: CpuService;

    constructor(_cpuService: CpuService) {
        this.cpuService = _cpuService;
    }

    /** **** GET CPU ******* */

    /*  Observables Versions */

    @ApiNoContentResponse({ description: 'No cpu exists in database' })
    @ApiOkResponse({
        description: 'Returns an array of cpu',
        type: CpuEntity,
        isArray: true,
    })
    @Get()
    findAll(): Observable<CpuEntity[] | void> {
        return this.cpuService.findAll();
    }

    /* @Get('id')
      findById(@Param() params: HandlerParams){
      return this.cpuService.findById(params.id);
      } */

    /** **** ADD CPU ******* */

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

    @ApiNoContentResponse({
        description: 'The person has been successfully deleted',
    })
    @ApiNotFoundResponse({
        description: 'Person with the given "id" doesn\'t exist in the database',
    })
    @ApiUnprocessableEntityResponse({
        description: "The request can't be performed in the database",
    })
    @ApiBadRequestResponse({ description: 'Parameter provided is not good' })
    @ApiParam({
        name: 'id',
        description: 'Unique identifier of the person in the database',
        type: String,
        allowEmptyValue: false,
    })
    @Delete(':id')
    delete(@Param() params: HandlerParams): Observable<void> {
        return this.cpuService.delete(params.id);
    }

    @Put(':id')
    update(
        @Param() params: HandlerParams,
        @Body() updateCpuDto: UpdateCpuDto,
    ): Observable<CpuEntity> {
        return this.cpuService.update(params.id, updateCpuDto);
    }

    @Get(':id')
    findOne(@Param() params: HandlerParams): Observable<CpuEntity> {
        return this.cpuService.findOne(params.id);
    }
}
