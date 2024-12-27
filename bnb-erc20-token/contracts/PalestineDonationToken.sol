// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract PalestineDonationToken is ERC20, Ownable, ReentrancyGuard {
    address public palestineAddress;  // Address to receive donation commissions
    uint256 public transactionCommission = 2;  // 2% commission in tokens
    uint256 public rate = 100;  // Fixed rate: 1 ETH = 100 Quds Coin (adjustable)

    // Events
    event TokensBought(address indexed buyer, uint256 ethAmount, uint256 tokenAmount);
    event TokensSold(address indexed seller, uint256 tokenAmount, uint256 ethAmount);
    event CommissionTransferred(address indexed donor, uint256 commissionAmount);
    event DonationReceived(address indexed donor, uint256 amount);
    event Withdrawal(address indexed owner, uint256 amount);

    // Constructor to initialize token supply and the Palestine address
    constructor(uint256 initialSupply, address _palestineAddress) ERC20("QUDS", "QUDS") {
        require(_palestineAddress != address(0), "Invalid Palestine address");
        _mint(msg.sender, initialSupply);  // Mint initial token supply to contract deployer (owner)
        palestineAddress = _palestineAddress;  // Set the Palestine donation address
    }

    // Override transfer to include a token commission
    function transfer(address recipient, uint256 amount) public override returns (bool) {
        uint256 commissionAmount = (amount * transactionCommission) / 100;
        uint256 amountAfterCommission = amount - commissionAmount;

        if (commissionAmount > 0) {
            _transfer(msg.sender, palestineAddress, commissionAmount);
            emit CommissionTransferred(msg.sender, commissionAmount);
        }
        _transfer(msg.sender, recipient, amountAfterCommission);

        return true;
    }

    // Buy Quds Coin with local ETH
    function buyTokens() external payable nonReentrant {
        require(msg.value > 0, "No ETH sent");
        uint256 tokensToBuy = msg.value * rate;
        require(tokensToBuy > 0, "Insufficient ETH to buy tokens");
        require(balanceOf(address(this)) >= tokensToBuy, "Not enough tokens in reserve");

        _transfer(address(this), msg.sender, tokensToBuy);
        emit TokensBought(msg.sender, msg.value, tokensToBuy);
    }

    // Sell Quds Coin for local ETH
    function sellTokens(uint256 tokenAmount) external nonReentrant {
        require(tokenAmount > 0, "Token amount must be greater than zero");
        require(balanceOf(msg.sender) >= tokenAmount, "Insufficient token balance to sell");

        uint256 ethToReturn = tokenAmount / rate;
        require(address(this).balance >= ethToReturn, "Contract does not have enough ETH");

        _transfer(msg.sender, address(this), tokenAmount);
        payable(msg.sender).transfer(ethToReturn);

        emit TokensSold(msg.sender, tokenAmount, ethToReturn);
    }

    // Donate Ether to Palestine address
    function donateEther() external payable nonReentrant {
        require(msg.value > 0, "No ETH sent");
        (bool success, ) = palestineAddress.call{value: msg.value}("");// Transfers Ether (specified by amount) from the contract to the address stored in palestineAddress.
        require(success, "Donation failed");

        emit DonationReceived(msg.sender, msg.value);
    }

    // Allow the contract to receive ETH
    receive() external payable {}

    // Fallback function to prevent accidental ETH loss
    fallback() external payable {
        revert("Unsupported call");
    }

    // Allow owner to withdraw Ether from the contract
    function withdrawEther(uint256 amount) external onlyOwner nonReentrant {
        require(address(this).balance >= amount, "Insufficient balance in contract");
        payable(owner()).transfer(amount);

        emit Withdrawal(msg.sender, amount);
    }

    // Allow owner to change the Palestine address
    function setPalestineAddress(address newAddress) public onlyOwner {
        require(newAddress != address(0), "Invalid address");
        palestineAddress = newAddress;
    }

    // Allow owner to change the transaction commission rate
    function setCommissionRate(uint256 newRate) public onlyOwner {
        require(newRate <= 10, "Commission too high");  // Safety check: max 10%
        transactionCommission = newRate;
    }
    
    // Allow owner to set the buy/sell rate for Quds Coin
    function setRate(uint256 newRate) public onlyOwner {
        require(newRate > 0, "Rate must be greater than zero");
        rate = newRate;
    }
}
