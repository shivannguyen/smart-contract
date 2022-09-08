/* eslint-disable node/no-unsupported-features/es-syntax */
// eslint-disable-next-line node/no-unpublished-import
import hre from "hardhat";

const SIGNING_DOMAIN_NAME = "NFT-Voucher";
const SIGNING_DOMAIN_VERSION = "1";
import { ethers } from "hardhat";

export const createVoucher = async (types: any, auth: any, voucher: any) => {
  const domain = {
    name: SIGNING_DOMAIN_NAME,
    version: SIGNING_DOMAIN_VERSION,
    verifyingContract: auth.contract,
    chainId: hre.network.config.chainId,
  };
  const BuyNFTStruct = {
    id: voucher.id,
    price: voucher.price,
    tokenAddress: voucher.tokenAddress,
    nonce: voucher.nonce
  };
  const signature = await auth.signer._signTypedData(domain, types, BuyNFTStruct);

  return {
    ...voucher,
    signature,
  };
};
