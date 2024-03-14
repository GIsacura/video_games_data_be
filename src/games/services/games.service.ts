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
      const response = await this.gameModel.aggregate().facet({
        records: [{ $sort: { name: 1 } }, { $limit: 50 }],
        pageInfo: [{ $group: { _id: null, totalRecords: { $sum: 1 } } }],
      });

      return response[0];
    }

    const { limit = 50, offset = 0, name } = params;

    if (!name) {
      const response = await this.gameModel.aggregate().facet({
        records: [
          { $sort: { name: 1 } },
          { $skip: Number(offset) },
          { $limit: Number(limit) },
        ],
        pageInfo: [{ $group: { _id: null, totalRecords: { $sum: 1 } } }],
      });

      return response[0];
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
      .facet({
        records: [
          { $sort: { name: 1 } },
          { $skip: Number(offset) },
          { $limit: Number(limit) },
        ],
        pageInfo: [{ $group: { _id: null, totalRecords: { $sum: 1 } } }],
      });

    return response[0];
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
