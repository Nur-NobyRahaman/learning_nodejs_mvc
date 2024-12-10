import cors from "cors";
import express from "express";
const app = express();
import config from "./app/config/index.mjs";

//parser
app.use(express.json());

app.use(cors());

//middleware

const logger = (req, res, next) => {
  console.log(req.url, req.method, req.hostname)
  next()
}
app.get("/",logger, (req, res) => {
  console.log(req.query)
  res.send("Hello World!");
});

app.post("/", (req, res) => {
  console.log(req.body);
  res.send("data got")
})

export default app;
