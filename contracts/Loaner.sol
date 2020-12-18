pragma solidity ^0.5.0;

contract Loaner {
    struct Loan {
        uint256 id;
        uint256 amount;
        address borrower;
        address lender;
        uint256 interest;
    }

    Loan[] private loans;
    uint256 private numLoans;
    uint256 private idCounter;

    function getLoans() public view returns (uint256[] memory) {
        uint256[] memory loanAmounts = new uint256[](numLoans);
        for (uint256 i = 0; i < numLoans; i++) {
            Loan storage loan = loans[i];
            loanAmounts[i] = loan.amount;
        }
        return loanAmounts;
    }

    function getNumLoans() public view returns (uint256) {
        return numLoans;
    }

    function askForLoan(uint256 loanAmountInWei) public {
        Loan memory newLoan;
        newLoan.id = idCounter;
        newLoan.borrower = msg.sender;
        newLoan.amount = loanAmountInWei;
        loans[numLoans] = newLoan;
        numLoans++;
        idCounter++;
    }
}
