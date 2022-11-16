import { OnboardingCreateDto } from 'src/modules/launch/infrastructure/dto/onboarding.dto';

export class OnboardingCommand {
  constructor(public readonly data: OnboardingCreateDto) {}
}
