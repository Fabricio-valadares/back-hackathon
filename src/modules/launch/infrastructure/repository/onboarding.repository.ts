import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as UuidV4 } from 'uuid';
import { OnboardingCreateDto } from 'src/modules/launch/infrastructure/dto/onboarding.dto';
import {
  Onboarding,
  OnboardingDocument,
} from 'src/modules/launch/infrastructure/repository/entities/onboarding.entities';

@Injectable()
export class OnboardingMongoRepository {
  constructor(
    @InjectModel(Onboarding.name)
    private readonly onboardingModel: Model<OnboardingDocument>,
  ) {}

  async create(data: OnboardingCreateDto): Promise<any> {
    const newOnboarding = {
      id: UuidV4(),
      emergencyReserve: data.emergencyReserve,
      howManyTimesDidYouCheck: data.howManyTimesDidYouCheck,
      incomeIsEnough: data.incomeIsEnough,
      manageToSave: data.manageToSave,
      yourFinancialLife: data.yourFinancialLife,
    };

    console.log('*****', newOnboarding);

    await this.onboardingModel.create(newOnboarding);

    return newOnboarding;
  }

  async find(id: string): Promise<any> {
    const onboarding = await this.onboardingModel.findOne({ id: id });

    if (!onboarding) {
      return;
    }

    return onboarding;
  }
}
