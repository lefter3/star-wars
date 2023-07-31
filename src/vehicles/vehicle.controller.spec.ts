import { Test, TestingModule } from '@nestjs/testing';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { VehiclesController } from './vehicle.controller';
import { VehiclesService } from './vehicle.service';
import { Connection, connect, Model } from 'mongoose';
import { Vehicle, VehicleSchema } from './vehicle.schema';
import { getModelToken } from '@nestjs/mongoose';
import { VehicleDTOSet } from '../common/test.dto.stub';

describe('VehicleController', () => {
  let appController: VehiclesController;
  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;
  let vehicleModel: Model<Vehicle>;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    mongoConnection = (await connect(uri)).connection;
    vehicleModel = mongoConnection.model('Vehicle', VehicleSchema);
    const app: TestingModule = await Test.createTestingModule({
      controllers: [VehiclesController],
      providers: [
        VehiclesService,
        { provide: getModelToken('Vehicle'), useValue: vehicleModel },
      ],
    }).compile();
    appController = app.get<VehiclesController>(VehiclesController);
  });

  afterAll(async () => {
    await mongoConnection.dropDatabase();
    await mongoConnection.close();
    await mongod.stop();
  });

  describe('get vehicle resources', () => {
    it('should get vehicles', async () => {
      let result = await appController.getVehicles(1)
      expect(JSON.parse(result).count > 0).toBe(true)
    });

    it('should get a vehicle', async () => {
      let result: any = await appController.getVehicle(4)
      expect(JSON.parse(result).name).toBeDefined()
    });

  });

  describe('set/update quantity ', () => {

    it('should not save a negative value', async () => {
      const vehicle: any =
        await appController.setVehicle(
          { count: -1 },
          VehicleDTOSet.vehicle_id,
        );
      expect(vehicle.status).toBe(400);
    });

    it('should return the saved value', async () => {
      const vehicle: any =
        await appController.setVehicle(
          { count: VehicleDTOSet.count },
          VehicleDTOSet.vehicle_id,
        );
      expect(vehicle.count).toBe(VehicleDTOSet.count);
    });

    it('should return the updated value', async () => {
      let change = -1
      const vehicle: any =
        await appController.updateVehicle(
          { change },
          VehicleDTOSet.vehicle_id,
        );
      expect(vehicle.count).toBe(VehicleDTOSet.count + change);
    });

    it('should not update count value to < 0', async () => {
      const vehicle: any =
        await appController.updateVehicle(
          { change: VehicleDTOSet.count * -1 },
          VehicleDTOSet.vehicle_id,
        );

      expect(vehicle.count).toBe(undefined);
    });
  });

});
