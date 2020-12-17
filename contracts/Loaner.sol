pragma solidity 0.5.0;

contract Loaner {
    struct Loan {
        uint256 amount;
        address borrower;
        address lender;
        uint256 interest;
    }

    Loan[] private loans;

    constructor() {
        loans = new Loan[](4);
    }

    function getLoans() public view returns (Loan[] memory) {
        return loans;
    }

    function askForLoan(uint loanAmountInWei) public {
        newLoan memory Loan;
        newLoan.borrower = msg.sender;
        newLoan.amount = loanAmountInWei;
        loans.push(newLoan)
    }
}
