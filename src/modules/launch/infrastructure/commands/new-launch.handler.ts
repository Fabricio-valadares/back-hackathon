import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { NewLaunchCommand } from 'src/modules/launch/infrastructure/commands/new-launch-command';
import { NewLaunchMongoRepository } from 'src/modules/launch/infrastructure/repository/new-launcj.repository';

@CommandHandler(NewLaunchCommand)
export class NewLaunchCommandHandler
  implements ICommandHandler<NewLaunchCommand>
{
  constructor(
    @Inject(NewLaunchMongoRepository)
    private readonly launchMongoRepository: NewLaunchMongoRepository,
  ) {}

  async execute(command: NewLaunchCommand): Promise<any> {
    return await this.launchMongoRepository.create(command.data);
  }
}
