#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
let myBalance = 20000;
let myPin = 1234;
console.log(chalk.blue(" \n \tWelcome To My ATM Machine\n \t"));
let pinAnswer = await inquirer.prompt([
    {
        name: "pin",
        type: "number",
        message: chalk.yellow("Enter you pin code.")
    }
]);
if (pinAnswer.pin === myPin) {
    console.log(chalk.green("\nyour pin is correct!\n"));
    let operationAns = await inquirer.prompt([
        {
            name: "operation",
            type: "list",
            message: chalk.yellow("Select an operation"),
            choices: ["Withdraw Ammount", "Check Balance"]
        }
    ]);
    if (operationAns.operation === "Withdraw Ammount") {
        let withdrawAns = await inquirer.prompt([
            {
                name: "withdrawMethod",
                type: "list",
                message: chalk.yellow("Select a withdrawal method"),
                choices: ["Fast Cash", "Enter Amount"]
            }
        ]);
        if (withdrawAns.withdrawMethod === "Fast Cash") {
            let fastCashAns = await inquirer.prompt([
                {
                    name: "fastcash",
                    type: "list",
                    message: chalk.yellow("Select Amount:"),
                    choices: [1000, 5000, 10000, 15000, 20000]
                }
            ]);
            if (fastCashAns.fastcash > myBalance) {
                console.log(chalk.red("Insufficent Balance"));
            }
            else {
                myBalance -= fastCashAns.fastcash;
                console.log(`${fastCashAns.fastcash} Withdraw Successfully`);
                console.log(chalk.green(`Your Remaining Balance is: ${myBalance}`));
            }
        }
        else if (withdrawAns.withdrawMethod === "Enter Amount") {
            let ammountAns = await inquirer.prompt([
                {
                    name: "amount",
                    type: "number",
                    message: chalk.yellow("Enter the amount to withdraw:")
                }
            ]);
            if (ammountAns.amount > myBalance) {
                console.log(chalk.red("Insufficient Balance"));
            }
            else {
                myBalance -= ammountAns.amount;
                console.log(`${ammountAns.amount} Withdraw Successfully`);
                console.log(chalk.green("Your Remaining Balance is: ") + myBalance);
            }
        }
    }
    else if (operationAns.operation === "Check Balance") {
        console.log(chalk.green("Your Current Balance is: ") + myBalance);
    }
}
else {
    console.log(chalk.red("Your Pin is Incorrect, Try Again!"));
}
