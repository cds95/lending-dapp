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

    function inputFunds() public payable {
        balances[msg.sender] += msg.value;
    }

    function getBalance(address a) public view returns (uint256) {
        return balances[a];
    }

    function withdrawBalance(uint256 amount) public {
        if (amount <= balances[msg.sender]) {
            uint256 currBalance = balances[msg.sender];
            balances[msg.sender] -= amount;
            msg.sender.transfer(amount);
        }
    }

    function getLoans()
        public
        view
        returns (uint256[] memory, address[] memory)
    {
        uint256[] memory loanAmounts = new uint256[](numLoans);
        address[] memory borrowers = new address[](numLoans);
        for (uint256 i = 0; i < numLoans; i++) {
            Loan storage loan = loans[i];
            loanAmounts[i] = loan.amount;
            borrowers[i] = loan.borrower;
        }
        return (loanAmounts, borrowers);
    }

    function getNumLoans() public view returns (uint256) {
        return numLoans;
    }

    function askForLoan(uint256 loanAmountInWei) public {
        Loan memory newLoan;
        newLoan.borrower = msg.sender;
        newLoan.amount = loanAmountInWei;
        loans.push(newLoan);
        numLoans = numLoans + 1;
        idCounter = idCounter + 1;

        // TODO:  Emit event saying new loan has appeared
    }

    function giveLoan(uint256 loanId) public {
        Loan storage loan = loans[loanId];
        if (balances[msg.sender] >= loan.amount) {
            balances[loan.borrower] += loan.amount;
            balances[msg.sender] -= loan.amount;
            loan.lender = msg.sender;

            // TODO: loan.interest = find out how to send data from UI to do this.
            // TODO:  Emit event saying loan has been provided and needs to be withdrawn.
            //
        }
    }

    function payoffLoan(uint256 loanId) public {
        Loan storage loan = loans[loanId];
        if (msg.sender == loan.borrower) {
            address lender = loan.lender;
            balances[msg.sender] -= loan.amount;
            balances[lender] += loan.amount;
            loan.hasBeenSettled = true;
        }

        // TODO:  Emit event saying loan has been paid
    }
}
