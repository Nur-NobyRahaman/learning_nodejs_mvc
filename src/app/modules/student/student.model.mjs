import mongoose, { model } from 'mongoose';
const { Schema } = mongoose;
import validator from 'validator';
import bcrypt from 'bcrypt'
import config from '../../config/index.mjs';



const userName = new Schema(
    {
        firstName: {
            type: String,
            required: [true, "First name is required"],  // Custom error message
            trim: true,  // Trim whitespace
        },
        middleName: {
            type: String,
            trim: true,  // Trim whitespace
        },
        lastName: {
            type: String,
            required: [true, "Last name is required"],  // Custom error message
            trim: true,  // Trim whitespace
            validator: (value) => {
                console.log(value)
                validator.isAlpha(value)
            },  // custom validator with
            message: "{VALUE} is not valid"
            
        }
    }
);

const guardianSchema = new Schema(
    {
        fatherName: {
            type: String,
            required: [true, "Father's name is required"],  // Custom error message
            trim: true,  // Trim whitespace
        },
        fatherOccupation: {
            type: String,
            required: [true, "Father's occupation is required"],  // Custom error message
            trim: true,  // Trim whitespace
        },
        fatherContactNO: {
            type: String,
            required: [true, "Father's contact number is required"],  // Custom error message
            trim: true,  // Trim whitespace
        },
        motherName: {
            type: String,
            required: [true, "Mother's name is required"],  // Custom error message
            trim: true,  // Trim whitespace
        },
        motherOccupation: {
            type: String,
            required: [true, "Mother's occupation is required"],  // Custom error message
            trim: true,  // Trim whitespace
        },
        motherContactNO: {
            type: String,
            required: [true, "Mother's contact number is required"],  // Custom error message
            trim: true,  // Trim whitespace
        },
    }
);

const localGuardianSchema = new Schema(
    {
        Name: {
            type: String,
            required: [true, "Local guardian's name is required"],  // Custom error message
            trim: true,  // Trim whitespace
        },
        Occupation: {
            type: String,
            required: [true, "Local guardian's occupation is required"],  // Custom error message
            trim: true,  // Trim whitespace
        },
        ContactNO: {
            type: String,
            required: [true, "Local guardian's contact number is required"],  // Custom error message
            trim: true,  // Trim whitespace
        },
        address: {
            type: String,
            required: [true, "Local guardian's address is required"],  // Custom error message
            trim: true,  // Trim whitespace
        },
    }
);

const studentSchema = new Schema({
    id: { 
        type: String,
        required: [true, "Student ID is required"],  // Custom error message for ID
        trim: true,  // Trim whitespace
    },
    name: {
        type: userName,
        required: [true, "Student name is required"],  // Custom error message for name
    },
    gender: {
        type: String,
        enum: {
            values: ["male", "female"],
            message: "{VALUE} is not a valid gender. Please select either male or female",  // Custom error message for gender
        },
        trim: true,  // Trim whitespace
    },
    email: {
        type: String,
        required: true,
       
    },
    password: {
        type: String,
        required: true,
    },
    dateOfBirth: {
        type: String,
        required: [true, "Date of birth is required"],  // Custom error message for date of birth
        trim: true,  // Trim whitespace
    },
    contactNo: {
        type: String,
        required: [true, "Contact number is required"],  // Custom error message for contact number
        trim: true,  // Trim whitespace
    },
    emergencyContactNo: {
        type: String,
        required: [true, "Emergency contact number is required"],  // Custom error message for emergency contact number
        trim: true,  // Trim whitespace
    },
    bloodGroup: {
        type: String,
        enum: {
            values: [
                "O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"
            ],
            message: "{VALUE} is not a valid blood group",  // Custom error message for blood group
        },
        trim: true,  // Trim whitespace
    },
    presentAddress: {
        type: String,
        required: [true, "Present address is required"],  // Custom error message for present address
        trim: true,  // Trim whitespace
    },
    permanentAddress: {
        type: String,
        required: [true, "Permanent address is required"],  // Custom error message for permanent address
        trim: true,  // Trim whitespace
    },
    guardian: {
        type: guardianSchema,
        required: [true, "Guardian information is required"],  // Custom error message for guardian information
    },
    localGuardian: {
        type: localGuardianSchema,
        required: [true, "Local guardian information is required"],  // Custom error message for local guardian information
    },
    profileImg: {
        type: String,
        trim: true,  // Trim whitespace
    },
    isActive: {
        type: String,
        enum: {
            values: ["active", "blocked"],
            message: "{VALUE} is not a valid status",  // Custom error message for isActive status
        },
        required: [true, "Account status is required"],  // Custom error message for isActive field
        trim: true,  // Trim whitespace
    },
    isDeleted: {
        type: Boolean,
        default: false,
    }
});

studentSchema.pre("save",async function (next) {
    const user = this;
    user.password = await bcrypt.hash(user.password, Number(config.saltRound));
   next()

});
studentSchema.post("save", function (doc, next) {
    doc.password = "";
    next()
    // console.log(this, "post middleware")
})

// query middleware
studentSchema.pre("find", function (next) {
    this.find({isDeleted : {$ne: true}})
    next()
})
studentSchema.pre("findOne", function (next) {
    this.find({isDeleted : {$ne: true}})
    next()
})

// aggregate
studentSchema.pre("aggregate", function (next) {
    this.pipeline().unshift({ $match: { $isDeleted: { $ne: true } } })
    next()
})
export const StudentModel = model('Student', studentSchema);
