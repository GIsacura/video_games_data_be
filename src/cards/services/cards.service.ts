import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Card } from '../schemas/card.schema';
import { Model } from 'mongoose';
import { CreateCardDto, FilterCardDto, UpdateCardDto } from '../dto/cards.dtos';

@Injectable()
export class CardsService {
  constructor(
    @InjectModel(Card.name) private readonly cardModel: Model<Card>,
  ) {}

  create(createCardDto: CreateCardDto) {
    return 'This action adds a new card';
  }

  async findAll(params?: FilterCardDto) {
    if (params) {
      const { limit = 100, offset = 0, name } = params;

      const response = await this.cardModel
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

    const response = await this.cardModel.find().exec();

    return response;
  }
  async findAllAutocomplete(name: string) {
    const response = await this.cardModel
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
    const card = this.cardModel.findById(id).exec();

    if (!card) throw new NotFoundException(`Card #${id} not found`);

    return card;
  }

  update(id: number, updateCardDto: UpdateCardDto) {
    return `This action updates a #${id} card`;
  }

  remove(id: number) {
    return `This action removes a #${id} card`;
  }
}
