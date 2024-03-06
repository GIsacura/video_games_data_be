import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Card } from './entities/card.entity';
import { Model } from 'mongoose';
import { CreateCardDto, FilterCardDto, UpdateCardDto } from './dto/cards.dtos';

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
      const { limit, offset } = params;

      const response = await this.cardModel
        .find()
        .limit(limit)
        .skip(offset)
        .exec();
      console.log(response);

      return response;
    }

    const response = await this.cardModel.find().exec();
    console.log(response);

    return response;
  }

  findOne(id: string) {
    const card = this.cardModel.findById(id).exec();

    if (!card) throw new NotFoundException(`Card #${id} not found`);
  }

  update(id: number, updateCardDto: UpdateCardDto) {
    return `This action updates a #${id} card`;
  }

  remove(id: number) {
    return `This action removes a #${id} card`;
  }
}
