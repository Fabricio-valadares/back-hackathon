import { IsBoolean, IsNotEmpty } from 'class-validator';

export class OnboardingCreateDto {
  @IsNotEmpty()
  @IsBoolean()
  emergencyReserve: boolean;

  @IsNotEmpty()
  @IsBoolean()
  howManyTimesDidYouCheck: boolean;

  @IsNotEmpty()
  @IsBoolean()
  incomeIsEnough: boolean;

  @IsNotEmpty()
  @IsBoolean()
  manageToSave: boolean;

  @IsNotEmpty()
  @IsBoolean()
  yourFinancialLife: boolean;
}
