import mongoose from "mongoose";
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
      lastName: {
        type: String,
        required: true
    }
})

export default mongoose.model('Employee', employeeSchema)