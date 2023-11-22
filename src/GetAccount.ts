import AccountDAO from './AccountDAO';

export default class GetAccount {
	accountDAO = new AccountDAO();
	constructor() {
		this.accountDAO = new AccountDAO();
	}
	async execute(input: any): Promise<any> {
		const account = await this.accountDAO.getById(input.accountId);
		if (!account) throw new Error('Account not found');
		return account;
	}
}
