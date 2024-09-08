const { ethers } = require("hardhat");

async function main() {
  // Define initial parameters for the contract
  const initialSupply = ethers.parseEther("1000000"); 
  const palestineAddress = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"; // MetaMask wallet address
  // Get the contract factory
  const PalestineDonationToken = await ethers.getContractFactory("PalestineDonationToken");
  // Deploy the contract
  const token = await PalestineDonationToken.deploy(initialSupply, palestineAddress);
  console.log("PalestineDonationToken deployed to:", token.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
