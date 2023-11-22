import { validateCpf } from '../src/CpfValidator';

test.each(['97456321558', '71428793860', '87748248800'])(
	'Deve criar uma conta para o passageiro',
	async function (cpf: string) {
		expect(validateCpf(cpf)).toBe(true);
	},
);

test.each(['', undefined, null, '11111111111', '111', '11111111111111'])(
	'Não deve criar uma conta se o cpf for inválido',
	async function (cpf: any) {
		expect(validateCpf(cpf)).toBe(false);
	},
);
