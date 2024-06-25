import tripsDetails from "../models/tripsModel.js";

class tripsController {
    async getTripFromTripid(req, res) {
        const trips = await tripsDetails.find({tripid: req.params.tripid});
        res.json(trips[0])
    }
    async getTripFromInfo(req, res) {
        const trips = await tripsDetails.find({});

        if (trips.length > 0) 
        {
            res.json(trips);
        } else 
        {
            res.json({ message: "No trips found" });
        }
    }
}

export default new tripsController();
