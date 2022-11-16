import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteLaunchCommand } from 'src/modules/launch/infrastructure/commands/delete-launch-command';
import { NewLaunchMongoRepository } from 'src/modules/launch/infrastructure/repository/new-launcj.repository';

@CommandHandler(DeleteLaunchCommand)
export class DeleteLaunchCommandHandler
  implements ICommandHandler<DeleteLaunchCommand>
{
  constructor(
    @Inject(NewLaunchMongoRepository)
    private readonly launchMongoRepository: NewLaunchMongoRepository,
  ) {}

  async execute(command: DeleteLaunchCommand): Promise<any> {
    const result = await this.launchMongoRepository.deleteOne(command.id);

    if (!result.result) {
      return result;
    }

    return result;
  }
}
