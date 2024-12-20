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
            // message: "Student is created failed;",
            message:error.message,
            data: error.errorResponse,
        })
        console.log(error)
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
        console.log(error)
    }
    
}
const deleteStudent = async (req, res) => {
    try {
        // will call services
        const  id  = req.params.studentId;
    const result = await studentServices.deleteStudentIntoDB(id);
    // send res
        res.status(200).json({
            success: true,
            message: "Student delete successfully",
            data: result,
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Something went wrong",
            data: error.errorResponse,
        })
        console.log(error)
    }
    
}

const getSingleStudent = async(req,res) => {
    try {
        const { studentId } = req.params;
      
        const result = await studentServices.getSingleStudentIntoDB(studentId)
        console.log(result)

        res.status(200).json({
            success: true,
            message: "Single Student data fetch successfully",
            data: result,
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Single Student data fetch successfully failed;",
            data: error.errorResponse,
        })
        console.log(error.errorResponse)
    }
}

export const studentController = {
    createStudent,
    getStudent,
    getSingleStudent,
    deleteStudent
}