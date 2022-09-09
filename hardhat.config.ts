import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-truffle5";
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-web3";
import "@openzeppelin/hardhat-upgrades";
import "@typechain/hardhat";
import * as dotenv from "dotenv";
import "hardhat-gas-reporter";
import { HardhatUserConfig } from "hardhat/config";
import "solidity-coverage";
import "tsconfig-paths";

dotenv.config();

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.8.2",
        settings: {
          optimizer: {
            enabled: true,
            runs: 150,
          },
        },
      },
    ],
  },
  networks: {
    bsc: {
      url: "https://nd-319-927-470.p2pify.com/033e3dd3880adb05a83b25e6ee8109b7",
      gas: 6000000,
      chainId: 56,
      // accounts: {
      //   mnemonic: process.env.MNEMONIC_BSC_PROD,
      // },
      accounts:
        process.env.PRIVATE_KEY !== undefined
          ? [process.env.PRIVATE_KEY]
          : [],
    },
    bscTestnet: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545",
      gas: 5000000,
      chainId: 97,
      // accounts: {
      //   mnemonic: process.env.MNEMONIC_BSC,
      // },
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    }
  },
  etherscan: {
    apiKey: {
      bsc: process.env.BSC_API_KEY ? process.env.BSC_API_KEY : "",
      bscTestnet: process.env.BSC_API_KEY ? process.env.BSC_API_KEY : ""
    },
  },
  gasReporter: {
    enabled: false,
    currency: "USD",
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
  mocha: {
    timeout: 50000,
  },
};

export default config;
