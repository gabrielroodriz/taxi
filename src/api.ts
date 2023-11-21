import express, { Request, Response } from 'express';
import { getAccount } from './GetAccount';
import { signup } from './Signup';

const app = express();
app.use(express.json());

app.post('/signup', async function (req: Request, res: Response) {
	try {
		const input = req.body;
		const result = signup(input);
		res.json(result);
	} catch (error: any) {
		res.status(422).json({ message: error.message });
	}
});

app.get('/accounts/:accountId', async (req: Request, res: Response) => {
	try {
		const accountId = req.params.accountId;
		const account = await getAccount(accountId);
		res.json(account);
	} catch (error: any) {
		res.status(400).json({ message: error.message });
	}
});

app.listen(3000, () => {
	console.log('Server listening on port 3000');
});
