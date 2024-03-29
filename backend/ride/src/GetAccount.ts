import GetAccountAccountDAO from "./GetAccountAccountDAO";

export default class GetAccount {

	constructor (private accountDAO: GetAccountAccountDAO) {
	}
	
	async execute (accountId: string) {
		const account = await this.accountDAO.getById(accountId);
		return account;
	}
}
