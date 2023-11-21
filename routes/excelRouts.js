import express from "express";
import upload from '../middleware/upload.js';

const router = express.Router();

import {

    getAllExcel,
    deleteItem,
    editItem,
    uploadExcel

} from "../controllers/excelController.js";



router.get('/', getAllExcel);
router.delete('/:id', deleteItem);
router.put('/:id', editItem);
router.post('/',upload.single("excel"),uploadExcel);



export default router