var Loaner = artifacts.require("./Loaner.sol");

module.exports = function(deployer) {
  deployer.deploy(Loaner);
};
