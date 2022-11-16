import { Response } from 'express';
import {
  Body,
  Controller,
  HttpStatus,
  Inject,
  Post,
  Res,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import {
  CreateNewLaunch,
  INewLaunchFactory,
  NewLaunchFactoryService,
} from 'src/modules/launch/infrastructure/services/new-launch-factory';
import { OnboardingCreateDto } from 'src/modules/launch/infrastructure/dto/onboarding.dto';

@Controller()
export class OnboardingController {
  constructor(
    @Inject(NewLaunchFactoryService)
    private readonly newLaunchFactory: INewLaunchFactory<CreateNewLaunch>,
    private readonly commandBus: CommandBus,
  ) {}

  @Post('/onboarding-send')
  async registerPixKey(
    @Res() response: Response,
    @Body() dto: OnboardingCreateDto,
  ): Promise<Response> {
    const newOnboardingCommand = await this.newLaunchFactory.create(
      CreateNewLaunch.CREATE_ONBOARDING,
      dto,
    );

    const result = await this.commandBus.execute(newOnboardingCommand);

    return response.status(HttpStatus.OK).json(result);
  }
}
