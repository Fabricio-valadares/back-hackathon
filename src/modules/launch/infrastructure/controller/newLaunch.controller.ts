import { Response } from 'express';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Inject,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { NewLaunchDto } from 'src/modules/launch/infrastructure/dto/new-launch.dto';
import {
  CreateNewLaunch,
  INewLaunchFactory,
  NewLaunchFactoryService,
} from 'src/modules/launch/infrastructure/services/new-launch-factory';

@Controller()
export class NewLaunchController {
  constructor(
    @Inject(NewLaunchFactoryService)
    private readonly newLaunchFactory: INewLaunchFactory<CreateNewLaunch>,
    private readonly commandBus: CommandBus,
  ) {}

  @Post('/create-new-launch')
  async registerPixKey(
    @Res() response: Response,
    @Body() dto: NewLaunchDto,
  ): Promise<Response> {
    const newLaunchCommand = await this.newLaunchFactory.create(
      CreateNewLaunch.CREATE,
      dto,
    );

    const result = await this.commandBus.execute(newLaunchCommand);

    return response.status(HttpStatus.OK).json(result);
  }

  @Get('/list-all-launch')
  async listAllLaunch(@Res() response: Response): Promise<Response> {
    const listLaunchCommand = await this.newLaunchFactory.create(
      CreateNewLaunch.LIST_LAUNCH,
    );

    const result = await this.commandBus.execute(listLaunchCommand);

    return response.status(HttpStatus.OK).json(result);
  }

  @Delete('/delete-one-launch/:id')
  async deleteLaunch(
    @Res() response: Response,
    @Param() params: any,
  ): Promise<Response> {
    const deleteLaunchCommand = await this.newLaunchFactory.create(
      CreateNewLaunch.DELETE_LAUNCH,
      params.id,
    );

    const result = await this.commandBus.execute(deleteLaunchCommand);

    return response.status(HttpStatus.OK).json(result);
  }
}
