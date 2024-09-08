// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;


import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PalestineDonationToken is ERC20, Ownable {
    address public palestineAddress;  // Address to receive donation commissions
    uint256 public transactionCommission = 2;  // 2% commission in Ether

    // List of beneficiaries
    mapping(address => bool) public beneficiaries;

    // Constructor to initialize token supply and the Palestine address
    constructor(uint256 initialSupply, address _palestineAddress) ERC20("QUDS", "QUDS") {
        // Mint initial token supply to contract deployer (owner)
        _mint(msg.sender, initialSupply);
        // Set the Palestine donation address
        palestineAddress = _palestineAddress;
    }

    // Add a beneficiary (only owner can do this)
    function addBeneficiary(address beneficiary) public onlyOwner {
        beneficiaries[beneficiary] = true;
    }

    // Remove a beneficiary (only owner can do this)
    function removeBeneficiary(address beneficiary) public onlyOwner {
        beneficiaries[beneficiary] = false;
    }

    // Check if an address is a beneficiary and transfer tokens if they don't have enough
    function ensureBeneficiaryHasTokens(address beneficiary, uint256 requiredAmount) public onlyOwner {
        require(beneficiaries[beneficiary], "Address is not a beneficiary");
        uint256 balance = balanceOf(beneficiary);

        if (balance < requiredAmount) {
            uint256 amountToTransfer = requiredAmount - balance;
            _transfer(msg.sender, beneficiary, amountToTransfer);  // Transfer missing tokens to beneficiary
        }
    }

    // Override transfer to include commission in Ether
    function transfer(address recipient, uint256 amount) public override returns (bool) {
        // Take Ether commission and send it to Palestine address
        uint256 commissionInEther = getEtherCommission(); // Calculate the commission in Ether
        require(msg.sender.balance >= commissionInEther, "Not enough Ether to cover the commission");

        // Transfer the Ether commission to Palestine address
        (bool success, ) = palestineAddress.call{value: commissionInEther}("");
        require(success, "Ether commission transfer failed");

        // Proceed with token transfer
        _transfer(msg.sender, recipient, amount);

        return true;
    }

    // Function to calculate Ether commission (custom logic to determine amount)
    function getEtherCommission() internal pure returns (uint256) {
        // For example, set a fixed Ether commission (this can be dynamic based on your requirements)
        return 0.001 ether;  // This is just an example, can be changed
    }

    // Allow the user to donate Ether directly, and all of it is sent to Palestine
    function donateEther() external payable {
        // Send all Ether from the user to Palestine address
        (bool success, ) = palestineAddress.call{value: msg.value}("");
        require(success, "Donation failed");
    }

    // Allow owner to change the Palestine address
    function setPalestineAddress(address newAddress) public onlyOwner {
        palestineAddress = newAddress;
    }

    // Allow owner to change the transaction commission rate (for token transactions)
    function setCommissionRate(uint256 newRate) public onlyOwner {
        require(newRate <= 10, "Commission too high"); // Safety check: max 10%
        transactionCommission = newRate;
    }
}
