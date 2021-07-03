import mongoose, {Schema, Document} from "mongoose";

export type SensorType = {
  name: String;
  serial: String;
  status: Number;
};

export interface ISensor extends Document {
  name: String;
  serial: String;
  status: Number;
}

export const SensorSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  serial: {
    type: String,
    required: true,
    index: true,
  },
  status: {
    type: Number,
    required: true,
  },
});

export const getSensorModel = () => {
  return mongoose.model<ISensor>("Sensor", SensorSchema);
};