import mongoose from "mongoose";
const { Schema } = mongoose;
import bcrypt from "bcrypt";

const userSchema = new Schema({
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    required: true,
    enum: ["user", "admin"],
    default: "user",
  },
  loggedInAt: { type: Date },
});

//encrypt password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    console.log("not hashing");
    next();
  }
  console.log("password before hash", this.password);
  this.password = await bcrypt.hash(this.password, 10);
});

//export userModel
const userModel = mongoose.model("User", userSchema);
export default userModel;
