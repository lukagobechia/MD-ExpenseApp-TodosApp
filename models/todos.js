import mongoose from "mongoose";

const todosSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    isCompleted: {
      type: Boolean,
      default: false
    },
  },
  { timestamps: true }
);

export default mongoose.model("todos", todosSchema);
