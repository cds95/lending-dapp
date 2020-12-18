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
    Loan[] private loans;
    uint256 private numLoans;
    uint256 private idCounter;
    mapping(address => uint256) balances;
    mapping(address => uint256) pendingLoanWithdrawals;

    function inputFunds() public payable {
        pendingLoanWithdrawals[msg.sender] += msg.value;
    }

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
        newLoan.borrower = msg.sender;
        newLoan.amount = loanAmountInWei;
        loans[idCounter] = newLoan;
        numLoans++;
        idCounter++;

        // TODO:  Emit event saying new loan has appeared
    }

    function giveLoan(uint256 loanId) public {
        Loan storage loan = loans[loanId];
        if (balances[msg.sender] >= loan.amount) {
            pendingLoanWithdrawals[loan.borrower] += loan.amount;
            balances[msg.sender] -= loan.amount;
            loan.lender = msg.sender;

            // TODO: loan.interest = find out how to send data from UI to do this.
            // TODO:  Emit event saying loan has been provided and needs to be withdrawn.
            //
        }
    }

    function withdrawLoan(uint256 loanId) public {
        Loan memory loan = loans[loanId];
        if (msg.sender == loan.borrower) {
            uint256 amount = pendingLoanWithdrawals[msg.sender];
            pendingLoanWithdrawals[msg.sender] = 0;
            msg.sender.transfer(amount);
        }
    }
}
