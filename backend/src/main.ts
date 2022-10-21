import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as Config from 'config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import AppModule from './app.module';
import { AppConfig, SwaggerConfig } from './app.types';
import CpuModule from './cpu/cpu.module';

async function bootstrap(config: AppConfig, swaggerConfig: SwaggerConfig) {
    const app = await NestFactory.create<NestFastifyApplication>(
        AppModule,
        new FastifyAdapter({ logger: true }),
    );

    app.enableCors({ origin: config.cors });

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
        }),
    );

    const swaggerOptions = new DocumentBuilder()
        .setTitle(swaggerConfig.title)
        .setDescription(swaggerConfig.description)
        .setVersion(swaggerConfig.version)
        .addTag(swaggerConfig.tag)
        .build();

    const cpuDocument = SwaggerModule.createDocument(app, swaggerOptions, {
        include: [CpuModule],
    });

    SwaggerModule.setup(swaggerConfig.path, app, cpuDocument);

    await app.listen(config.port);
}

const config: AppConfig = Config.get<AppConfig>('server');

bootstrap(
    config,
    Config.get<SwaggerConfig>('swagger'),
).then(() => Logger.log(`Application served at http://${config.host}:${config.port}`));
