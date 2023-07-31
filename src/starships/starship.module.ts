import { Module } from '@nestjs/common';
import { StarshipsService } from './starship.service';
import { StarshipsController } from './starship.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Starship, StarshipSchema } from './starship.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Starship', schema: StarshipSchema }]),
    // MongooseModule.forFeature([
    //   {
    //     name: Starship.name,
    //     schema: StarshipSchema,
    //   },
    // ]),
  ],
  providers: [StarshipsService],
  controllers: [StarshipsController],
})
export class StarshipModule {}
