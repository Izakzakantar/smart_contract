const Transaction = require('../models/transaction');
const Beneficiary = require('../models/beneficiary');
const Wallet = require('../models/wallet');
const SmartContract = require('../models/smart_contract');
const sequelize=require('../config/db')
async function create(userId, firstName, address, phone, transaction_type, amount) {
    const t = await sequelize.transaction();  // Start transaction for consistency
    try {
        const querySmartContract = await SmartContract.findOne({ transaction: t });

        const queryBeneficiary = await Beneficiary.create({
            first_name: firstName,
            address: address,
            phone: phone,
            user_id: userId
        }, { transaction: t });

        if (transaction_type === "Buy") {
            await Wallet.increment(
                { balance: amount },
                { where: { user_id: userId }, transaction: t }
            );
        } else if (transaction_type === "transfer") {
            await Wallet.decrement(
                { balance: amount },
                { where: { user_id: userId }, transaction: t }
            );
        }

        const queryWallet = await Wallet.findOne({ where: { user_id: userId }, transaction: t });

        await Transaction.create({
            transaction_type: transaction_type,
            amount: amount,
            wallet_id: queryWallet.wallet_id,
            beneficiary_id: queryBeneficiary.beneficiary_id,
            smartcontract_id: querySmartContract.smartcontract_id
        }, { transaction: t });

        await t.commit();  // Commit the transaction
        return { success: true, message: 'Transaction processed successfully' };
    } catch (error) {
        await t.rollback();  // Rollback transaction on error
        console.error(error);
        return { success: false, message: 'Error processing transaction', error };
    }
}
module.exports={create}
