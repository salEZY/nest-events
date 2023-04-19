import { Module } from '@nestjs/common';
import { AppController } from './app.controller'
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import { Event } from './events/event.entity';
import { EventsModule } from './events/events.module';
import { ConfigModule } from '@nestjs/config';
import ormConfig from './config/orm.config';
import ormConfigProd from './config/orm.config.prod';
import { SchoolModule } from './school/school.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [ormConfig],
      // expandVariables: true -> create variables in .env file with ${VARIABLE_NAME}
      // envFilePath: '' -> setup env file path
    }),
    TypeOrmModule.forRootAsync({
      useFactory: process.env.NODE_ENV !== 'production' ? ormConfig : ormConfigProd
    }),
    AuthModule, EventsModule, SchoolModule
  ],
  controllers: [AppController],
  providers: [AppService, {
    provide: 'APP_NAME',
    useValue: 'Nest Events Backend!'
  }],
})

export class AppModule { }
