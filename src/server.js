import express from "express";
import cors from "cors";
import apiRouter from "./routers/apiRouter";

const app = express();

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(process.cwd() + "/form-to-excel-front/build"));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/form-to-excel-front/build/index.html");
});

app.use("/api", apiRouter);

export default app;
