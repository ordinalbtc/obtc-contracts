const { expect } = require("chai");
const { ethers, network } = require("hardhat");
// const { MerkleTree } = require('merkletreejs');
// const keccak256 = require('keccak256');
// const { time } = require('openzeppelin-test-helpers');
const assert = require('assert').strict;
const provider = waffle.provider;

require("@nomiclabs/hardhat-ethers");

describe("OrdinalBTCMarket", async function () {
    let owner, accounts;
    let escrow, oBTC;
    before(async () => {
        [owner, ...accounts] = await ethers.getSigners();

        console.log("accounts = ", accounts)
        const escrowContract = await ethers.getContractFactory("OrdinalBTCMarket");
        escrow = await escrowContract.deploy();
        await escrow.deployed();
        console.log("escrow address: ", escrow.address);

        const oBTC = await ethers.getContractFactory("oBTC");
        oBTC = await oBTC.deploy();
        await oBTC.deployed();
        console.log("oBTC address: ", oBTC.address);

        await escrow.changePauseState();
        await escrow.setoBTC(oBTC.address)
    });
    
    it("Can mint", async function () {

      console.log("Owner of nft: ", await escrow.owner())

      for(let i = 0; i < 10; i++) {
        await oBTC.transfer(accounts[i], ethers.utils.parseEther("100"))
      }

      await escrow.connect(accounts[0]).BuyBTCNft(1, {value: ethers.utils.parseEther("0.1")})
      console.log("escrow Balance of Account 0: ", await escrow.balanceOf(accounts[0].address))


      expect(await escrow.connect(accounts[10]).BuyBTCNft(1, {value: ethers.utils.parseEther("0.1")})).to.be.revertedWith("escrow: purchase correct deposit amount")

    });
});