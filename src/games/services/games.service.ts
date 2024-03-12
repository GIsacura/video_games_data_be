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
      const response = await this.gameModel.find().limit(100).exec();

      return response;
    }

    const { limit = 100, offset = 0, name } = params;

    if (!name) {
      const response = await this.gameModel
        .find()
        .limit(Number(limit))
        .skip(Number(offset))
        .exec();

      return response;
    }

    const response = await this.gameModel
      .aggregate()
      .search({
        index: 'searchGame',
        text: {
          query: name,
          path: {
            wildcard: '*',
          },
          fuzzy: {},
        },
      })
      .limit(Number(limit))
      .skip(Number(offset));

    return response;
  }
  async findAllAutocomplete(name: string) {
    const response = await this.gameModel
      .aggregate()
      .search({
        index: 'autocompleteGame',
        autocomplete: {
          query: name,
          path: 'name',
          tokenOrder: 'sequential',
        },
      })
      .limit(10)
      .project({
        name: 1,
      });

    return response;
  }

  findOne(id: string) {
    const game = this.gameModel.findById(id).exec();

    if (!game) {
      throw new NotFoundException(`Game #${id} not found`);
    }

    return game;
  }

  update(id: number, updateGameDto: UpdateGameDto) {
    return `This action updates a #${id} game`;
  }

  remove(id: number) {
    return `This action removes a #${id} game`;
  }
}
