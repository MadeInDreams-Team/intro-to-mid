require('dotenv').config()
require("@nomiclabs/hardhat-etherscan")
require("@nomiclabs/hardhat-ethers")
//require("hardhat-deploy-ethers")
require('@openzeppelin/hardhat-upgrades')



task(
  "deploy",
  "Deploy your ERC20 contract",
  async (_, { ethers, upgrades }) => {
  
    const artifact = await ethers.getContractFactory("INTRO");
    const contract = await upgrades.deployProxy(artifact,[process.env.MY_ADDRESS, "MID INTRO TOKEN", "MIDT"]);
    
    console.log('YOUR PROXY ADDRESS :', contract.address)
    console.log('⚠️ Deployment of your main proxy successful. Please Copy the Proxy address to your hardhat-config.js file before continuing.')
    
    // after deployment you should pass the ownership to the Gnosis Vault
    // uncomment to use Gnosis safe RECOMMENDED
    //const gnosisSafe = '0x9FD08Cac2F176C0898ba4D73b02B757c6B2D7150'; 
    //console.log("Transferring ownership of ProxyAdmin...");
    // The owner of the ProxyAdmin can upgrade our contracts
    //await upgrades.admin.transferProxyAdminOwnership(gnosisSafe);
    //console.log("Transferred ownership of ProxyAdmin to:", gnosisSafe);

  }
);







module.exports = {
  defaultNetwork: "rinkeby",
  networks: {
    hardhat: {
      forking: {
        url: "https://eth-mainnet.alchemyapi.io/v2/" + process.env.ALCHEMY_KEY,
        blockNumber: 12376904
      }
      
    },
    binance: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545",
      chainId: 97,
      gasPrice: 20000000000,
      accounts: {mnemonic: process.env.MNEMONIC}
    },
    rinkeby: {
      url: "https://rinkeby.infura.io/v3/" + process.env.INFURA_ID,
      accounts: { mnemonic: process.env.MNEMONIC }
    },
    kovan: {
      url: "https://kovan.infura.io/v3/" + process.env.INFURA_ID,
      accounts: { mnemonic: process.env.MNEMONIC }
    },
    local: {
      url: "http://127.0.0.1:8545/",
      accounts: { mnemonic: process.env.MNEMONIC }
    }
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: process.env.ETHERSCAN
  },
  solidity: {
    version: "0.8.0",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
    // script: "./script"
  },
  mocha: {
    timeout: 20000
  }
}
//npx hardhat verify --network rinkeby 0xe4742f84b....
