import {
  Controller,
  Get,
  Put,
  Res,
  Body,
  HttpStatus,
  Param,
  Query,
  ParseIntPipe,
  HttpException,
} from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { VehiclesService } from './vehicle.service';

@Controller('vehicles')
export class VehiclesController {
  constructor(public vehiclesServices: VehiclesService) {}

  @Get('/')
  async getVehicles(@Query('page') page: number) {
    const vehicles = await this.vehiclesServices.getResources(
      'vehicles',
      page,
    );
    return vehicles
  }

  @Get('/:vehicleId')
  async getVehicleCount(
    @Param('vehicleId', ParseIntPipe) vehicleId: number,
  ) {
    const vehicle = await this.vehiclesServices.getVehicleCount(vehicleId);
    if (!vehicle)
      return new HttpException("Vehicle was not found", HttpStatus.NOT_FOUND)
    return vehicle;
  }

  @Get('get/:vehicleId')
  async getVehicle(
    @Param('vehicleId', ParseIntPipe) vehicleId: number,
  ) {
    const vehicle = await this.vehiclesServices.getResource(
      'vehicles',
      vehicleId,
    );
    if (!vehicle)
      return new HttpException("Vehicle was not found", HttpStatus.NOT_FOUND)
    return vehicle;
  }

  @Put('/:vehicleId')
  async setVehicle(
    @Body() body: { count: number },
    @Param('vehicleId', ParseIntPipe) vehicleId: number,
  ) {
    const vehicle = await this.vehiclesServices.setVehicle(
      vehicleId,
      body.count,
    );
    if (!vehicle)
      return new HttpException("Vehicle was not set", HttpStatus.BAD_REQUEST)
    return vehicle
  }

  @Put('/update/:vehicleId')
  async updateVehicle(
    @Body() body: { change: number },
    @Param('vehicleId', ParseIntPipe) vehicleId: number,
  ) {
    const vehicle = await this.vehiclesServices.updateVehicle(
      vehicleId,
      body.change,
    );
    if (!vehicle)
      return new HttpException("Vehicle was not set", HttpStatus.BAD_REQUEST)
    return vehicle;
  }
}
