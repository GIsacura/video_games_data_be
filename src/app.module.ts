import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongoClient } from './infrastructure/persistance/mongo/MongoClient';
import { ConfigModule } from '@nestjs/config';
import { environments } from './configuration/environments';
import config from './configuration/config';
import { schema } from './configuration/environments-validations';
import { GamesModule } from './games/games.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: environments[process.env.NODE_ENV] || '.env.development',
      load: [config],
      isGlobal: true,

      // .env file validation
      validationSchema: schema,
    }),
    //Database
    MongoClient.create(),

    GamesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
