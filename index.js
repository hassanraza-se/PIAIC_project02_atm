#!/usr/bin/env node
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import inquirer from "inquirer";
import chalk from "chalk";
console.log(chalk.green(`
 .----------------.  .----------------.  .----------------. 
| .--------------. || .--------------. || .--------------. |
| |      __      | || |  _________   | || | ____    ____ | |
| |     /  \\     | || | |  _   _  |  | || ||_   \\  /   _|| |
| |    / /\\ \\    | || | |_/ | | \\_|  | || |  |   \\/   |  | |
| |   / ____ \\   | || |     | |      | || |  | |\\  /| |  | |
| | _/ /    \\ \\_ | || |    _| |_     | || | _| |_\\/_| |_ | |
| ||____|  |____|| || |   |_____|    | || ||_____||_____|| |
| |              | || |              | || |              | |
| '--------------' || '--------------' || '--------------' |
 '----------------'  '----------------'  '----------------' 
`));
const user = {
    name: "John Doe",
    balance: Math.random() * 1000
};
const log = console.log;
function atmOptions() {
    inquirer.prompt({
        name: "option",
        type: "list",
        message: "Choose an option:",
        choices: ["Withdraw Money", "Check Balance", "Exit"]
    }).then(({ option }) => {
        switch (option) {
            case "Withdraw Money":
                inquirer.prompt({
                    name: "amount",
                    type: "input",
                    message: "Enter amount to withdraw:"
                }).then(({ amount }) => {
                    if (isNaN(amount)) {
                        log(chalk.red("Invalid Amount!"));
                    }
                    else if (amount > user.balance) {
                        log(chalk.red("Insufficient Balance!"));
                    }
                    else {
                        log(chalk.green("Here is your cash!"));
                        log(chalk.green.bold(amount));
                        // update balance in user
                        user.balance = user.balance - amount;
                    }
                    atmOptions();
                });
                break;
            case "Check Balance":
                log(chalk.green.bgGray(`Hi ${user.name}, Your Balance Is: ${user.balance}`));
                atmOptions();
                break;
            case "Exit":
                log(chalk.green.bold("Thank You for using ATM"));
                break;
        }
    });
}
function startATM() {
    return __awaiter(this, void 0, void 0, function* () {
        const { userId } = yield inquirer.prompt({
            name: "userId",
            type: "input",
            message: "Enter User ID:"
        });
        if (!userId) {
            log(chalk.red("Invalid User ID"));
            return;
        }
        const { pin } = yield inquirer.prompt({
            name: "pin",
            type: "password",
            message: "Enter Your PIN:"
        });
        if (!pin) {
            log(chalk.red("Invalid PIN"));
            return;
        }
        // start ATM options
        atmOptions();
    });
}
startATM();
