require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",  
  networks: {
    sepolia: { 
      url: `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_KEY}`,
      accounts: [process.env.SEPOLIA_PRIVATE_KEY],
      chainId: 11155111
    },
    localhost:{
      url:" http://127.0.0.1:8545/",
      chainId:31337,
    }
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  }
}
