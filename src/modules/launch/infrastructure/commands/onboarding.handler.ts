import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { OnboardingCommand } from 'src/modules/launch/infrastructure/commands/onboarding-command';
import { OnboardingMongoRepository } from 'src/modules/launch/infrastructure/repository/onboarding.repository';

@CommandHandler(OnboardingCommand)
export class OnboardingHandler implements ICommandHandler<OnboardingCommand> {
  constructor(
    @Inject(OnboardingMongoRepository)
    private readonly onboardingMongoRepository: OnboardingMongoRepository,
  ) {}

  async execute(command: OnboardingCommand): Promise<any> {
    return await this.onboardingMongoRepository.create(command.data);
  }
}
