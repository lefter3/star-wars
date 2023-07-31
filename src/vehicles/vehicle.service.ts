import { HttpException, Injectable } from '@nestjs/common';
import { Model, UpdateWriteOpResult } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Vehicle } from './vehicle.schema';
import Resources from '../common/swproxy';

@Injectable()
export class VehiclesService extends Resources<Vehicle> {
  constructor(
    @InjectModel('Vehicle') private readonly vehicleModel: Model<Vehicle>,
  ) {
    super(vehicleModel);
  }

  async getVehicleCount(vehicle_id: number): Promise<number> {
    const vehicle = await this.findOne({ vehicle_id });
    if (!vehicle) return 0; 
    return vehicle.count;
  }

  async setVehicle(vehicle_id: number, count: number): Promise<Vehicle> {
    const updateVehicle = await this.createOrSet({ vehicle_id }, count);
    return updateVehicle;
  }

  async updateVehicle(vehicle_id: number, change: number): Promise<any> {
    const updateVehicle = await this.updateCountOrCreate(
      { vehicle_id },
      change,
    );
    return updateVehicle;
  }
}
