import { studentServices } from "./student.services.mjs";

const createStudent = async (req, res) => {
    try {
        const  {student:studentData} = req.body;
    // will call services
    const result = await studentServices.createStudentIntoDB(studentData);
    // send res
        res.status(200).json({
            success: true,
            message: "Student is created successfully",
            data: result,
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Student is created failed;",
            data: error.errorResponse,
        })
        console.log(error.errorResponse)
    }
    
}

const getStudent = async (req, res) => {
    try {
    // will call services
    const result = await studentServices.getAllStudentIntoDB();
    // send res
        res.status(200).json({
            success: true,
            message: "Student data fetch successfully",
            data: result,
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Student data fetch failed;",
            data: error.errorResponse,
        })
        console.log(error.errorResponse)
    }
    
}

const getSingleStudent = async(req,res) => {
    try {
        const { studentId } = req.params;
      
        const result = await studentServices.getSingleStudentIntoDB(studentId)

        res.status(200).json({
            success: true,
            message: "Student data fetch successfully",
            data: result,
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Student data fetch failed;",
            data: error.errorResponse,
        })
        console.log(error.errorResponse)
    }
}

export const studentController = {
    createStudent,
    getStudent,
    getSingleStudent
}