import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type OnboardingDocument = Onboarding & Document;

@Schema()
export class Onboarding {
  @Prop()
  emergencyReserve: boolean;

  @Prop()
  howManyTimesDidYouCheck: boolean;

  @Prop()
  incomeIsEnough: boolean;

  @Prop()
  manageToSave: boolean;

  @Prop()
  yourFinancialLife: boolean;
}

export const OnboardingSchema = SchemaFactory.createForClass(Onboarding);
