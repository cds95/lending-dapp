# Lending-dapp

This is a mock Dapp I've developed to simulate a lending platform. Here users can lend each other Ether and withdraw them to their MetaMask wallets.  The smart 
contracts were deployed using Infura and the UI was deployed as a docker image using Heroku.

## How to run locally

1) Install and run Ganache. https://www.trufflesuite.com/ganache
2) Install truffle. `npm install -g truffle`.
3) Deploy smart contracts. `truffle migrate`.
4) Run UI.
   `cd client && npm start`
   
 ## Remaining items and feature extensions
 
 1) Account for interest rates.
 2) Add unit tests for smart contracts.
