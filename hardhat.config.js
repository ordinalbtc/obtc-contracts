/**
 * @type import('hardhat/config').HardhatUserConfig
 */

require('@nomiclabs/hardhat-ethers');
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require('@openzeppelin/hardhat-upgrades');
require("dotenv").config();

const { GOERLI_URL, GOERLI_PRIVATE_KEY, ETHEREUM_URL, ETHEREUM_PRIVATE_KEY, ETHEREUMSCAN_KEY } = process.env;

module.exports = {
  solidity: {
    version: "0.8.17",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  defaultNetwork: "ethereum",
  networks: {
    ethereum: {
      url: ETHEREUM_URL,
      accounts: [`0x${ETHEREUM_PRIVATE_KEY}`]
    }
  },
  etherscan: {
    apiKey: BSCSCAN_KEY
  }
};
