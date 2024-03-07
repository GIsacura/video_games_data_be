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
import { CardsService } from '../services/cards.service';
import { CreateCardDto, FilterCardDto, UpdateCardDto } from '../dto/cards.dtos';
import { MongoIdPipe } from 'src/common/mongo-id.pipe';

@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Post()
  create(@Body() createCardDto: CreateCardDto) {
    return this.cardsService.create(createCardDto);
  }

  @Get('/')
  async findAll(@Query() params: FilterCardDto) {
    return this.cardsService.findAll(params);
  }

  @Get('/autocomplete')
  async findAllAutocomplete(@Query() params: FilterCardDto) {
    return this.cardsService.findAllAutocomplete(params.name);
  }

  @Get('/:id')
  findOne(@Param('id', MongoIdPipe) id: string) {
    return this.cardsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCardDto: UpdateCardDto) {
    return this.cardsService.update(+id, updateCardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cardsService.remove(+id);
  }
}
