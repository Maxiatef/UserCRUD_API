import express, { json, urlencoded } from 'express';
import cors from 'cors';
const app = express();

require('dotenv').config();
import './config/DataBaseConfig.js';
const port = process.env.PORT || 9000;

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

app.use("/users", require("./Routes/userRouter"))

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});