import express from "express";
import cors from "cors";
const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());
export default app;