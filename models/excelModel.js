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
    action: {
        type: String,
        required: true,
      },
    responsibilities: {
        type: String,
        required: true,
      },
    dueToData: {
        type: Date,
        required: true,
        default: new Date(),
      },

  },
  { timestamps: true },

  );

const Excel = model("Excel", excelSchema);
export default Excel;