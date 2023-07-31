import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Starship extends Document {
  @Prop({ type: Number, required: true, unique: true })
  starship_id: number;

  @Prop({ type: Number, default: 0, min: 0 })
  count: number;
}

export const StarshipSchema = SchemaFactory.createForClass(Starship);
