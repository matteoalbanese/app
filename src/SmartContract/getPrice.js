import abi from "../../../contracts/abi.js";
import { ethers } from "ethers";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

async function getPrice(walletData,contractAddress) {

    const provider = walletData[1];
    const signer = provider.getSigner();
    let value;

    
    try{
        console.log("siamo nel try status");
        const myContract = new ethers.Contract(contractAddress, abi, signer);
        
        const getPriceTx = await myContract.value.call();

        
        
        value = getPriceTx/100000000;

        await delay(500);
        


    }catch(getStatusError){
        console.log(`- ${getStatusError.message.toString()}`);
    }

    return value;
}
export default getPrice;

