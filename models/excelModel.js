import mongoose from "mongoose";
const { Schema, model } = mongoose;

const excelSchema = new Schema(
  {
    sheetId: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Excel = model("Excel", excelSchema);
export default Excel;
