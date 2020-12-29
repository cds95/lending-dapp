const path = require("path");
const HDWalletProvider = require("truffle-hdwallet-provider");
require('dotenv').config()

/**
 * DONT FORGET TO SETUP .env FILE!!!
 */
module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    develop: {
      port: 7545
    },
    ropsten: {
      provider: function() {
        return new HDWalletProvider(process.env.ROPSTEN_MNEMONIC, "https://ropsten.infura.io/v3/" + process.env.INFURA_APP_ID)
      },
      network_id: 3,
      gas: 4000000      //make sure this gas allocation isn't over 4M, which is the max
    }
  }
};
