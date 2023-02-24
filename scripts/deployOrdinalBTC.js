const { ethers, upgrades } = require("hardhat");

async function main() {
  const tokenContract = await ethers.getContractFactory("OrdinalBTC");
  const obtc = await tokenContract.deploy();
  await obtc.deployed();

  console.log(obtc.address);
}

main();