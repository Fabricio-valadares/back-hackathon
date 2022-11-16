import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NewLaunchCommandHandler } from 'src/modules/launch/infrastructure/commands/new-launch.handler';
import { NewLaunchController } from 'src/modules/launch/infrastructure/controller/newLaunch.controller';
import {
  NewLaunch,
  NewLaunchSchema,
} from 'src/modules/launch/infrastructure/repository/entities/new-launch.entities';
import { NewLaunchMongoRepository } from 'src/modules/launch/infrastructure/repository/new-launcj.repository';
import { NewLaunchFactoryService } from 'src/modules/launch/infrastructure/services/new-launch-factory';
import { CqrsModule } from '@nestjs/cqrs';
import { ListLaunchCommandHandler } from 'src/modules/launch/infrastructure/commands/list-launch.launch';
import { DeleteLaunchCommandHandler } from 'src/modules/launch/infrastructure/commands/delete-launch.handle';
import { OnboardingController } from 'src/modules/launch/infrastructure/controller/onboarding.controller';
import { OnboardingHandler } from 'src/modules/launch/infrastructure/commands/onboarding.handler';
import { OnboardingMongoRepository } from 'src/modules/launch/infrastructure/repository/onboarding.repository';
import {
  Onboarding,
  OnboardingSchema,
} from 'src/modules/launch/infrastructure/repository/entities/onboarding.entities';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      {
        name: NewLaunch.name,
        schema: NewLaunchSchema,
      },
      {
        name: Onboarding.name,
        schema: OnboardingSchema,
      },
    ]),
  ],
  controllers: [NewLaunchController, OnboardingController],
  providers: [
    NewLaunchMongoRepository,
    OnboardingMongoRepository,
    NewLaunchFactoryService,
    NewLaunchCommandHandler,
    ListLaunchCommandHandler,
    DeleteLaunchCommandHandler,
    OnboardingHandler,
  ],
})
export class IndexModule {}
