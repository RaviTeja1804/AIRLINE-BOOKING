import mongoose,{Schema} from "mongoose";

const nonInfantPassengerModel = new mongoose.Schema({
    fullName:{type:String},
    aadhaar:{type:Number},
    gender:{type:String}
})

const infantPassengerModel = new mongoose.Schema({
    fullName:{type:String},
    gender:{type:String}
})

const tripModel = new mongoose.Schema({
    flightid:{type:Number},
    tripid:{type:Number},
    flightName:{type:String},
    date:{type:String},
    time:{type:String},
    from:{type:String},
    to:{type:String},
    class:{type:String},
    journeyTime:{type:String},
    priceAdult:{type:Number},
    priceChild:{type:Number},
    stops:{type:Number},
    stopLocations:[{type:String}],
    layoverTime:[{type:String}],
    nonInfantPassengers:[nonInfantPassengerModel],
    infantPassengers:[infantPassengerModel],
    seats:[{type:String}],
    totalAmount: {type:Number}
})

const userModel = new mongoose.Schema({
    fullName:{type:String},
    email:{type:String},
    password:{type:String},
    contact:{type:Number},
    city:{type:String},
    country:{type:String},
    trips:[tripModel]
})

export default mongoose.model("users",userModel);
