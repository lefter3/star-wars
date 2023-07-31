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
import { StarshipsService } from './starship.service';

@Controller('starships')
export class StarshipsController {
  constructor(public starshipsServices: StarshipsService) {}

  @Get('/')
  async getStarships(@Query('page') page: number) {
    const starships = await this.starshipsServices.getResources(
      'starships',
      page,
    );
    return starships;
  }

  @Get('/:starshipId')
  async getStarshipCount(
    @Res() res: FastifyReply,
    @Param('starshipId', ParseIntPipe) starshipId: number,
  ) {
    const starship = await this.starshipsServices.getStarshipCount(starshipId);
    return res.status(HttpStatus.OK).send(starship);
  }

  @Get('get/:starshipId')
  async getStarship(
    @Param('starshipId', ParseIntPipe) starshipId: number,
  ) {
    const starship = await this.starshipsServices.getResource(
      'starships',
      starshipId,
    );
    if (!starship)
      return new HttpException("Starship was not found", HttpStatus.NOT_FOUND)
    return starship;
  }

  @Put('/:starshipId')
  async setStarship(
    @Body() body: { count: number },
    @Param('starshipId', ParseIntPipe) starshipId: number,
  ) {
    const starship = await this.starshipsServices.setStarship(
      starshipId,
      body.count,
    );
    if (!starship)
      return new HttpException("Starship was not set", HttpStatus.BAD_REQUEST)
    return starship
  }

  @Put('/update/:starshipId')
  async updateStarship(
    @Body() body: { change: number },
    @Param('starshipId', ParseIntPipe) starshipId: number,
  ) {
    const starship = await this.starshipsServices.updateStarship(
      starshipId,
      body.change,
    );
    if (!starship)
      return new HttpException("Starship was not set", HttpStatus.BAD_REQUEST)
    return starship;
  }
}
