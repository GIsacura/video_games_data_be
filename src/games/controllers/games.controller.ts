import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { GamesService } from '../services/games.service';
import { CreateGameDto, UpdateGameDto, FilterGameDto } from '../dto/game.dtos';
import { MongoIdPipe } from 'src/common/mongo-id.pipe';

@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Post()
  create(@Body() createGameDto: CreateGameDto) {
    return this.gamesService.create(createGameDto);
  }

  @Get('/')
  findAll(@Query() params: FilterGameDto) {
    if (Object.keys(params).length > 0) {
      return this.gamesService.findAll(params);
    }
    return this.gamesService.findAll();
  }

  @Get('/autocomplete')
  findAllAutocomplete(@Query() params: FilterGameDto) {
    return this.gamesService.findAllAutocomplete(params.name);
  }

  @Get('/:id')
  findOne(@Param('id', MongoIdPipe) id: string) {
    return this.gamesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGameDto: UpdateGameDto) {
    return this.gamesService.update(+id, updateGameDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gamesService.remove(+id);
  }

  // @Patch('updateInfo')
  // updateInfo() {
  //   return this.gamesService.updateContent();
  // }
}
