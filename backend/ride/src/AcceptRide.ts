import AccountDAO from './AccountDAO';
import RideDAO from "./RideDAO";

export default class AcceptRide {

	constructor (private rideDAO: RideDAO, private accountDAO: AccountDAO) {
	}

	async execute (input: any) {
		const account = await this.accountDAO.getById(input.driverId);
        if(!account.is_driver) throw new Error("Only drivers can accept a ride");
		const ride = await this.rideDAO.getById(input.rideId);
        ride.status = "accepted";
        ride.driverId = input.driverId;
        await this.rideDAO.update(ride);
	}

}
