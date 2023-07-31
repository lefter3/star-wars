import { Test, TestingModule } from '@nestjs/testing';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { StarshipsController } from './starship.controller';
import { StarshipsService } from './starship.service';
import { Connection, connect, Model } from 'mongoose';
import { Starship, StarshipSchema } from './starship.schema';
import { getModelToken } from '@nestjs/mongoose';
import { StarshipDTOSet } from '../common/test.dto.stub';

describe('StarshipController', () => {
  let appController: StarshipsController;
  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;
  let starshipModel: Model<Starship>;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    mongoConnection = (await connect(uri)).connection;
    starshipModel = mongoConnection.model('Starship', StarshipSchema);
    const app: TestingModule = await Test.createTestingModule({
      controllers: [StarshipsController],
      providers: [
        StarshipsService,
        { provide: getModelToken('Starship'), useValue: starshipModel },
      ],
    }).compile();
    appController = app.get<StarshipsController>(StarshipsController);
    // starshipsService = app.get<StarshipsService>(StarshipsService);
  });

  afterAll(async () => {
    await mongoConnection.dropDatabase();
    await mongoConnection.close();
    await mongod.stop();
  });

  describe('get starship resources', () => {
    it('should get starships', async () => {
      let result = await appController.getStarships(1)
      expect(JSON.parse(result).count > 0).toBe(true)
    });

    it('should get a starship', async () => {
      let result: any = await appController.getStarship(2)
      expect(JSON.parse(result).name).toBeDefined()
    });

  });

  describe('set/update quantity ', () => {

    it('should not save a negative value', async () => {
      const starship: any =
        await appController.setStarship(
          { count: -1 },
          StarshipDTOSet.starship_id,
        );
      expect(starship.status).toBe(400);
    });

    it('should return the saved value', async () => {
      const starship: any =
        await appController.setStarship(
          { count: StarshipDTOSet.count },
          StarshipDTOSet.starship_id,
        );
      expect(starship.count).toBe(StarshipDTOSet.count);
    });

    it('should return the updated value', async () => {
      let change = -1
      const starship: any =
        await appController.updateStarship(
          { change },
          StarshipDTOSet.starship_id,
        );
      expect(starship.count).toBe(StarshipDTOSet.count + change);
    });

    it('should not update count value to < 0', async () => {
      const starship: any =
        await appController.updateStarship(
          { change: StarshipDTOSet.count * -1 },
          StarshipDTOSet.starship_id,
        );

      expect(starship.count).toBe(undefined);
    });
  });

});
