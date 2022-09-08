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
      const nonce = uuidv4();
      const auth = {
        signer: deployer,
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
        price: ethers.utils.parseEther("1"),
        tokenAddress: "0x0000000000000000000000000000000000000000",
        refAddress: "0xF2EBF0c6fA4efE8716C61fA3336b96D6a9334791",
        nonce: nonce,
        uri: "hello123123",
      };
      const signature = await createVoucher(types, auth, voucher);
      const tx = await NFTContract.connect(user).buyNFT(signature, {
        value: ethers.utils.parseEther("1"),
      });
      await tx.wait();
      expect(await NFTContract.tokenURI("1000001")).to.equal("hello123123");
      expect(await NFTContract.totalSupply()).to.equal(1);

      expect(await ethers.provider.getBalance("0xF2EBF0c6fA4efE8716C61fA3336b96D6a9334791")).to.equal(ethers.utils.parseEther("0.1"));
    });
  });
});
