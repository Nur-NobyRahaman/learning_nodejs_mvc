import express from "express";
import { studentController } from "./student.contoler.mjs";
const router = express.Router();

router.post("/create-student", studentController.createStudent);
router.get("/", studentController.getStudent);
router.get("/:studentId", studentController.getSingleStudent);
router.delete("/:studentId", studentController.deleteStudent);

export const studentRoute = router;