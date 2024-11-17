import mongoose from "mongoose";
const { Schema } = mongoose;

const frameSchema = new Schema({
  name: { type: String, required: true },
  width: { type: Number, required: true },
  height: { type: Number, required: true },
  imageHeight: { type: Number, required: true },
  imageWidth: { type: Number, required: true },
  price: { type: Number, required: true },
  numberOfImages: { type: Number, required: true },
  description: { type: String },
  frameImage: { type: String, required: true },
  frameBackgrounds: [{ type: String, required: true }],
  frameId: [{ type: Number, required: true }],
});

const frameModel = mongoose.model("Frame", frameSchema);
export default frameModel;
