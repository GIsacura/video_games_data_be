import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Card extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ type: Number })
  spawnLevel: number;

  @Prop({ type: Number })
  cost: number;

  @Prop({ type: Number })
  count: number;

  @Prop({ type: Number })
  crownTowerDamage: number;

  @Prop({ type: Number })
  damage: number;

  @Prop({ type: Number })
  damagePerSecond: number;

  @Prop({ type: Number })
  deathDamage: number;

  @Prop({ type: Number })
  health: number;

  @Prop({ type: Number })
  hitSpeed: number;

  @Prop({ type: Number })
  level: number;

  @Prop({ type: Number })
  maximumSpawned: number;

  @Prop({ type: Number })
  radius: number;

  @Prop({ type: Number })
  range: number;

  @Prop({ type: Number })
  spawnDPS: number;

  @Prop({ type: Number })
  spawnDamage: number;

  @Prop({ type: Number })
  spawnHealth: number;

  @Prop({ type: Number })
  spawnSpeed: number;

  @Prop({ type: Number })
  spawnerHealth: number;

  @Prop({ type: Number })
  troopSpawned: number;

  @Prop()
  type: string;
}

export const CardSchema = SchemaFactory.createForClass(Card);
