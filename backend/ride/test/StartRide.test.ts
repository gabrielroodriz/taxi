import AcceptRide from '../src/AcceptRide';
import AccountDAODatabase from '../src/AccountRepositoryDatabase';
import GetAccount from '../src/GetAccount';
import GetRide from '../src/GetRide';
import LoggerConsole from '../src/LoggerConsole';
import RequestRide from '../src/RequestRide';
import RideDAODatabase from '../src/RideDAODatabase';
import Signup from '../src/Signup';
import StartRide from '../src/StartRide';

let signup: Signup;
let getAccount: GetAccount;
let requestRide: RequestRide;
let getRide: GetRide;
let acceptRide: AcceptRide;
let startRide: StartRide;

beforeEach(() => {
	const accountDAO = new AccountDAODatabase();
	const rideDAO = new RideDAODatabase();
	const logger = new LoggerConsole();
	signup = new Signup(accountDAO, logger);
	getAccount = new GetAccount(accountDAO);
	requestRide = new RequestRide(rideDAO, accountDAO, logger);
	getRide = new GetRide(rideDAO, logger);
	acceptRide = new AcceptRide(rideDAO, accountDAO);
	startRide = new StartRide(rideDAO);
});

test('Deve iniciar uma corrida', async function () {
	const inputSignupPasseger = {
		name: 'John Doe',
		email: `john.doe${Math.random()}@gmail.com`,
		cpf: '97456321558',
		isPassenger: true,
		isDriver: false,
		password: '123456',
	};
	const outputSignupPasseger = await signup.execute(inputSignupPasseger);
	const inputRequestRide = {
		passengerId: outputSignupPasseger.accountId,
		fromLat: -27.584905257808835,
		fromLong: -48.545022195325124,
		toLat: -27.496887588317275,
		toLong: -48.522234807851476,
	};
	const outputRequestRide = await requestRide.execute(inputRequestRide);
	const inputSignupDriver = {
		name: 'John Doe',
		email: `john.doe${Math.random()}@gmail.com`,
		cpf: '97456321558',
		carPlate: 'ABC1234',
		isPesseger: false,
		isDriver: true,
		password: '123456',
	};
	const outputSignupDriver = await signup.execute(inputSignupDriver);
	const inputAcceptRide = {
		rideId: outputRequestRide.rideId,
		driverId: outputSignupDriver.accountId,
	};
	await acceptRide.execute(inputAcceptRide);
	const inputStartRide = {
		rideId: outputRequestRide.rideId,
		driverId: outputSignupDriver.accountId,
	};
	await startRide.execute(inputStartRide);
	const outputGetRide = await getRide.execute(outputRequestRide.rideId);
	expect(outputGetRide.status).toBe('in_progress');
});
