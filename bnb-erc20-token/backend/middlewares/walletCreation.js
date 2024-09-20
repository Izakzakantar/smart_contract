const wallet=require('../models/wallet');


async function createWallet(...args){
    try {
        const query=await wallet.create({
            balance:args[0],
            address:args[1],
            user_id:args[2],
            smartcontract_id:args[3]
        })
        console.log(query);
    } catch (error) {
        console.log(error);
    }
}
//createWallet(12.3,"zadazd","27cc5009-e2cb-4aff-a798-1abca8b3dcce","ezddzd")
module.exports={createWallet};