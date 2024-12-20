import cors from "cors";
import express from "express";
const app = express();
import config from "./app/config/index.mjs";
import { studentRoute } from "./app/modules/student/student.route.mjs";

//parser
app.use(express.json());
app.use(cors());
//application routes
app.use("/api/v1/student",studentRoute)

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

// error router handling
// app.all("*", (req, res) => {
//   res.status(400).json({
//     success: false,
//     message: "route not define",
   
//   }) 
// })

// global error handling
app.use((error, req, res, next) => {
  if (error) {
    res.status(400).json({
      success: false,
      message: "something went wrong",
      data: error
    }) 
  }
 
  
})

export default app;
