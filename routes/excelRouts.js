import express from "express";
import upload from '../middleware/upload.js';

const router = express.Router();

import {

    getAllExcel,
    getRowsBySheetId,
    deleteItem,
    editItem,
    uploadExcel

} from "../controllers/excelController.js";



router.get('/', getAllExcel);
router.get('/:sheetId', getRowsBySheetId)
router.delete('/:id', deleteItem);
router.put('/:id', editItem);
router.post('/',upload.single("excel"),uploadExcel);



export default router