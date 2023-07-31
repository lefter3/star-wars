import { HttpException, Injectable } from '@nestjs/common';
import { Model, UpdateWriteOpResult } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Starship } from './starship.schema';
import Resources from '../common/swproxy';

@Injectable()
export class StarshipsService extends Resources<Starship> {
  constructor(
    @InjectModel('Starship') private readonly starshipModel: Model<Starship>,
  ) {
    super(starshipModel);
  }

  async getStarshipCount(starship_id: number): Promise<any> {
    const starship = await this.findOne({ starship_id });
    if (!starship) return 0;
    return starship.count;
  }

  async setStarship(starship_id: number, count: number): Promise<Starship> {
    const updateStarship = await this.createOrSet({ starship_id }, count);
    return updateStarship;
  }

  async updateStarship(starship_id: number, change: number): Promise<any> {
    const updateStarship = await this.updateCountOrCreate(
      { starship_id },
      change,
    );
    return updateStarship;
  }
}
