export  class Accounts {
    id: number;
    name: string;
    email: string;
    cpf: string;
    car_plate: string;
    is_passenger: boolean;
    is_driver: boolean;
    password: string;
    password_algorithm: string;
    salt: string;

    constructor(id: number, name: string, email: string, cpf: string, car_plate: string, is_passenger: boolean, is_driver: boolean, password: string, password_algorithm: string, salt: string) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.cpf = cpf;
        this.car_plate = car_plate;
        this.is_passenger = is_passenger;
        this.is_driver = is_driver;
        this.password = password;
        this.password_algorithm = password_algorithm;
        this.salt = salt;
    }

    removeMask(cpf: string) {
        return cpf.replace(/\D/g, '');
    }
    isValidadeCpfLength(cpf: string) {
        return cpf.length !== 11;
    }

    allDigitsAreTheSame(cpf: string) {
        return cpf.split('').every(c => c === cpf[0]);
    }

    calculateDigit(cpf: string, factor: number) {
        let total = 0;
        for(const digit of cpf) {
            if(factor > 1) total += parseInt(digit) * factor--;
        }
        const rest = total%11;
        return (rest < 2) ? 0 : 11 - rest;
    }

    public validateCpf(cpf: string) {
        if(!cpf) return false;
        cpf = this.removeMask(cpf);
        if(this.isValidadeCpfLength(cpf)) return false;
        if(this.allDigitsAreTheSame(cpf)) return false;
        const firtDigit = this.calculateDigit(cpf, 10);
        const secondDigit = this.calculateDigit(cpf, 11);
        return cpf.slice(9) === `${firtDigit}${secondDigit}`;
    }

   public isInvalidName(name: string) {
        return !name.match(/[a-zA-Z] [a-zA-Z]+/);
    }

    public isInvalidEmail(email: string) {
        return !email.match(/[a-zA-Z] [a-zA-Z]+/);
    }

    public isInvalidCarPlate(car_plate: string) {
        return !car_plate.match(/[a-zA-Z] [a-zA-Z]+/);
    }

}