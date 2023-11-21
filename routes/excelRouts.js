import express from "express";
import upload from '../middleware/upload.js';

const router = express.Router();

import {

    getAllExcel,
    uploadExcel

} from "../controllers/excelController.js";


router.get('/', getAllExcel);
router.post('/',upload.single("excel"),uploadExcel);



export default router