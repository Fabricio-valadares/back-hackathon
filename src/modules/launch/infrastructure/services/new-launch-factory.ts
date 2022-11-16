import { Injectable } from '@nestjs/common';
import { ICommand } from '@nestjs/cqrs';
import { DeleteLaunchCommand } from 'src/modules/launch/infrastructure/commands/delete-launch-command';
import { ListLaunchCommand } from 'src/modules/launch/infrastructure/commands/list-launch-commad';
import { NewLaunchCommand } from 'src/modules/launch/infrastructure/commands/new-launch-command';
import { OnboardingCommand } from 'src/modules/launch/infrastructure/commands/onboarding-command';
import { NewLaunchDto } from 'src/modules/launch/infrastructure/dto/new-launch.dto';

export interface INewLaunchFactory<Kind> {
  create<Input>(kind: Kind, input?: Input): Promise<ICommand>;
}

export enum CreateNewLaunch {
  CREATE = 'create',
  LIST_LAUNCH = 'listlaunch',
  DELETE_LAUNCH = 'deletelaunch',
  CREATE_ONBOARDING = 'createonboarding',
}

@Injectable()
export class NewLaunchFactoryService
  implements INewLaunchFactory<CreateNewLaunch>
{
  async create<Input>(kind: CreateNewLaunch, input: Input): Promise<ICommand> {
    switch (kind) {
      case CreateNewLaunch.CREATE:
        return new NewLaunchCommand(input as NewLaunchDto);
      case CreateNewLaunch.LIST_LAUNCH:
        return new ListLaunchCommand();
      case CreateNewLaunch.DELETE_LAUNCH:
        return new DeleteLaunchCommand(input as any);
      case CreateNewLaunch.CREATE_ONBOARDING:
        return new OnboardingCommand(input as any);
    }
  }
}
