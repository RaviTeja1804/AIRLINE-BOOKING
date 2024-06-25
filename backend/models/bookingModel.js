import mongoose, {Schema} from "mongoose"

const travelerModel = new mongoose.Schema({
    fullName:{type:String},
    aadhar:{type:Number},
    gender:{type:String}
})

const bookingModel = new mongoose.Schema({
    date:{type:Date},
    time:{type:String},
    flightid:{type:String},
    bookerEmail:{type:String},
    bookerName:{type:String},
    passengers: [travelerModel]
})

export default mongoose.model("bookings",bookingModel);



