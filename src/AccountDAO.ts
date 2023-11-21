import pgp from 'pg-promise';

export default class AccountDAO {
	async save(account: any) {
		const connection = pgp()(
			'postgres://username:password@localhost:5432/default_database',
		);
		await connection.query(
			'insert into cccat14.account (account_id, name, email, cpf, car_plate, is_passenger, is_driver) values ($1, $2, $3, $4, $5, $6, $7)',
			[
				account.accountId,
				account.name,
				account.email,
				account.cpf,
				account.carPlate,
				!!account.isPassenger,
				!!account.isDriver,
			],
		);

		await connection.$pool.end();
	}

	async getById(accountId: string) {
		const connection = pgp()(
			'postgres://username:password@localhost:5432/default_database',
		);
		const [account] = await connection.query(
			'select * from cccat14.account where account_id = $1',
			[accountId],
		);

		await connection.$pool.end();
		return account;
	}

	async getByEmail(email: string) {
		const connection = pgp()(
			'postgres://username:password@localhost:5432/default_database',
		);
		const [account] = await connection.query(
			'select * from cccat14.account where email = $1',
			[email],
		);

		await connection.$pool.end();
		return account;
	}
}
