import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Game extends Document {
  @Prop()
  slug: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  metacritic: number;

  @Prop()
  released: string;

  @Prop()
  tba: string;

  @Prop()
  updated: string;

  @Prop()
  website: string;

  @Prop()
  rating: number;

  @Prop()
  rating_top: number;

  @Prop()
  playtime: number;

  @Prop()
  achievements_count: number;

  @Prop()
  ratings_count: number;

  @Prop()
  suggestions_count: number;

  @Prop()
  game_series_count: number;

  @Prop()
  reviews_count: number;

  @Prop()
  platforms: string;

  @Prop()
  developers: string;

  @Prop()
  genres: string;

  @Prop()
  publishers: string;

  @Prop()
  esrb_rating: number;

  @Prop()
  added_status_yet: number;

  @Prop()
  added_status_owned: number;

  @Prop()
  added_status_beaten: number;

  @Prop()
  added_status_toplay: number;

  @Prop()
  added_status_dropped: number;

  @Prop()
  added_status_playing: number;
}

export const GameSchema = SchemaFactory.createForClass(Game);
