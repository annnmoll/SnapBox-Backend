import mongoose from "mongoose";
const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    name: { type: String, required: true },
    gender: { type: String, required: true },
    //selected frame must refer to another schema name :"Frame"
    selectedFrame: {
      type: Schema.Types.ObjectId,
      ref: "Frame",
      required: true,
    },
    transactionId: { type: String, required: true },
    transactionStatus: { type: String, required: true },
    amountPaid: { type: Number, required: true },
    location: { type: String, required: true },
    remarks: { type: String, required: false },
    numberOfCopies: { type: Number, required: true, default: 1 },
    rating: { type: Number, required: false },
  },
  { timestamps: true }
);

const orderModel = mongoose.model("Order", orderSchema);
export default orderModel;
