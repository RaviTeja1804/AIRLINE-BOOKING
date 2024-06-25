import userDetails from "../models/userModel.js";
import tripDetails from "../models/tripsModel.js";

class userController {
  async getUserFromEmail(req, res) {
    const user = await userDetails.findOne({ email: req.params.email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    res.json(user);
  }

  async getFutureTripsFromEmail(req, res) {
    const user = await userDetails.findOne({ email: req.params.email });
    const currentDateTime = new Date();

    const upcomingTrips = user.trips.filter((trip) => {
      const tripDateTime = new Date(`${trip.date}T${trip.time}`);
      return tripDateTime > currentDateTime;
    });

    res.json(upcomingTrips);
  }

  async getPastTripsFromEmail(req, res) {
    const user = await userDetails.findOne({ email: req.params.email });
    const currentDateTime = new Date();

    const pastTrips = user.trips.filter((trip) => {
      const tripDateTime = new Date(`${trip.date}T${trip.time}`);
      return tripDateTime < currentDateTime;
    });

    res.json(pastTrips);
  }

  async addTripToUser(req, res) {
    const user = await userDetails.findOne({ email: req.params.email });

    const { selectedSeats, nonInfantPassengers, infantPassengers, tripid } =
      req.body;
    const trip = await tripDetails.findOne({ tripid: tripid });

    const newTrip = {
      flightid: req.body.flightid,
      tripid: req.body.tripid,
      flightName: req.body.flightName,
      time: req.body.time,
      class: req.body.class,
      journeyTime: req.body.journeyTime,
      priceAdult: req.body.priceAdult,
      priceChild: req.body.priceChild,
      stops: req.body.stops,
      stopLocations: req.body.stopLocations,
      layoverTime: req.body.layoverTime,
      date: req.body.date,
      from: req.body.from,
      to: req.body.to,
      nonInfantPassengers: nonInfantPassengers,
      infantPassengers: infantPassengers,
      seats: selectedSeats,
      totalAmount: req.body.totalAmount
    };

    trip.seats -= selectedSeats.length;
    selectedSeats.forEach((seat) => {
        const seatNumber = seat.match(/\d+/)[0];
        const seatAlphabet = seat.match(/[A-Za-z]/)[0]; 
        const seatIndex = parseInt(seatNumber) - 1; 
        trip.availableSeats[seatIndex].booked.push(seatAlphabet);
    });

    await trip.save();
    user.trips.push(newTrip);
    await user.save();

    return res.json({ message: "Booking successful" });
  }

  async changePassword(req, res) {
    const { email } = req.params;
    const { existingPassword, newPassword } = req.body;

    const user = await userDetails.findOne({ email });

    if (user.password !== existingPassword) {
      return res.json({ message: "Existing password is incorrect" });
    }

    if (existingPassword === newPassword) {
      return res.json({
        message: "Existing password and New password are same",
      });
    }

    user.password = newPassword;
    await user.save();

    res.json({ message: "Password changed successfully" });
  }
}

export default new userController();
