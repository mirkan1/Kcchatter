import express, { Request, Response} from "express";
import mongoose from "mongoose";
import User from "./models/User";
import Jotform from "./jotform-api";
import Reader from "./excell-reader";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
const jotform = new Jotform();
const app = express();
const path = "./src/static/records.csv";
const reader = new Reader(path);

app.use(
    cors({
        origin: "*"
    })
);
app.use(express.json());

const PORT = process.env.PORT || 3000;

const db = mongoose.connect(process.env.MONGOOSE_URL).then(
    () => {
        console.log("Connected to MongoDB");
        app.listen(PORT, () => {
            console.log(`Example app listening on http://localhost:${PORT}`);
        });
    }
)

app.get('/', (req:Request, res:Response) => {
    res.send('Hello World!');
});

app.post("/api/user", async (req:Request, res:Response) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
        created_at: new Date(),
        updated_at: new Date()
    });
    const newUser = await user.save();
    res.json(newUser);
});

app.get("/api/user", async (req:Request, res:Response) => {
    const email = req.query.email;
    // exact match only
    const users = await User.find({email, match: {$regex: email, $options: "i"}});
    if (users.length > 0) {
        res.json({user:users[0], status:200});
    } else {
        res.json({
            message: "User not found of email: " + email,
            status: 404            
        });
    }
});

app.get("/api/getForm", async (req:Request, res:Response) => {
    const formId = req.query.formId;
    const form = await jotform.getForm(formId.toString());
    console.log(formId, form)
    console.log(await jotform.getJotform().getForm(formId.toString()))
    res.json(form);
});

app.get("/api/headers", async (req:Request, res:Response) => {
    const headers = reader.getHeaders()
    res.json(headers);
});

app.get("/api/rows", async (req:Request, res:Response) => {
    const content = reader.getRows(undefined)
    res.json(content);
});

app.get("/api/row", async (req:Request, res:Response) => {
    //@ts-ignore
    const content = reader.getRow(req.query.row)
    res.json(content);
});

app.get("/api/getRowByEmail", async (req:Request, res:Response) => {
    console.log(reader)
    console.log(req.query.email)
    //@ts-ignore
    const content = reader.getRowByEmail(req.query.email)
    res.json(content);
});
