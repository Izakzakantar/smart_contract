//------------------------------------------------------------------------------
// Donation Section
// Listen for the form submission
document.querySelector("form").addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent form from reloading the page

    // Get the values from input fields
    const amount = document.getElementById("donation-amount").value.trim();

    // Validate the donation amount
    if (!isValidAmount(amount)) {
        alert("Invalid donation amount! Please enter a positive number.");
        return;
    }

    console.log("Donation Amount (ETH):", amount);

    // Interact with the Ethereum wallet and smart contract
    try {
        if (typeof window.ethereum === "undefined") {
            alert("MetaMask is not installed. Please install MetaMask to proceed.");
            return;
        }

        // Request account access
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        if (!accounts || accounts.length === 0) {
            alert("No accounts found. Please connect your wallet.");
            return;
        }

        const userAddress = accounts[0];
        console.log("User Wallet Address:", userAddress);

        // Set up the provider and signer
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        // Define the contract address and ABI
        const contractAddress = "0xe7f1725e7734ce288f8367e1bb143e90bb3f0512"; // Replace with your deployed contract address
        const contractABI = [
            {
                "inputs": [],
                "name": "donateEther",
                "outputs": [],
                "stateMutability": "payable",
                "type": "function"
            }
        ];

        // Create a contract instance
        const contract = new ethers.Contract(contractAddress, contractABI, signer);

        // Convert Ether amount to Wei and call the donateEther function
        const tx = await contract.donateEther({
            value: ethers.utils.parseEther(amount.toString()), // Convert Ether amount to Wei
            nonce: await provider.getTransactionCount(userAddress),
        });

        // Wait for the transaction to be confirmed
        await tx.wait();
        console.log("Transaction confirmed:", tx);
        alert("Thank you for your donation!");
    } catch (error) {
        console.error("Error interacting with the contract:", error);

        // Provide user-friendly error messages
        if (error.code === 4001) {
            alert("Transaction rejected. Please approve the transaction in MetaMask.");
        } else if (error.code === -32602) {
            alert("Invalid parameters. Please check the entered amount.");
        } else {
            alert("An error occurred while processing your donation. Please try again.");
        }
    }
});

// Function to validate the donation amount
function isValidAmount(amount) {
    const parsed = parseFloat(amount);
    return !isNaN(parsed) && parsed > 0;
}
//-------------------------------------------------------------------------------


//------------------------------------------------------------------------------
//connect wallet secion
window.onload = function () {
    const connectWalletButton = document.getElementById('connect-wallet');
    const walletAddressDisplay = document.getElementById('wallet-address');

    connectWalletButton.addEventListener('click', async () => {
        if (typeof window.ethereum !== 'undefined') {
            try {
                // Request account access
                await window.ethereum.request({ method: 'eth_requestAccounts' });

                // Set up provider and signer
                const provider = new ethers.providers.Web3Provider(window.ethereum, 'any');

                const signer = provider.getSigner();
                console.log(signer);
                // Get account address
                const address = await signer.getAddress();
                console.log(address);
               

                // Redirect to crypto_page.html after successful connection
                window.location.href = 'crypto_pages.html';
            } catch (error) {
                console.error('Error connecting to wallet:', error);
            }
        } else {
            alert('MetaMask is not installed. Please install MetaMask to continue.');
        }
    });
};
//----------------------------------------------------------------------------------------

