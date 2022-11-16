import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { IndexModule } from 'src/modules/launch/infrastructure/index.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: 'mongodb+srv://costta:costta123@cluster0.1guvcb1.mongodb.net/?retryWrites=true&w=majority',
        useUnifiedTopology: true,
      }),
    }),
    IndexModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
