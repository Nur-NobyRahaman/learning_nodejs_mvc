import { StudentModel } from "./student.model.mjs";

const createStudentIntoDB = async (student) => {

    const result = await StudentModel.create(student);
    return result;
};
const getAllStudentIntoDB = async () => {

    const result = await StudentModel.find();
    console.log(result)
    return result;
};

const getSingleStudentIntoDB = async (studentId) => {
      console.log(studentId)
    const result = await StudentModel.findOne({ id:studentId})
    return result;
}


export const studentServices = {
    createStudentIntoDB,
    getAllStudentIntoDB,
    getSingleStudentIntoDB
};
