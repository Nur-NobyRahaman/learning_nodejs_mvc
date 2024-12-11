import cors from "cors";
import express from "express";
const app = express();
import config from "./app/config/index.mjs";

//parser
app.use(express.json());

app.use(cors());

// router
const userRouter = express.Router();
const courseRouter = express.Router();

app.use("/api/v1/users", userRouter);
app.use("/api/v1/courses", courseRouter);

userRouter.get("/create_user", (req, res) => {
  const user = req.body;
  res.json({
    success: true,
    data: user,
  })
})

courseRouter.post("/create_course", (req, res) => {
  const course = req.body;
  res.json({
    success: true,
    data: course
  })
})

//middleware

const logger = (req, res, next) => {
  // console.log(req.url, req.method, req.hostname)
  next()
}


app.get("/", logger, (req, res, nextFunction) => {
  try {
    res.send(HelloWorld);
  } catch (error) {
    nextFunction(error)
  }
  
});

app.post("/", (req, res) => {
  // console.log(req.body);
  res.send("data got")
})

// global error handling
app.use((error, req, res, nextFunction) => {
  res.send({
    success: false,
    message: "something went wrong",
    data: error
  })
})

export default app;
