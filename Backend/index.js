import dotenv from "dotenv"
import express from "express"
import cookie from "cookie-parser"
import cors from "cors"
import connectDB from "./config/db.js"
import bodyParser from "body-parser"
import { authRouter } from "./routes/auth.routes.js"

dotenv.config()

const app = express();
connectDB();

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:5173/',
    credentials: true 
}))

app.use(authRouter);

app.get('/', (req, res) => {
    res.send('Hello');
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server is listening at ${PORT}`);
})


