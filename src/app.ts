import express,{Application,Request,Response} from "express";
import cors from 'cors'
const app : Application = express();
const port = 3000;

app.use(cors())

//parser
app.use(express.json())
app.use(express.urlencoded({extended: true}))


//Testing
app.get("/", (req:Request, res:Response) => {
  res.send("Working Successfully");
});

export default app