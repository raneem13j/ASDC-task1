import Excel from "../models/excelModel.js";
import XLSX from "xlsx";

export const getAllExcel = async (req, res) => {
  try {
    const data = await Excel.find().exec();

    if (data && data.length > 0) {
      res.status(200).json({ data });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const uploadExcel = async (req, res) => {
  try {
    var workbook = XLSX.readFile(req.file.path);
    var sheet_namelist = workbook.SheetNames;
    var x = 0;
    sheet_namelist.forEach(async (element) => {
      var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_namelist[x]]);
      await Excel.insertMany(xlData);
      x++;
    });

    res.status(200).json({ message: "Excel data inserted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};