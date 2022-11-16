import { NewLaunchDto } from 'src/modules/launch/infrastructure/dto/new-launch.dto';

export class NewLaunchCommand {
  constructor(public readonly data: NewLaunchDto) {}
}
