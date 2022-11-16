import express, { Request, Response} from "express";
import mongoose from "mongoose";
import User from "./models/User";
import Jotform from "./jotform-api";
import dotenv from "dotenv";
dotenv.config();
const app = express();
app.use(express.json());



const PORT = process.env.PORT || 3000;
console.log("process.env.MONGOOSE_URL", process.env.MONGOOSE_URL)
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