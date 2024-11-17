import mongoose from "mongoose";
const { Schema } = mongoose;

const counterSchema = new Schema({
  type: { type: String, required: true },
  count: { type: Number, required: true, default: 0 },
});

counterSchema.statics.getNextSequence = async function (type) {
  const counter = await this.model("Counter").findOneAndUpdate(
    { type },
    { $inc: { count: 1 } },
    { new: true }
  );
  return counter.count;
};

export default mongoose.model("Counter", counterSchema);
