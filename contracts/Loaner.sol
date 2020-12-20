pragma solidity ^0.5.0;

contract Loaner {
    struct Loan {
        uint256 amount;
        address borrower;
        address lender;
        uint256 interest;
        bool hasBeenSettled;
    }

    // loanId is the index of the loan
    Loan[] public loans;
    uint256 private numLoans;
    uint256 private idCounter;
    mapping(address => uint256) balances;

    event FundsDeposited(address indexed from, uint256 value);
    event FundsWithdrawn(address indexed from, uint256 amountWithdrawn);
    event LoanAsked(
        uint256 loanId,
        address indexed borrower,
        uint256 loanAmount
    );
    event LoanProvided(address indexed lender);
    event LoanPaidOff(address indexed borrower);

    function inputFunds() public payable {
        balances[msg.sender] += msg.value;
        emit FundsDeposited(msg.sender, msg.value);
    }

    function getBalance(address a) public view returns (uint256) {
        return balances[a];
    }

    function withdrawBalance(uint256 amount) public {
        require(
            amount <= balances[msg.sender],
            "Cannot withdraw an amount greater than current balance."
        );
        balances[msg.sender] -= amount;
        msg.sender.transfer(amount);
        emit FundsWithdrawn(msg.sender, amount);
    }

    function getLoans()
        public
        view
        returns (
            uint256[] memory,
            uint256[] memory,
            address[] memory,
            address[] memory,
            bool[] memory
        )
    {
        uint256[] memory loanIds = new uint256[](numLoans);
        uint256[] memory loanAmounts = new uint256[](numLoans);
        address[] memory borrowers = new address[](numLoans);
        address[] memory lenders = new address[](numLoans);
        bool[] memory hasBeenSettledStates = new bool[](numLoans);
        for (uint256 i = 0; i < numLoans; i++) {
            Loan storage loan = loans[i];
            loanIds[i] = i;
            loanAmounts[i] = loan.amount;
            borrowers[i] = loan.borrower;
            lenders[i] = loan.lender;
            hasBeenSettledStates[i] = loan.hasBeenSettled;
        }
        return (loanIds, loanAmounts, borrowers, lenders, hasBeenSettledStates);
    }

    function getNumLoans() public view returns (uint256) {
        return numLoans;
    }

    function askForLoan(uint256 loanAmountInWei) public {
        Loan memory newLoan;
        newLoan.borrower = msg.sender;
        newLoan.amount = loanAmountInWei;
        loans.push(newLoan);
        emit LoanAsked(idCounter, msg.sender, loanAmountInWei);
        numLoans = numLoans + 1;
        idCounter = idCounter + 1;
    }

    function giveLoan(uint256 loanId) public {
        Loan storage loan = loans[loanId];
        require(
            balances[msg.sender] >= loan.amount,
            "Cannot give loan as address balance is less than the loan amount."
        );
        balances[loan.borrower] += loan.amount;
        balances[msg.sender] -= loan.amount;
        loan.lender = msg.sender;

        // TODO: loan.interest = find out how to send data from UI to do this.
        emit LoanProvided(msg.sender);
    }

    function payoffLoan(uint256 loanId) public {
        Loan storage loan = loans[loanId];
        require(
            msg.sender == loan.borrower,
            "Only the borrower can pay off the loan."
        );
        address lender = loan.lender;
        balances[msg.sender] -= loan.amount;
        balances[lender] += loan.amount;
        loan.hasBeenSettled = true;
        emit LoanPaidOff(msg.sender);
    }
}
