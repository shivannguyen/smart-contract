import { ethers } from 'hardhat';
import upgradeNFTUpgradeable from './upgradeNFT';

const upgradeNFTUpgradeableMain = async (baseAddress: string, version: string = 'CelebrityUpgradeable') => {
    await upgradeNFTUpgradeable(baseAddress, (await ethers.getSigners())[0], version);
};

upgradeNFTUpgradeableMain('0xb6720f00c4ce661fe3bec23ed7d59bc6d038655f'); // testnet

