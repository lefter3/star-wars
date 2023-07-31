import { Module } from '@nestjs/common';
import { VehiclesService } from './vehicle.service';
import { VehiclesController } from './vehicle.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { VehicleSchema } from './vehicle.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Vehicle', schema: VehicleSchema }]),
  ],
  providers: [VehiclesService],
  controllers: [VehiclesController],
})
export class VehicleModule {}
