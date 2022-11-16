import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type NewLaunchDocument = NewLaunch & Document;

@Schema()
export class NewLaunch {
  @Prop()
  id: string;

  @Prop()
  kindLanch: string;

  @Prop()
  date: string;

  @Prop()
  title: string;

  @Prop()
  moneyLanch: string;

  @Prop()
  created_at: Date;

  @Prop()
  update_at: Date;
}

export const NewLaunchSchema = SchemaFactory.createForClass(NewLaunch);
