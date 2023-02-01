const hre = require("hardhat");


async function main()
{
    const crowdFunding=await hre.ethers.getContractFactory("CrowdFunding");
    const contract=await crowdFunding.deploy();
    await contract.deployed();
    console.log(`Contract Address is ${contract.address}`)


}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
  