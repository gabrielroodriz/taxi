import Account from '../src/Account';

test('Deve criar uma conta', function () {
	const account = new Account(
		'Mary Robert',
		'mary.robert@gmail.com',
		'97456321558',
		'',
		true,
		false,
	);
	expect(account.accountId).toBeDefined();
	expect(account.name).toBe('Mary Robert');
	expect(account.email).toBe('mary.robert@gmail.com');
	expect(account.cpf).toBe('97456321558');
});
