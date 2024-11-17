import mongoose from "mongoose";
const { Schema } = mongoose;
import Counter from "./counterModel.js";

const frameSchema = new Schema({
  _id: { type: Number },
  name: { type: String, required: true, unique: true },
  width: { type: Number, required: true },
  height: { type: Number, required: true },
  imageHeight: { type: Number, required: true },
  imageWidth: { type: Number, required: true },
  price: { type: Number, required: true },
  numberOfImages: { type: Number, required: true },
  description: { type: String },
  frameImage: { type: String, required: true },
  frameBackgrounds: [{ type: String, required: true }],
});

frameSchema.pre("save", async function (next) {
  //get counter reference through findOne method and if doesn't exist create one
  if (!this.isNew) return next(); // Skip if the document is not new

  const counter = await Counter.findOne({ type: "frameId" });
  if (!counter) {
    const newCounter = new Counter({ type: "frameId" });
    await newCounter.save();
  }

  //get next sequence number
  const frameId = await Counter.getNextSequence("frameId");
  console.log(frameId, "frameId");
  this._id = frameId;
});
const frameModel = mongoose.model("Frame", frameSchema);
export default frameModel;
