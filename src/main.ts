import crypto from "crypto";
import pgp from "pg-promise";
import { Accounts } from './class/Account';


const account = new Accounts(1, "John Doe", "johndoe@example.com", "12345678901", "ABC1234", true, false, "password", "algorithm", "salt");
export async function signup (input: any): Promise<any> {
	const connection = pgp()("postgres://postgres:123456@localhost:5432/app");
	try {
		const accountId = crypto.randomUUID();
		const [account] = await connection.query("select * from cccat14.account where email = $1", [input.email]);
		if (account) throw new Error("Duplicated account");
		if (account.isInvalidName(input.name)) throw new Error("Invalid name");
		if (account.isInvalidEmail(input.email)) throw new Error("Invalid email");
		if (!account.validateCpf(input.cpf)) throw new Error("Invalid cpf");
		if (input.isDriver && account.isInvalidCarPlate(input.carPlate)) throw new Error("Invalid car plate");
		await connection.query("insert into cccat14.account (account_id, name, email, cpf, car_plate, is_passenger, is_driver) values ($1, $2, $3, $4, $5, $6, $7)", [accountId, input.name, input.email, input.cpf, input.carPlate, !!input.isPassenger, !!input.isDriver]);
		return {
			accountId
		};
	} finally {
		await connection.$pool.end();
	}
}



export async function getAccount (accountId: string) {
	 return account;
}