import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './users/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { SuperAdminModule } from './superAdmin/super-admin/super-admin.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';

@Module({
  imports: [ ConfigModule.forRoot({
    isGlobal:true,
    envFilePath: '.env',
    load: [configuration]
  }), 
  JwtModule.registerAsync({
    global: true,
    useFactory: (configService: ConfigService) => ({
      secret: configService.get<string>('jwt.secret'),
      signOptions: {expiresIn: configService.get<string>('jwt.expiry')}
    }),
    inject:[ConfigService]
  }),
  MongooseModule.forRootAsync({
    // imports: [ConfigModule], 
    useFactory: async (configService: ConfigService) => ({
      uri: configService.get<string>('db.uri'),
    }),
    inject: [ConfigService],
  }),SuperAdminModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}


