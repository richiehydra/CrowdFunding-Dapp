// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function getAddressBalance(address) {
  
   const addressBigInt = await hre.ethers.provider.getBalance(address);
  return hre.ethers.utils.formatEther(addressBigInt);
}

async function Displayaddress(addresses) {
  let count = 0;
 

  for (const address of addresses) {
    console.log(`  ${count} ----> ${address}----->`, await getAddressBalance(address));
    count = count + 1;
  }
}


async function DisplayUsers(users) {
  for (const user of users) {
    let name = user.name;
    let timestamp = user.timestamp;
    let message = user.message;
    let address=user.from;
    console.log(` At Time ${timestamp} user named ${name} has sent ${message} from ${address}`);
  }
}

async function main() {

  const[owner,from1,from2]=await hre.ethers.getSigners();

  const Crowdfunding=await hre.ethers.getContractFactory("CrowdFunding");
  const contract=await Crowdfunding.deploy();
  await contract.deployed();
  console.log(`The Contract Address is ${contract.address}`);

  let amount={value:hre.ethers.utils.parseEther("1")};
  const finaladdresses=[owner.address,from1.address,from2.address];
  
   
  console.log("Before CrowdFunding");
  await Displayaddress(finaladdresses);
  
  await contract.connect(from1).payment("from1","Nice bro",amount);

  await contract.connect(from2).payment("from2","Awesome bro",amount);

  console.log("After CrowdFunding");
  await  Displayaddress(finaladdresses);

  const users=await contract.getUsers()
  await DisplayUsers(users);




}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
