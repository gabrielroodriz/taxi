import express, { Request, Response } from 'express';
import GetAccount from './GetAccount';
import Signup from './Signup';

const app = express();
app.use(express.json());

app.post('/signup', async function (req: Request, res: Response) {
	try {
		const input = req.body;
		const signup = new Signup();
		const result = await signup.execute(input);
		res.json(result);
	} catch (error: any) {
		res.status(422).json({ message: error.message });
	}
});

app.get('/accounts/:accountId', async (req: Request, res: Response) => {
	try {
		const accountId = req.params.accountId;
		const getAccount = new GetAccount();
		const account = await getAccount.execute(accountId);
		res.json(account);
	} catch (error: any) {
		res.status(400).json({ message: error.message });
	}
});

app.listen(3000, () => {
	console.log('Server listening on port 3000');
});
