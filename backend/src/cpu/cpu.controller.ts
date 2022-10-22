import {
    Body, ClassSerializerInterceptor, Controller, Get, Param, Post, UseInterceptors,
} from '@nestjs/common';
import {
    ApiBadRequestResponse, ApiBody, ApiConflictResponse, ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiTags,
} from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { HttpInterceptor } from 'src/interceptors/http.interceptor';
import { HandlerParams } from 'src/validators/handler-params';
import CpuService from './cpu.service';
import CreateCpuDto from './dto/create-cpu.dto';
import CpuEntity from './entities/cpu.entity';

@ApiTags('cpu')
@Controller('cpu')
@UseInterceptors(ClassSerializerInterceptor)
@UseInterceptors(HttpInterceptor)
export default class CpuController {
    private readonly cpuService: CpuService;

    constructor(_cpuService: CpuService) {
        this.cpuService = _cpuService;
    }

    /****** GET CPU ********/
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

    
      /*@Get('id')
        findById(@Param() params: HandlerParams){
        return this.cpuService.findById(params.id);
        }*/
    
        
        /****** ADD CPU ********/
        
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

    /* Promises Versions
        @Get()
        find(): Promise<void | CpuEntity[]>{
            return this.cpuService.findAll_Promise().then((cpu)=>{
                console.log("********", cpu);
            return cpu;
        })}*/
    }
