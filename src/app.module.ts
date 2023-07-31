import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { VehicleModule } from './vehicles/vehicle.module';
import { StarshipModule } from './starships/starship.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      'mongodb+srv://kVlqfuPfsy8UaPFn:kVlqfuPfsy8UaPFn@cluster0.fz3pu.mongodb.net/swapi?retryWrites=true&w=majority',
    ),
    VehicleModule,
    StarshipModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
