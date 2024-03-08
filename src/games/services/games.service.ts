import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGameDto, UpdateGameDto, FilterGameDto } from '../dto/game.dtos';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Game } from '../schemas/game.schema';

@Injectable()
export class GamesService {
  constructor(
    @InjectModel(Game.name) private readonly gameModel: Model<Game>,
  ) {}
  create(createGameDto: CreateGameDto) {
    return 'This action adds a new game';
  }

  async findAll(params?: FilterGameDto) {
    if (!params) {
      const response = await this.gameModel.find().limit(10).exec();

      return response;
    }

    const { limit = 100, offset = 0, name } = params;

    if (!name) {
      const response = await this.gameModel
        .find()
        .limit(limit)
        .skip(offset)
        .exec();

      return response;
    }

    const response = await this.gameModel
      .aggregate()
      .search({
        index: 'searchCard',
        text: {
          query: name,
          path: {
            wildcard: '*',
          },
          fuzzy: {},
        },
      })
      .limit(limit)
      .skip(offset);

    return response;
  }
  async findAllAutocomplete(name: string) {
    const response = await this.gameModel
      .aggregate()
      .search({
        index: 'autocompleteCards',
        autocomplete: {
          query: name,
          path: 'name',
          tokenOrder: 'sequential',
        },
      })
      .limit(10)
      .project({
        _id: 0,
        name: 1,
      });

    return response;
  }

  findOne(id: string) {
    const game = this.gameModel.findById(id).exec();

    if (!game) throw new NotFoundException(`Game #${id} not found`);

    return game;
  }

  update(id: number, updateGameDto: UpdateGameDto) {
    return `This action updates a #${id} game`;
  }

  remove(id: number) {
    return `This action removes a #${id} game`;
  }
}
