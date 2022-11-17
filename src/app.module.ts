import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { IndexModule } from 'src/modules/launch/infrastructure/index.module';
import { AuthController } from './modules/launch/infrastructure/controller/auth.controller';
import { AuthService } from './modules/launch/infrastructure/services/auth.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: 'mongodb+srv://costta:costta123@cluster0.1guvcb1.mongodb.net/?retryWrites=true&w=majority',
        useUnifiedTopology: true,
      }),
    }),
    IndexModule,
  ],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService],
})
export class AppModule {}
