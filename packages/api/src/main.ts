import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap (): Promise<void> {
  const app = await NestFactory.create(AppModule)
  await app.listen(3000)
}
bootstrap()
  .then(() => console.log('app started'))
  .catch(e => console.error(e))
