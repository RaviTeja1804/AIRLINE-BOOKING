import mongoose, {Schema} from "mongoose"

const travelerModel = new mongoose.Schema({
    fullName:{type:String},
    aadhar:{type:Number},
    gender:{type:String}
})

export default mongoose.model("travelers",travelerModel);



