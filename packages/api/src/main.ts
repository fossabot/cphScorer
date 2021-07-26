import { INestApplication, Logger, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { AppModule } from './app.module'
import { Configuration } from './config/config'

const logger = new Logger('Application')

async function bootstrap (): Promise<void> {
  const app = await NestFactory.create(AppModule)

  if (Configuration.instanceOf().env !== 'PROD') setSwagger(app)

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      disableErrorMessages: Configuration.instanceOf().env === 'PROD'
    })
  )

  await app.listen(Configuration.instanceOf().port)
}

function setSwagger (app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle('CPH Scorer api')
    .setVersion('1.0')
    .addTag('Player')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup(Configuration.instanceOf().swaggerPath, app, document)

  logger.log(`Swagger mapped on {/${Configuration.instanceOf().swaggerPath}, GET} and {/${Configuration.instanceOf().swaggerPath}-json, GET}`)
}

bootstrap()
  .then(() => {
    logger.verbose(`Started on : ${Configuration.instanceOf().port}`)
  })
  .catch(e => logger.error(e))
