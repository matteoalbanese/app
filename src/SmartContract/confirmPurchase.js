import { parseEther } from "ethers/lib/utils.js";
import abi from "../../../contracts/abi.js";
import { BigNumber, ethers } from "ethers";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

async function confirmPurchaseFcn(walletData, contractAddress, prezzoX2){

    console.log(`\n=======================================`);

    const provider = walletData[1];

    const signer = provider.getSigner();

    let txHash;

    try{
        
        console.log("try confirm purchase");
        const myContract = new ethers.Contract(contractAddress, abi, signer);
        console.log("1");
        const confirmPurchaseTx = await myContract.confirmPurchase( {value: ethers.utils.parseEther(prezzoX2.toString())});
        console.log("2");
        const confirmPurchaseRx = await confirmPurchaseTx.wait();
       console.log("3");
        txHash = confirmPurchaseRx.transactionHash;

        await delay(500);
        console.log("pagamento avvenuto con successo");
        console.log(`transaction hash: \n${txHash}`);

    }catch(confirmPurchaseError){
        console.log(`${confirmPurchaseError.message.toString()}`);
    }
}

export default confirmPurchaseFcn;
