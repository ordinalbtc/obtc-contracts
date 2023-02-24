const { ethers, upgrades } = require("hardhat");

async function main() {
  const escrowContract = await ethers.getContractFactory("OrdinalBTCMarket");
  const escrow = await escrowContract.deploy();
  await escrow.deployed();

  console.log(escrow.address);
}

main();