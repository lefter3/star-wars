import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Vehicle extends Document {
  @Prop({ type: Number, required: true, unique: true })
  vehicle_id: number;

  @Prop({ type: Number, default: 0, min: 0 })
  count: number;
}

export const VehicleSchema = SchemaFactory.createForClass(Vehicle);
