import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NewLaunchDto } from 'src/modules/launch/infrastructure/dto/new-launch.dto';
import { NewLaunchDocument, NewLaunch } from './entities/new-launch.entities';
import { v4 as UuidV4 } from 'uuid';

@Injectable()
export class NewLaunchMongoRepository {
  constructor(
    @InjectModel(NewLaunch.name)
    private readonly newLaunchModel: Model<NewLaunchDocument>,
  ) {}

  async create(data: NewLaunchDto): Promise<any> {
    const newLaunch = {
      id: UuidV4(),
      kindLanch: data.kindLanch,
      date: data.date,
      title: data.title,
      moneyLanch: data.moneyLanch,
    };

    await this.newLaunchModel.create(newLaunch);

    return newLaunch;
  }

  async find(id: string): Promise<any> {
    const launch = await this.newLaunchModel.findOne({ id: id });

    if (!launch) {
      return;
    }

    return launch;
  }

  async deleteOne(id: string): Promise<any> {
    const isLaunch = await this.newLaunchModel.deleteOne({ id: id });

    if (isLaunch.deletedCount === 0) {
      return { result: false };
    }

    return { result: true };
  }

  async findAll(): Promise<any[]> {
    const launch = await this.newLaunchModel.find();

    if (launch.length === 0) {
      return;
    }

    return launch;
  }
}
