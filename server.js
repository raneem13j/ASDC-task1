import express  from "express";
import dotenv  from "dotenv";
import morgan from "morgan";
import bodyParser from 'body-parser';
import cors from 'cors';
import connectDB from "./config/db.js";
import path from "path";
import excelRoute from "./routes/excelRouts.js"


dotenv.config();

await connectDB();

const PORT = process.env.PORT || 5000;
const PORT2 = process.env.PORT || 3000;
const app = new express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


if (process.env.NODE_ENV === "development"){
  app.use(morgan('dev'));
};
app.use(express.json());
app.set('view engine','ejs');
const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

app.use(express.static(path.resolve(__dirname, 'public')));
app.use(cors());

//routs part


app.use('/excel' , excelRoute);

app.get("/", (req, res) =>
   res.send("server is on :)")
)


app.listen(
    PORT,
    console.log(`Server is running in ${process.env.NODE_ENV} on port ${PORT}!!!`)
  ); 
