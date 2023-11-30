import crypto from "crypto";
import AccountDAO from './AccountDAO';
import Logger from "./Logger";
import RideDAO from "./RideDAO";

export default class RequestRide {

	constructor (private rideDAO: RideDAO, private accountDAO: AccountDAO, private logger: Logger) {
	}

	async execute (input: any) {
		this.logger.log(`requestRide`);
		const account = await this.accountDAO.getById(input.passengerId);
		if(!account) throw new Error("Account does not exist");
		const accountActiveRide = await this.rideDAO.getActiveRideByPassengerId(input.passengerId);
		if(!account.is_passenger) throw new Error("Only passengers can request a ride");
		if(accountActiveRide) throw new Error("Passenger already has an active ride");
		input.rideId = crypto.randomUUID();
		input.status = "requested";
		input.date = new Date();
		await this.rideDAO.save(input);
		return {
			rideId: input.rideId
		};
	}

}
