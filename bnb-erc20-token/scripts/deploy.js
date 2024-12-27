const { ethers } = require("hardhat");

async function main() {
    // Load the contract factory
    const PalestineDonationToken = await ethers.getContractFactory("PalestineDonationToken");

    // Parameters for the constructor
    const initialSupply = ethers.parseEther("1000000"); // 1 million tokens with 18 decimals
    const palestineAddress = "0x90F79bf6EB2c4f870365E785982E1f101E93b906"; // Replace with a valid Ethereum address

    console.log("Deploying PalestineDonationToken with initialSupply:", initialSupply.toString());

    // Deploy the contract
    const token = await PalestineDonationToken.deploy(initialSupply, palestineAddress);
    //console.log(token);

    // Log the contract address
    console.log("PalestineDonationToken deployed to:", token.address);
}

// Execute the script
main().catch((error) => {
    console.error("Error deploying the contract:", error);
    process.exitCode = 1;
});
