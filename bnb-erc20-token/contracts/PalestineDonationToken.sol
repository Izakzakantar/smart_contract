// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PalestineDonationToken is ERC20, Ownable {
    address public palestineAddress;  // Address to receive donation commissions
    uint256 public transactionCommission = 2;  // 5% commission

    // Constructor to initialize token supply and the Palestine address
    constructor(uint256 initialSupply, address _palestineAddress) ERC20("QUDS", "QUDS") {
        // Mint initial token supply to contract deployer (owner)
        _mint(msg.sender, initialSupply);
        // Set the Palestine donation address
        palestineAddress = _palestineAddress;
    }

    // Override transfer to include a commission fee to the Palestine address
    function transfer(address recipient, uint256 amount) public override returns (bool) {
        uint256 commission = (amount * transactionCommission) / 100;
        uint256 amountAfterCommission = amount - commission;

        // Send commission to Palestine address
        _transfer(msg.sender, palestineAddress, commission);
        // Send remaining tokens to the recipient
        _transfer(msg.sender, recipient, amountAfterCommission);

        return true;
    }

    // Function to mint new tokens, only accessible by the contract owner
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    // Allow owner to change the Palestine address
    function setPalestineAddress(address newAddress) public onlyOwner {
        palestineAddress = newAddress;
    }

    // Allow owner to change the transaction commission rate
    function setCommissionRate(uint256 newRate) public onlyOwner {
        require(newRate <= 10, "Commission too high"); // Safety check: max 10%
        transactionCommission = newRate;
    }
}
