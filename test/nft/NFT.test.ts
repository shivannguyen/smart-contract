import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { BigNumber, Contract } from "ethers";
import { ethers } from "hardhat";
import { v4 as uuidv4 } from "uuid";
// import deployRUNNOWUpgradeable from "../../scripts/coin/deployRUNNOW";
import deployNFTUpgradeable from "../../scripts/nft/deployNFT";
import { createVoucher } from "../utils/hashVoucher";

let deployer: SignerWithAddress;
let user: SignerWithAddress;
let game: SignerWithAddress;
let account: SignerWithAddress;
let NFTContract: Contract;

describe("NFT", () => {
  beforeEach(async () => {
    [deployer, user, game, account] = await ethers.getSigners();
    NFTContract = await deployNFTUpgradeable(deployer);
  });
  
  describe("V1", async () => {
    it("By BOX", async () => {
      const owner =  new ethers.Wallet(`6fceaa9bd7f352b9258617e7710d7112fa28b73b19d0cdb45320a187c7d076de`, ethers.provider)
      const nonce = uuidv4();
      const auth = {
        signer: owner,
        contract: NFTContract.address,
      };
      const types = {
        BuyNFTStruct: [
          { name: "id", type: "string" },
          { name: "price", type: "uint256" },
          { name: "tokenAddress", type: "address" },
          { name: "nonce", type: "string" },
        ],
      };
      const voucher = {
        id: "123",
        price: ethers.utils.parseEther("0.0001"),
        tokenAddress: "0x0000000000000000000000000000000000000000",
        refAddress: "0xF2EBF0c6fA4efE8716C61fA3336b96D6a9334791",
        nonce: nonce,
        uri: "hello123123",
      };
      await await NFTContract.connect(deployer).transferOwnership("0xB78609478A7eCF578d7f6D7a60b8f292Dea591B3")
      const signature = await createVoucher(types, auth, voucher);
      console.log("signature: ",signature)
      const tx = await NFTContract.connect(user).buyNFT(signature, {
        value: ethers.utils.parseEther("0.0001"),
      });
      console.log(tx)
      await tx.wait();
      expect(await NFTContract.tokenURI("1000001")).to.equal("hello123123");
      expect(await NFTContract.totalSupply()).to.equal(1);

      expect(await ethers.provider.getBalance("0xF2EBF0c6fA4efE8716C61fA3336b96D6a9334791")).to.equal(ethers.utils.parseEther("0.00001"));
    });
  });
});
