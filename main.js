import inquirer from 'inquirer';
let totalBalance = 10000; // Dollar 
console.log("Your balance is $10,000");
const myPin = 1234;
async function main() {
    try {
        let pinAnswer = await inquirer.prompt([
            {
                name: "pin",
                message: "Enter your pin",
                type: "number"
            }
        ]);
        if (pinAnswer.pin === myPin) {
            console.log("Correct pin code!!!");
            let operationAns = await inquirer.prompt([
                {
                    name: "accountType",
                    message: "Please select one option",
                    type: "list",
                    choices: ["Current Account", "Savings Account", "Fixed Deposit", "Recurring Deposit"]
                },
                {
                    name: "transMethod",
                    message: "Select your transaction method",
                    type: "list",
                    choices: ["Cash Withdrawal", "Deposit", "Funds Transfer", "Bill Payments", "Account Balance Inquiry", "Fast Cash"]
                }
            ]);
            switch (operationAns.transMethod) {
                case "Cash Withdrawal":
                    await cashWithdrawal();
                    break;
                case "Deposit":
                    await deposit();
                    break;
                case "Funds Transfer":
                    await fundsTransfer();
                    break;
                case "Bill Payments":
                    await billPayments();
                    break;
                case "Account Balance Inquiry":
                    console.log(`Your total balance is: $${totalBalance}`);
                    break;
                case "Fast Cash":
                    await fastCash();
                    break;
                default:
                    console.log("Invalid option selected.");
            }
        }
        else {
            console.log("Incorrect pin number.");
        }
    }
    catch (error) {
        console.error("An error occurred:", error);
    }
}
async function cashWithdrawal() {
    let cashwithdrawAmount = await inquirer.prompt([
        {
            name: "withdrawal",
            message: "Enter the amount you want to withdraw",
            type: "number"
        }
    ]);
    if (totalBalance >= cashwithdrawAmount.withdrawal) {
        totalBalance -= cashwithdrawAmount.withdrawal;
        console.log(`Your total balance is: $${totalBalance}`);
    }
    else {
        console.log('Insufficient balance');
    }
}
async function deposit() {
    let depositAmount = await inquirer.prompt([
        {
            name: "deposit",
            message: "Enter the amount you want to deposit",
            type: "number"
        }
    ]);
    totalBalance += depositAmount.deposit;
    console.log(`Your total balance is: $${totalBalance}`);
}
async function fundsTransfer() {
    console.log("Funds transfer functionality to be implemented.");
}
async function billPayments() {
    console.log("Bill payments functionality to be implemented.");
}
async function fastCash() {
    let fastCashAmount = await inquirer.prompt([
        {
            name: "fastCash",
            message: "Select the amount you want to withdraw",
            type: "list",
            choices: ["1000", "3000", "5000"]
        }
    ]);
    let amountToWithdraw = Number(fastCashAmount.fastCash);
    if (totalBalance >= amountToWithdraw) {
        totalBalance -= amountToWithdraw;
        console.log(`Your total balance is: $${totalBalance}`);
    }
    else {
        console.log('Insufficient balance');
    }
}
// Call the main function and ensure it runs
main().catch(error => {
    console.error("Error in main execution:", error);
});
