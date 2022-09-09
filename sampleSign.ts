import { v4 as uuidv4 } from "uuid";
import 'dotenv/config';
import { Contract, ethers } from 'ethers';
import { BigNumber } from "ethers";

export const getAllItemBlockchain = async () => {
  const provider = new ethers.providers.JsonRpcProvider(RPC_BSC_Networks);
  return {
    provider,
    deployer: new ethers.Wallet(`${process.env.DEPLOYER_PRIVATE_KEY}`, provider),
    NFTContract: new Contract(contract.NFT.address, contract.NFT.abi, provider)
  };
};

export const genSignature = async (types: any, voucher: any, auth: Auth) => {
    const domain = {
      name: process.env.SIGNING_DOMAIN_NAME,
      version: process.env.SIGNING_DOMAIN_VERSION,
      verifyingContract: auth.contract,
      chainId: process.env.CHAIN_ID
    };
    const BuyNFTVoucher = {
      id: voucher.id,
      price: voucher.price,
      tokenAddress: voucher.tokenAddress,
      nonce: voucher.nonce
    };

    const signature = await auth.signer._signTypedData(domain, types, BuyNFTVoucher);
  
    return {
      ...voucher,
      signature,
    };
  }; 

  export const  generateSignedTxMint = async (redeemer: string, refNftId: string): Promise<any> {
    // TODO discuss findOneByUser with type
    const result = await this.findNftsService.findOneByUser(refNftId, {});
    const nft = result.data;
    const contracts = await getAllItemBlockchain();

    // Authenticator for voucher
    const auth = {
      signer: contracts.deployer,
      contract: contracts.NFTContract.address,
    };

    // Specific voucher structure
    const types = {
      BuyNFTStruct: [
        { name: "id", type: "string" },
          { name: "price", type: "uint256" },
          { name: "tokenAddress", type: "address" },
          { name: "nonce", type: "string" },
      ],
    };

    // Generate nonce as transaction id
    const nonce = uuidv4();
    const tokenPrice = BigNumber.from(nft.price);
    const tokenAddress = nft.tokenAddress; 
    const voucher = {
      id: "123123",
        price: BigNumber.from(nft.price),
        tokenAddress: "0x00000",
        refAddress: "0x123123",
        nonce: "nonce",
        uri: "123.com",
    };

    // Sign voucher and return
    return {
      ...(await genSignature(types, voucher, auth)),
      tokenPrice: tokenPrice.toString(),
    };
  }