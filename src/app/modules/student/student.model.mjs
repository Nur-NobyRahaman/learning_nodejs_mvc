import mongoose, { model } from 'mongoose';
const { Schema } = mongoose;

const userName = new Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        middleName: {
            type: String,
           
        },
        lastName: {
            type: String,
            required: true,
        }
    }
);
const guardianSchema = new Schema(
    {
        fatherName: {type: String, required: true,},
        fatherOccupation: {type: String, required: true,},
        fatherContactNO: {type: String, required: true,},
        motherName: {type: String, required: true,},
        motherOccupation: {type: String, required: true,},
        motherContactNO: {type: String, required: true,},
    }
)

const localGuardianSchema = new Schema(
    {
        Name: {type: String, required: true,},
        Occupation: {type: String, required: true,},
        ContactNO: {type: String, required: true,},
        address: {type: String, required: true,},
    }
)

const studentSchema = new Schema({
    id: { type: String },
    name: userName,
    gender: ["male", "female"],
    dateOfBirth: { type: String },
    email: {
        type: String,
        required: true,
        unique:true,
    },
    contactNo: {
        type: String, required: true,
    },
    emergencyContactNo: {
        type: String, required: true,
    },
     bloodGroup: [
        "O+",  // O positive
        "O-",  // O negative
        "A+",  // A positive
        "A-",  // A negative
        "B+",  // B positive
        "B-",  // B negative
        "AB+", // AB positive
        "AB-"  // AB negative
    ],
    presentAddress: {
        type: String, required: true,
    }, 
    permanentAddress: {
        type: String, required: true,
    },
    guardian: guardianSchema,
    localGuardian: localGuardianSchema,
    profileImg:{type: String,},
    isActive: ["active", "blocked"],

});

const Student = model('Student', studentSchema);
