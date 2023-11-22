import Excel from "../models/excelModel.js";
import XLSX from "xlsx";
import { v4 as uuidv4 } from 'uuid';

const generateSheetId = () => {
    return uuidv4();
  };

const columnMapping = {
    "Name": "name",
    "Description": "description",
    "Location": "location",
    "Price": "price",
    "Color": "color",
    
  };  


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
      const sheetId = generateSheetId();
      var workbook = XLSX.readFile(req.file.path);
      var sheet_namelist = workbook.SheetNames;
      var x = 0;
  
      sheet_namelist.forEach(async (element) => {
        var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_namelist[x]], { header: 1 });
  
        xlData = xlData.slice(1).map((row) => {
          const mappedRow = {};
          row.forEach((value, index) => {
            const columnHeader = xlData[0][index];
            const fieldName = columnMapping[columnHeader] || columnHeader.toLowerCase();
            mappedRow[fieldName] = value;
          });
          return { ...mappedRow, sheetId };
        });
        await Excel.insertMany(xlData);
        x++;
      });
  
      res.status(200).json({ message: "Excel data inserted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };


  export const getRowsBySheetId = async (req, res) => {
    try {
      const sheetId = req.params.sheetId;
      const rows = await Excel.find({ sheetId }).exec();
  
      if (rows && rows.length > 0) {
        res.status(200).json({ data: rows });
      } else {
        res.status(404).json({ message: "No rows found for the specified sheet ID" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };



export const deleteItem = async (req, res) => {
    try {
      const id = req.params.id;
      await Excel.deleteOne({ _id: id });
      res.status(200).json({ message: "Document deleted successfully." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error });
    }
  };


  export const editItem = async (req, res) => {
    try {
        const id = req.params.id;
        const updateFields = {};

        if (req.body.name) updateFields.name = req.body.name;
        if (req.body.description) updateFields.description = req.body.description;
        if (req.body.location) updateFields.location = req.body.location;
        if (req.body.price) updateFields.price = req.body.price;
        if (req.body.color) updateFields.color = req.body.color;
      
        const item = await Excel.findByIdAndUpdate(id, {
          $set: updateFields,
        }, { new: true });
    
        if (!item) return res.status(404).send("Document not found");
        res.status(200).json("Document updated successfully.");
      } catch (error) {
        console.error(error);
        res.status(500).send("Error updating document in the database");
      }
  }  