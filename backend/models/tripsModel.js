import mongoose,{Schema} from "mongoose";

const rowModel = new mongoose.Schema({
    row:{type:Number},
    seats:[{type:String}],
    booked:[{type:String}]
})

const tripsModel = new mongoose.Schema({
    flightid:{type:Number},
    tripid:{type:Number},
    name:{type:String},
    date:{type:Date},
    time:{type:String},
    from:{type:String},
    to:{type:String},
    class:[{type:String}],
    seats:{type:Number},
    journeyTime:{type:String},
    priceAdult:{type:Number},
    priceChild:{type:Number},
    stops:{type:Number},
    stopLocations:[{type:String}],
    layoverTime:[{type:String}],
    availableSeats:[rowModel]
})

export default mongoose.model("trips",tripsModel);



