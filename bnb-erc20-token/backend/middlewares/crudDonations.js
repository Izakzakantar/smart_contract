const Donation = require('../models/donation');
const Donor = require('../models/donor');
const User = require('../models/user');
const DonationReceiver = require('../models/DonationReceiver');

async function createDonations(firstName, userId, donorAddress, amount, remark) {
    try {
       
        // Check if a donor with the same donor_address already exists
        let donorQuery = await Donor.findOne({ where: { donor_address: donorAddress } });

        // If donor doesn't exist, create a new one
        if (!donorQuery) {
            donorQuery = await Donor.create({
                first_name: firstName,
                user_id: userId,
                donor_address: donorAddress
            });
        } else {
            // If donor exists, handle the duplicate donor_address case
            return { status: "error", message: "Donor with this address already exists" };
        }

        // Create the donation record
        const donationQuery = await Donation.create({
            amount: amount,
            remark: remark,
            donor_id: donorQuery.donor_id
        });

        // Create the donation receiver record
        await DonationReceiver.create({
            donation_id: donationQuery.donation_id,
            donor_address: donorAddress,
            amount: donationQuery.amount,
            donor_id: donorQuery.donor_id
        });

        return { status: "success", message: "Donation succeeded" };

    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            // Handle unique constraint error (duplicate donor_address)
            return { status: "error", message: `Duplicate entry: ${error.errors[0].message}` };
        }
        console.error(error); // Log any other errors for debugging
        return { status: "error", message: "Internal server error" };
    }
}

// Example function call
//setTimeout(()=>{
    //console.log(createDonations("issshak", "27cc5009-e2cb-4aff-a798-1abca8b3dcce", "crisstorszasazsiphone14estpasbienpringles", 12.3, "free palestine", "general").then((result)=>{
        //console.log(result);
    //}));
//},5000)

module.exports = { createDonations };
