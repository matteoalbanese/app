import abi from "../../../contracts/abi.js";
import { ethers } from "ethers";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

async function payWorkerFcn(walletData, contractAddress){

    console.log(`\n=======================================`);

    const provider = walletData[1];

    const signer = provider.getSigner();

    let txHash;

    try{
        
        console.log("siamo nel try pay worker ");
        const myContract = new ethers.Contract(contractAddress, abi, signer);
        console.log("1");
        const payWorkerTx = await myContract.confirmPay();
        console.log("2");
        const payWorkerRx = await payWorkerTx.wait();
        console.log("3");
        
        txHash = payWorkerRx.transactionHash;

        await delay(500);
        console.log(`the worker was payed correctly`);
        console.log(`- Contract executed. Transaction hash: \n${txHash}`);



    }catch(payWorkerError){
        console.log(`${payWorkerError.message.toString()}`);
    }
}

export default payWorkerFcn;
