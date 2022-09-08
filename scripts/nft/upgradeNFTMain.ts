import { ethers } from 'hardhat';
import upgradeNFTUpgradeable from './upgradeNFT';

const upgradeNFTUpgradeableMain = async (baseAddress: string, version: string = 'CelebrityUpgradeable') => {
    await upgradeNFTUpgradeable(baseAddress, (await ethers.getSigners())[0], version);
};

upgradeNFTUpgradeableMain('0xD2940D697Eb9Cd749Fef8B10FC9311FEE280C36E'); // testnet

