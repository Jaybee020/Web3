import "@nomiclabs/hardhat-waffle"
import "@nomiclabs/hardhat-ethers"
import "hardhat-gas-reporter"
import * as dotenv from "dotenv"

dotenv.config()

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.7.3",
  networks:{
    hardhat:{
      chainId:1337
    },
    ropsten: {
      url: String(process.env.API_KEY),
      accounts: [String(process.env.PRIVATE_KEY)]
    }
  }
};
