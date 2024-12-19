import express from "express";
import { studentController } from "./student.contoler.mjs";
const router = express.Router();

router.post("/create-student", studentController.createStudent);
router.get("/get-student", studentController.getStudent);
router.get("/get-student/:studentId",studentController.getSingleStudent)

export const studentRoute = router;