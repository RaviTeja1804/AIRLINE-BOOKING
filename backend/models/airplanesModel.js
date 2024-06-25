import mongoose,{Schema} from "mongoose";

const airplanesModel = new mongoose.Schema({
    flightid:{type:Number},
    name:{type:String}
})

export default mongoose.model("airplanes",airplanesModel);



