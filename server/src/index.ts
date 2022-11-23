import express, { Request, Response} from "express";
import { setTimeout } from 'timers/promises'
import mongoose from "mongoose";
import User from "./models/User";
import Jotform from "./jotform-api";
import Reader from "./excell-reader";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
const limit = parseInt(process.env.LIMIT || "1000");
const jotform = new Jotform(true, process.env.FORM_ID, limit);
const app = express();
const path = "./src/static/records.csv";
const reader = new Reader(path);

app.use(
    cors({
        origin: "*"
    })
);
app.use(express.json());

const PORT = process.env.PORT || 5000;

const db = mongoose.connect(process.env.MONGOOSE_URL).then(
    async () => {
        console.log("MongoDB is ready!");
        await jotform.setSubmissions();
        console.log("JotForm is ready!");
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
        password: req.body.password || "",
        role: req.body.role,
        created_at: new Date(),
        updated_at: new Date(),
        photo: req.body.photo || ""
    });
    const newUser = await user.save();
    res.json(newUser);
});

app.put("/api/user/:id", async (req:Request, res:Response) => {
    const user = await User.findById(req.params.id);
    if (user) {
        user.name = req.body.name;
        user.email = req.body.email;
        user.password = req.body.password || "";
        user.role = req.body.role;
        user.updated_at = new Date();
        user.photo = req.body.photo || "";
        const updatedUser = await user.save();
        res.json(updatedUser);
    } else {
        res.status(404).json({message: "User not found"});
    }
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

app.get("/api/getRowsByEmail", async (req:Request, res:Response) => {
    //@ts-ignore
    const content = reader.getRowsByEmail(req.query.email)
    res.json(content);
});

app.post("/api/editSubmissionField", async (req:Request, res:Response) => {
    //@ts-ignore
    const content = await jotform.editSubmissionField(req.query.submissionId, req.query.fieldId, req.query.value);
    // const content = await jotform.editSubmission(req.query.submissionId, req.query.data);
    res.json(content);
});

app.get("/api/getSubmission", async (req:Request, res:Response) => {
    //@ts-ignore
    const content = await jotform.getSubmission(req.query.submissionId);
    res.json(content);
});

app.delete("/api/deleteSubmission", async (req:Request, res:Response) => {
    //@ts-ignore
    const content = await jotform.deleteSubmission(req.query.submissionId);
    res.json(content);
});

app.get("/api/getSubmissions", (req:Request, res:Response) => {
    //@ts-ignore
    const content = jotform.getSubmissions();
    const contentLength = Object.keys(content).length;
    res.json({
        content: {...content},
        status: 200,
        count: contentLength
    });
});

app.get("/api/getContentByEmail", (req:Request, res:Response) => {
    //@ts-ignore
    const content = jotform.getContentByEmail(req.query.email);
    const contentLength = Object.keys(content).length;
    res.json({
        content: {...content},
        status: 200,
        count: contentLength
    });
});

app.get("/api/getSubmissionsByEmail", (req:Request, res:Response) => {
    //@ts-ignore
    const content = jotform.getSubmissionsByEmail(req.query.email);
    const contentLength = Object.keys(content).length;
    res.json({
        content: {...content},
        status: 200,
        count: contentLength
    });
});

app.get("/api/getUsage", async (req:Request, res:Response) => {
    //@ts-ignore
    const content = await jotform.getUsage();
    res.json(content);
});